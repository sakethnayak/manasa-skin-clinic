import React from "react";
import Logo from "./Logo";
import { Instagram, Youtube, MessageCircle } from "lucide-react";

const treatments = [
    "Acne Treatment",
    "Pigmentation / Melasma",
    "Hair Fall & PRP",
    "HydraFacial",
    "Chemical Peels",
    "Anti-Aging",
    "Laser Hair Reduction",
    "Mole / Skin Tag Removal",
];
const clinic = ["About Dr. Manasa", "Before & After", "Patient Reviews", "FAQ", "Book Appointment"];
const clinicHrefs = ["#about", "#results", "#testimonials", "#faq", "#contact"];

export default function Footer() {
    return (
        <footer className="pt-20 pb-10" style={{ background: "var(--ink)", color: "var(--ivory)" }} data-testid="site-footer">
            <div className="container-lux">
                <div className="grid md:grid-cols-12 gap-10 pb-14">
                    <div className="md:col-span-4">
                        <Logo tone="ivory" size={42} />
                        <p className="text-sm mt-6 max-w-xs" style={{ color: "rgba(250,247,242,0.55)", lineHeight: 1.7 }}>
                            Premium dermatology & aesthetic care in Nizamabad, Telangana — combining clinical expertise with a personalised, patient-first approach.
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <SocialBtn href="https://www.instagram.com/dr.manasa_skinexpert" label="Instagram" Icon={Instagram} />
                            <SocialBtn href="https://youtube.com" label="YouTube" Icon={Youtube} />
                            <SocialBtn href="https://wa.me/916305544765" label="WhatsApp" Icon={MessageCircle} />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="eyebrow mb-5" style={{ color: "rgba(250,247,242,0.4)" }}>Treatments</div>
                        <ul className="space-y-3 text-sm">
                            {treatments.map((t) => (
                                <li key={t}>
                                    <a href="#services" style={{ color: "rgba(250,247,242,0.7)" }} className="hover:text-white transition-colors">{t}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <div className="eyebrow mb-5" style={{ color: "rgba(250,247,242,0.4)" }}>Clinic</div>
                        <ul className="space-y-3 text-sm">
                            {clinic.map((c, i) => (
                                <li key={c}>
                                    <a href={clinicHrefs[i]} style={{ color: "rgba(250,247,242,0.7)" }} className="hover:text-white transition-colors">{c}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <div className="eyebrow mb-5" style={{ color: "rgba(250,247,242,0.4)" }}>Find Us</div>
                        <div className="text-sm space-y-2" style={{ color: "rgba(250,247,242,0.7)", lineHeight: 1.7 }}>
                            <div>Manasa Skin Clinic</div>
                            <div>Nizamabad, Telangana</div>
                            <div>India – 503001</div>
                            <div className="pt-3">
                                <a href="tel:+916305544765" className="hover:text-white">📞 +91 63055 44765</a>
                            </div>
                            <div>
                                <a href="mailto:manasa.skinclinic19@gmail.com" className="hover:text-white">✉ Email Us</a>
                            </div>
                            <div>
                                <a href="https://wa.me/916305544765" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Chat</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "rgba(250,247,242,0.1)", color: "rgba(250,247,242,0.45)" }}>
                    <div>© 2024 Manasa Skin Clinic, Nizamabad. All rights reserved.</div>
                    <div className="text-center md:text-right" style={{ maxWidth: 640 }}>
                        Best Dermatologist in Nizamabad · Laser Treatment · Skin Surgery · Mole & Wart Removal · Dermatosurgery
                    </div>
                </div>
            </div>
        </footer>
    );
}

const SocialBtn = ({ href, Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
        style={{ borderColor: "rgba(250,247,242,0.2)", color: "rgba(250,247,242,0.75)" }}
        data-testid={`social-${label.toLowerCase()}`}
    >
        <Icon size={16} />
    </a>
);
