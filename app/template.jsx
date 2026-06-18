import PageEffects from "@/components/PageEffects";

/* template.jsx remounts on every navigation, giving each page
   a fresh enter animation and clean GSAP/ScrollTrigger lifecycle */
export default function Template({ children }) {
  return (
    <main className="page" id="content">
      <PageEffects />
      {children}
    </main>
  );
}
