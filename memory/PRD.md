# Manasa Skin Clinic — Product Requirements Document

## Original Problem Statement
Redesign only the **Hero Section** and the complete **Branding (Logo + Identity)** of the existing premium Manasa Skin Clinic dermatology website. Preserve architecture, responsiveness, SEO, animations, booking flow, and luxury theme. Design must feel like a handcrafted ₹5–7 lakh luxury dermatology website by a world-class agency (Apple / Aesop / Dior Beauty / Chanel Beauty inspiration).

## User Choices (confirmed)
- Full port of existing HTML into React first, then redesign only Hero + Branding
- Doctor photo: user-supplied portrait URL
- Logo direction: custom interlocking-M monogram with organic skin-layer arcs + fine gold hairline
- Palette: Warm ivory + champagne gold + deep charcoal
- Luxury cursor + magnetic hover on desktop enabled

## Architecture
- Stack: React 19 + CRA + Tailwind + Framer Motion + shadcn/ui
- Frontend only (no backend needed) — booking form composes a WhatsApp deep-link (wa.me)
- Fonts: Fraunces (editorial H1), Cormorant Garamond (italic accents/quotes), DM Sans (UI/body)
- Design tokens in `/app/frontend/src/index.css` (`--ivory`, `--champagne`, `--ink` families)

## Personas
- **Prospective patient (Nizamabad, Telangana)**: seeking dermatology, aesthetic, or laser treatment; researches Dr. Manasa's credentials, results, and pricing signals before booking
- **Bridal / occasion patient**: needs premium skin prep (HydraFacial, peels)
- **Existing patient**: returning for follow-up, uses WhatsApp

## Implemented (v1 — 2026-07-06)
- **Cinematic Hero**: 100vh editorial layout — vertical index label, oversize serif headline breaking three baselines with italic gold accents, arched doctor portrait, three floating glassmorphism cards (Patients / Credentials / Now Consulting Nizamabad), ambient gold orbs, grain, oversize outline "01" numeral, magnetic CTAs, cursor parallax, scroll cue
- **Custom Monogram Logo**: bespoke SVG mark (interlocking M petals + skin-layer arcs + gold hairline) with wordmark; tone variants (gold/ink/ivory); favicon.svg included; works from 16px to 300px
- **Luxury Cursor**: soft gold dot + trailing lerped ring, grows on interactive hover, disabled on touch/coarse pointer
- **Magnetic hover** on primary CTAs (Book, Book Consultation, Follow, Enquire)
- **Doctor Journey Timeline**: 5-node animated timeline (MBBS → DDVL → Aesthetic Training → Laser Expertise → Practice) with staggered scroll reveal
- **Custom SVG service illustrations**: Skin, Hair, Laser, Aesthetic, Nail, Surgery — no emoji, no icon packs
- **Full site ported** from the uploaded HTML: Nav, Trust Marquee, About, Services (5 tabs, ~29 treatments), Results before/after, Testimonials, Why (numbered 01–06), Instagram (3 reels), FAQ (6 items native `<details>`), Contact (address/phone/WA/email/hours cards), Booking form → WhatsApp deep-link + success state, Footer
- **Responsive**: mobile hero re-composed with sheet menu, no horizontal overflow, larger CTAs
- **A11y**: SR-only SheetTitle on mobile menu, focus rings on champagne, prefers-reduced-motion honored
- **All data-testid** coverage per test agent validation (92% → fixes applied)

## Fixes Applied Post Test-Agent iteration_1
- Mobile 82px overflow → resolved (body overflow-x: hidden + max-width: 100vw)
- Desktop micro-badge column overlap → truncate + reduced font size + explicit gap
- "— Dr. Manasa" signature moved inside portrait frame
- "Now Consulting" pill moved to bottom-right (no signature overlap)
- Logo click now `window.scrollTo({top:0})` (not #top anchor)
- Radix Sheet a11y warning → added `<SheetTitle className="sr-only">`

## v1.1 — 2026-07-17 (User Feedback)
- **Happy Patients count: 1000+ → 5000+** (Hero micro-badges, Hero glass card, Trust marquee, JSON-LD reviewCount)
- **Sunday hours: "By Appointment" → "Closed"** (Contact card + JSON-LD openingHoursSpecification updated to reflect Mon-Sat only)
- **JSON-LD schema.org** MedicalBusiness + Physician graph added to `/app/frontend/public/index.html` for local SEO — includes clinic address, hours, telephone, email, aggregateRating (4.9/5000), Dr. Manasa credentials (MBBS + DDVL)
- **Booking form permanently wired** to backend:
  - New `POST /api/booking` endpoint in `/app/backend/server.py` — persists every submission to MongoDB `bookings` collection (permanent paper trail — no third-party account required)
  - `GET /api/admin/bookings?token=…` to view all bookings (default token: `manasa-admin-2024` — override via `ADMIN_TOKEN` env)
  - When `EMERGENT_EMAIL_KEY` is set in `/app/backend/.env`, the booking is also **emailed to `manasa.skinclinic19@gmail.com`** via Emergent-managed Resend (HTML email template included). Without the key it silently skips email but still records booking.
  - Frontend still opens WhatsApp deep-link on submit for instant clinic notification.
- **Real (AI-generated) Indian patient before/after photos** — 6 photorealistic reference images generated via Gemini Nano Banana (`gemini-3.1-flash-image-preview`) and saved to `/app/frontend/public/before-after/`:
  - `acne_before.png` / `acne_after.png` — South Indian woman, mid-20s
  - `pigmentation_before.png` / `pigmentation_after.png` — North Indian woman, early 30s, melasma
  - `hair_before.png` / `hair_after.png` — Indian man, mid-30s, androgenic hair loss + PRP result
  - One-shot generation script kept at `/app/backend/gen_before_after.py` if you want to regenerate
- **Interactive before/after slider** in Results section — drag/hover handle to wipe from before → after. Custom-built, no third-party lib.
- Backend dependencies: added `httpx` for async email posting.

## Backlog (P1)
- Add real before/after patient photos (currently gradient placeholders per original site design)
- Optional: connect booking form to Formspree or backend endpoint for email delivery in addition to WhatsApp
- Optional: add doctor's video introduction reel above testimonials
- Optional: SEO — JSON-LD schema (MedicalBusiness, Physician) for local search

## Backlog (P2)
- Blog / editorial articles page
- Live chat (Tidio / Intercom) if WhatsApp isn't enough
- Multi-language (Telugu / Hindi) toggle
