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

/* ─── Application data ───────────────────────────────── */
const applications = [
  {
    id: "corrosion-protection",
    title: "Corrosion Protection",
    subtitle: "The world's most powerful anticorrosion polymer",
    img: "/images/Corrosion Protection.jpeg",
    heroImg: "/images/Corrosion Protection.jpeg",
    tag: "Flagship Application",
    tagColor: "#16a34a",
    desc: "This is an extremely powerful corrosion protection principle. It was invented by Ormecon (Germany) and has been independently validated in numerous international studies. Polyaniline-based anticorrosion systems outperform conventional chromate and zinc-based primer systems — providing active, electrochemical protection at the metal-coating interface rather than just a passive barrier.",
    detail: "The mechanism relies on the redox activity of Polyaniline, which passivates the metal surface and prevents electrochemical corrosion reactions from propagating. This has been demonstrated on steel, aluminium, copper and their alloys under marine, industrial and atmospheric exposure conditions.",
    uses: ["Bridge structures", "Marine vessels", "Oil & gas pipelines", "Industrial equipment", "Rail infrastructure", "Offshore platforms"],
    products: ["DISSIPO-WR", "Anticorrosion Primers", "Polyaniline Emeraldine Salt"],
  },
  {
    id: "emi-shielding",
    title: "EMI Shielding",
    subtitle: "Electromagnetic compatibility through conductive polymers",
    img: "/images/EMC.jpeg",
    heroImg: "/images/EMC.jpeg",
    tag: "Electronics",
    tagColor: "#2563eb",
    desc: "Using our highly conductive masterbatch, products can be developed for medium requirements in EMI shielding. Conductive polymer-based EMC materials offer significant weight and processing advantages over traditional metal-filled composites — enabling lightweight, mouldable shielding components for electronic enclosures, automotive electronics and industrial control systems.",
    detail: "Polyaniline Masterbatches can be compounded with standard thermoplastics to achieve surface resistivities in the antistatic to semiconductive range, providing effective attenuation of electromagnetic interference at frequencies relevant to modern electronic systems. The inherent conductivity is stable over the product lifetime without the migration issues associated with carbon black systems.",
    uses: ["Electronic enclosures", "Automotive ECUs", "Industrial control panels", "Telecommunications equipment", "Medical devices", "Defence electronics"],
    products: ["Polyaniline Masterbatches", "Polyaniline Emeraldine Salt"],
  },
  {
    id: "permanent-antistatic",
    title: "Permanent Antistatic",
    subtitle: "Intrinsic static dissipation — no additives, no migration",
    img: "/images/Permanent antistatic modification.jpeg",
    heroImg: "/images/Permanent antistatic modification.jpeg",
    tag: "ESD / Packaging",
    tagColor: "#d97706",
    desc: "Using our highly conductive masterbatch, products can be developed for various antistatic applications. Unlike conventional antistatic additives which depend on humidity or surface migration for their effect, Polyaniline-based antistatic systems provide permanent, humidity-independent charge dissipation — critical for sensitive electronics packaging, clean rooms and explosive environments.",
    detail: "The permanent antistatic function derives from the intrinsic semiconducting nature of Polyaniline, which is uniformly distributed throughout the polymer matrix at nanoscopic particle sizes. This ensures consistent, reliable ESD protection across the full service life of the product — independent of environmental conditions.",
    uses: ["ESD packaging trays", "Electronic component bags", "Clean room flooring", "Explosive environment components", "Semiconductor handling", "Film & sheet products"],
    products: ["Polyaniline Masterbatches", "Polyaniline Emeraldine Base"],
  },
  {
    id: "electroluminescence",
    title: "Electroluminescence",
    subtitle: "Flexible, high-performance light-emitting displays",
    img: "/images/Electroluminescence.jpeg",
    heroImg: "/images/Electroluminescence.jpeg",
    tag: "Display Technology",
    tagColor: "#7c3aed",
    desc: "With our highly conductive masterbatch, products can be developed for this very flexible and easy display technology. Polyaniline serves as a highly transparent, conductive electrode layer in electroluminescent devices — enabling flexible, lightweight display panels for automotive instrument clusters, advertising displays and wearable electronics.",
    detail: "The high optical transparency combined with excellent electrical conductivity of Polyaniline films makes them ideal replacements for conventional ITO (indium tin oxide) electrodes. Unlike ITO, Polyaniline electrodes can be applied to flexible substrates and processed from solution — dramatically reducing manufacturing complexity and enabling roll-to-roll production.",
    uses: ["Automotive instrument clusters", "Flexible display panels", "Wearable electronics", "Advertising displays", "Smart packaging", "Architectural lighting"],
    products: ["Polyaniline Emeraldine Salt", "Polyaniline Emeraldine Base"],
  },
  {
    id: "solid-electrolyte",
    title: "Solid Electrolyte Capacitors",
    subtitle: "Ultra-high performance energy storage components",
    img: "/images/Solid Electrolyte Capacitors.jpeg",
    heroImg: "/images/Solid Electrolyte Capacitors.jpeg",
    tag: "Energy Storage",
    tagColor: "#dc2626",
    desc: "Using specially prepared dispersed polyaniline, an extremely high-performing solid state capacitor had been developed. Solid electrolyte capacitors based on Polyaniline offer exceptionally low equivalent series resistance (ESR) and outstanding high-frequency performance compared to conventional liquid electrolyte systems — enabling compact, high-reliability power conditioning in demanding applications.",
    detail: "The electrochemical stability and proton conductivity of Polyaniline in its doped form make it an ideal solid electrolyte for both aluminium and tantalum capacitor systems. The resulting devices exhibit superior temperature stability, longer service life and substantially lower ESR than conventional alternatives — making them particularly valuable in aerospace, automotive and industrial power electronics.",
    uses: ["Power supply units", "Aerospace electronics", "Automotive ECUs", "Industrial drives", "Telecommunications", "High-frequency circuits"],
    products: ["Polyaniline Emeraldine Salt", "Polyaniline Emeraldine Base"],
  },
];

const stats = [];

/* ════════════════════════════════════════════════════════
   APPLICATIONS PAGE
════════════════════════════════════════════════════════ */
export default function Applications() {
  const [activeApp, setActiveApp] = useState(null);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (activeApp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeApp]);

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family:'Roboto',sans-serif !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes lStreak { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }
        @keyframes pulseW  { 0%,100%{opacity:.3} 50%{opacity:.75} }
        @keyframes modalIn { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s}
        .hi{animation:imgZoom 2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}

        /* Application card */
        .app-card { transition: transform .42s cubic-bezier(0.16,1,0.3,1), box-shadow .42s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
        .app-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,0.12); }
        .app-card .card-img img { transition:transform .65s cubic-bezier(0.16,1,0.3,1),filter .5s; }
        .app-card:hover .card-img img { transform:scale(1.06); filter:grayscale(0%) brightness(0.88) !important; }
        .app-card .card-arrow { transition:transform .35s cubic-bezier(0.16,1,0.3,1),color .3s; }
        .app-card:hover .card-arrow { transform:translateX(5px); color:#16a34a; }
        .app-card .card-bar { transition:width .5s cubic-bezier(0.16,1,0.3,1); }
        .app-card:hover .card-bar { width:52px !important; }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: overlayIn 0.25s ease both;
        }
        .modal-box {
          background: #fff;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
          position: relative;
        }
        .modal-box::-webkit-scrollbar { width: 4px; }
        .modal-box::-webkit-scrollbar-thumb { background: #d1fae5; border-radius: 2px; }

        /* Use chip */
        .use-chip { transition:background .22s,border-color .22s,color .22s; }
        .use-chip:hover { background:#f0fdf4; border-color:#16a34a; color:#15803d; }

        /* Stat box */
        .stat-box::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#16a34a,#c9a84c); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(0.16,1,0.3,1); }
        .stat-box:hover::before { transform:scaleX(1); }
        .stat-box { position:relative; transition:background .3s; }
        .stat-box:hover { background:#f0fdf4; }

        /* Product pill */
        .prod-pill { transition:background .22s,border-color .22s,color .22s; }
        .prod-pill:hover { background:#15803d; color:#fff; border-color:#15803d; }

        /* Marquee */
        @keyframes mScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-track { animation:mScroll 28s linear infinite; }
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: "58vh", minHeight: 420, maxHeight: 650 }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=92"
            className="w-full h-full object-cover hi"
            alt="Applications"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg,rgba(4,12,6,0.9) 0%,rgba(4,12,6,0.65) 50%,rgba(4,12,6,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 55%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        </div>

        {[18, 42, 66, 85].map((l, i) => (
          <div key={i} className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left: `${l}%`, width: 1, background: "linear-gradient(to bottom,transparent,rgba(34,197,94,0.11),transparent)", animation: `lStreak ${3.5 + i * .6}s ease-in-out infinite ${i * 1.0}s` }} />
        ))}

        <div className="absolute top-24 right-10 z-20 flex items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-green-400 text-xs tracking-widest uppercase font-light">Applications</span>
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <p className="text-white/45 text-xs tracking-widest uppercase font-light mb-3 fu">— Applications</p>
          <h1 className="text-white font-light leading-none tracking-tight mb-4 fu d2"
            style={{ fontSize: "clamp(2.6rem,5.5vw,5.2rem)" }}>
            Where our polymers<br />
            <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", color: "#4ade80" }}>go to work</span>
          </h1>
          <p className="text-white/55 font-light leading-relaxed fu d4"
            style={{ fontSize: "0.80rem", maxWidth: 550, lineHeight: 1.80 }}>
            Conductive polymers find application in large variety of areas which is due to their conductivity and redox properties. Some of the interesting application areas are anticorrosion paint, Antistatic, EMI Shielding, RADAR absorbing materials, Catalysis, Supercapacitor, Sensors, Membrane etc. Interest in research on conducting polymers has grown after the 2000 Nobel prize and people found the way to make polymer processible.
          </p>
          <div className="flex items-center gap-4 mt-7 fu d6">
            <a href="#applications"
              className="inline-block px-7 py-3 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              style={{ background: "#15803d" }}>
              Explore All
            </a>
          </div>
        </div>
        <div className="absolute bottom-5 right-10 z-20 flex flex-col items-center gap-1.5 opacity-32">
          <span className="text-white text-xs tracking-widest uppercase font-light">Scroll</span>
          <span className="block w-px h-8 bg-white/65" style={{ animation: "pulseW 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 — MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ background: "#15803d", padding: "12px 0", overflow: "hidden" }}>
        <div className="mq-track" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {["Corrosion Protection", "EMI Shielding", "Permanent Antistatic", "Electroluminescence", "Solid Electrolyte Capacitors",
            "RADAR Absorbing", "Sensors", "Supercapacitors", "Membrane Technology", "Catalysis",
            "Corrosion Protection", "EMI Shielding", "Permanent Antistatic", "Electroluminescence", "Solid Electrolyte Capacitors",
            "RADAR Absorbing", "Sensors", "Supercapacitors", "Membrane Technology", "Catalysis"].map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, padding: "0 24px", color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontStyle: "italic", letterSpacing: "0.04em" }}>
                {t}
                <span style={{ color: "#bbf7d0", fontSize: "0.45rem" }}>◆</span>
              </span>
            ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          03 — INTRO SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-28 items-center">
            <div className="lg:w-1/2">
              <Reveal>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">The Science</p>
                <h2 className="font-light text-gray-900 leading-tight tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                  The broad reach of<br />
                  <strong className="font-bold">conducting polymers</strong>
                </h2>
                <div className="w-8 h-0.5 mb-5" style={{ background: "linear-gradient(90deg,#16a34a,#c9a84c)" }} />
                <p className="text-sm text-gray-500 leading-7 font-light mb-4">
                  Conducting polymers find application in a large variety of areas which is due to their conductivity and redox properties. Some of the interesting application areas are anticorrosion paint, Antistatic, EMI Shielding, RADAR absorbing materials, Catalysis, Supercapacitor, Sensors, Membrane etc.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light">
                  Interest in research on conducting polymers has grown after the 2000 Nobel Prize in Chemistry, and people found the way to make polymer processable — opening the door to practical, scalable commercial applications across virtually every industrial sector.
                </p>
              </Reveal>
            </div>

            <Reveal from="right" delay={120} className="lg:w-1/2 relative">
              <div className="relative overflow-hidden" style={{ height: 360 }}>
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=90"
                  alt="Polymer science"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85) saturate(0.82)", transition: "transform .65s cubic-bezier(0.16,1,0.3,1)" }}
                />
                <div className="absolute inset-0 h-0.5 top-0 gl" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white border border-gray-100 px-6 py-5 hidden md:block"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)", minWidth: 200 }}>
                <div className="font-light text-gray-900 leading-none mb-1"
                  style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", letterSpacing: "-0.02em" }}>
                  2000
                </div>
                <div className="text-xs tracking-widest uppercase text-green-600 font-medium leading-relaxed">
                  Nobel Prize<br />in Chemistry
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04 — STATS ROW
      ══════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="w-full border-t border-b border-gray-100" style={{ background: "#f9fafb" }}>
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {stats.map(({ num, suf, label, sub }, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="stat-box py-10 px-6">
                    <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-2">{label}</p>
                    <div className="font-light text-gray-900 leading-none mb-3"
                      style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)", letterSpacing: "-0.02em" }}>
                      {num}<span style={{ fontSize: "0.55em", marginLeft: 2 }}>{suf}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          05 — APPLICATION CARDS GRID
      ══════════════════════════════════════════ */}
      <section id="applications" className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Application Areas</p>
                <h2 className="font-light text-gray-900 tracking-tight"
                  style={{ fontSize: "clamp(1.7rem,3.2vw,2.6rem)" }}>
                  5 core <strong className="font-bold">application areas</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* 5-tile grid: 3 top + 2 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {applications.slice(0, 3).map((app, i) => (
              <Reveal key={app.id} delay={i * 80}>
                <AppCard app={app} onClick={() => setActiveApp(app)} />
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {applications.slice(3).map((app, i) => (
              <Reveal key={app.id} delay={i * 80}>
                <AppCard app={app} onClick={() => setActiveApp(app)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 — FULL-BLEED FEATURE
          FIX: removed extra spacer div that caused gap before Footer
      ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "48vh", minHeight: 320, maxHeight: 540 }}>
        <img
          src="/images/protect industry.png"
          alt="Industrial application"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.6)", objectPosition: "center 45%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 60%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />

        {/* Floating white card — positioned inside the image */}
        <Reveal from="right">
          <div className="absolute bg-white px-10 py-11"
            style={{ top: "50%", transform: "translateY(-50%)", right: 0, width: "100%", maxWidth: 500, boxShadow: "0 8px 48px rgba(0,0,0,0.12)" }}>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Industrial Impact</p>
            <h3 className="font-light text-gray-900 leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(1.6rem,2.8vw,2.3rem)" }}>
              Protecting the world's<br />
              <strong className="font-bold">critical infrastructure</strong>
            </h3>
            <div className="w-7 h-0.5 mb-5" style={{ background: "linear-gradient(90deg,#16a34a,#c9a84c)" }} />
            <p className="text-sm text-gray-500 leading-7 font-light mb-5">
              Elektroactivx's corrosion protection technology — rooted in Dr. Wessling's pioneering research — is the world's most powerful anticorrosion polymer principle. It actively passivates metal surfaces rather than simply forming a barrier.
            </p>
            <a href="/contact_us" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-green-600 transition-colors">
              Talk to our experts →
            </a>
          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════
          07 — ADDITIONAL APPLICATION AREAS
      ══════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24"
        style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="font-light text-gray-900 tracking-tight"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e5e7eb" }}>
            {[].map((item, i) => (
              <Reveal key={item.title} delay={i * 55}>
                <div className="bg-white overflow-hidden group cursor-default"
                  style={{ transition: "box-shadow .35s", boxShadow: "none" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(30%) brightness(0.75)", transition: "transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55),transparent 55%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                    <span className="absolute top-3 right-3 text-xl">{item.icon}</span>
                    <span className="absolute bottom-3 left-4 text-white/45 text-xs tracking-widest uppercase font-light">Elektroactivx</span>
                  </div>
                  <div className="p-5 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">{item.title}</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08 — CTA
      ══════════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden px-8 md:px-16 lg:px-24 py-20 md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 50%", filter: "brightness(0.15) saturate(0.4)" }}
          />
        </div>
        <div className="absolute right-12 top-0 bottom-0 z-10 flex items-center pointer-events-none select-none"
          style={{ fontFamily: "Georgia,serif", fontSize: "22rem", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1 }}>K</div>
        <div className="max-w-7xl mx-auto relative z-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal from="left">
            <h3 className="font-light text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
            </h3>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* ══════════════════════════════════════════
          MODAL — Centered popup overlay
      ══════════════════════════════════════════ */}
      {activeApp && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setActiveApp(null); }}>
          <div className="modal-box">
            <DetailModal app={activeApp} onClose={() => setActiveApp(null)} />
          </div>
        </div>
      )}
    </main>
  );
}

/* ─── AppCard component ───────────────────────────────── */
function AppCard({ app, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="app-card border border-gray-100 overflow-hidden bg-white"
      style={{
        boxShadow: hov ? "0 24px 56px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <div className="card-img relative overflow-hidden" style={{ height: 220 }}>
        <img
          src={app.img}
          alt={app.title}
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(20%) brightness(0.78)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 55%)" }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
        <div className="absolute top-3 left-3">
          <span className="text-white text-xs font-medium tracking-widest uppercase px-2.5 py-1"
            style={{ background: hov ? app.tagColor : "rgba(4,12,6,0.72)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", transition: "background .3s" }}>
            {app.tag}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-base leading-tight mb-0.5"
            style={{ fontFamily: "Georgia,serif" }}>
            {app.title}
          </h3>
          <p className="text-white/55 text-xs font-light">{app.subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="card-bar h-0.5 mb-4"
          style={{ width: 22, background: "linear-gradient(90deg,#16a34a,#c9a84c)" }} />
        <p className="text-sm text-gray-500 font-light leading-7 mb-4"
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {app.desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {app.uses.slice(0, 2).map(u => (
              <span key={u} className="text-xs text-gray-400 font-light px-2 py-1 border border-gray-200">{u}</span>
            ))}
            {app.uses.length > 2 && (
              <span className="text-xs text-green-600 font-medium px-2 py-1">+{app.uses.length - 2} more</span>
            )}
          </div>
          <span className="card-arrow text-gray-400 text-lg font-light ml-3 flex-shrink-0">→</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DetailModal component (centered popup) ─────────── */
function DetailModal({ app, onClose }) {
  return (
    <div className="flex flex-col lg:flex-row" style={{ minHeight: 420 }}>
      {/* Image left */}
      <div className="lg:w-2/5 relative overflow-hidden flex-shrink-0" style={{ minHeight: 280 }}>
        <img
          src={app.heroImg}
          alt={app.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.82) saturate(0.8)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.08))" }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
      </div>

      {/* Content right */}
      <div className="lg:w-3/5 p-8 lg:p-12 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors"
          style={{ borderRadius: 2 }}
        >
          ✕
        </button>

        <p className="text-xs tracking-widest uppercase font-medium text-green-600 mb-2">{app.tag}</p>
        <h3 className="font-light text-gray-900 leading-tight tracking-tight mb-2"
          style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.5rem,2.8vw,2.2rem)" }}>
          {app.title}
        </h3>
        <p className="text-sm text-green-700 font-light mb-5">{app.subtitle}</p>
        <div className="w-7 h-0.5 mb-5" style={{ background: "linear-gradient(90deg,#16a34a,#c9a84c)" }} />

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">{app.detail}</p>

        {/* Use cases */}
        <div className="mb-5">
          <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Use Cases</p>
          <div className="flex flex-wrap gap-2">
            {app.uses.map(u => (
              <span key={u} className="use-chip text-xs font-light text-gray-600 px-3 py-1.5 border border-gray-200 cursor-default">
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* Relevant products */}
        <div>
          <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Relevant Products</p>
          <div className="flex flex-wrap gap-2">
            {app.products.map(p => (
              <a key={p} href="/products"
                className="prod-pill text-xs font-medium text-green-700 px-3 py-1.5 border border-green-200 cursor-pointer">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}