import { useState, useEffect, useRef } from "react";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function SectionLabel({ children, light = false, center = false }) {
  return (
    <div className={`flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase ${light ? "text-green-400" : "text-green-700"} ${center ? "justify-center" : ""}`}>
      {!center && <span className={`block w-7 h-0.5 ${light ? "bg-green-400" : "bg-green-700"}`} />}
      {children}
    </div>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);
  const base = "transition-all duration-700 ease-out";
  const show = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7";
  const showDelay = visible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-7";

  return (
    <section className="max-w-screen-xl mx-auto px-6 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div className={`${base} ${show}`}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-6">
          Conducting Polymers
        </span>
        <h1 className="font-black text-5xl lg:text-6xl leading-tight tracking-tight text-gray-900 mb-6">
          Polyaniline <span className="text-green-700">Dispersion</span>
        </h1>
        <p className="text-base text-gray-500 font-light leading-relaxed mb-9 max-w-lg">
          A precise nanoscale process that transforms particle agglomerates into a stable, electrically conductive medium — engineered for performance at the molecular level.
        </p>
        <div className="flex gap-10 mb-10">
          {[["10 nm", "Primary particle size"], ["70 nm", "Secondary particle size"], ["300 m²", "Surface at 1% in 100ml"]].map(([val, label]) => (
            <div key={label}>
              <strong className="block text-3xl font-black text-green-700 tracking-tight">{val}</strong>
              <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        <a href="#steps" className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5">
          Explore the Process <ArrowIcon />
        </a>
      </div>

      <div className={`${base} ${showDelay}`}>
        <div
          className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(46,125,79,0.45) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(76,175,119,0.25) 0%, transparent 50%), #0f1a14" }}
        >
          <div className="w-4/5 max-w-xs">
            <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <g style={{ animation: "float1 4s ease-in-out infinite" }}>
                <circle cx="52" cy="90" r="18" fill="#2e7d4f" opacity=".9" />
                <circle cx="72" cy="78" r="14" fill="#4caf77" opacity=".8" />
                <circle cx="68" cy="104" r="16" fill="#2e7d4f" opacity=".85" />
                <circle cx="40" cy="108" r="12" fill="#4caf77" opacity=".7" />
              </g>
              <path d="M102 95 L148 95" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M144 89 L152 95 L144 101" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <g style={{ animation: "fadeInChain 2s ease forwards", opacity: 0 }}>
                <circle cx="178" cy="65" r="11" fill="#4caf77" opacity=".95" />
                <circle cx="206" cy="80" r="11" fill="#2e7d4f" opacity=".9" />
                <circle cx="234" cy="70" r="11" fill="#4caf77" opacity=".9" />
                <circle cx="258" cy="88" r="11" fill="#2e7d4f" opacity=".85" />
                <line x1="189" y1="65" x2="195" y2="80" stroke="#4caf77" strokeWidth="2" opacity=".5" />
                <line x1="217" y1="80" x2="223" y2="70" stroke="#4caf77" strokeWidth="2" opacity=".5" />
                <line x1="245" y1="70" x2="247" y2="88" stroke="#4caf77" strokeWidth="2" opacity=".5" />
              </g>
              <text x="52" y="135" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="sans-serif">Agglomerate</text>
              <text x="218" y="135" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="sans-serif">Pearl-chain structure</text>
              <g style={{ animation: "float2 5s ease-in-out infinite" }}>
                <circle cx="100" cy="170" r="8" fill="#4caf77" opacity=".7" />
                <circle cx="150" cy="165" r="10" fill="#2e7d4f" opacity=".8" />
                <circle cx="200" cy="172" r="7" fill="#4caf77" opacity=".65" />
              </g>
            </svg>
          </div>
          <div className="absolute bottom-6 right-6 bg-white/10 border border-white/15 backdrop-blur-sm px-5 py-3 rounded-xl text-center">
            <strong className="block text-2xl font-black text-green-400 tracking-tight">300 m²</strong>
            <span className="text-xs text-white/60 tracking-wider">inner surface / 100ml @ 1%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes fadeInChain { to { opacity: 1; } }
      `}</style>
    </section>
  );
}

function DispersionSection() {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        <Reveal>
          <SectionLabel>Science of Dispersion</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
            More than just mixing — a nanoscale engineering feat
          </h2>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-4">
            "Dispersion" is widely underestimated, even among scientists. Contrary to popular belief, it is not simply mixing two or more components together. True dispersion requires specialised high-shear machinery and involves several simultaneous complex operations occurring at the nanoscale.
          </p>
          <p className="text-base text-gray-500 font-light leading-relaxed">
            For Polyaniline, the primary particle size is just <strong className="font-semibold text-gray-700">10 nm</strong>. In a polymer blend, we achieve around <strong className="font-semibold text-gray-700">70 nm secondary particle size</strong>. The dispersion process begins by separating these 70 nm particles from large agglomerates.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-white border border-gray-200 rounded-2xl p-9">
            <SectionLabel>Key Insight</SectionLabel>
            <p className="text-base text-gray-700 leading-relaxed">
              Once the concentration of dispersed conductive particles exceeds a critical threshold, they self-organise into <strong className="font-semibold">pearl-chain-like structures</strong> — where particles are in direct contact, enabling electrical conductivity.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400 leading-relaxed">
                These are called <em>dissipative structures</em>, described by Bernhard Wessling's non-equilibrium thermodynamic theory — grounded in Nobel laureate Prof. Ilya Prigogine's general framework.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    num: "01", title: "Separation of Particle Contacts",
    desc: "High-shear forces break apart the bonds between agglomerated particles, isolating the 70 nm secondary particles from large clusters.",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="6" cy="10" r="4" stroke="#2e7d4f" strokeWidth="1.5"/><circle cx="14" cy="10" r="4" stroke="#2e7d4f" strokeWidth="1.5"/><path d="M10 10 h4" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    num: "02", title: "Generation of Inner Surface",
    desc: "Turbulence creates internal surfaces within the dispersion medium — the interfaces that form only under non-laminar, dynamic flow conditions.",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16 Q10 4 16 16" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/><line x1="10" y1="16" x2="10" y2="12" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    num: "03", title: "Removal of Adsorbed Materials",
    desc: "The dispersion medium simultaneously strips adsorbed contaminants — including air, water, and various impurities — from particle surfaces.",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6" stroke="#2e7d4f" strokeWidth="1.5"/><path d="M7 10 l2 2 4-4" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    num: "04", title: "Monomolecular Layer Adsorption",
    desc: "Freshly cleaned particle surfaces adsorb a monomolecular layer of the dispersion medium — providing stable, lasting surface passivation.",
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6" stroke="#2e7d4f" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#2e7d4f" strokeWidth="1.5"/></svg>
  },
];

function StepsSection() {
  return (
    <section className="bg-white py-24 px-6 lg:px-16" id="steps">
      <div className="max-w-screen-xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel center>The 4-Step Dispersion Process</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
              Four simultaneous nanoscale events
            </h2>
            <p className="text-base text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
              These steps occur concurrently under turbulent conditions — laminar flow cannot achieve true dispersion.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-2xl overflow-hidden divide-y sm:divide-x sm:divide-y-0 divide-gray-200">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="group bg-white hover:bg-green-50 transition-colors duration-200 p-10 h-full cursor-default">
                <div className="text-5xl font-black text-gray-200 group-hover:text-green-200 leading-none mb-5 tracking-tight transition-colors duration-200">
                  {s.num}
                </div>
                <div className="w-12 h-12 bg-green-50 group-hover:bg-green-700 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SEMSection() {
  return (
    <section
      className="py-24 px-6 lg:px-16 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(46,125,79,0.3) 0%, transparent 60%), #0f1a14" }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <Reveal>
          <SectionLabel light>Electron Microscopy</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-5">
            Pearl-chain structures under the electron microscope
          </h2>
          <p className="text-base text-white/55 font-light leading-relaxed mb-4">
            After dispersion is complete, when the conductive particle concentration exceeds a critical level, formerly isolated particles self-organise. Under SEM imaging, the characteristic pearl-chain formations are clearly visible — direct particle-to-particle contacts that enable electrical conduction.
          </p>
          <p className="text-base text-white/55 font-light leading-relaxed mb-6">
            These dissipative structures are thermodynamically governed — self-organising systems far from equilibrium, consistent with Prigogine's framework as extended by Bernhard Wessling.
          </p>
          <div className="inline-block border border-green-500/40 rounded-lg px-6 py-4">
            <strong className="block text-2xl font-black text-green-400 tracking-tight">at 1% in 100 ml: 300 m²</strong>
            <span className="text-xs text-white/45 uppercase tracking-wider">Total inner surface generated</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#1a2e22" }}>
            <div className="relative aspect-square" style={{ background: "radial-gradient(ellipse at 40% 40%, rgba(46,80,55,0.9) 0%, #0f1a14 100%)" }}>
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="pg1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8ab89a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2e5040" stopOpacity="0.6" />
                  </radialGradient>
                  <radialGradient id="pg2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a0c8a8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1a3025" stopOpacity="0.5" />
                  </radialGradient>
                </defs>
                <g opacity="0.85">
                  {[[80,160,22,"pg1"],[118,148,20,"pg2"],[154,158,21,"pg1"],[188,145,19,"pg2"],[220,158,22,"pg1"],
                    [100,220,19,"pg2"],[135,230,21,"pg1"],[170,218,20,"pg2"],[205,228,22,"pg1"],[240,215,18,"pg2"],
                    [270,170,20,"pg1"],[300,158,21,"pg2"],[330,168,19,"pg1"]].map(([cx,cy,r,g],i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#${g})`} />
                  ))}
                  <circle cx="60" cy="280" r="18" fill="url(#pg2)" opacity="0.7" />
                  <circle cx="290" cy="260" r="20" fill="url(#pg1)" opacity="0.75" />
                  <circle cx="350" cy="240" r="16" fill="url(#pg2)" opacity="0.65" />
                  <circle cx="140" cy="290" r="17" fill="url(#pg1)" opacity="0.7" />
                </g>
              </svg>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-20 h-1 bg-white/60" />
                <span className="text-xs text-white/55 font-mono">300 nm</span>
              </div>
            </div>
            <div className="bg-black/50 px-5 py-3 flex justify-between items-center">
              <span className="text-xs text-white/45 font-mono tracking-wider">SEM 0062B — Pearl-chain structure</span>
              <span className="text-xs text-green-400/70 font-mono">×50,000</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const infoCards = [
  {
    title: "Dissipative Structures",
    desc: "Self-organising systems maintained by a continuous flow of energy, far from thermodynamic equilibrium — as described by Prigogine (Nobel, 1977).",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#2e7d4f" strokeWidth="1.4"/><path d="M8 5.5v3l2 1" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round"/></svg>
  },
  {
    title: "Critical Concentration",
    desc: "Below the threshold, particles remain isolated. Above it, they spontaneously connect into conductive networks — a sharp, tuneable transition.",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8 Q5 2 8 8 Q11 14 14 8" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
  },
  {
    title: "Pearl-Chain Networks",
    desc: "Directly contacting particle chains form the conductive pathways — confirmed by SEM imaging and electrical measurements across formulations.",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="5" height="5" rx="1" stroke="#2e7d4f" strokeWidth="1.4"/><rect x="9" y="5" width="5" height="5" rx="1" stroke="#2e7d4f" strokeWidth="1.4"/><path d="M7 8.5h2" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round"/></svg>
  },
];

function TheorySection() {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 lg:gap-20 items-start">
        <Reveal>
          <SectionLabel>Thermodynamic Theory</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Dissipative structures &amp; non-equilibrium thermodynamics
          </h2>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-4">
            When isolated conductive particles exceed a critical concentration in the dispersion, a remarkable self-organisation phenomenon occurs. The particles form interconnected pearl-chain networks — not by chance, but through a thermodynamically driven process.
          </p>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-4">
            Bernhard Wessling developed a specialised non-equilibrium thermodynamical theory to explain these dispersion and emulsion behaviours. His model is grounded in the Nobel Prize-winning general non-equilibrium thermodynamics of Prof. Ilya Prigogine — the science of dissipative, self-organising systems far from equilibrium.
          </p>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-8">
            These structures enable the conductive particles to form direct electrical pathways through the polymer matrix, producing materials with controllable conductivity tuned at the nanoscale.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5">
            Read the Publications <ArrowIcon />
          </a>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-col gap-4">
            {infoCards.map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-7">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-white py-24 px-6 text-center">
      <Reveal>
        <div className="max-w-xl mx-auto">
          <SectionLabel center>Get in Touch</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">
            Ready to explore Polyaniline Dispersion?
          </h2>
          <p className="text-base text-gray-500 font-light leading-relaxed mb-10">
            We are happy to guide you through the relevant research publications and answer your technical questions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:info@elektroactive.co" className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5">
              Contact Us <ArrowIcon />
            </a>
            <a href="#" className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-700 hover:text-green-700 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-md bg-transparent transition-all">
              View All Products
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function PolymerDispersion() {
  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      <Hero />
      <DispersionSection />
      <StepsSection />
      <SEMSection />
      <TheorySection />
      <CTASection />
    </div>
  );
}