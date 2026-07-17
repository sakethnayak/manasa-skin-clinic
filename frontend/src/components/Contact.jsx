import React, { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight, Check } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const concerns = [
    "Acne / Acne Scars",
    "Pigmentation / Melasma",
    "Hair Fall / Thinning",
    "PRP Hair Therapy",
    "Anti-Aging Treatment",
    "HydraFacial / Glow Facial",
    "Chemical Peels",
    "Nail Infection / Disorder",
    "Eczema / Psoriasis",
    "Wart Removal",
    "Laser Hair Reduction",
    "Pigmentation Laser",
    "Mole / Skin Tag Removal",
    "Cyst Excision",
    "General Skin Consultation",
    "Other",
];

const times = ["Any time", "Morning (9am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 7pm)"];

const WA_NUMBER = "916305544765";

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", concern: "", date: "", time: "Any time", notes: "" });

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // 1) persist booking to backend (paper trail + email if configured)
        try {
            await axios.post(`${API}/booking`, form, { timeout: 15000 });
        } catch (err) {
            // non-blocking — WhatsApp is our fallback delivery channel
            console.warn("booking persist failed", err?.message);
        }
        // 2) also open WhatsApp with the composed message
        const msg = [
            "Hi Manasa Skin Clinic — I'd like to book a consultation.",
            "",
            `Name: ${form.name}`,
            `Phone: ${form.phone}`,
            `Concern: ${form.concern}`,
            `Preferred Date: ${form.date}`,
            `Preferred Time: ${form.time}`,
            form.notes ? `Notes: ${form.notes}` : "",
        ]
            .filter(Boolean)
            .join("\n");
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, "_blank");
        setSent(true);
        setSubmitting(false);
    };

    return (
        <section id="contact" className="section" style={{ background: "var(--warm)" }} data-testid="contact-section">
            <div className="container-lux">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="eyebrow mb-4">Get in Touch</div>
                    <h2 className="section-title">
                        Book Your <em>Appointment</em>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Contact info */}
                    <div className="lg:col-span-5 space-y-4">
                        <ContactRow
                            Icon={MapPin}
                            label="Location"
                            val="Manasa Skin Clinic"
                            sub="Nizamabad, Telangana, India"
                            cta="Get Directions →"
                            href="https://maps.app.goo.gl/YrfpFQe45q7GpDb29?g_st=ac"
                            testid="contact-location"
                        />
                        <ContactRow Icon={Phone} label="Phone" val="+91 63055 44765" cta="Call Now →" href="tel:+916305544765" testid="contact-phone" />
                        <ContactRow
                            Icon={MessageCircle}
                            label="WhatsApp"
                            val="Quick queries & confirmations"
                            cta="Start Chat →"
                            href={`https://wa.me/${WA_NUMBER}`}
                            testid="contact-whatsapp"
                        />
                        <ContactRow Icon={Mail} label="Email" val="manasa.skinclinic19@gmail.com" cta="Send Email →" href="mailto:manasa.skinclinic19@gmail.com" testid="contact-email" />

                        <div className="lux-card mt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock size={18} style={{ color: "var(--champagne-2)" }} />
                                <div className="eyebrow">Working Hours</div>
                            </div>
                            <div className="space-y-2 text-sm" style={{ color: "var(--ink-60)" }}>
                                <Row a="Monday – Friday" b="9:00 am – 7:00 pm" />
                                <Row a="Saturday" b="9:00 am – 5:00 pm" />
                                <Row a="Sunday" b="Closed" />
                            </div>
                        </div>
                    </div>

                    {/* Booking form */}
                    <div className="lg:col-span-7">
                        <div className="lux-card">
                            {!sent ? (
                                <>
                                    <div className="mb-6">
                                        <h3 className="serif" style={{ fontSize: "28px", fontWeight: 400, color: "var(--ink)" }}>Request a Consultation</h3>
                                        <p className="text-sm mt-2" style={{ color: "var(--ink-60)" }}>We'll confirm your appointment via WhatsApp within a few hours.</p>
                                    </div>
                                    <form className="grid sm:grid-cols-2 gap-x-6 gap-y-5" onSubmit={onSubmit} data-testid="booking-form">
                                        <div className="field sm:col-span-1">
                                            <label className="field-label" htmlFor="name">Full Name</label>
                                            <input required id="name" name="name" value={form.name} onChange={onChange} placeholder="Your full name" className="field-input" data-testid="field-name" />
                                        </div>
                                        <div className="field sm:col-span-1">
                                            <label className="field-label" htmlFor="phone">Mobile Number</label>
                                            <input required id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 …" className="field-input" data-testid="field-phone" />
                                        </div>
                                        <div className="field sm:col-span-2">
                                            <label className="field-label" htmlFor="concern">Treatment Concern</label>
                                            <select required id="concern" name="concern" value={form.concern} onChange={onChange} className="field-select" data-testid="field-concern">
                                                <option value="">Select your concern</option>
                                                {concerns.map((c) => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="field">
                                            <label className="field-label" htmlFor="date">Preferred Date</label>
                                            <input id="date" name="date" type="date" value={form.date} onChange={onChange} className="field-input" data-testid="field-date" />
                                        </div>
                                        <div className="field">
                                            <label className="field-label" htmlFor="time">Preferred Time</label>
                                            <select id="time" name="time" value={form.time} onChange={onChange} className="field-select" data-testid="field-time">
                                                {times.map((t) => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="field sm:col-span-2">
                                            <label className="field-label" htmlFor="notes">Additional Notes (optional)</label>
                                            <textarea id="notes" name="notes" value={form.notes} onChange={onChange} placeholder="Any details about your concern, previous treatments, allergies…" className="field-textarea" data-testid="field-notes" />
                                        </div>
                                        <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-4">
                                            <p className="text-xs flex items-center gap-2" style={{ color: "var(--ink-40)" }}>
                                                🔒 Your details are private and only used to confirm your booking.
                                            </p>
                                            <button type="submit" disabled={submitting} className="btn-lux btn-ink disabled:opacity-60 disabled:cursor-not-allowed" data-magnetic data-testid="booking-submit-btn">
                                                {submitting ? "Sending…" : "Submit Request"} <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8" data-testid="booking-success">
                                    <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: "var(--ivory-2)", color: "var(--champagne-2)" }}>
                                        <Check size={22} />
                                    </div>
                                    <h3 className="serif" style={{ fontSize: "28px", color: "var(--ink)", fontWeight: 400 }}>Request Received!</h3>
                                    <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "var(--ink-60)" }}>
                                        Thank you! We've opened WhatsApp so you can send us a quick confirmation message — we'll respond within a few hours.
                                    </p>
                                    <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="btn-lux btn-gold mt-6 inline-flex" data-testid="booking-wa-continue">
                                        Continue on WhatsApp
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ContactRow = ({ Icon, label, val, sub, cta, href, testid }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="lux-card flex items-start gap-4 no-underline" data-testid={testid}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--ivory-2)", color: "var(--champagne-2)" }}>
            <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="eyebrow" style={{ fontSize: "10px" }}>{label}</div>
            <div className="serif truncate" style={{ fontSize: "18px", color: "var(--ink)", fontWeight: 400 }}>{val}</div>
            {sub && <div className="text-xs mt-1" style={{ color: "var(--ink-40)" }}>{sub}</div>}
        </div>
        <div className="text-xs uppercase tracking-widest self-center whitespace-nowrap" style={{ color: "var(--champagne-2)" }}>{cta}</div>
    </a>
);

const Row = ({ a, b }) => (
    <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--line)" }}>
        <span>{a}</span>
        <span style={{ color: "var(--ink)" }}>{b}</span>
    </div>
);
