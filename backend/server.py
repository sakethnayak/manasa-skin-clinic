"""
Manasa Skin Clinic - FastAPI Backend

Endpoints:
GET  /api/                       Health check
POST /api/booking                Create a booking
GET  /api/admin/bookings         View bookings using admin token
"""

from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict
from dotenv import load_dotenv

from pathlib import Path
from datetime import datetime, timezone
from typing import Optional, List
import os
import uuid
import logging
import html as html_lib
import httpx


# ============================================================
# BASIC SETUP
# ============================================================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger("manasa-skin-clinic")


# ============================================================
# ENVIRONMENT VARIABLES
# ============================================================

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

ADMIN_TOKEN = os.environ.get(
    "ADMIN_TOKEN",
    "manasa-admin-2024"
)

CORS_ORIGINS = os.environ.get(
    "CORS_ORIGINS",
    "*"
)

# Email is OPTIONAL.
# Booking will work even if this is missing.
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"

EMAIL_FROM_NAME = os.environ.get(
    "EMAIL_FROM_NAME",
    "Manasa Skin Clinic"
)

CLINIC_EMAIL = os.environ.get(
    "CLINIC_EMAIL",
    "manasa.skinclinic19@gmail.com"
)


# ============================================================
# DATABASE
# ============================================================

if not MONGO_URL:
    logger.error("MONGO_URL environment variable is missing")

if not DB_NAME:
    logger.error("DB_NAME environment variable is missing")


client = None
db = None

if MONGO_URL and DB_NAME:
    client = AsyncIOMotorClient(
        MONGO_URL,
        serverSelectionTimeoutMS=10000,
        connectTimeoutMS=10000,
        socketTimeoutMS=10000,
        maxPoolSize=10,
    )

    db = client[DB_NAME]


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="Manasa Skin Clinic API",
    version="1.0.0"
)

api_router = APIRouter(prefix="/api")


# ============================================================
# CORS
# ============================================================

if CORS_ORIGINS == "*":
    allowed_origins = ["*"]
else:
    allowed_origins = [
        origin.strip()
        for origin in CORS_ORIGINS.split(",")
        if origin.strip()
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@api_router.get("/")
async def root():
    """
    Basic API health check.
    """
    return {
        "status": "ok",
        "message": "Manasa Skin Clinic API is running"
    }


@api_router.get("/health")
async def health():
    """
    Checks whether the backend and MongoDB are available.
    """

    if db is None:
        return {
            "status": "error",
            "backend": "ok",
            "database": "not_configured"
        }

    try:
        await client.admin.command("ping")

        return {
            "status": "ok",
            "backend": "ok",
            "database": "connected"
        }

    except Exception as exc:
        logger.exception("MongoDB health check failed")

        return {
            "status": "error",
            "backend": "ok",
            "database": "disconnected",
            "error": str(exc)
        }


# ============================================================
# BOOKING MODEL
# ============================================================

class BookingCreate(BaseModel):
    """
    Data received from the website booking form.
    """

    model_config = ConfigDict(
        extra="ignore"
    )

    name: str = Field(
        ...,
        min_length=1,
        max_length=120
    )

    phone: str = Field(
        ...,
        min_length=6,
        max_length=32
    )

    concern: str = Field(
        ...,
        min_length=1,
        max_length=120
    )

    date: Optional[str] = None

    time: Optional[str] = None

    notes: Optional[str] = Field(
        default=None,
        max_length=1000
    )


class Booking(BookingCreate):
    """
    Booking stored in MongoDB.
    """

    id: str

    created_at: datetime

    email_sent: bool = False


# ============================================================
# EMAIL HTML
# ============================================================

def booking_email_html(booking: Booking) -> str:
    """
    Creates the HTML email for the clinic.
    """

    esc = html_lib.escape

    return f"""
    <!DOCTYPE html>
    <html>
    <body style="
        margin:0;
        padding:30px;
        background:#FAF7F2;
        font-family:Arial,sans-serif;
    ">

        <div style="
            max-width:600px;
            margin:auto;
            background:#ffffff;
            border:1px solid #EBE1D1;
            border-radius:12px;
            padding:30px;
        ">

            <div style="
                font-size:12px;
                letter-spacing:2px;
                color:#8B857D;
                margin-bottom:8px;
            ">
                NEW BOOKING REQUEST
            </div>

            <h1 style="
                margin:0 0 25px 0;
                font-family:Georgia,serif;
                color:#14110F;
            ">
                Manasa Skin Clinic
            </h1>

            <table
                cellpadding="8"
                cellspacing="0"
                width="100%"
                style="font-size:14px;color:#14110F;"
            >

                <tr>
                    <td style="color:#8B857D;width:150px;">
                        Name
                    </td>
                    <td>
                        {esc(booking.name)}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Phone
                    </td>
                    <td>
                        {esc(booking.phone)}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Concern
                    </td>
                    <td>
                        {esc(booking.concern)}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Preferred Date
                    </td>
                    <td>
                        {esc(booking.date or "Not specified")}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Preferred Time
                    </td>
                    <td>
                        {esc(booking.time or "Not specified")}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Notes
                    </td>
                    <td>
                        {esc(booking.notes or "None")}
                    </td>
                </tr>

                <tr>
                    <td style="color:#8B857D;">
                        Submitted
                    </td>
                    <td>
                        {booking.created_at.strftime("%d %b %Y %H:%M UTC")}
                    </td>
                </tr>

            </table>

        </div>

    </body>
    </html>
    """


# ============================================================
# OPTIONAL EMAIL
# ============================================================

async def try_send_email(booking: Booking) -> bool:
    """
    Sends an email if EMERGENT_EMAIL_KEY exists.

    IMPORTANT:
    Email failure NEVER causes the booking to fail.
    """

    if not EMAIL_KEY:
        logger.info(
            "EMERGENT_EMAIL_KEY not configured. "
            "Booking email skipped."
        )
        return False

    payload = {
        "to": [CLINIC_EMAIL],
        "subject": (
            f"New Booking - "
            f"{booking.name} ({booking.concern})"
        ),
        "html": booking_email_html(booking),
        "from_name": EMAIL_FROM_NAME,
    }

    try:

        async with httpx.AsyncClient(
            timeout=15
        ) as http_client:

            response = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={
                    "X-Email-Key": EMAIL_KEY
                },
                json=payload,
            )

            response.raise_for_status()

        logger.info(
            "Booking email sent successfully for %s",
            booking.id
        )

        return True

    except Exception as exc:

        logger.error(
            "Booking email failed: %s",
            exc
        )

        # VERY IMPORTANT:
        # Do not raise the error.
        return False


# ============================================================
# CREATE BOOKING
# ============================================================

@api_router.post("/booking")
async def create_booking(payload: BookingCreate):
    """
    Creates and stores a new booking.

    The booking is saved to MongoDB FIRST.

    Email is optional and cannot cause the booking to fail.
    """

    logger.info(
        "New booking received: name=%s phone=%s",
        payload.name,
        payload.phone
    )

    # --------------------------------------------------------
    # Check database configuration
    # --------------------------------------------------------

    if db is None:
        logger.error(
            "MongoDB is not configured. "
            "MONGO_URL or DB_NAME is missing."
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Database is not configured. "
                "Please check MONGO_URL and DB_NAME "
                "in Vercel Environment Variables."
            )
        )

    # --------------------------------------------------------
    # Check MongoDB connection
    # --------------------------------------------------------

    try:

        await client.admin.command("ping")

        logger.info(
            "MongoDB connection successful"
        )

    except Exception as exc:

        logger.exception(
            "MongoDB connection failed"
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Could not connect to the booking database."
            )
        )

    # --------------------------------------------------------
    # Create booking
    # --------------------------------------------------------

    booking = Booking(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc),
        email_sent=False,
        **payload.model_dump()
    )

    # --------------------------------------------------------
    # Save to MongoDB
    # --------------------------------------------------------

    try:

        document = booking.model_dump()

        document["created_at"] = (
            document["created_at"].isoformat()
        )

        result = await db.bookings.insert_one(
            document
        )

        if not result.inserted_id:
            raise Exception(
                "MongoDB did not return an inserted ID"
            )

        logger.info(
            "Booking saved successfully: %s",
            booking.id
        )

    except Exception as exc:

        logger.exception(
            "Failed to save booking"
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Could not save booking. "
                "Please try again."
            )
        )

    # --------------------------------------------------------
    # Try email AFTER booking is saved
    # --------------------------------------------------------

    email_sent = False

    try:

        email_sent = await try_send_email(
            booking
        )

    except Exception:

        # Absolutely never allow email to break booking.
        email_sent = False

    # --------------------------------------------------------
    # Update email status
    # --------------------------------------------------------

    if email_sent:

        try:

            await db.bookings.update_one(
                {"id": booking.id},
                {
                    "$set": {
                        "email_sent": True
                    }
                }
            )

        except Exception:

            logger.exception(
                "Could not update email_sent status"
            )

    # --------------------------------------------------------
    # SUCCESS RESPONSE
    # --------------------------------------------------------

    return {
        "status": "ok",
        "message": "Booking submitted successfully",
        "id": booking.id,
        "email_sent": email_sent
    }


# ============================================================
# ADMIN - LIST BOOKINGS
# ============================================================

@api_router.get("/admin/bookings")
async def list_bookings(
    token: str = Query(...),
    limit: int = Query(
        default=200,
        ge=1,
        le=500
    )
):
    """
    Returns all bookings.

    Example:
    /api/admin/bookings?token=YOUR_ADMIN_TOKEN
    """

    # --------------------------------------------------------
    # Check admin token
    # --------------------------------------------------------

    if token != ADMIN_TOKEN:

        raise HTTPException(
            status_code=401,
            detail="Invalid admin token"
        )

    # --------------------------------------------------------
    # Check database
    # --------------------------------------------------------

    if db is None:

        raise HTTPException(
            status_code=500,
            detail="Database is not configured"
        )

    # --------------------------------------------------------
    # Get bookings
    # --------------------------------------------------------

    try:

        rows = await (
            db.bookings
            .find({}, {"_id": 0})
            .sort("created_at", -1)
            .to_list(limit)
        )

        return {
            "count": len(rows),
            "bookings": rows
        }

    except Exception:

        logger.exception(
            "Failed to retrieve bookings"
        )

        raise HTTPException(
            status_code=500,
            detail="Could not retrieve bookings"
        )


# ============================================================
# INCLUDE ROUTER
# ============================================================

app.include_router(api_router)


# ============================================================
# SHUTDOWN
# ============================================================

@app.on_event("shutdown")
async def shutdown_db_client():
    """
    Close MongoDB connection when application shuts down.
    """

    global client

    if client:

        client.close()

        logger.info(
            "MongoDB connection closed"
        )
