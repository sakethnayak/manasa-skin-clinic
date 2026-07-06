import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const DOCTOR_IMG = "https://customer-assets.emergentagent.com/job_derma-elegance-4/artifacts/8rjdgzbq_WhatsApp%20Image%202026-06-29%20at%2017.40.19.jpeg";

/**
 * Cinematic hero — asymmetric editorial composition:
 *  - left: editorial index + oversize serif headline breaking baseline
 *  - center/right: doctor portrait framed in arched-rounded window
 *  - floating glassmorphism cards orbit the portrait
 *  - ambient gold orbs + subtle grain create depth
 *  - massive outline "01" numeral anchors the bottom-right
 */
export default function Hero() {
    const wrap = useRef(null);

    // subtle parallax on cards & portrait
    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const handle = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;
            el.querySelectorAll("[data-parallax]").forEach((node) => {
                const depth = parseFloat(node.dataset.parallax);
                node.style.transform = `translate3d(${cx * depth * -1}px, ${cy * depth * -1}px, 0)`;
            });
        };
        el.addEventListener("mousemove", handle);
        return () => el.removeEventListener("mousemove", handle);
    }, []);

    return (
        <section id="top" className="hero-shell" ref={wrap} data-testid="hero-section">
            <div className="hero-bg" />
            <div className="hero-grain" />
            <div className="hero-vignette" />

            {/* ambient orbs */}
            <div className="hero-orb" style={{ width: 520, height: 520, right: "-160px", top: "-120px", background: "radial-gradient(circle, #E4CFAE, transparent 65%)" }} />
            <div
                className="hero-orb"
                style={{ width: 380, height: 380, left: "-140px", bottom: "-80px", background: "radial-gradient(circle, rgba(200,169,126,0.55), transparent 60%)", animationDelay: "-6s" }}
            />

            {/* editorial index */}
            <div className="hero-index" data-testid="hero-index">
                Nº 01 &nbsp;/&nbsp; Dermatology · Aesthetics · Laser · Dermatosurgery
            </div>

            {/* huge decorative numeral */}
            <div className="hero-num serif" aria-hidden="true">
                01
            </div>

            <div className="container-lux h-full grid lg:grid-cols-12 gap-8 items-center relative z-10" style={{ minHeight: "calc(100vh - 90px)" }}>
                {/* LEFT — editorial copy */}
                <div className="lg:col-span-6 xl:col-span-7 pt-8 lg:pt-0" data-parallax="8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-10 h-px" style={{ background: "var(--champagne)" }} />
                            <span className="eyebrow" data-testid="hero-eyebrow">
                                Est. Nizamabad · Telangana
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="hero-h1"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        data-testid="hero-headline"
                    >
                        Skin, written
                        <br />
                        as an <em>art form</em>—
                        <br />
                        healed with <em>science.</em>
                    </motion.h1>

                    <motion.p
                        className="hero-sub mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                        data-testid="hero-sub"
                    >
                        A private practice for dermatology, aesthetic medicine, laser and dermatologic surgery — led by Dr. Manasa. Considered treatments, quiet
                        confidence, and a plan shaped precisely for your skin.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55 }}
                    >
                        <a href="#contact" className="btn-lux btn-ink" data-magnetic data-testid="hero-book-btn">
                            Book a Consultation <ArrowUpRight size={16} />
                        </a>
                        <a href="#services" className="btn-lux btn-outline" data-magnetic data-testid="hero-services-btn">
                            View Treatments
                        </a>
                        <a
                            href="https://wa.me/916305544765"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm"
                            style={{ color: "var(--ink-60)", letterSpacing: "0.02em" }}
                            data-testid="hero-wa-link"
                        >
                            <MessageCircle size={16} style={{ color: "var(--champagne-2)" }} /> or WhatsApp us
                        </a>
                    </motion.div>

                    {/* micro trust badges */}
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.75 }}
                        data-testid="hero-micro-badges"
                    >
                        {[
                            { n: "1000+", l: "Happy Patients" },
                            { n: "MBBS", l: "· DDVL" },
                            { n: "12+", l: "Treatments" },
                            { n: "★ 4.9", l: "Google Rated" },
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="serif" style={{ fontSize: "26px", lineHeight: 1, color: "var(--ink)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                                    {b.n}
                                </span>
                                <span className="eyebrow" style={{ fontSize: "10px" }}>
                                    {b.l}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT — doctor portrait + floating cards */}
                <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center py-16 lg:py-0">
                    <motion.div
                        className="doctor-portrait max-w-[440px] w-full"
                        initial={{ opacity: 0, scale: 0.94, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        data-parallax="18"
                        data-testid="hero-doctor-portrait"
                    >
                        <div className="doctor-arch" />
                        <div className="doctor-frame">
                            <img src={DOCTOR_IMG} alt="Dr. Manasa, Dermatologist & Dermatosurgeon" loading="eager" />
                        </div>

                        {/* signature under portrait */}
                        <div
                            className="absolute left-4 -bottom-4 sm:-bottom-6 z-10 pl-4"
                            style={{
                                fontFamily: "Cormorant Garamond, serif",
                                fontStyle: "italic",
                                color: "var(--ivory)",
                                fontSize: "22px",
                                textShadow: "0 2px 12px rgba(20,17,15,0.4)",
                            }}
                        >
                            — Dr. Manasa
                        </div>

                        {/* floating cards */}
                        <motion.div
                            className="g-card"
                            style={{ top: "8%", left: "-8%" }}
                            initial={{ opacity: 0, x: -30, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.75 }}
                            data-parallax="30"
                            data-testid="hero-card-patients"
                        >
                            <div className="g-card__label">Happy Patients</div>
                            <div className="g-card__val">1000+</div>
                            <div className="g-card__sub">across skin, hair & aesthetics</div>
                        </motion.div>

                        <motion.div
                            className="g-card g-card--light"
                            style={{ bottom: "18%", right: "-14%", padding: "16px 20px" }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.95 }}
                            data-parallax="40"
                            data-testid="hero-card-credentials"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-9 h-9 rounded-full flex items-center justify-center"
                                    style={{ background: "var(--ivory-2)", color: "var(--champagne-2)", fontFamily: "Fraunces, serif", fontSize: "14px" }}
                                >
                                    M
                                </span>
                                <div>
                                    <div className="g-card__label" style={{ marginBottom: 2 }}>
                                        Credentials
                                    </div>
                                    <div style={{ fontFamily: "Fraunces, serif", fontSize: "17px", color: "var(--ink)", letterSpacing: "-0.01em" }}>MBBS · DDVL</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="g-card"
                            style={{ bottom: "-4%", left: "6%", padding: "14px 18px" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 1.15 }}
                            data-parallax="24"
                            data-testid="hero-card-locale"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full" style={{ background: "var(--champagne)" }} />
                                <span style={{ fontSize: "12px", color: "var(--ink-60)", letterSpacing: "0.08em" }}>Now Consulting · Nizamabad</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* scroll cue */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70" data-testid="hero-scroll-cue">
                <span className="eyebrow" style={{ fontSize: "9px" }}>
                    Scroll
                </span>
                <span className="w-px h-8 block" style={{ background: "linear-gradient(180deg, var(--champagne), transparent)" }} />
            </div>
        </section>
    );
}
