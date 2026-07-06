import React from "react";
import { motion } from "framer-motion";

const items = [
    { n: "01", t: "Experienced Dermatologist", b: "MBBS & DDVL qualified with specialist training in dermatology and venereology. Evidence-based medicine, always." },
    { n: "02", t: "Personalised Plans", b: "No templates — every plan is built around your specific skin type, concerns, and lifestyle goals." },
    { n: "03", t: "Advanced Equipment", b: "Modern dermatology and aesthetic devices for precise, effective, and consistently safe treatments." },
    { n: "04", t: "Hygienic Environment", b: "Clinic-grade cleanliness with sterilised instruments and strict safety protocols at every visit." },
    { n: "05", t: "Affordable & Transparent", b: "Honest upfront pricing. Full consultation before any procedure is recommended — no pressure, ever." },
    { n: "06", t: "Clear Communication", b: "Plain explanations, realistic expectations, and you'll always know exactly what you're getting and why." },
];

export default function Why() {
    return (
        <section id="why" className="section" style={{ background: "var(--warm)" }} data-testid="why-section">
            <div className="container-lux">
                <div className="grid lg:grid-cols-12 gap-14">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-px" style={{ background: "var(--champagne)" }} />
                            <span className="eyebrow">Why Patients Trust Us</span>
                        </div>
                        <h2 className="section-title">
                            The <em>Manasa</em> Difference
                        </h2>
                        <p className="section-sub mt-6">
                            Six reasons why patients across Nizamabad choose Dr. Manasa for skin and hair concerns.
                        </p>
                    </div>

                    <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-2">
                        {items.map((it, i) => (
                            <motion.div
                                key={i}
                                className="py-8 border-b"
                                style={{ borderColor: "var(--line)" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.04 }}
                                data-testid={`why-item-${i}`}
                            >
                                <div className="serif" style={{ fontSize: "14px", color: "var(--champagne-2)", letterSpacing: "0.2em" }}>{it.n}</div>
                                <div className="serif text-2xl mt-2" style={{ fontWeight: 400, color: "var(--ink)" }}>{it.t}</div>
                                <div className="mt-3 text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.65 }}>{it.b}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
