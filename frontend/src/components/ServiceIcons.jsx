import React from "react";

/**
 * Custom bespoke SVG icon set — thin gold hairlines forming abstract
 * dermatological glyphs. Consistent 40x40 viewBox, 1.2 stroke, gold accent.
 */
const wrap = (children) => (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" stroke="rgba(200,169,126,0.35)" strokeWidth="0.6" />
        {children}
    </svg>
);

export const IconSkin = () => wrap(
    <>
        <path d="M10 22c2-5 6-8 10-8s8 3 10 8" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 26c2-3 5-5 8-5s6 2 8 5" stroke="#C8A97E" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
        <circle cx="16" cy="18" r="0.8" fill="#C8A97E" />
        <circle cx="24" cy="19" r="0.6" fill="#C8A97E" />
        <circle cx="20" cy="15" r="0.5" fill="#C8A97E" />
    </>
);

export const IconHair = () => wrap(
    <>
        <path d="M12 24c0-6 3-11 8-11s8 5 8 11" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M13 26c1 2 3 3 7 3s6-1 7-3" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 20c1-2 3-3 6-3s5 1 6 3" stroke="#C8A97E" strokeWidth="0.9" opacity="0.7" strokeLinecap="round" />
        <path d="M15 16c1-1 3-2 5-2s4 1 5 2" stroke="#C8A97E" strokeWidth="0.7" opacity="0.5" strokeLinecap="round" />
    </>
);

export const IconLaser = () => wrap(
    <>
        <path d="M8 20h24" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M20 8v24" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" stroke="#C8A97E" strokeWidth="1" />
        <circle cx="20" cy="20" r="1.4" fill="#C8A97E" />
        <path d="M11 11l4 4M29 11l-4 4M11 29l4-4M29 29l-4-4" stroke="#C8A97E" strokeWidth="0.7" opacity="0.5" strokeLinecap="round" />
    </>
);

export const IconAesthetic = () => wrap(
    <>
        <path d="M20 8c-3 4-6 6-10 6 4 0 7 2 10 6 3-4 6-6 10-6-4 0-7-2-10-6z" stroke="#C8A97E" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M20 20c-2 3-4 4-6 4 2 0 4 1 6 4 2-3 4-4 6-4-2 0-4-1-6-4z" stroke="#C8A97E" strokeWidth="0.9" strokeLinejoin="round" opacity="0.7" />
    </>
);

export const IconNail = () => wrap(
    <>
        <path d="M15 12c0-2 2-4 5-4s5 2 5 4v10c0 3-2 6-5 6s-5-3-5-6V12z" stroke="#C8A97E" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M15 18h10" stroke="#C8A97E" strokeWidth="0.8" opacity="0.6" />
    </>
);

export const IconSurgery = () => wrap(
    <>
        <path d="M10 30l12-12" stroke="#C8A97E" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M22 18l6-6-2-2-6 6z" stroke="#C8A97E" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M8 32l3-3" stroke="#C8A97E" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="26" cy="14" r="0.8" fill="#C8A97E" />
    </>
);

export const IconClinic = () => wrap(
    <>
        <path d="M20 8l10 6v18H10V14l10-6z" stroke="#C8A97E" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M20 20v6M17 23h6" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
    </>
);

export const IconPatient = () => wrap(
    <>
        <circle cx="20" cy="15" r="4" stroke="#C8A97E" strokeWidth="1.2" />
        <path d="M11 30c1-5 5-8 9-8s8 3 9 8" stroke="#C8A97E" strokeWidth="1.2" strokeLinecap="round" />
    </>
);

export const iconMap = {
    Skin: IconSkin,
    Hair: IconHair,
    Aesthetic: IconAesthetic,
    Nail: IconNail,
    "Laser & Surgical": IconSurgery,
    Laser: IconLaser,
};
