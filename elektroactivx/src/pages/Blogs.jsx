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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    scale:  "scale(0.94)",
    fade:   "none",
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
/* ─── Blog data ──────────────────────────────────── */
const ALL_BLOGS = [
  {
    id: 1,
    category: "News / Blog",
    date: "March 2026",
    author: "Elektroactivx",
    title: "Elektroactivx Pvt. Ltd. Can Now Provide Sample Quantities to Customers",
    excerpt: "Elektroactivx Pvt. Ltd can now provide sample quantities of all of our products to customers.",
    img: "/images/blog.jpg",
    readTime: "3 min read",
    tag: "News",
  }
];

const CATEGORIES = ["All"];
const POSTS_PER_PAGE = 6;

/* ════════════════════════════════════════════════════
   BLOGS PAGE
════════════════════════════════════════════════════ */
export default function Blogs() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  /* Reset page when filter changes */
  useEffect(() => { setCurrentPage(1); }, [activeCategory, search]);

  const filtered = ALL_BLOGS.filter(b => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleSubscribe = e => { e.preventDefault(); if (newsletter) setSubscribed(true); };

  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLoad {
          from { opacity: 0; transform: scale(1.05); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        .hero-img { animation: heroLoad 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* Blog card */
        .blog-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
        .blog-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .blog-card .card-img img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .blog-card:hover .card-img img { transform: scale(1.05); }
        .blog-card .read-more { transition: color 0.2s, gap 0.3s; }
        .blog-card:hover .read-more { color: #059669; gap: 10px; }
        .blog-card .read-more svg { transition: transform 0.3s ease; }
        .blog-card:hover .read-more svg { transform: translateX(4px); }

        /* Category filter */
        .cat-btn { transition: all 0.25s ease; border-bottom: 2px solid transparent; }
        .cat-btn.active { color: #059669; border-bottom-color: #059669; }
        .cat-btn:not(.active):hover { color: #374151; }

        /* Featured badge */
        .featured-badge {
          background: linear-gradient(90deg, #059669, #10b981);
          background-size: 200% auto;
          animation: shimmerSlide 3s linear infinite;
        }

        /* Pagination */
        .page-btn { transition: all 0.2s ease; }
        .page-btn.active { background: #111; color: #fff; }
        .page-btn:not(.active):hover { background: #f3f4f6; }

        /* Search */
        .search-wrap { position: relative; }
        .search-wrap input:focus { outline: none; border-color: #059669; }

        /* Subscribe btn */
        .subscribe-btn {
          background: #111; color: #fff; border: none;
          padding: 12px 28px; font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; transition: background 0.3s; flex-shrink: 0;
        }
        .subscribe-btn:hover { background: #059669; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO BANNER (dark, same as Contact/About)
      ════════════════════════════════ */}
      <section className="relative w-full" style={{ background: "#0a0a0a", minHeight: 200 }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85"
            className="w-full h-full object-cover hero-img"
            alt="Blogs"
            style={{ filter: "brightness(0.2) saturate(0.4)" }}
          />
          {/* Decorative ring */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10"
            style={{ animation: "spinSlow 22s linear infinite" }}>
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              {[...Array(3)].map((_, i) => (
                <circle key={i} cx="90" cy="90" r={30 + i * 24} stroke="white" strokeWidth="0.5" strokeDasharray={`${4 + i} ${6 + i}`} />
              ))}
              <circle cx="90" cy="90" r="4" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
        </div>
        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 md:py-20 flex items-end justify-between">
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.1s" }}>
            <p className="text-white/40 text-xs tracking-widest uppercase font-light mb-3">Knowledge Hub</p>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-widest uppercase">Blogs</h1>
          </div>
          <div className="hidden md:flex items-center gap-3"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
            <span className="text-white/35 text-xs tracking-widest uppercase font-light">Home</span>
            <span className="text-white/35 text-xs">/</span>
            <span className="text-emerald-400 text-xs tracking-widest uppercase font-light">Blogs</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          02 — PAGE HEADER + SEARCH
          (Omicron: "Building Perspectives" heading + subtitle)
      ════════════════════════════════ */}
      <section className="w-full bg-white pt-16 pb-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
              Battery Perspectives: Insights in Circular Economy & Recycling
            </h2>
            <div className="w-12 h-0.5 bg-emerald-500 mb-5" />
            <p className="text-sm text-gray-400 font-light leading-6 max-w-2xl">
              Stay updated with the latest trends, insights and innovations in battery recycling and circular infrastructure. Explore our blog for expert perspectives and industry updates that drive smarter decisions.
            </p>
          </Reveal>

          {/* Search + Category filter */}
          <Reveal delay={100} style={{ marginTop: "2rem" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Category pills */}
              <div className="flex flex-wrap gap-0 border-b border-gray-100">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cat-btn px-4 py-2 text-xs font-medium tracking-widest uppercase mr-1 ${activeCategory === cat ? "active" : "text-gray-400"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="search-wrap flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-64 border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 font-light px-4 py-2.5 pl-10 transition-colors"
                    style={{ fontFamily: "'Roboto',sans-serif", outline: "none" }}
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="6" r="4"/><path d="M10 10l3 3"/>
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — FEATURED HERO POST (first blog large)
      ════════════════════════════════ */}
      {currentPage === 1 && activeCategory === "All" && !search && (
        <section className="w-full bg-white px-8 md:px-16 lg:px-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <Reveal from="scale">
              <div className="blog-card relative overflow-hidden cursor-pointer group">
                <div className="relative h-72 md:h-96 overflow-hidden card-img">
                  <img
                    src={ALL_BLOGS[0].img}
                    alt={ALL_BLOGS[0].title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.72) saturate(0.75)" }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Featured badge */}
                  <div className="absolute top-5 left-5">
                    <span className="featured-badge text-white text-xs font-medium tracking-widest uppercase px-3 py-1.5">
                      Featured
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute top-5 right-5">
                    <span className="bg-white/15 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-3 py-1.5 border border-white/20">
                      {ALL_BLOGS[0].category}
                    </span>
                  </div>
                  {/* Bottom text on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white/60 text-xs font-light tracking-wide mb-2">{ALL_BLOGS[0].date} · {ALL_BLOGS[0].readTime}</p>
                    <h3 className="text-white text-xl md:text-2xl font-medium leading-snug mb-3 max-w-2xl">
                      {ALL_BLOGS[0].title}
                    </h3>
                    <a href="#" className="read-more flex items-center gap-2 text-emerald-400 text-xs font-medium tracking-widest uppercase">
                      Read More
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

     
     
    </main>
  );
}