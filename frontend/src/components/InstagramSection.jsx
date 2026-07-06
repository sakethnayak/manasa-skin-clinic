import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";

const posts = [
    { title: "The Truth About Salon Creams & Home Remedies for Acne", href: "https://www.instagram.com/reel/DaUngjGSm7J/?igsh=MTY1cTB6YmxpbmZiNQ==" },
    { title: "Your Lover May Leave — Your Tattoo Stays. Laser Tattoo Removal Explained", href: "https://www.instagram.com/reel/DZclzLdpC40/?igsh=MWJqYTU2NnEwaHlvZg==" },
    { title: "It Started Like a Pimple... Then It Became a Keloid", href: "https://www.instagram.com/reel/DYPPMzTAl3G/?igsh=MWF5Z3N0ZWgyY3V1Nw==" },
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
                        <a key={i} href={p.href} target="_blank" rel="noreferrer" className="ig-card" data-testid={`ig-post-${i}`}>
                            <div>
                                <div className="eyebrow mb-3" style={{ color: "rgba(250,247,242,0.65)" }}>Reel</div>
                                <div className="serif" style={{ fontSize: "22px", lineHeight: 1.2, color: "var(--ivory)", fontWeight: 400 }}>{p.title}</div>
                                <div className="mt-4 inline-flex items-center gap-2 text-xs" style={{ color: "var(--champagne-light)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                                    Watch <ArrowUpRight size={12} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
