import React from "react";
import { Plus } from "lucide-react";

const faqs = [
    {
        q: "How many sessions are needed for acne scar treatment?",
        a: "Most patients see significant improvement within 3–6 sessions spaced 4–6 weeks apart. Dr. Manasa will assess your skin at consultation and provide a personalised estimate based on scar type and severity.",
    },
    {
        q: "Is PRP therapy safe for hair loss?",
        a: "Yes — PRP uses your own blood platelets, making allergic reactions extremely rare. It is a well-established, minimally invasive procedure. Minor tenderness may occur for 1–2 days post-treatment.",
    },
    {
        q: "What causes pigmentation and dark spots?",
        a: "Pigmentation can result from sun damage, hormonal changes, post-acne marks, or genetics. Accurate diagnosis matters because different types require different treatments — Dr. Manasa identifies the root cause first.",
    },
    {
        q: "How long does hair fall treatment take to show results?",
        a: "Most patients notice reduced shedding within 4–8 weeks and visible density improvement by 3–4 months. Consistency with the prescribed plan makes a significant difference.",
    },
    {
        q: "What should I expect during my first consultation?",
        a: "A detailed skin/scalp assessment, full discussion of your concerns and medical history, and a personalised treatment plan. Dr. Manasa explains all options clearly — no pressure to commit immediately.",
    },
    {
        q: "When should I visit a dermatologist?",
        a: "Visit if you have persistent acne, unusual hair shedding, new or changing skin lesions, chronic itching or rashes, or concerns about skin tone or ageing. Early consultation always leads to better outcomes.",
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="section" style={{ background: "var(--ivory-2)" }} data-testid="faq-section">
            <div className="container-lux max-w-4xl">
                <div className="text-center mb-12">
                    <div className="eyebrow mb-4">Common Questions</div>
                    <h2 className="section-title">
                        Frequently <em>Asked</em>
                    </h2>
                    <p className="section-sub mt-6 mx-auto">
                        Answers to the questions patients ask most before visiting Manasa Skin Clinic.
                    </p>
                </div>

                <div data-testid="faq-list">
                    {faqs.map((f, i) => (
                        <details key={i} className="faq-item group" data-testid={`faq-item-${i}`}>
                            <summary className="faq-q">
                                <span>{f.q}</span>
                                <span className="faq-q-mark">
                                    <Plus size={14} />
                                </span>
                            </summary>
                            <div className="faq-a">{f.a}</div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
