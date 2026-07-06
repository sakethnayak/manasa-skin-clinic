import React from "react";

const items = [
    ["1000+", "Happy Patients"],
    ["MBBS", "Medical Degree"],
    ["DDVL", "Dermatology Certified"],
    ["100%", "Evidence-Based Care"],
    ["Laser", "Procedures"],
    ["Dermato-", "surgery"],
    ["Aesthetic", "Dermatology"],
    ["Skin · Hair", "Nail Specialist"],
];

export default function TrustStrip() {
    const full = [...items, ...items];
    return (
        <section className="marquee" aria-label="Trust markers" data-testid="trust-strip">
            <div className="marquee-track">
                {full.map((it, i) => (
                    <div key={i} className="marquee-item">
                        <strong>{it[0]}</strong>
                        <span>{it[1]}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
