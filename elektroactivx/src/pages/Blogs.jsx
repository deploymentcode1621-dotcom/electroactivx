import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-reveal hook ─────────────────────────── */
function useInView(threshold = 0.1) {
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

/* ─── Reveal wrapper ─────────────────────────────── */
function Reveal({ children, delay = 0, from = "bottom", className = "", style = {} }) {
  const [ref, visible] = useInView();
  const origins = {
    bottom: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
    scale: "scale(0.94)",
    fade: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : origins[from],
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Blog data ──────────────────────────────────── */
/* EMPTY FOR NOW — BLOGS COMING SOON */
const ALL_BLOGS = [];   // <── IMPORTANT CHANGE

const CATEGORIES = ["All"];
const POSTS_PER_PAGE = 6;

/* ════════════════════════════════════════════════════
   BLOGS PAGE
════════════════════════════════════════════════════ */
export default function Blogs() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">

      <Header />

      {/* HERO */}
      <section className="relative w-full" style={{ background: "#0a0a0a", minHeight: 200 }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85"
            className="w-full h-full object-cover"
            alt="Blogs"
            style={{ filter: "brightness(0.2) saturate(0.4)" }}
          />
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 md:py-20 flex items-end justify-between">
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "all 0.9s ease 0.1s",
            }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase font-light mb-3">
              Knowledge Hub
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-widest uppercase">
              Blogs
            </h1>
          </div>
        </div>
      </section>

      {/* PAGE INTRO */}
      <section className="w-full bg-white pt-16 pb-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
              Industry Insights & Updates
            </h2>

            <div className="w-12 h-0.5 bg-emerald-500 mb-5" />

            <p className="text-sm text-gray-400 font-light leading-6 max-w-2xl">
              Our blog will feature insights, innovations and updates from
              Elektroactivx. Stay tuned as we prepare valuable articles
              covering industry developments and our latest advancements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BLOG COMING SOON */}
      {ALL_BLOGS.length === 0 && (
        <section className="w-full bg-white py-24 px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl mx-auto text-center">

            <Reveal>
              <div className="mb-6 text-5xl">📝</div>

              <h3 className="text-3xl font-light text-gray-900 mb-4">
                Blogs Coming Soon
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                We are currently working on informative articles and updates
                related to our innovations, products and industry developments.
                Our blog section will be available very soon.
              </p>

              <p className="text-gray-400 text-xs mt-6 tracking-widest uppercase">
                Stay Tuned
              </p>
            </Reveal>

          </div>
        </section>
      )}

      

    </main>
  );
}