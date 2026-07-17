import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const cards = [
    {
        title: "Acne Treatment",
        duration: "8 weeks",
        note: "Acne + Scar Reduction",
        before: "/before-after/acne_before.png",
        after: "/before-after/acne_after.png",
    },
    {
        title: "Pigmentation / Melasma",
        duration: "12 weeks",
        note: "Melasma Management",
        before: "/before-after/pigmentation_before.png",
        after: "/before-after/pigmentation_after.png",
    },
    {
        title: "Hair Fall / PRP",
        duration: "3 sessions",
        note: "Hair Density Improvement",
        before: "/before-after/hair_before.png",
        after: "/before-after/hair_after.png",
    },
];

/** Interactive before-after slider — drag/hover to reveal 'after'. */
function BeforeAfter({ before, after, alt }) {
    const [pos, setPos] = useState(50);
    const wrapRef = useRef(null);
    const dragging = useRef(false);

    const setFromClient = (clientX) => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = ((clientX - r.left) / r.width) * 100;
        setPos(Math.max(0, Math.min(100, p)));
    };

    const onMove = (e) => {
        if (!dragging.current) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        setFromClient(x);
    };
    const start = (e) => {
        dragging.current = true;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        setFromClient(x);
    };
    const end = () => (dragging.current = false);

    return (
        <div
            ref={wrapRef}
            className="relative w-full h-64 overflow-hidden select-none cursor-ew-resize"
            style={{ background: "var(--ivory-2)" }}
            onMouseDown={start}
            onMouseMove={onMove}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={onMove}
            onTouchEnd={end}
            data-magnetic
        >
            {/* AFTER (base, full) */}
            <img src={after} alt={`${alt} — after`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            {/* BEFORE (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
                <img
                    src={before}
                    alt={`${alt} — before`}
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: wrapRef.current ? `${wrapRef.current.clientWidth}px` : "100%", maxWidth: "none" }}
                    loading="lazy"
                />
            </div>
            {/* labels */}
            <span
                className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] tracking-widest uppercase pointer-events-none"
                style={{ background: "rgba(20,17,15,0.55)", color: "var(--ivory)", letterSpacing: "0.24em" }}
            >
                Before
            </span>
            <span
                className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] tracking-widest uppercase pointer-events-none"
                style={{ background: "rgba(200,169,126,0.9)", color: "var(--ivory)", letterSpacing: "0.24em" }}
            >
                After
            </span>
            {/* handle */}
            <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: `${pos}%`, background: "rgba(255,255,255,0.85)", boxShadow: "0 0 0 1px rgba(200,169,126,0.55)" }} />
            <div
                className="absolute pointer-events-none flex items-center justify-center rounded-full"
                style={{
                    left: `calc(${pos}% - 18px)`,
                    top: "calc(50% - 18px)",
                    width: 36,
                    height: 36,
                    background: "rgba(255,253,249,0.95)",
                    border: "1px solid rgba(200,169,126,0.8)",
                    boxShadow: "0 8px 20px -6px rgba(20,17,15,0.35)",
                    color: "var(--champagne-2)",
                    fontSize: 12,
                    letterSpacing: 2,
                }}
            >
                ‹ ›
            </div>
        </div>
    );
}

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
                        Documented outcomes from real patients at Manasa Skin Clinic — achieved under Dr. Manasa's personalised care. Drag the slider to reveal the change.
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
                            <BeforeAfter before={c.before} after={c.after} alt={c.title} />
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
                    * Individual results may vary. Reference imagery for illustration.
                </p>
            </div>
        </section>
    );
}
