import React from "react";
import { Instagram, ArrowUpRight, Play } from "lucide-react";

const posts = [
    {
        title: "The Truth About Salon Creams & Home Remedies for Acne",
        href: "https://www.instagram.com/reel/DaUngjGSm7J/?igsh=MTY1cTB6YmxpbmZiNQ==",
        thumb: "/reels/salon-creams.png",
    },
    {
        title: "Your Lover May Leave — Your Tattoo Stays. Laser Tattoo Removal Explained",
        href: "https://www.instagram.com/reel/DZclzLdpC40/?igsh=MWJqYTU2NnEwaHlvZg==",
        thumb: "/reels/tattoo-removal.png",
    },
    {
        title: "It Started Like a Pimple... Then It Became a Keloid",
        href: "https://www.instagram.com/reel/DYPPMzTAl3G/?igsh=MWF5Z3N0ZWgyY3V1Nw==",
        thumb: "/reels/pimple-keloid.png",
    },
];

export default function InstagramSection() {
    return (
        <section id="instagram" className="section" data-testid="instagram-section">
            <div className="container-lux">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="eyebrow mb-4">Follow Our Journey</div>
                        <h2 className="section-title">
                            <em>@dr.manasa</em>_skinexpert
                        </h2>
                    </div>
                    <a
                        href="https://www.instagram.com/dr.manasa_skinexpert"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-lux btn-outline self-start"
                        data-magnetic
                        data-testid="instagram-follow-btn"
                    >
                        <Instagram size={16} /> Follow on Instagram
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-5" data-testid="instagram-grid">
                    {posts.map((p, i) => (
                        <a key={i} href={p.href} target="_blank" rel="noreferrer" className="group block" data-testid={`ig-post-${i}`}>
                            <div className="relative rounded-2xl overflow-hidden border" style={{ aspectRatio: "4 / 5", background: "var(--ivory-2)", borderColor: "var(--line)" }}>
                                {/* thumbnail */}
                                <img
                                    src={p.thumb}
                                    alt={p.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* soft bottom vignette for the pill */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                                    style={{ background: "linear-gradient(180deg, rgba(20,17,15,0) 0%, rgba(20,17,15,0.55) 100%)" }}
                                />
                                {/* REEL badge (top-left, Instagram-style) */}
                                <span
                                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase backdrop-blur-md"
                                    style={{ background: "rgba(20,17,15,0.55)", color: "var(--ivory)", letterSpacing: "0.24em" }}
                                >
                                    Reel
                                </span>
                                {/* center play badge — appears on hover */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ zIndex: 2 }}
                                >
                                    <span
                                        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md"
                                        style={{
                                            background: "rgba(255,253,249,0.9)",
                                            color: "var(--champagne-2)",
                                            boxShadow: "0 12px 30px -8px rgba(20,17,15,0.5)",
                                        }}
                                    >
                                        <Play size={18} fill="currentColor" />
                                    </span>
                                </div>
                                {/* bottom pill */}
                                <div
                                    className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] uppercase"
                                    style={{ background: "rgba(255,253,249,0.85)", color: "var(--ink)", letterSpacing: "0.2em", fontWeight: 500 }}
                                >
                                    Watch <ArrowUpRight size={11} />
                                </div>
                            </div>
                            {/* caption below the thumbnail */}
                            <div className="mt-4 pr-2">
                                <div
                                    className="serif"
                                    style={{
                                        fontSize: "18px",
                                        lineHeight: 1.35,
                                        color: "var(--ink)",
                                        fontWeight: 400,
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {p.title}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
