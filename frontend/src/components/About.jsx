import React from "react";
import { motion } from "framer-motion";
import Timeline from "./Timeline";
import { IconClinic, IconAesthetic, IconLaser, IconPatient } from "./ServiceIcons";

const DOCTOR_IMG = "https://customer-assets.emergentagent.com/job_derma-elegance-4/artifacts/8rjdgzbq_WhatsApp%20Image%202026-06-29%20at%2017.40.19.jpeg";

const values = [
    { Icon: IconClinic, title: "Clinical Excellence", body: "Evidence-based protocols for all conditions." },
    { Icon: IconAesthetic, title: "Aesthetic Medicine", body: "Advanced, non-surgical treatments refined over years." },
    { Icon: IconLaser, title: "Advanced Equipment", body: "Modern dermatology & laser technology, calibrated." },
    { Icon: IconPatient, title: "Patient-First", body: "Personalised care plans, always — never templated." },
];

export default function About() {
    return (
        <section id="about" className="section" data-testid="about-section" style={{ background: "var(--warm)" }}>
            <div className="container-lux">
                <div className="grid lg:grid-cols-12 gap-14 items-start">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4", background: "var(--ivory-2)", boxShadow: "0 40px 80px -30px rgba(20,17,15,0.28)" }}>
                                <img src={DOCTOR_IMG} alt="Dr. Manasa" className="w-full h-full object-cover" style={{ objectPosition: "center 15%", filter: "contrast(1.02)" }} />
                            </div>
                            <div className="absolute -bottom-6 -right-4 p-5 rounded-xl" style={{ background: "var(--ink)", color: "var(--ivory)", maxWidth: 260 }}>
                                <div className="eyebrow" style={{ color: "rgba(250,247,242,0.5)" }}>Signature</div>
                                <div className="serif-cor italic text-xl mt-1" style={{ fontStyle: "italic" }}>Dr. Manasa</div>
                                <div className="text-xs mt-1" style={{ color: "rgba(250,247,242,0.6)" }}>MBBS · DDVL · Dermatosurgeon</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-px" style={{ background: "var(--champagne)" }} />
                            <span className="eyebrow" data-testid="about-eyebrow">Meet the Doctor</span>
                        </div>
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            data-testid="about-title"
                        >
                            Dr. <em>Manasa</em>
                        </motion.h2>

                        <blockquote
                            className="serif-cor italic mt-8"
                            style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", lineHeight: 1.4, color: "var(--ink-80)", borderLeft: "1px solid var(--champagne)", paddingLeft: "20px" }}
                        >
                            "Great skin is not about perfection — it's about health, confidence, and feeling like yourself again."
                            <div className="mt-3 text-sm not-italic sans" style={{ color: "var(--ink-40)", letterSpacing: "0.08em" }}>
                                — Dr. Manasa, Dermatologist & Dermatosurgeon
                            </div>
                        </blockquote>

                        <p className="mt-8 text-[15px] leading-relaxed" style={{ color: "var(--ink-60)" }}>
                            A comprehensive <b style={{ color: "var(--ink)" }}>Dermatologist, Aesthetic Physician, Laser Specialist & Dermatosurgeon</b> with a patient-first
                            philosophy. Combining clinical expertise with advanced aesthetic and laser treatments to help patients in Nizamabad achieve healthy, confident skin.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mt-8" data-testid="about-creds">
                            {[
                                ["MBBS", "Medical Degree"],
                                ["DDVL", "Dermatology"],
                                ["Nizamabad", "Practice"],
                            ].map((c, i) => (
                                <div key={i} className="p-4 rounded-xl border" style={{ borderColor: "var(--line)", background: "var(--ivory)" }}>
                                    <div className="serif text-xl" style={{ color: "var(--ink)", fontWeight: 300 }}>{c[0]}</div>
                                    <div className="text-xs mt-1" style={{ color: "var(--ink-60)", letterSpacing: "0.08em" }}>{c[1]}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mt-8">
                            {values.map((v, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--line)", background: "var(--ivory)" }}>
                                    <v.Icon />
                                    <div>
                                        <div className="serif text-lg" style={{ fontWeight: 400, color: "var(--ink)" }}>{v.title}</div>
                                        <div className="text-sm mt-1" style={{ color: "var(--ink-60)" }}>{v.body}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-10">
                            <a href="#contact" className="btn-lux btn-ink" data-magnetic data-testid="about-book-btn">Book Consultation</a>
                            <a href="https://wa.me/916305544765" target="_blank" rel="noreferrer" className="btn-lux btn-outline" data-testid="about-wa-btn">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Doctor Journey timeline */}
                <div className="mt-28">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="eyebrow mb-4">The Journey</div>
                        <h3 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
                            A path of <em>quiet</em> mastery.
                        </h3>
                    </div>
                    <Timeline />
                </div>
            </div>
        </section>
    );
}
