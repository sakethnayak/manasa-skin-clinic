import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const cards = [
    { title: "Acne Treatment", duration: "8 weeks", note: "Acne + Scar Reduction" },
    { title: "Pigmentation / Melasma", duration: "12 weeks", note: "Melasma Management" },
    { title: "Hair Fall / PRP", duration: "3 sessions", note: "Hair Density Improvement" },
];

export default function Results() {
    return (
        <section id="results" className="section" style={{ background: "var(--ivory-2)" }} data-testid="results-section">
            <div className="container-lux">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="eyebrow mb-4">Real Results</div>
                    <h2 className="section-title">
                        Before & <em>After</em>
                    </h2>
                    <p className="section-sub mt-6 mx-auto">
                        Documented outcomes from real patients at Manasa Skin Clinic — achieved under Dr. Manasa's personalised care.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6" data-testid="results-grid">
                    {cards.map((c, i) => (
                        <motion.div
                            key={i}
                            className="rounded-2xl overflow-hidden border"
                            style={{ background: "var(--warm)", borderColor: "var(--line)" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            data-testid={`res-card-${i}`}
                        >
                            <div className="grid grid-cols-2 h-64">
                                <div
                                    className="relative flex items-end p-4"
                                    style={{
                                        background: `linear-gradient(135deg, ${["#F3ECE1", "#EBE1D1", "#F3ECE1"][i]}, #D9C7A7)`,
                                    }}
                                >
                                    <span className="eyebrow bg-white/60 px-2 py-1 rounded" style={{ fontSize: "9px" }}>Before</span>
                                </div>
                                <div
                                    className="relative flex items-end p-4"
                                    style={{
                                        background: `linear-gradient(135deg, ${["#FDFCFA", "#FDFCFA", "#FDFCFA"][i]}, #E4CFAE)`,
                                    }}
                                >
                                    <span className="eyebrow bg-white/60 px-2 py-1 rounded" style={{ fontSize: "9px" }}>After</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={12} fill="#C8A97E" stroke="#C8A97E" />
                                    ))}
                                </div>
                                <div className="serif text-xl" style={{ fontWeight: 400 }}>{c.title}</div>
                                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-widest" style={{ color: "var(--ink-60)" }}>
                                    <span>{c.duration}</span>
                                    <span>{c.note}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-xs mt-8 italic" style={{ color: "var(--ink-40)" }}>
                    * Individual results may vary. Photographs of actual patients shared with consent.
                </p>
            </div>
        </section>
    );
}
