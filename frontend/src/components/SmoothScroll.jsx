import { useEffect } from "react";
import Lenis from "lenis";

/** Global smooth momentum scrolling — Awwwards-grade feel.
 *  Auto-disabled on touch devices to preserve native inertia. */
export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        // Skip Lenis on coarse pointers (mobile) — native scroll is smoother there
        const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
        if (isTouch) return;

        const lenis = new Lenis({
            lerp: 0.09,
            wheelMultiplier: 1.05,
            smoothWheel: true,
            syncTouch: false,
            gestureOrientation: "vertical",
        });

        // Delegate anchor smooth-scrolls to lenis so hashes align with momentum
        const handleAnchor = (e) => {
            const a = e.target.closest("a[href^='#']");
            if (!a) return;
            const id = a.getAttribute("href");
            if (!id || id === "#" || id.length < 2) return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el, { offset: -60, duration: 1.35 });
        };
        document.addEventListener("click", handleAnchor);

        let rafId;
        const raf = (t) => {
            lenis.raf(t);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", handleAnchor);
            lenis.destroy();
        };
    }, []);
    return null;
}
