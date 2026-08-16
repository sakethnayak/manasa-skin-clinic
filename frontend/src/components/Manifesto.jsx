import React from "react";
import { motion } from "framer-motion";

/** Numbered manifesto chapters — editorial, high whitespace, scroll-revealed. */
const chapters = [
    {
        num: "I.",
        title: "Diagnosis, before decoration.",
        body: "Every consultation begins with a careful look. We map cause before we consider treatment — because skin that heals well begins with a question, not a product.",
    },
    {
        num: "II.",
        title: "Craft, quietly practised.",
        body: "Fine dermatology asks for a steady hand, calibrated devices, and years of considered study. Nothing here is rushed, and nothing is done for show.",
    },
    {
        num: "III.",
        title: "Restraint as a virtue.",
        body: "We recommend only what is needed. Where a gentle protocol will do, we will not offer a stronger one. Your skin deserves patience, not persuasion.",
    },
    {
        num: "IV.",
        title: "Trust, earned in confidence.",
        body: "Photographs are shared only with permission. Notes remain private. Follow-ups are honoured. Care that outlasts the appointment is the standard we hold ourselves to.",
    },
];

export default function Manifesto() {
    return (
        <section id="manifesto" className="section" data-testid="manifesto-section" style={{ background: "var(--ivory)" }}>
            <div className="container-lux">
                <div className="grid lg:grid-cols-12 gap-10 mb-20">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-px" style={{ background: "var(--champagne)" }} />
                            <span className="eyebrow">The Manifesto</span>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}
                            data-testid="manifesto-title"
                        >
                            Four <em>principles</em>, held quietly, for every patient who walks in.
                        </motion.h2>
                    </div>
                </div>

                <div className="space-y-4" data-testid="manifesto-chapters">
                    {chapters.map((c, i) => (
                        <motion.article
                            key={i}
                            className="grid grid-cols-12 gap-6 py-14 border-t"
                            style={{ borderColor: "var(--line)" }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            data-testid={`manifesto-chapter-${i}`}
                        >
                            <div className="col-span-12 md:col-span-2 flex items-start">
                                <span className="mf-num serif-cor">{c.num}</span>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <h3
                                    className="serif"
                                    style={{
                                        fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.02em",
                                        color: "var(--ink)",
                                        fontWeight: 300,
                                    }}
                                >
                                    {c.title}
                                </h3>
                            </div>
                            <div className="col-span-12 md:col-span-4 flex items-start">
                                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--ink-60)", maxWidth: "34ch" }}>{c.body}</p>
                            </div>
                        </motion.article>
                    ))}
                    <div className="border-t" style={{ borderColor: "var(--line)" }} />
                </div>
            </div>
        </section>
    );
}
