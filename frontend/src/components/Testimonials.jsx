import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Priya R.",
        source: "Google Review · Verified",
        text: "I struggled with acne for years. Dr. Manasa's personalised treatment made a visible difference in just 6 weeks. She listens patiently and explains everything so clearly. Highly recommend!",
        concern: "Acne & Scar Treatment",
    },
    {
        name: "Anil K.",
        source: "Google Review · Verified",
        text: "The PRP therapy for my hair fall was explained step by step. I felt completely comfortable. Seeing real improvement in density after just 3 sessions — genuinely impressed.",
        concern: "PRP Hair Therapy",
    },
    {
        name: "Sneha S.",
        source: "Google Review · Verified",
        text: "Came for bridal skin prep and the HydraFacial results were stunning. The clinic is immaculate and professional. Dr. Manasa is so knowledgeable — worth every rupee!",
        concern: "Bridal HydraFacial",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="section" data-testid="testimonials-section">
            <div className="container-lux">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="eyebrow mb-4">Patient Stories</div>
                    <h2 className="section-title">
                        What Our <em>Patients</em> Say
                    </h2>
                    <p className="section-sub mt-6 mx-auto">
                        Real experiences from real patients who visited Manasa Skin Clinic in Nizamabad.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6" data-testid="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={i}
                            className="lux-card flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.08 }}
                            data-testid={`testimonial-${i}`}
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={13} fill="#C8A97E" stroke="#C8A97E" />
                                ))}
                            </div>
                            <div style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "22px", lineHeight: 1.5, color: "var(--ink-80)" }}>
                                "{t.text}"
                            </div>
                            <figcaption className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                                <div>
                                    <div className="serif" style={{ fontSize: "17px", color: "var(--ink)", fontWeight: 400 }}>{t.name}</div>
                                    <div className="text-xs mt-1" style={{ color: "var(--ink-40)" }}>{t.source}</div>
                                </div>
                                <div className="text-right text-xs uppercase tracking-widest" style={{ color: "var(--champagne-2)" }}>{t.concern}</div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
