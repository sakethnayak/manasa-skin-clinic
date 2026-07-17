"""FastAPI backend for Manasa Skin Clinic.

Endpoints:
  GET  /api/                   – health/hello
  POST /api/booking            – accept a booking, persist to MongoDB,
                                 optionally forward via email (Emergent-managed
                                 Resend) if EMERGENT_EMAIL_KEY is configured.
  GET  /api/admin/bookings     – list bookings (requires ?token=ADMIN_TOKEN)
"""
from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import html as html_lib
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Optional email integration (Emergent-managed Resend)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Manasa Skin Clinic")
CLINIC_EMAIL = os.environ.get("CLINIC_EMAIL", "manasa.skinclinic19@gmail.com")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "manasa-admin-2024")

app = FastAPI(title="Manasa Skin Clinic API")
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Legacy status check (kept from template for smoke tests)
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Manasa Skin Clinic API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r["timestamp"], str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


# ---------------------------------------------------------------------------
# Booking
# ---------------------------------------------------------------------------
class BookingCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=6, max_length=32)
    concern: str = Field(min_length=1, max_length=120)
    date: Optional[str] = None  # ISO date
    time: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=1000)


class Booking(BookingCreate):
    id: str
    created_at: datetime
    email_sent: bool = False


def _booking_email_html(b: Booking) -> str:
    esc = html_lib.escape
    return f"""
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; background:#FAF7F2; padding:24px;">
      <tr><td align="center">
        <table width="600" cellspacing="0" cellpadding="0" style="background:#FDFCFA; border:1px solid #EBE1D1; border-radius:12px; padding:32px;">
          <tr><td style="border-bottom:1px solid #EBE1D1; padding-bottom:16px;">
            <div style="font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:#8B857D;">New Booking Request</div>
            <div style="font-family: Georgia, serif; font-size:24px; color:#14110F; margin-top:6px;">Manasa Skin Clinic</div>
          </td></tr>
          <tr><td style="padding:20px 0;">
            <table cellpadding="6" style="width:100%; font-size:14px; color:#14110F;">
              <tr><td style="color:#8B857D; width:140px;">Name</td><td>{esc(b.name)}</td></tr>
              <tr><td style="color:#8B857D;">Phone</td><td><a href="tel:{esc(b.phone)}" style="color:#B48F5C;">{esc(b.phone)}</a></td></tr>
              <tr><td style="color:#8B857D;">Concern</td><td>{esc(b.concern)}</td></tr>
              <tr><td style="color:#8B857D;">Preferred date</td><td>{esc(b.date or '—')}</td></tr>
              <tr><td style="color:#8B857D;">Preferred time</td><td>{esc(b.time or '—')}</td></tr>
              <tr><td style="color:#8B857D; vertical-align:top;">Notes</td><td>{esc(b.notes or '—')}</td></tr>
              <tr><td style="color:#8B857D;">Submitted</td><td>{b.created_at.strftime('%d %b %Y %H:%M UTC')}</td></tr>
            </table>
          </td></tr>
          <tr><td style="border-top:1px solid #EBE1D1; padding-top:16px; font-size:12px; color:#8B857D;">
            Reply directly to this email, or send a WhatsApp confirmation to
            <a href="https://wa.me/91{esc(b.phone.lstrip('+').lstrip('91'))}" style="color:#B48F5C;">the patient</a>.
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _try_send_email(b: Booking) -> bool:
    if not EMAIL_KEY:
        logger.info("EMERGENT_EMAIL_KEY not configured — skipping email")
        return False
    payload = {
        "to": [CLINIC_EMAIL],
        "subject": f"New Booking — {b.name} ({b.concern})",
        "html": _booking_email_html(b),
        "from_name": EMAIL_FROM_NAME,
    }
    try:
        async with httpx.AsyncClient(timeout=25) as c:
            r = await c.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        r.raise_for_status()
        return True
    except Exception as exc:
        logger.error(f"email send failed: {exc}")
        return False


@api_router.post("/booking")
async def create_booking(payload: BookingCreate):
    b = Booking(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc),
        email_sent=False,
        **payload.model_dump(),
    )
    doc = b.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    # Try email first, record outcome, then persist
    b.email_sent = await _try_send_email(b)
    doc["email_sent"] = b.email_sent
    await db.bookings.insert_one(doc)
    return {"status": "ok", "id": b.id, "email_sent": b.email_sent}


@api_router.get("/admin/bookings")
async def list_bookings(token: str = Query(...), limit: int = 200):
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    rows = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return {"count": len(rows), "bookings": rows}


# ---------------------------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
