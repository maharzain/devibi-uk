"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* Mounted inside template.jsx so it re-runs on every route change
   and cleans up its ScrollTriggers when the page unmounts. */
export default function PageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      /* — scroll reveals — */
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onComplete: () => el.classList.add("is-revealed"),
          }
        );
      });

      /* — split headlines (after fonts so line breaks are right) — */
      document.fonts.ready.then(() => {
        document.querySelectorAll("[data-split]").forEach((el) => {
          const split = new SplitText(el, {
            type: "lines,words",
            linesClass: "split-line",
            wordsClass: "split-word",
          });
          gsap.from(split.words, {
            yPercent: 115,
            rotate: 3,
            duration: 1.15,
            stagger: 0.045,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        ScrollTrigger.refresh();
      });

      /* — counters — */
      document.querySelectorAll(".count").forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const decimal = el.dataset.decimal === "1";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = decimal ? (obj.v / 10).toFixed(1) : Math.round(obj.v);
          },
        });
      });
    });

    /* — tilt + glass spotlight + magnetic (hover devices only) — */
    const cleanups = [];
    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll("[data-tilt]").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 900 });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 7);
          rx((0.5 - py) * 7);
          card.style.setProperty("--mx", px * 100 + "%");
          card.style.setProperty("--my", py * 100 + "%");
        };
        const leave = () => { rx(0); ry(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll("[data-magnetic]").forEach((btn) => {
        const mx = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const my = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * 0.3);
          my((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => { mx(0); my(0); };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
