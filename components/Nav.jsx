"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 140 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close the mobile menu on navigation */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`nav${hidden && !open ? " is-hidden" : ""}`}>
        <Link href="/" className="nav__logo" aria-label="Devibi home">
          devibi<sup>®</sup>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn--small nav__cta" data-magnetic>
          <span className="btn__fill" />
          <span className="btn__label">Start a project</span>
        </Link>
        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </header>

      <div className="menu" aria-hidden={!open}>
        <div className="menu__links">
          {LINKS.map((l, i) => (
            <Link key={l.href} href={l.href}>
              <em>0{i + 1}</em>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="menu__foot">hello@devibi.com</div>
      </div>
    </>
  );
}
