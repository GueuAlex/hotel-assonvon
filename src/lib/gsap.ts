"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Enregistrement unique des plugins GSAP, avant tout useGSAP
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Requetes media partagees par les animations
export const AVEC_ANIMATIONS = "(prefers-reduced-motion: no-preference)";
export const SANS_ANIMATIONS = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
