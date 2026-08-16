import React, { useEffect, useRef, useState } from "react";

/** Luxury cursor: soft gold dot + trailing ring; magnetic hover on [data-magnetic] */
export default function LuxCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    const state = useRef({
        x: 0,
        y: 0,
        rx: 0,
        ry: 0,
        raf: 0,
        hover: false,
        hidden: true,
    });

    useEffect(() => {
        // desktop / fine pointer only
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const cursorState = state.current;

        if (!mq.matches) return;

        setEnabled(true);

        const onMove = (e) => {
            state.current.x = e.clientX;
            state.current.y = e.clientY;
            state.current.hidden = false;

            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + "px";
                dotRef.current.style.top = e.clientY + "px";
            }
        };

        const onLeave = () => {
            state.current.hidden = true;
        };

        const onEnter = () => {
            state.current.hidden = false;
        };

        const onOver = (e) => {
            const t = e.target.closest(
                "a, button, [role='button'], [data-magnetic], input, textarea, select, summary, details"
            );
            state.current.hover = !!t;
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);

        const tick = () => {
            const s = state.current;

            s.rx += (s.x - s.rx) * 0.16;
            s.ry += (s.y - s.ry) * 0.16;

            if (ringRef.current) {
                ringRef.current.style.left = s.rx + "px";
                ringRef.current.style.top = s.ry + "px";
            }

            const wrap = dotRef.current?.parentElement;

            if (wrap) {
                wrap.classList.toggle("is-hover", s.hover);
                wrap.classList.toggle("is-hidden", s.hidden);
            }

            state.current.raf = requestAnimationFrame(tick);
        };

        state.current.raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);

            cancelAnimationFrame(cursorState.raf);
        };
    }, []);

    if (!enabled) return null;

    return (
        <div className="lux-cursor" aria-hidden="true">
            <div ref={ringRef} className="lux-cursor__ring" />
            <div ref={dotRef} className="lux-cursor__dot" />
        </div>
    );
}
