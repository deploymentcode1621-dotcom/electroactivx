import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Reveal ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const tr = { bottom: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)", scale: "scale(0.96)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : tr[from],
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Features ───────────────────────────────────────── */
const features = [
  {
    title: "EMI Shielding",
    desc: "Superior electromagnetic interference shielding for sensitive electronic enclosures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" />
      </svg>
    ),
  },
  {
    title: "Anticorrosive Coatings",
    desc: "Long-lasting corrosion protection for metals through polymer-enhanced paint additives.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Antistatic Solutions",
    desc: "Effective charge dissipation across films, coatings, and industrial packaging.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Solid Capacitors",
    desc: "Reliable solid electrolyte capacitors with superior thermal and electrical stability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    title: "Electroluminescence",
    desc: "Innovative light-emitting coatings enabling next-generation display technologies.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
];

/* ─── Product data ───────────────────────────────────── */
const products = [
  {
    id: "emeraldine-salt",
    tag: "Polyaniline",
    title: "Polyaniline Emeraldine Salt",
    subtitle: "Primary conductive form of Polyaniline",
    desc: "Polyaniline Emeraldine Salt (PAni-ES) is the primary conductive form of Polyaniline and the basis of all our dispersion technology. With conductivity ranging from 1–100 S/cm and nanoscopic particle sizes of ~100 nm, it enables a wide variety of industrial applications including EMI shielding, antistatic coatings, and corrosion protection.",
    specs: [
      { label: "Conductivity", value: "1–100 S/cm" },
      { label: "Particle Size", value: "~100 nm" },
      { label: "Form", value: "Fine green powder" },
      { label: "Purity", value: ">98%" },
    ],
    badge: "Conductive",
    badgeColor: "#16a34a",
    applications: ["EMI Shielding", "Anticorrosion", "Antistatic"],
  },
  {
    id: "emeraldine-base",
    tag: "Polyaniline",
    title: "Polyaniline Emeraldine Base",
    subtitle: "Conjugated, non-conducting precursor",
    desc: "Polyaniline Emeraldine Base is a conjugated, non-conducting polymer produced by neutralizing the Emeraldine Salt form. It serves as a versatile precursor for manufacturing ultrafine dispersions of Polyaniline and ES forms with different counter ions, enabling custom conductivity profiles suited to specialized industrial needs.",
    specs: [
      { label: "Form", value: "Blue/violet powder" },
      { label: "Conductivity", value: "Non-conducting" },
      { label: "Solubility", value: "Limited organic solvents" },
      { label: "Role", value: "Dispersion precursor" },
    ],
    badge: "Non-Conductive",
    badgeColor: "#2563eb",
    applications: ["Custom Dispersions", "Counter-ion engineering", "Specialty coatings"],
  },
  {
    id: "pani-kot",
    tag: "Ready-to-Use",
    title: "PAni-KOT",
    subtitle: "Conductive Polyaniline-based coating",
    desc: "PAni-KOT is a ready-to-use conductive PAni-based coating designed for immediate deployment. Its primary applications include EMI shielding, RADAR absorbing coatings, and as an anticorrosive additive for solvent-borne paint systems. PAni-KOT can also be used in custom development of applications requiring Polyaniline Emeraldine Salt integration into solvent-borne systems.",
    specs: [
      { label: "Type", value: "Ready-to-use coating" },
      { label: "System", value: "Solvent-borne" },
      { label: "Primary Use", value: "EMI shielding / RADAR" },
      { label: "Secondary Use", value: "Anticorrosive additive" },
    ],
    badge: "RTU Coating",
    badgeColor: "#b45309",
    applications: ["EMI Shielding", "RADAR Absorbing", "Anticorrosion"],
  },
  {
    id: "masterbatches",
    tag: "Advanced Blend",
    title: "Polyaniline Masterbatches",
    subtitle: "Nanoparticle dispersion in thermoplastic matrix",
    desc: "A highly specialized type of Polyaniline (Organic Metal) nanoparticle dispersion in thermoplastic material. Since Polyaniline itself is insoluble in water or any organic solvent, the masterbatch matrix — a thermoplastic resin — is soluble in aromatics, ketones, esters, glycol ethers, glycol ether acetates, and alcohols. This enables fine dispersion of conductive polyaniline in virtually any solvent system or polymer composition.",
    specs: [
      { label: "Matrix", value: "Thermoplastic resin" },
      { label: "Solvents", value: "Aromatics, ketones, esters" },
      { label: "Particle Form", value: "Nanoparticle dispersion" },
      { label: "Compatibility", value: "Broad solvent range" },
    ],
    badge: "Masterbatch",
    badgeColor: "#7c3aed",
    applications: ["Antistatic", "EMI Shielding", "Conductive paints"],
  },
  {
    id: "anticorrosion",
    tag: "Protection",
    title: "Anticorrosion Primers",
    subtitle: "ORMECON ST & ORMECON AL",
    desc: "Elektroactivx provides specially formulated Organic Metal-based primers for both steel and aluminium surfaces. ORMECON ST (for steel) and ORMECON AL (for aluminium) offer exceptional bonding characteristics on all metal surfaces. The noble metal properties of the Organic Metal component act to passivate and ennoble the substrate, providing superior long-term corrosion protection unmatched by conventional primer technology.",
    specs: [
      { label: "Steel Primer", value: "ORMECON ST" },
      { label: "Aluminium Primer", value: "ORMECON AL" },
      { label: "Mechanism", value: "Passivation & ennobling" },
      { label: "Bonding", value: "Exceptional adhesion" },
    ],
    badge: "Dual-Metal",
    badgeColor: "#dc2626",
    applications: ["Steel protection", "Aluminium protection", "Industrial primers"],
  },
];

/* ════════════════════════════════════════════════════════
   PRODUCTS PAGE — Konductive Polymer Dispersion
════════════════════════════════════════════════════════ */
export default function Products() {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom   { from{transform:scale(1.08)} to{transform:scale(1)} }
        @keyframes shimmer   { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulseGlow { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.08)} }
        @keyframes blinkDot  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes slideInL  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes tabSlide  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s} .d8{animation-delay:.8s}
        .hi{animation:imgZoom 2.2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}

        .ppill{transition:all .25s;cursor:pointer}
        .ppill:hover,.ppill.active{background:#15803d!important;color:#fff!important;border-color:#15803d!important;transform:translateY(-2px);box-shadow:0 6px 20px rgba(21,128,61,0.3)}

        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        .iz img{transition:transform .7s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .iz:hover img{transform:scale(1.05)}

        /* Product tabs */
        .prod-tab { transition: all 0.22s; cursor: pointer; border-left: 3px solid transparent; }
        .prod-tab:hover { background: #f0fdf4; border-left-color: #86efac; }
        .prod-tab.active { background: #f0fdf4; border-left-color: #16a34a; }
        .prod-tab.active .prod-tab-title { color: #15803d; }

        .prod-panel { animation: tabSlide 0.4s cubic-bezier(0.22,1,0.36,1) both; }

        .app-tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 500; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }

        .srow:hover { background: #f9fafb; }
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════════
          01 — PAGE HERO
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-28 pb-10 px-8 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 fu">
            <a href="/" className="text-gray-400 text-xs tracking-widest uppercase font-light hover:text-green-600 transition-colors">Home</a>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-green-600 text-xs tracking-widest uppercase font-light">Conducting Polymers</span>
          </div>
          <h1 className="font-bold text-gray-900 tracking-tight mb-3 fu d2"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            Conductive Polymer Dispersion
          </h1>
          <p className="text-sm text-gray-600 leading-7 font-light max-w-2xl fu d4">
            Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists
            around the world for their potential game-changing industrial and commercial applications.
          </p>
          <div className="w-12 h-0.5 fu d4" style={{ background: "linear-gradient(90deg,#c9a84c,#16a34a)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — MOLECULE FIGURE + KEY PROPERTIES
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12 flex justify-center">
            <img
              src="/images/coductiveformula.png"
              alt="Polymer Structure"
              className="w-[650px] max-w-full h-auto rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

            <div className="lg:w-3/5">
              <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                For understanding the structure, see above graph and this link. Conducting Polymers are completely insoluble in water and organic solvents because of the extremely high charge density link with the polymeric chain. Also, they are extremely hard to disperse due to their extraordinary high surface tension, by far the highest of all known organic materials, also much higher than water.
              </p>
              <a href="/polymerdispersion"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-sm tracking-wide"
                style={{ background: "linear-gradient(90deg,#16a34a,#15803d)", borderRadius: 30 }}
              >
                Read More: Dispersion
              </a>
            </div>

            <div className="lg:w-2/5">
              <div className="border border-gray-100 bg-gray-50">
                <div className="px-6 py-4 border-b">
                  <p className="text-xs font-bold uppercase text-gray-500">Key Properties</p>
                </div>
                {[
                  { label: "Conductivity", value: "1–100 S/cm" },
                  { label: "Particle Size", value: "~100 nm" },
                  { label: "Form", value: "Fine green powder" },
                  { label: "Purity", value: ">98%" },
                  { label: "Surface Tension", value: "High" },
                  { label: "Solubility", value: "Insoluble" },
                ].map((row) => (
                  <div key={row.label} className="srow flex justify-between px-6 py-3 border-b transition-colors">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className="text-xs font-semibold text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 — FEATURES GRID
      ══════════════════════════════════════════════ */}
      <section>
        <div className="px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group border border-stone-200 p-8 bg-white hover:border-green-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-stone-100 group-hover:bg-green-500 text-green-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                    {f.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3 group-hover:text-green-700 transition-colors">{f.title}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-6 h-[2px] bg-stone-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 — PRODUCT CATALOGUE (Tabbed)
      ══════════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">

          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Product Range</p>
            <h2 className="font-light text-gray-900 tracking-tight" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)" }}>
              Our <strong className="font-bold">product catalogue</strong>
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar nav */}
            <div className="lg:w-1/3">
              <div className="border border-gray-100 overflow-hidden">
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveProduct(i)}
                    className={`prod-tab px-5 py-4 border-b border-gray-100 last:border-0 ${activeProduct === i ? "active" : ""}`}
                  >
                    <span className="text-[10px] uppercase tracking-widest font-medium text-gray-400 block mb-1">{p.tag}</span>
                    <span className="prod-tab-title text-sm font-semibold text-gray-700 block">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel */}
            <div className="lg:w-2/3">
              {products.map((p, i) => (
                activeProduct === i && (
                  <div key={p.id} className="prod-panel border border-gray-100 bg-gray-50 overflow-hidden">

                    {/* Header bar */}
                    <div className="px-7 py-5 border-b border-gray-100 bg-white flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-medium text-gray-400 block mb-1">{p.tag}</span>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{p.title}</h3>
                        <p className="text-xs text-gray-500 font-light">{p.subtitle}</p>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full text-white"
                        style={{ background: p.badgeColor }}>
                        {p.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="px-7 py-5 border-b border-gray-100">
                      <p className="text-sm text-gray-600 leading-7 font-light">{p.desc}</p>
                    </div>

                    {/* Specs */}
                    <div className="px-7 py-5 border-b border-gray-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Specifications</p>
                      <div className="grid grid-cols-2 gap-2">
                        {p.specs.map(s => (
                          <div key={s.label} className="bg-white border border-gray-100 px-4 py-3">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">{s.label}</span>
                            <span className="text-xs font-semibold text-gray-800">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="px-7 py-5 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex flex-wrap gap-2">
                        {p.applications.map(a => (
                          <span key={a} className="app-tag">{a}</span>
                        ))}
                      </div>
                      <a
                        href={`/products/${p.id}`}
                        className="inline-flex items-center gap-2 text-green-700 text-xs font-semibold hover:text-green-900 transition-colors"
                      >
                        Full details
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>

                  </div>
                )
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05 — SCIENCE BEHIND IT
      ══════════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24"
        style={{ background: "#f9fafb" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">How It Works</p>
            <h2 className="font-light text-gray-900 tracking-tight" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)" }}>
              The science of<br /><strong className="font-bold">conductive dispersion</strong>
            </h2>
          </Reveal>

          <Reveal className="iz mb-12 overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
            <div className="relative overflow-hidden" style={{ height: 320 }}>
              <img
                src="/images/PolyanilineProcessing.jpg"
                alt="Polymer science laboratory"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.82) saturate(0.78)", objectPosition: "center 40%" }}
              />
              <div className="absolute inset-0 h-0.5 top-0 gl" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(22,163,74,0.15) 0%,transparent 50%),linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "blinkDot 2s ease-in-out infinite" }} />
                <span className="text-white text-sm font-medium" style={{ fontFamily: "Georgia,serif", fontStyle: "italic" }}>
                  Polyaniline processing in progress
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Dispersion Challenge",
                img: "/images/DispersionChallenge.png",
                text: "Polyaniline has the highest surface tension of all known organic materials — making it extraordinarily difficult to disperse in any solvent. Standard mixing approaches fail entirely.",
              },
              {
                num: "02",
                title: "The Breakthrough",
                img: "/images/TheBreakthrough.png",
                text: "Dr. Bernhard Wessling pioneered techniques to process Polyaniline at nanoscopic particle sizes of ~100 nm — enabling stable, ultrafine dispersions across a wide range of industrial media.",
              },
              {
                num: "03",
                title: "The Masterbatch Solution",
                img: "/images/MasterbatchSolution.png",
                text: "Our Thermoplastic Resin Polyaniline Masterbatches solve the handling problem entirely. Soluble matrices allow easy incorporation into any solvent system or polymer composition.",
              },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 80}>
                <div className="cl bg-white border border-gray-100 overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div className="iz relative overflow-hidden" style={{ height: 170 }}>
                    <img src={card.img} alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(20%) brightness(0.8)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent 55%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                    <span className="absolute bottom-3 left-4 text-white/40 text-xs tracking-widest uppercase font-light">Step</span>
                    <span className="absolute bottom-3 right-4"
                      style={{ fontFamily: "Georgia,serif", fontSize: "2.5rem", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
                      {card.num}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">{card.title}</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{card.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06 — APPLICATIONS BANNER
      ══════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=90"
          alt="Industrial application"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.55)", objectPosition: "center 60%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 55%),radial-gradient(ellipse at 10% 55%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        <Reveal from="left">
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" style={{ maxWidth: 620 }}>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Industrial Impact</p>
            <h3 className="text-white font-light leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
              Protecting the world's<br /><strong className="font-bold">critical infrastructure</strong>
            </h3>
            <a href="/applications" className="inline-flex items-center gap-2 text-white/75 text-sm font-medium hover:text-white transition-colors">
              Explore all applications
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      {/* <Footer /> */}
    </main>
  );
}