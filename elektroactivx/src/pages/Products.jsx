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
  const tr = { bottom:"translateY(28px)", left:"translateX(-28px)", right:"translateX(28px)", scale:"scale(0.96)" };
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

    

/* ════════════════════════════════════════════════════════
   PRODUCTS PAGE — Konductive Polymer Dispersion
════════════════════════════════════════════════════════ */
export default function Products() {
  const [activeProduct, setActiveProduct] = useState(0);

  const productLinks = [
    "Polyaniline Emeraldine Salt",
    "Polyaniline Emeraldine Base",
    "DISSIPO-WR",
    "Polyaniline Masterbatches",
    "Anticorrosion Primers",
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        /* ── core page anims ── */
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom   { from{transform:scale(1.08)} to{transform:scale(1)} }
        @keyframes shimmer   { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateHex { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseGlow { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.08)} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes orbFloat  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-14px) scale(1.04)} 66%{transform:translate(-14px,10px) scale(0.97)} }
        @keyframes drawLine  { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
        @keyframes blinkDot  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes slideInL  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInR  { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes countUp   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lStreak   { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }

        /* ── molecule-specific anims (from enhanced version) ── */
        @keyframes drawBond    { from{stroke-dashoffset:300;opacity:0} to{stroke-dashoffset:0;opacity:1} }
        @keyframes nodeAppear  { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes pulseN      { 0%,100%{r:14;opacity:1} 50%{r:16;opacity:0.85} }
        @keyframes chargeGlow  { 0%,100%{opacity:0.2;r:22} 50%{opacity:0.55;r:27} }
        @keyframes molHFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes scanMove    { 0%{transform:translateY(-4px)} 100%{transform:translateY(320px)} }
        @keyframes ringRotate  { from{stroke-dashoffset:0} to{stroke-dashoffset:-62.8} }
        @keyframes counterSpin { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes fadeInUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .mol-bond      { stroke-dasharray:300; animation:drawBond 0.9s cubic-bezier(0.4,0,0.2,1) both; fill:none; }
        .mol-node-g    { animation:nodeAppear 0.8s cubic-bezier(0.34,1.56,0.64,1) both; }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s} .d8{animation-delay:.8s}
        .hi{animation:imgZoom 2.2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
        .float{animation:floatY 5s ease-in-out infinite}
        .orb{animation:orbFloat 8s ease-in-out infinite}

        .mol-node{animation:pulseGlow 3s ease-in-out infinite}
        .mol-node:nth-child(2n){animation-delay:-.8s}
        .mol-node:nth-child(3n){animation-delay:-1.6s}

        .scan{animation:scanLine 3s linear infinite;pointer-events:none}

        .ppill{transition:all .25s;cursor:pointer}
        .ppill:hover,.ppill.active{background:#15803d!important;color:#fff!important;border-color:#15803d!important;transform:translateY(-2px);box-shadow:0 6px 20px rgba(21,128,61,0.3)}

        .srow{transition:background .2s}
        .srow:hover{background:#f0fdf4}

        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        .iz img{transition:transform .7s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .iz:hover img{transform:scale(1.05)}
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
            style={{ fontSize:"clamp(1.8rem,4vw,3rem)" }}>
            Conductive Polymer Dispersion
          </h1>
          <p className="text-sm text-gray-600 leading-7 font-light max-w-2xl fu d4">
            Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists
            around the world for their potential game-changing industrial and commercial applications.
          </p>
          <div className="w-12 h-0.5 fu d4" style={{ background:"linear-gradient(90deg,#c9a84c,#16a34a)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — ANIMATED MOLECULE FIGURE
      ══════════════════════════════════════════════ */}
   <section className="w-full bg-white py-16 px-8 md:px-16 lg:px-24">
  <div className="max-w-6xl mx-auto">

    {/* ✅ IMAGE ADDED */}
    <div className="mb-12 flex justify-center">
  <img 
    src="/images/coductiveformula.png" 
    alt="Polymer Structure"
    className="w-[650px] max-w-full h-auto rounded-xl shadow-md"
  />
</div>

    {/* EXISTING COMPONENT */}
    {/* <MoleculeSection /> */}

    {/* CONTENT */}
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

      {/* LEFT SIDE */}
      <div className="lg:w-3/5">

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">
          For understanding the structure, see above graph and this link...
        </p>

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">
          Hence, it was important to develop techniques...
        </p>

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">
          We have developed a novel Thermoplastic Resin Polyaniline polymer blend...
        </p>

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">
          The masterbatch matrix (a thermoplastic resin) is soluble in solvents...
        </p>

        <p className="text-sm text-gray-500 leading-7 font-light mb-8">
          This allows for easy incorporation of polyaniline...
        </p>

        {/* BUTTON */}
        <a href="/polymerdispersion"
          className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-sm tracking-wide"
          style={{ background:"linear-gradient(90deg,#16a34a,#15803d)", borderRadius:30 }}
        >
          Read More: Dispersion
        </a>

      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-2/5">
        <div className="border border-gray-100 bg-gray-50">
          
          <div className="px-6 py-4 border-b">
            <p className="text-xs font-bold uppercase text-gray-500">Key Properties</p>
          </div>

          {[
            { label:"Conductivity", value:"1–100 S/cm" },
            { label:"Particle Size", value:"~100 nm" },
            { label:"Form", value:"Fine green powder" },
            { label:"Purity", value:">98%" },
            { label:"Surface Tension", value:"High" },
            { label:"Solubility", value:"Insoluble" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between px-6 py-3 border-b">
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
          03 — SCIENCE BEHIND IT
      ══════════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24"
        style={{ background:"#f9fafb" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">How It Works</p>
            <h2 className="font-light text-gray-900 tracking-tight"
              style={{ fontSize:"clamp(1.7rem,3vw,2.5rem)" }}>
              The science of<br/><strong className="font-bold">conductive dispersion</strong>
            </h2>
          </Reveal>

          <Reveal className="iz mb-12 overflow-hidden" style={{ boxShadow:"0 4px 32px rgba(0,0,0,0.08)" }}>
            <div className="relative overflow-hidden" style={{ height:320 }}>
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=1400&q=92"
                alt="Polymer science laboratory"
                className="w-full h-full object-cover"
                style={{ filter:"brightness(0.82) saturate(0.78)", objectPosition:"center 40%" }}
              />
              <div className="absolute inset-0 h-0.5 top-0 gl" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(22,163,74,0.15) 0%,transparent 50%),linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation:"blinkDot 2s ease-in-out infinite" }} />
                <span className="text-white text-sm font-medium" style={{ fontFamily:"Georgia,serif", fontStyle:"italic" }}>
                  Polyaniline processing in progress
                </span>
              </div>
              <div className="absolute top-5 right-6">
                <span className="text-white/60 text-xs tracking-widest uppercase font-light">Komstruk R&D Lab — Navi Mumbai</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num:"01",
                title:"Dispersion Challenge",
                img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=88",
                text:"Polyaniline has the highest surface tension of all known organic materials — making it extraordinarily difficult to disperse in any solvent. Standard mixing approaches fail entirely.",
              },
              {
                num:"02",
                title:"The Breakthrough",
                img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=88",
                text:"Dr. Bernhard Wessling pioneered techniques to process Polyaniline at nanoscopic particle sizes of ~100 nm — enabling stable, ultrafine dispersions across a wide range of industrial media.",
              },
              {
                num:"03",
                title:"The Masterbatch Solution",
                img:"https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500&q=88",
                text:"Our Thermoplastic Resin Polyaniline Masterbatches solve the handling problem entirely. Soluble matrices allow easy incorporation into any solvent system or polymer composition.",
              },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 80}>
                <div className="cl bg-white border border-gray-100 overflow-hidden" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div className="iz relative overflow-hidden" style={{ height:170 }}>
                    <img src={card.img} alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ filter:"grayscale(20%) brightness(0.8)" }}
                    />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.5),transparent 55%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                    <span className="absolute bottom-3 left-4 text-white/40 text-xs tracking-widest uppercase font-light">Step</span>
                    <span className="absolute bottom-3 right-4"
                      style={{ fontFamily:"Georgia,serif", fontSize:"2.5rem", fontWeight:900, color:"rgba(255,255,255,0.12)", lineHeight:1 }}>
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
          04 — APPLICATIONS BANNER
      ══════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height:280 }}>
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=90"
          alt="Industrial application"
          className="w-full h-full object-cover"
          style={{ filter:"brightness(0.45) saturate(0.55)", objectPosition:"center 60%" }}
        />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 55%),radial-gradient(ellipse at 10% 55%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        <Reveal from="left">
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" style={{ maxWidth:620 }}>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Industrial Impact</p>
            <h3 className="text-white font-light leading-tight tracking-tight mb-4" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
              Protecting the world's<br/><strong className="font-bold">critical infrastructure</strong>
            </h3>
            <a href="/applications" className="inline-flex items-center gap-2 text-white/75 text-sm font-medium hover:text-white transition-colors">
              Explore all applications
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </Reveal>
      </div>

    </main>
  );
}