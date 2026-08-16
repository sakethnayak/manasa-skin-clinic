import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LuxCursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import About from "./components/About";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Results from "./components/Results";
import Testimonials from "./components/Testimonials";
import Why from "./components/Why";
import InstagramSection from "./components/InstagramSection";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

const Home = () => {
    // reveal on scroll (for .reveal utility)
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 },
        );
        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

        // magnetic buttons
        const magnets = document.querySelectorAll("[data-magnetic]");
        const handlers = [];
        magnets.forEach((m) => {
            const move = (e) => {
                const r = m.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                m.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
            };
            const leave = () => {
                m.style.transform = "";
            };
            m.addEventListener("mousemove", move);
            m.addEventListener("mouseleave", leave);
            handlers.push([m, move, leave]);
        });
        return () => {
            io.disconnect();
            handlers.forEach(([m, move, leave]) => {
                m.removeEventListener("mousemove", move);
                m.removeEventListener("mouseleave", leave);
            });
        };
    }, []);

    return (
        <div className="App" data-testid="home-page">
            <SmoothScroll />
            <LuxCursor />
            <Nav />
            <Hero />
            <TrustStrip />
            <About />
            <Manifesto />
            <Services />
            <Results />
            <Testimonials />
            <Why />
            <InstagramSection />
            <FAQ />
            <Contact />
            <Footer />
            <Toaster />
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
