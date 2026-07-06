import React from "react";

/**
 * Manasa Skin Clinic — custom monogram mark.
 * Concept: interlocking "M" letters formed from three organic petal-arcs
 * (echoing dermal skin layers + botanical lotus geometry) crowned by a
 * fine hairline. Designed to work at 16px favicon and 300px hero mark.
 *
 * Variants:
 *   variant="icon"  – mark only (square-ish)
 *   variant="full"  – mark + wordmark
 *   variant="mono"  – forced single-color (for dark/light versions)
 *   tone="gold" | "ink" | "ivory"
 */
export const LogoMark = ({ size = 44, tone = "gold", className = "" }) => {
    const stroke = tone === "ivory" ? "#FAF7F2" : tone === "ink" ? "#14110F" : "#C8A97E";
    const strokeSoft = tone === "ivory" ? "rgba(250,247,242,0.55)" : tone === "ink" ? "rgba(20,17,15,0.5)" : "rgba(180,143,92,0.55)";

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Manasa Skin Clinic monogram"
            role="img"
        >
            {/* outer skin-layer ring – reduced arc */}
            <path d="M 8 42 Q 8 12 32 12 Q 56 12 56 42" stroke={strokeSoft} strokeWidth="1" fill="none" />
            {/* inner arc */}
            <path d="M 14 44 Q 14 18 32 18 Q 50 18 50 44" stroke={strokeSoft} strokeWidth="0.8" fill="none" />

            {/* M monogram – geometric petal strokes */}
            {/* left descender */}
            <path
                d="M 20 46 L 20 22 Q 20 20 22 20 Q 24 20 25 22 L 31 34"
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {/* center V (petal) */}
            <path d="M 31 34 Q 32 36 33 34" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            {/* right descender */}
            <path
                d="M 33 34 L 39 22 Q 40 20 42 20 Q 44 20 44 22 L 44 46"
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* tiny gold seed dot centered */}
            <circle cx="32" cy="41" r="1.3" fill={stroke} />

            {/* baseline hairline */}
            <path d="M 14 52 L 50 52" stroke={strokeSoft} strokeWidth="0.6" strokeLinecap="round" />
        </svg>
    );
};

export const Logo = ({ tone = "ink", size = 40, showWord = true, className = "" }) => {
    const wordColor = tone === "ivory" ? "#FAF7F2" : "#14110F";
    const subColor = tone === "ivory" ? "rgba(250,247,242,0.55)" : "#8B857D";
    return (
        <div className={`inline-flex items-center gap-3 ${className}`} data-testid="brand-logo">
            <LogoMark size={size} tone="gold" />
            {showWord && (
                <div className="leading-none">
                    <div
                        style={{
                            fontFamily: "Fraunces, serif",
                            fontWeight: 300,
                            fontSize: "22px",
                            letterSpacing: "-0.01em",
                            color: wordColor,
                        }}
                    >
                        Manasa
                    </div>
                    <div
                        style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "9px",
                            letterSpacing: "0.34em",
                            textTransform: "uppercase",
                            color: subColor,
                            marginTop: "3px",
                            fontWeight: 500,
                        }}
                    >
                        Skin Clinic
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logo;
