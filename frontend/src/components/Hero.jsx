import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const DOCTOR_IMG = "https://customer-assets.emergentagent.com/job_derma-elegance-4/artifacts/8rjdgzbq_WhatsApp%20Image%202026-06-29%20at%2017.40.19.jpeg";

/** Masked line-by-line reveal — the signature on-load moment. */
const RevealWord = ({ children, delay = 0 }) => (
    <span className="inline-block overflow-hidden align-baseline" style={{ paddingBottom: "0.08em", lineHeight: 1 }}>
        <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.span>
    </span>
);

/**
 * Cinematic hero — Awwwards-level:
 *   - Signature masked line-by-line word reveal on load
 *   - Portrait clipped from bottom → revealed with cinematic curtain
 *   - Slow ambient light sweep across portrait
 *   - Mouse-driven parallax on cards & portrait
 *   - Scroll-linked subtle 3D tilt on the doctor + drift on ornaments
 */
export default function Hero() {
    const wrap = useRef(null);
    const [ready, setReady] = useState(false);

    // scroll-linked micro-motion
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 700], [0, -60]);
    const heroYSoft = useTransform(scrollY, [0, 700], [0, -30]);
    const numY = useTransform(scrollY, [0, 700], [0, 90]);
    const portraitScale = useTransform(scrollY, [0, 700], [1, 1.05]);

    // mouse parallax
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
            const tilt = el.querySelector("[data-tilt]");
            if (tilt) {
                tilt.style.transform = `perspective(1200px) rotateY(${cx * -4}deg) rotateX(${cy * 4}deg)`;
            }
        };
        el.addEventListener("mousemove", handle);
        // fire the reveal a tick after mount so fonts are ready
        const t = setTimeout(() => setReady(true), 60);
        return () => {
            el.removeEventListener("mousemove", handle);
            clearTimeout(t);
        };
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
            <motion.div
                className="hero-index"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: ready ? 1 : 0, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                data-testid="hero-index"
            >
                Nº 01 &nbsp;/&nbsp; Dermatology · Aesthetics · Laser · Dermatosurgery
            </motion.div>

            {/* huge decorative numeral */}
            <motion.div className="hero-num serif" aria-hidden="true" style={{ y: numY }}>
                01
            </motion.div>

            <motion.div
                style={{ y: heroYSoft }}
                className="container-lux h-full grid lg:grid-cols-12 gap-8 items-center relative z-10"
                data-hero-inner
            >
                {/* LEFT — editorial copy */}
                <div className="lg:col-span-6 xl:col-span-7 pt-8 lg:pt-0" data-parallax="8">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="flex items-center gap-4 mb-8">
                            <motion.span
                                className="block h-px"
                                style={{ background: "var(--champagne)" }}
                                initial={{ width: 0 }}
                                animate={{ width: 40 }}
                                transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <span className="eyebrow" data-testid="hero-eyebrow">
                                Est. Nizamabad · Telangana
                            </span>
                        </div>
                    </motion.div>

                    {/* Signature line-by-line masked reveal */}
                    <h1 className="hero-h1" data-testid="hero-headline" aria-label="Skin, written as an art form — healed with science.">
                        <span className="block">
                            <RevealWord delay={0.25}>Skin,&nbsp;</RevealWord>
                            <RevealWord delay={0.32}>written</RevealWord>
                        </span>
                        <span className="block">
                            <RevealWord delay={0.42}>as&nbsp;</RevealWord>
                            <RevealWord delay={0.48}>an&nbsp;</RevealWord>
                            <RevealWord delay={0.55}>
                                <em>art&nbsp;form</em>
                            </RevealWord>
                            <RevealWord delay={0.62}>—</RevealWord>
                        </span>
                        <span className="block">
                            <RevealWord delay={0.7}>healed&nbsp;</RevealWord>
                            <RevealWord delay={0.78}>with&nbsp;</RevealWord>
                            <RevealWord delay={0.85}>
                                <em>science.</em>
                            </RevealWord>
                        </span>
                    </h1>

                    <motion.p
                        className="hero-sub mt-10"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.05 }}
                        data-testid="hero-sub"
                    >
                        A private practice for dermatology, aesthetic medicine, laser and dermatologic surgery — led by Dr. Manasa. Considered treatments, quiet
                        confidence, and a plan shaped precisely for your skin.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.2 }}
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
                        className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 mt-16 max-w-2xl"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.35 }}
                        data-testid="hero-micro-badges"
                    >
                        {[
                            { n: "5000+", l: "Happy Patients" },
                            { n: "MBBS", l: "DDVL Certified" },
                            { n: "12+", l: "Treatments" },
                            { n: "4.9★", l: "Google Rated" },
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col gap-1 min-w-0">
                                <span className="serif truncate" style={{ fontSize: "24px", lineHeight: 1, color: "var(--ink)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                                    {b.n}
                                </span>
                                <span className="eyebrow truncate" style={{ fontSize: "10px" }}>
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
                        style={{ y: heroY, scale: portraitScale }}
                        data-parallax="18"
                        data-tilt
                        data-testid="hero-doctor-portrait"
                    >
                        <motion.div
                            className="doctor-arch"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.3, delay: 0.55 }}
                        />
                        {/* portrait frame with curtain reveal + light sweep */}
                        <motion.div
                            className="doctor-frame"
                            initial={{ clipPath: "inset(100% 0 0 0)" }}
                            animate={{ clipPath: "inset(0% 0 0 0)" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.85, 0, 0.15, 1] }}
                        >
                            <motion.img
                                src={DOCTOR_IMG}
                                alt="Dr. Manasa, Dermatologist & Dermatosurgeon"
                                loading="eager"
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                            {/* slow light sweep */}
                            <div className="doctor-sheen" aria-hidden="true" />
                            {/* signature inside portrait */}
                            <motion.div
                                className="absolute left-5 bottom-5 z-10"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.5 }}
                                style={{
                                    fontFamily: "Cormorant Garamond, serif",
                                    fontStyle: "italic",
                                    color: "var(--ivory)",
                                    fontSize: "22px",
                                    textShadow: "0 2px 12px rgba(20,17,15,0.5)",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                — Dr. Manasa
                            </motion.div>
                        </motion.div>

                        {/* floating cards */}
                        <motion.div
                            className="g-card"
                            style={{ top: "8%", left: "-8%" }}
                            initial={{ opacity: 0, x: -30, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1, delay: 1.55 }}
                            data-parallax="30"
                            data-testid="hero-card-patients"
                        >
                            <div className="g-card__label">Happy Patients</div>
                            <div className="g-card__val">5000+</div>
                            <div className="g-card__sub">across skin, hair & aesthetics</div>
                        </motion.div>

                        <motion.div
                            className="g-card g-card--light"
                            style={{ bottom: "18%", right: "-14%", padding: "16px 20px" }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 1.7 }}
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
                            style={{ bottom: "-4%", right: "10%", padding: "14px 18px" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.85 }}
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
            </motion.div>

            {/* scroll cue */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.9, duration: 0.9 }}
                data-testid="hero-scroll-cue"
            >
                <span className="eyebrow" style={{ fontSize: "9px" }}>
                    Scroll
                </span>
                <span className="scroll-line block" />
            </motion.div>
        </section>
    );
}
