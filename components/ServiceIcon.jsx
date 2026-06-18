/* Custom line icons per service — server component, zero JS */
const ICONS = {
  web: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="10" width="52" height="42" rx="6" className="ic-stroke" />
      <path d="M6 22h52" className="ic-stroke" />
      <circle cx="13" cy="16" r="1.6" className="ic-dot" />
      <circle cx="19" cy="16" r="1.6" className="ic-dot" />
      <circle cx="25" cy="16" r="1.6" className="ic-dot" />
      <path d="M22 33l-6 6 6 6M42 33l6 6-6 6M35 31l-6 17" className="ic-accent" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="18" y="6" width="28" height="52" rx="7" className="ic-stroke" />
      <path d="M27 12h10" className="ic-stroke" />
      <rect x="23" y="20" width="18" height="10" rx="2.5" className="ic-accent" />
      <rect x="23" y="34" width="8" height="8" rx="2" className="ic-accent" />
      <rect x="34" y="34" width="7" height="8" rx="2" className="ic-stroke" />
      <path d="M28 51h8" className="ic-accent" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="7" className="ic-accent" />
      <circle cx="12" cy="14" r="4" className="ic-stroke" />
      <circle cx="52" cy="14" r="4" className="ic-stroke" />
      <circle cx="12" cy="50" r="4" className="ic-stroke" />
      <circle cx="52" cy="50" r="4" className="ic-stroke" />
      <path d="M15 17l11 10M49 17L38 27M15 47l11-10M49 47L38 37" className="ic-stroke" />
      <circle cx="32" cy="32" r="13" className="ic-faint" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="28" cy="28" r="17" className="ic-stroke" />
      <path d="M41 41l13 13" className="ic-stroke" />
      <path d="M19 33l6-6 4 4 8-9" className="ic-accent" />
      <path d="M37 22v4h-4" className="ic-accent" />
    </svg>
  ),
  cro: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 12h44L40 32v16l-10 6V32L10 12z" className="ic-stroke" />
      <path d="M46 44l8-8M54 44v-8h-8" className="ic-accent" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="26" cy="32" r="16" className="ic-stroke" />
      <circle cx="40" cy="32" r="16" className="ic-accent" />
      <path d="M33 20.5a16 16 0 010 23" className="ic-faint" />
    </svg>
  ),
};

export default function ServiceIcon({ name }) {
  return <div className="card__icon">{ICONS[name] || ICONS.web}</div>;
}
