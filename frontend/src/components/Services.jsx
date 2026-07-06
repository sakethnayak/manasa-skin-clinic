import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, serviceTabs } from "../data/services";
import { iconMap } from "./ServiceIcons";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
    const [active, setActive] = useState("Skin");
    const Icon = iconMap[active] || iconMap.Skin;

    return (
        <section id="services" className="section" data-testid="services-section">
            <div className="container-lux">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-px" style={{ background: "var(--champagne)" }} />
                            <span className="eyebrow">What We Treat</span>
                        </div>
                        <h2 className="section-title">
                            Treatments & <em>Services</em>
                        </h2>
                        <p className="section-sub mt-6">
                            Comprehensive dermatology, aesthetic medicine, laser treatments & dermatologic surgeries — under one roof in Nizamabad.
                        </p>
                    </div>
                    <a href="#contact" className="btn-lux btn-ink self-start" data-magnetic data-testid="services-book-btn">
                        Book a Consultation <ArrowUpRight size={16} />
                    </a>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-10 border-b" style={{ borderColor: "var(--line)" }} data-testid="services-tabs">
                    {serviceTabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setActive(t)}
                            data-testid={`svc-tab-${t.toLowerCase().replace(/\s|&/g, "-")}`}
                            className="relative pb-4 px-2 text-sm transition-colors"
                            style={{
                                fontFamily: "DM Sans",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: active === t ? "var(--ink)" : "var(--ink-40)",
                                fontWeight: 500,
                            }}
                        >
                            {t}
                            {active === t && <motion.span layoutId="svc-underline" className="absolute left-0 right-0 -bottom-px h-px" style={{ background: "var(--champagne)" }} />}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
                        data-testid="services-grid"
                    >
                        {servicesData[active].map((s, i) => (
                            <div key={i} className="lux-card group" data-testid={`svc-card-${i}`}>
                                <div className="flex items-start justify-between mb-6">
                                    <Icon />
                                    {s.tag && (
                                        <span
                                            className="text-[10px] px-3 py-1 rounded-full uppercase tracking-widest"
                                            style={{ background: "var(--ivory-2)", color: "var(--champagne-2)", letterSpacing: "0.16em" }}
                                        >
                                            {s.tag}
                                        </span>
                                    )}
                                </div>
                                <h3 className="serif" style={{ fontSize: "22px", color: "var(--ink)", fontWeight: 400, letterSpacing: "-0.01em" }}>{s.title}</h3>
                                <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--ink-60)" }}>{s.desc}</p>
                                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: "var(--ink)" }}>
                                    Enquire <ArrowUpRight size={12} />
                                </a>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
