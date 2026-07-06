import React from "react";
import { motion } from "framer-motion";

const timeline = [
    { year: "Foundation", title: "MBBS — Medical Education", body: "A rigorous grounding in medical science, patient care, and clinical decision-making." },
    { year: "Specialisation", title: "DDVL — Dermatology, Venereology & Leprology", body: "Advanced specialist training focused on skin, hair, and nail disorders." },
    { year: "Aesthetic Craft", title: "Advanced Aesthetic Training", body: "Hands-on training in medical-grade facials, chemical peels, PRP and anti-aging protocols." },
    { year: "Laser Expertise", title: "Laser Dermatology", body: "Precision laser modalities for hair reduction, pigmentation, and skin resurfacing." },
    { year: "Practice", title: "Thousands of Patients Served", body: "A quiet, patient-first practice built on trust, evidence, and honest counsel." },
];

export default function Timeline() {
    return (
        <div className="tl" data-testid="doctor-timeline">
            <div className="tl-line" />
            {timeline.map((n, i) => (
                <motion.div
                    key={i}
                    className="tl-node"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    data-testid={`tl-node-${i}`}
                >
                    <div className="tl-dot" />
                    <div className="tl-year">{n.year}</div>
                    <div className="tl-title">{n.title}</div>
                    <div className="tl-body">{n.body}</div>
                </motion.div>
            ))}
        </div>
    );
}
