import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── useInView hook ─────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── useCounter hook ────────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let raf,
      start = null;
    const run = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(run);
      else setCount(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return [ref, count];
}

/* ─── Reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const tr = {
    bottom: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    scale: "scale(0.96)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : tr[from],
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Counter display ────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [ref, count] = useCounter(target);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Team Card ──────────────────────────────────────── */
// ONLY showing updated parts — rest of your code remains EXACT SAME

/* ─── Team Card ──────────────────────────────────────── */
function TeamCard({ member, delay, inView }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const maxLength = 210;
  const isLong = member.desc.length > maxLength;
  const shortText = isLong ? member.desc.slice(0, maxLength) + "..." : member.desc;

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #f3f4f6",
          overflow: "hidden",
          cursor: "default",
          boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.05)",
          transform: hov ? "translateY(-5px)" : "translateY(0)",
          transition: "box-shadow 0.42s cubic-bezier(0.16,1,0.3,1),transform 0.42s cubic-bezier(0.16,1,0.3,1)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div
          style={{
            height: 3,
            background: "linear-gradient(90deg,#16a34a,#c9a84c)",
            transform: hov ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        <div
          style={{
            padding: "28px 22px 26px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              height: 2,
              background: "linear-gradient(90deg,#16a34a,#c9a84c)",
              width: hov ? 42 : 20,
              marginBottom: 12,
              transition: "width 0.42s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          <p
            style={{
              fontFamily: "Georgia,serif",
              fontWeight: 600,
              color: "#111",
              fontSize: "0.97rem",
              marginBottom: 3,
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </p>

          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#16a34a",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {member.role}
          </p>

          <div style={{ flexGrow: 1 }}>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#9ca3af",
                lineHeight: 1.7,
                fontWeight: 300,
                minHeight: 160,
              }}
            >
              {expanded ? member.desc : shortText}
            </p>
          </div>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginTop: 12,
                alignSelf: "flex-start",
                border: "none",
                background: "transparent",
                color: "#16a34a",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}

          {/* ✅ LinkedIn Icon Added */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#16a34a",
                fontSize: "0.75rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97v5.69H9.32V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.49v6.25zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ABOUT US PAGE
════════════════════════════════════════════════════════ */
export default function AboutUs() {
  const [activeYear, setActiveYear] = useState(0);
  const [teamRef, teamVisible] = useInView();

  const teamMembers = [
    {
      name: "Dr. Arindam Adhikari",
      role: "Managing Director",
      desc: "Dr. Arindam Adhikari (Ph.D., National Chemical Laboratory, Pune) worked as a postdoctoral and senior researcher at KTH Royal Institute of Technology and YKI Institute for Surface Chemistry (RISE) in Stockholm, Sweden from 2005–2010. After returning to India he worked as a scientist at CSIR-Central Electrochemical Research Institute (CECRI). He is also founder of Aadarsh Innovations, a Pune-based contract research organisation. His research focuses on conductive polymers and their applications, with 33 publications and 5 patents.",
      img: "/images/arindam.jpg",
      linkedin: "https://linkedin.com/in/example"
    },
    {
      name: "Dr. Bernhard Wessling",
      role: "Chief Scientific Advisor",
      desc: "Dr. Bernhard Wessling is a globally recognised authority in conductive polymers. He pioneered the dispersion processing of conductive polymers and their corrosion-resistant applications, successfully bringing them to market. His work spans chemistry, nanotechnology, and organic metals. He has published around 160 papers and holds more than 35 patents worldwide.",
      img: "/images/bernhard.jpeg",
      linkedin: "https://linkedin.com/in/example"
    },
    {
      name: "Mr. Jayesh Mahajan",
      role: "Chief Financial Officer",
      desc: "Mr. Jayesh Mahajan oversees the financial strategy and management of ElektroactivX. With strong experience in financial planning, corporate operations and strategic investment, he ensures financial stability and sustainable growth of the organisation.",
      img: "/images/jayesh.jpeg",
      linkedin: "https://linkedin.com/in/example"
    },
    {
      name: "Mr. Shammi Kumar Singh",
      role: "Director, Operations",
      desc: "Mr. Shammi Kumar Singh (M.Sc. Polymer Science) is co-founder of ElektroactivX and an expert in polymer manufacturing and quality control. Associated with Dr. Adhikari since 2013, he managed laboratory operations and pilot-scale production earlier. He now leads daily operations and production at ElektroactivX, ensuring manufacturing excellence.",
      img: "/images/shammi.jpeg",
      linkedin: "https://linkedin.com/in/example"
    },
    {
      name: "Mrs. Joyeeta Adhikari",
      role: "Co-Founder & HR Head",
      desc: "Mrs. Joyeeta Adhikari (M.Sc., B.Ed.) is co-founder of ElektroactivX with over 23 years of teaching and leadership experience in STEM education. A NASA-trained educator, she leads HR, recruitment, organisational culture and team development while driving innovation and professional growth across the company.",
      img: "/images/joyeeta.jpeg",
      linkedin: "https://linkedin.com/in/example"
    },
  ];

  const timelineEvents = [
    {
      year: "1999",
      title: "Research Beginnings",
      desc: "The founder Dr. Arindam Adhikari started his research in conductive polymers for various applications in the CSIR-NCL (Council for Scientific and Industrial Research- National Chemical Laboratory) Pune, India.",
    },
    {
      year: "2004",
      title: "Anticorrosion Research Development",
      desc: "He started Conductive polymer based anticorrosion research in CSIR-NCL, India, followed by at KTH Royal Institute of Technology and YKI, Stockholm.",
    },
    {
      year: "2013",
      title: "Aadarsh Innovations Founded",
      desc: "Aadarsh Innovations was founded with the vision of delivering advanced material solutions through innovative research and industrial expertise. The company focuses on contract research and manufacturing of conductive polymers for various applications.",
    },
    {
      year: "2018",
      title: "Ormecon India Established",
      desc: "Ormecon Private Limited was founded. Dr. Bernhard Wessling, is on board the famous German scientist and renowned authority in the field of conductive polymers who transformed PAni from an academic curiosity into a commercially viable material.",
    },
    {
      year: "2025",
      title: "ElektroactiveX Founded",
      desc: "ElektroactiveX Private Limited was founded with the vision of delivering advanced material solutions through innovative research and industrial expertise. The company focuses on conductive polymers and anticorrosion technologies, bridging scientific innovation with real-world applications. Recognised as a leading supplier of conductive polymer materials globally. Strengthened advisory board and expanded international distribution significantly",
    },
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes lStreak { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes pulseW  { 0%,100%{opacity:.35} 50%{opacity:.8} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s}.d4{animation-delay:.4s}.d6{animation-delay:.6s}
        .hi{animation:imgZoom 2s cubic-bezier(0.16,1,0.3,1) forwards}

        .iz{overflow:hidden}
        .iz img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .iz:hover img{transform:scale(1.04)}

        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        .sg img{transition:transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .sg:hover img{transform:scale(1.05);filter:grayscale(0%) brightness(0.85)!important}
        .so{transition:opacity .4s}
        .sg:hover .so{opacity:.1!important}

        .ng img{transition:transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .ng:hover img{transform:scale(1.05);filter:grayscale(0%)!important}

        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
      `}</style>

      <Header />

      <section className="relative w-full" style={{ height: "58vh", minHeight: 400, maxHeight: 600 }}>
        <div className="absolute inset-0 overflow-hidden">
          <img className="w-full h-full object-cover hi" style={{ objectPosition: "center 38%" }} />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(100deg,rgba(4,12,6,0.88) 0%,rgba(4,12,6,0.62) 45%,rgba(4,12,6,0.28) 100%)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }} />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 8% 60%,rgba(22,163,74,0.18) 0%,transparent 55%)" }}
          />
        </div>

        {[20, 45, 72].map((l, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{
              left: `${l}%`,
              width: 1,
              background: "linear-gradient(to bottom,transparent,rgba(34,197,94,0.1),transparent)",
              animation: `lStreak ${3.5 + i * 0.7}s ease-in-out infinite ${i * 1.1}s`,
            }}
          />
        ))}

        <div className="relative z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 h-full pb-10">
          
          <h1 className="text-white font-light leading-none tracking-tight mb-4 fu d2" style={{ fontSize: "clamp(1.8rem,4.8vw,3.8rem)" }}>
            Advanced
            <br />
            <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", color: "#4ade80" }}>Materials</span> Science
          </h1>
          <p className="text-white/55 font-light leading-relaxed mb-7 fu d4" style={{ fontSize: "0.93rem", maxWidth: 600, lineHeight: 1.75 }}>
            Conducting polymers find application in large variety of areas which is due to their conductivity and redox properties. Some of
            the interesting application areas are anticorrosion paint, Antistatic, EMI Shielding, RADAR absorbing materials, Catalysis,
            Supercapacitor, Sensors, Membrane etc. Interest in research on conducting polymers has grown after the 2000 Nobel prize and people
            found the way to make polymer processible.
          </p>
          <div className="flex items-center gap-4 fu d6">
            
           
          </div>
        </div>
      </section>

      <div className="w-full border-b border-gray-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex items-center gap-10 overflow-hidden">
          <span className="text-xs tracking-widest uppercase text-gray-500 font-medium flex-shrink-0">Trusted by</span>
          <div className="flex items-center gap-10 overflow-hidden flex-1">
            {["Industrial Partners", "R&D Institutions", "OEM Manufacturers", "Government Bodies", "Export Markets"].map((p) => (
              <span key={p} className="text-sm font-light text-gray-700 whitespace-nowrap hover:text-green-600 transition">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">
          <Reveal from="left" className="lg:w-5/12">

            <h2 className="font-light text-gray-900 leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              Solving the world's
              <br />
              <strong className="font-bold">toughest corrosion problems</strong>
            </h2>
            <div className="w-8 h-0.5 mb-5" style={{ background: "linear-gradient(90deg,#16a34a,#c9a84c)" }} />
            <p className="text-sm text-gray-500 leading-7 font-light mb-7">
              There is no more complex challenge than making industrial infrastructure last. strukKom is a full-stack conductive polymer company
              — from synthesis and dispersion to finished anticorrosion coatings and masterbatches — building the materials backbone for a world
              that needs to endure.
            </p>
           <a
  href="#team"
  className="inline-block px-7 py-3 text-white font-medium text-xs tracking-widest uppercase"
  style={{ backgroundColor: "#15803d" }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#166534")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#15803d")}
>
  Meet the Team
</a>
          </Reveal>

          <Reveal from="right" delay={120} className="lg:w-7/12 iz">
            <img
              src="/images/research.jpg"
              alt="Elektroactivx mission"
              className="w-full object-cover"
              style={{ height: 340, filter: "brightness(0.86) saturate(0.78)" }}
            />
          </Reveal>
        </div>
      </section>

      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{ background: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-start gap-4">
              <div style={{ width: 3, height: 60, background: "#16a34a", flexShrink: 0, marginTop: 4 }} />
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-1">Our Journey</p>
                <h2 className="font-light text-gray-900 leading-tight" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                  25 Years of
                  <br />
                  <strong className="font-bold">Scientific Excellence</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative h-px bg-gray-200 mx-2">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(activeYear / (timelineEvents.length - 1)) * 100}%` }}
              />
            </div>
          </Reveal>

          <div className="flex justify-between relative -top-2">
            {timelineEvents.map((ev, i) => (
              <Reveal key={ev.year} delay={i * 65}>
                <button onClick={() => setActiveYear(i)} className="flex flex-col items-center gap-3 group px-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                    style={{ background: i <= activeYear ? "#16a34a" : "#fff", borderColor: i <= activeYear ? "#16a34a" : "#d1d5db" }}
                  />
                  <span className="text-xs font-medium transition-colors" style={{ color: i === activeYear ? "#16a34a" : "#9ca3af" }}>
                    {ev.year}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <div
            key={activeYear}
            className="bg-white border border-gray-100 p-8 md:p-10 mt-4"
            style={{ animation: "fadeUp .35s cubic-bezier(0.22,1,0.36,1) both", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
          >
            <p className="text-xs tracking-widest uppercase text-green-600 font-medium mb-2">{timelineEvents[activeYear].year}</p>
            <h3 className="text-xl font-medium text-gray-900 mb-3">{timelineEvents[activeYear].title}</h3>
            <p className="text-sm text-gray-500 leading-7 font-light max-w-2xl">{timelineEvents[activeYear].desc}</p>
          </div>

          <div className="flex gap-3 mt-5">
            {[{ dir: -1, path: "M9 3L5 7l4 4" }, { dir: 1, path: "M5 3l4 4-4 4" }].map(({ dir, path }, i) => {
              const disabled = (dir === -1 && activeYear === 0) || (dir === 1 && activeYear === timelineEvents.length - 1);
              return (
                <button
                  key={i}
                  onClick={() => !disabled && setActiveYear((y) => y + dir)}
                  className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                  style={{
                    borderColor: disabled ? "#e5e7eb" : "#111827",
                    color: disabled ? "#d1d5db" : "#111827",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled) {
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = disabled ? "#d1d5db" : "#111827";
                  }}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={path} />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#0b120d" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 55%,rgba(22,163,74,0.05) 0%,transparent 50%),radial-gradient(ellipse at 85% 20%,rgba(201,168,76,0.04) 0%,transparent 45%)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)",
            backgroundSize: "34px 34px",
            opacity: 0.12,
          }}
        />

        {[12, 32, 56, 78].map((l, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 pointer-events-none z-0"
            style={{
              left: `${l}%`,
              width: 1,
              background: "linear-gradient(to bottom,transparent,rgba(34,197,94,0.07),transparent)",
              animation: `lStreak ${3 + i * 0.5}s ease-in-out infinite ${i * 1}s`,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="rounded-2xl px-6 py-12 md:px-10 md:py-16"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
                <div>
                  <p className="flex items-center gap-3 text-green-400 text-xs tracking-widest uppercase font-medium mb-5">
                    <span style={{ width: 28, height: 1, background: "#4ade80", display: "inline-block" }} />
                    Our People
                  </p>
                  <h2 className="font-light text-white leading-none tracking-tight" style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)" }}>
                    Our{" "}
                    <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#4ade80" }}>
                      Team
                    </span>
                  </h2>
                </div>
                <p className="text-gray-400 text-sm leading-7 font-light max-w-xs">
                  Scientists, directors and advisors united by world-leading science and a shared vision of industrial resilience.
                </p>
              </div>
            </Reveal>

            <div ref={teamRef} className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {teamMembers.slice(0, 3).map((m, i) => (
                  <TeamCard key={m.name} member={m} delay={i * 95} inView={teamVisible} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mt-5">
                {teamMembers.slice(3, 5).map((m, i) => (
                  <TeamCard key={m.name} member={m} delay={(i + 3) * 95} inView={teamVisible} />
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

     
    </main>
  );
}