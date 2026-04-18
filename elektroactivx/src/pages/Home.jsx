import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translateY(60px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const APPLICATIONS = [
  { title: "Corrosion Protection",  desc: "This is an extremely powerful corrosion protection principle.  " },
  { title: "EMI Shielding",         desc: "Using our highly conductive masterbatch, products can be developed for medium requirements in EMI shielding." },
  { title: "Antistatic",            desc: "Using our highly conductive masterbatch, products can be developed for various antistatic applications." },
  { title: "Solid Capacitors",      desc: "Using specially prepared dispersed polyaniline, an extremely high-performing solid state capacitor had been.." },
  { title: "Electroluminescence",   desc: "Light-emitting polymer coatings enabling next-generation flexible and large-area display technologies." },
];

const PRODUCTS = [
  {
    name: "PAni-KOT",
    tag: "Ready-to-use Coating",
    desc: "A ready-to-use conductive coating for EMI shielding, RADAR absorption, and anticorrosion. Suitable for direct application on metal and plastic substrates.",
    specs: ["EMI Shielding", "RADAR Absorption", "Anticorrosion"],
  },
  {
    name: "Polyaniline Masterbatch",
    tag: "Thermoplastic Dispersion",
    desc: "A thermoplastic-compatible conductive masterbatch for compounding into films, sheets, and moulded parts. Ideal for antistatic and EMI applications.",
    specs: ["Antistatic Films", "EMI Shielding", "Polymer Composites"],
  },
  {
    name: "Emeraldine Base",
    tag: "Base Polymer",
    desc: "High-purity emeraldine base polyaniline powder for research, dispersion development, and advanced material synthesis.",
    specs: ["Research Grade", "Dispersion Systems", "Custom Formulation"],
  },
];

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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,700&display=swap');
        .font-display { font-family: 'Roboto', sans-serif; }
        .font-body    { font-family: 'Roboto', sans-serif; }

        @keyframes shimmer {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          50.001% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .shimmer-line { animation: shimmer 3s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
        }
        .badge-pulse { animation: pulse-slow 2.5s ease-in-out infinite; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marquee 18s linear infinite; }

        .grad-text {
          background: linear-gradient(135deg, #16a34a 0%, #4ade80 60%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-lift {
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.10);
        }

        .app-card-hover {
          transition: border-color 0.25s, background 0.25s;
        }
        .app-card-hover:hover {
          border-color: #16a34a !important;
          background: #f0fdf4 !important;
        }

        .prod-card {
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .prod-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(22,163,74,0.10);
        }
      `}</style>

      <div className="font-body bg-white text-stone-900 overflow-x-hidden">

        {/* ══════════════════════════════════════
            §1 HERO
        ══════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden">

  {/* Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover scale-105"
    style={{ transform: `scale(1.05) translateY(${scrollY * 0.25}px)` }}
    src="/images/elektroactivx.mp4"
  />

  {/* Gradient Overlays */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

  {/* Grid Pattern */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-20 max-w-screen-2xl mx-auto">

    {/* Top Label */}
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-px bg-green-400" />
      <span className="text-green-400 text-[10px] tracking-[0.25em] uppercase font-medium">
        ElektroactivX Private Limited
      </span>
    </div>

    {/* Heading */}
    <h1
      className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 max-w-2xl"
      style={{ textShadow: "10px 10px 12px rgba(0,0,0,0.4)" }}
    >
      Science That{" "}
      <span className="italic grad-text">Conducts</span>
      <br />
      the Future.
    </h1>

    {/* Description */}
    <p
      className="text-white/70 text-sm md:text-base max-w-md leading-relaxed mb-10"
      style={{ textShadow: "6px 6px 10px rgba(0,0,0,0.35)" }}
    >
      Innovation-driven manufacturing of electrically conductive polymers for industrial applications worldwide.
    </p>

    {/* Button */}
    <div className="relative">
      <a
        href="/products"
        className="inline-block bg-green-500 badge-pulse text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-green-600 transition-all shadow-lg"
      >
        View Products
      </a>
    </div>

  </div>
</section>

        {/* ══════════════════════════════════════
            §2 TICKER
        ══════════════════════════════════════ */}
        <div className="bg-green-500 py-3.5 overflow-hidden">
          <div className="marquee-inner flex gap-0 whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <div key={i} className="flex gap-0">
                {["EMI Shielding", "Anticorrosive Coatings", "RADAR Absorption", "Solid Electrolyte Capacitors", "Antistatic ", "Electroluminescence", "Conductive Polymers"].map((t) => (
                  <span key={t} className="text-white text-xs tracking-[0.2em] uppercase font-medium px-8 border-r border-white/20 last:border-r-0">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            §3 WHO WE ARE
        ══════════════════════════════════════ */}
        <section className="px-8 md:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-screen-2xl mx-auto">
          <div className="lg:col-span-5">
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-green-500" />
                <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">Who We Are</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-8">
                ElektroactivX <br />
                <span className="grad-text italic">Private</span><br />
                Limited
              </h2>
              <p className="text-stone-500 leading-relaxed text-base mb-6 font-light">
                Elektroactivx Pvt Ltd is an innovation driven enterprise. It is devoted to manufacturing and marketing of a truly suitable electrically conductive polymer for industrial applications such as anticorrosive additives for paints, EMI shielding, Antistatic, RADAR absorbing material, solid electrolyte capacitors etc.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-400 hover:border-green-600 pb-0.5 transition-colors"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-2 flex lg:flex-col gap-6 justify-center">
            {[
              { num: 25, suffix: "+", label: "Years of Research" },
              { num: 6,  suffix: "+", label: "Application Areas"  },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 150}>
                <div className="bg-stone-50 border border-stone-100 p-6 text-center card-lift">
                  <p className="font-display text-4xl font-black text-green-600 mb-1">
                    <Counter target={s.num} suffix={s.suffix} />
                  </p>
                  <p className="text-stone-400 text-xs tracking-wider uppercase">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={200} direction="right">
              <div className="relative">
                <img
                   src="/images/innovation.jpeg"
                  alt="Innovation Laboratory"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-green-400 -z-10" />
                <div className="absolute -bottom-5 left-6 bg-green-500 badge-pulse text-white px-6 py-3">
                  <p className="text-xs font-bold tracking-widest uppercase">R & D Lab</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §4 APPLICATIONS
        ══════════════════════════════════════ */}
        <section className="bg-stone-50 border-t border-stone-100">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-green-500" />
                <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">What We Enable</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6">
                Industrial<br />
                <span className="italic grad-text">Applications</span>
              </h2>
              <p className="text-stone-500 leading-relaxed text-base font-light mb-8">
                Our conductive polymer technology unlocks solutions across Five high-value industrial domains — from corrosion protection to next-generation electronics and display technologies.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {APPLICATIONS.map((a) => (
                  <div
                    key={a.title}
                    className="app-card-hover border border-stone-200 p-3 cursor-default"
                  >
                    <p className="text-green-600 text-xs font-bold tracking-wide mb-1">{a.title}</p>
                    <p className="text-stone-400 text-xs font-light leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="/applications"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-400 hover:border-green-600 pb-0.5 transition-colors"
              >
                Explore All Applications
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            <Reveal direction="right" delay={120}>
              <div className="relative">
                <img
                  src="/images/industrial applications.jpeg"
                  alt="Electronic circuit application"
                  className="w-full object-cover"
                  style={{ height: 460 }}
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-green-400 -z-10" />
                <div className="absolute -bottom-5 left-6 bg-green-500 text-white px-6 py-3">
                  <p className="text-xs font-bold tracking-widest uppercase opacity-80">Domains</p>
                  <p className="font-bold text-base mt-0.5">Broad Applicability</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §5 PRODUCTS
        ══════════════════════════════════════ */}
        <section className="border-t border-stone-100">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-green-500" />
                <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">Our Products</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-8">
                Engineered<br />
                <span className="italic grad-text">Formulations</span>
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {PRODUCTS.map((p) => (
                  <div key={p.name} className="prod-card bg-stone-50 border border-stone-100 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-lg font-bold text-stone-900">{p.name}</h3>
                      <span className="text-green-600 text-[10px] tracking-widest uppercase bg-green-50 border border-green-200 px-2.5 py-1 ml-3 shrink-0 font-medium">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm font-light leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.specs.map((sp) => (
                        <span key={sp} className="text-green-600 text-[10px] bg-green-50 border border-green-200 px-2.5 py-1 font-medium tracking-wide">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/products"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-400 hover:border-green-600 pb-0.5 transition-colors"
              >
                View All Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            <Reveal direction="right" delay={120}>
              <div className="relative">
                <img
                  src="/images/Engineered Formulations.jpg"
                  alt="Conductive polymer products"
                  className="w-full object-cover"
                  style={{ height: 520 }}
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-green-400 -z-10" />
                <div className="absolute -bottom-5 left-6 bg-green-500 text-white px-6 py-3">
                  <p className="text-xs font-bold tracking-widest uppercase opacity-80">Polymer Range</p>
                  <p className="font-bold text-base mt-0.5">3 Core Products</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §6 CORE TECHNOLOGY
        ══════════════════════════════════════ */}
        <section className="px-8 md:px-24 py-24 md:py-36 max-w-screen-2xl mx-auto">
  <Reveal>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-green-500" />
          <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">
            Core Technology
          </span>
        </div>

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight">
          Conductive<br />
          <span className="italic grad-text">Polymer</span><br />
          Dispersion
        </h2>
      </div>

      <div>
        <p className="text-stone-500 leading-relaxed font-light text-base">
          Conducting Polymers such as Polyaniline have stimulated material
          scientists worldwide for their game-changing industrial potential.
          Completely insoluble in water and organic solvents, they require
          innovative dispersion techniques for real-world processing.
        </p>
      </div>
    </div>
  </Reveal>

  <Reveal delay={100}>
    <div className="bg-stone-50 border border-stone-100 p-10 mb-8 flex flex-col md:flex-row items-center gap-10">

      {/* IMAGE REPLACED HERE */}
      <div className="shrink-0 flex justify-center">
        <img
          src="/images/coductiveformula.png"
          alt="Polyaniline Conductive Polymer Structure"
          className="w-full max-w-xs object-contain"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-3">
          Polyaniline Structure
        </p>

        <p className="text-stone-600 text-sm leading-relaxed">
          The extraordinary high surface tension of conducting polymers — by far
          the highest of all known organic materials — makes adequate dispersion
          the central challenge and our core innovation for industrial
          processability.
        </p>
      </div>
    </div>
  </Reveal>

  <Reveal delay={150}>
    <div className="flex justify-center mb-24">
      <a
        href="/products"
        className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-green-600 text-white font-medium text-sm px-10 py-4 tracking-wide transition-all duration-300"
      >
        Conductive Polymer Dispersion
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  </Reveal>

  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((f, i) => (
      <Reveal key={f.title} delay={i * 80}>
        <div className="group border border-stone-100 p-8 card-lift cursor-default bg-white hover:border-green-200">
          <div className="w-14 h-14 bg-stone-50 group-hover:bg-green-500 text-green-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
            {f.icon}
          </div>

          <h4 className="font-display text-lg font-bold mb-3 group-hover:text-green-700 transition-colors">
            {f.title}
          </h4>

          <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>

          <div className="mt-6 h-0.5 bg-stone-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </div>
        </div>
      </Reveal>
    ))}
  </div> */}
</section>
        {/* ══════════════════════════════════════
            §7 CTA BANNER
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-green-600 px-8 md:px-24 py-20 md:py-28">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green-500/40" />
          <div className="absolute -bottom-32 -left-10 w-96 h-96 rounded-full bg-green-700/40" />

          <Reveal>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-screen-xl mx-auto">
              <div>
                <p className="text-green-200 text-xs tracking-[0.25em] uppercase mb-3">Get in Touch</p>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
                  Ready to explore<br />our solutions?
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact_us"
                  className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold text-sm px-8 py-4 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-medium text-sm px-8 py-4 transition-colors"
                >
                  View Products
                </a>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </>
  );
}