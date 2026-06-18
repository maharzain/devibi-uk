"use client";

import dynamic from "next/dynamic";

/* Defers the Three.js bundle out of the critical path so the
   headline (LCP) paints before WebGL loads. No SSR for canvas. */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSceneLazy() {
  return <HeroScene />;
}
