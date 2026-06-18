"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const root = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = root.current;
    const dot = el.querySelector(".cursor__dot");
    const ring = el.querySelector(".cursor__ring");

    const dotX = gsap.quickTo(dot, "left", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "top", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "left", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "top", { duration: 0.35, ease: "power3.out" });

    const move = (e) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };
    const hoverables = "a, button, .chip, .card, .quote, summary";
    const over = (e) => { if (e.target.closest(hoverables)) el.classList.add("is-hover"); };
    const out = (e) => { if (e.target.closest(hoverables)) el.classList.remove("is-hover"); };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__dot" />
      <div className="cursor__ring" />
    </div>
  );
}
