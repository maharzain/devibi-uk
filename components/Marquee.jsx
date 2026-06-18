const ITEMS = [
  "Web Design", "Web Development", "App Design", "App Development",
  "AI Integration", "SEO", "CRO", "Brand & Motion",
];

function Group() {
  return (
    <div className="marquee__group">
      {ITEMS.map((item) => (
        <span key={item}>
          {item}
          <i aria-hidden="true"> ✦</i>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
