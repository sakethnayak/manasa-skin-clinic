import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Menu } from "lucide-react";

const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Results", href: "#results" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`} data-testid="site-header">
            <div className="container-lux flex items-center justify-between">
                <a
                    href="#top"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    data-testid="nav-logo-link"
                >
                    <Logo tone="ink" size={38} />
                </a>

                <nav className="hidden lg:flex items-center gap-9" data-testid="nav-links-desktop">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="nav-link" data-testid={`nav-link-${l.label.toLowerCase()}`}>
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <a href="tel:+916305544765" className="btn-lux btn-ghost" style={{ padding: "12px 20px", fontSize: "11px" }} data-testid="nav-call-btn">
                        Call
                    </a>
                    <a href="#contact" className="btn-lux btn-ink" style={{ padding: "12px 22px", fontSize: "11px" }} data-magnetic data-testid="nav-book-btn">
                        Book
                    </a>
                </div>

                <div className="lg:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button
                                aria-label="Open menu"
                                data-testid="nav-mobile-toggle"
                                className="w-11 h-11 rounded-full border flex items-center justify-center"
                                style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
                            >
                                <Menu size={18} />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[86vw] sm:w-[380px]" style={{ background: "var(--warm)" }} data-testid="nav-mobile-sheet">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <div className="flex flex-col h-full pt-8">
                                <Logo tone="ink" size={36} />
                                <div className="hairline my-8" />
                                <nav className="flex flex-col gap-5" data-testid="nav-links-mobile">
                                    {links.map((l) => (
                                        <a
                                            key={l.href}
                                            href={l.href}
                                            className="serif text-3xl"
                                            style={{ color: "var(--ink)" }}
                                            onClick={() => setOpen(false)}
                                            data-testid={`nav-m-link-${l.label.toLowerCase()}`}
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-auto flex flex-col gap-3 pb-10">
                                    <a href="#contact" className="btn-lux btn-ink" onClick={() => setOpen(false)} data-testid="nav-m-book-btn">
                                        Book Appointment
                                    </a>
                                    <a
                                        href="https://wa.me/916305544765"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-lux btn-outline"
                                        data-testid="nav-m-wa-btn"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
