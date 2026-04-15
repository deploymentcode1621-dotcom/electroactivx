import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const transforms = {
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
        transform: visible ? "none" : transforms[from],
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ProductPageLayout({
  breadcrumb = "Product",
  title,
  subtitle,
  description,
  specs = [],
  applications = [],
  highlights = [],
  code,
  form,
  leadTime,
  packSize,
  accent = "green",
}) {
  const accentClasses =
    accent === "gold"
      ? {
          text: "text-amber-600",
          soft: "bg-amber-50",
          border: "border-amber-200",
          button: "from-amber-500 to-amber-600",
        }
      : {
          text: "text-green-600",
          soft: "bg-green-50",
          border: "border-green-200",
          button: "from-green-600 to-green-700",
        };

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        .fu{animation:fadeUp .9s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s}
        .d4{animation-delay:.4s}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
      `}</style>

      {/* HERO */}
      <section className="w-full bg-white pt-28 pb-12 px-8 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 fu">
            <Link to="/" className="text-gray-400 text-xs tracking-widest uppercase font-light hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <Link to="/products" className="text-gray-400 text-xs tracking-widest uppercase font-light hover:text-green-600 transition-colors">
              Products
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <span className={`text-xs tracking-widest uppercase font-light ${accentClasses.text}`}>
              {breadcrumb}
            </span>
          </div>

          <h1
            className="font-bold text-gray-900 tracking-tight mb-3 fu d2"
            style={{ fontSize: "clamp(1.9rem,4vw,3.4rem)" }}
          >
            {title}
          </h1>

          <p className="text-sm text-gray-600 leading-7 font-light max-w-3xl fu d4">
            {subtitle}
          </p>

          <div className="w-14 h-0.5 mt-6 gl" />
        </div>
      </section>

      {/* OVERVIEW + SPEC PANEL */}
      <section className="w-full bg-white py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_0.9fr] gap-10 items-start">
          <Reveal from="left">
            <div>
              <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div className={`relative h-[260px] md:h-[320px] ${accentClasses.soft}`}>
                  <div className="absolute inset-0 opacity-70">
                    <div className="absolute top-8 left-8 w-40 h-40 rounded-full bg-white/70 blur-2xl" />
                    <div className="absolute bottom-8 right-8 w-52 h-52 rounded-full bg-white/70 blur-2xl" />
                    <div className="absolute inset-x-0 top-0 h-1 gl" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                      ElektroactivX Product
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-600 max-w-xl">
                      {form ? `Form: ${form}` : "Industrial conductive polymer solution"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-8 font-light mb-8">
                {description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {code && (
                  <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Product Code</p>
                    <p className="text-base font-semibold text-gray-900">{code}</p>
                  </div>
                )}

                {packSize && (
                  <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Pack Size</p>
                    <p className="text-base font-semibold text-gray-900">{packSize}</p>
                  </div>
                )}

                {leadTime && (
                  <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Lead Time</p>
                    <p className="text-base font-semibold text-gray-900">{leadTime}</p>
                  </div>
                )}
              </div>

              {highlights.length > 0 && (
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-4">
                    Key Highlights
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highlights.map((item) => (
                      <div
                        key={item}
                        className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 w-2.5 h-2.5 rounded-full ${accent === "gold" ? "bg-amber-500" : "bg-green-600"}`} />
                          <p className="text-sm text-gray-700 leading-7">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div className="border border-gray-100 bg-gray-50 rounded-2xl overflow-hidden shadow-sm sticky top-28">
              <div className="px-6 py-5 border-b border-gray-200">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Key Properties
                </p>
              </div>

              {specs.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex justify-between gap-4 px-6 py-4 ${index !== specs.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <span className="text-xs text-gray-500">{row.label}</span>
                  <span className="text-xs font-semibold text-gray-800 text-right">{row.value}</span>
                </div>
              ))}

              <div className="p-6">
                <Link
                  to="/contact_us"
                  className={`inline-flex items-center justify-center w-full px-6 py-3.5 text-white font-medium text-sm tracking-wide rounded-full bg-gradient-to-r ${accentClasses.button}`}
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPLICATIONS */}
      {applications.length > 0 && (
        <section className="w-full border-t border-gray-100 py-20 md:py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-12">
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">
                Applications
              </p>
              <h2
                className="font-light text-gray-900 tracking-tight"
                style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)" }}
              >
                Where this product
                <br />
                <strong className="font-bold">creates value</strong>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {applications.map((item, index) => (
                <Reveal key={item} delay={index * 70}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${accentClasses.soft} ${accentClasses.border} border`}>
                      <span className={`text-lg font-bold ${accentClasses.text}`}>0{index + 1}</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900 mb-2">{item}</p>
                    <p className="text-sm text-gray-500 leading-7">
                      Tailored for advanced industrial use and process-friendly integration.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="w-full px-8 md:px-16 lg:px-24 py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border border-gray-100 bg-black px-8 md:px-12 py-12 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-green-500 blur-3xl" />
              <div className="absolute -bottom-10 right-0 w-52 h-52 rounded-full bg-amber-400 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Need more details?</p>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                  Let’s discuss your application requirements
                </h3>
                <p className="text-white/70 text-sm leading-7 max-w-2xl">
                  Connect with ElektroactivX for product details, technical discussion, and application support.
                </p>
              </div>

              <Link
                to="/contact_us"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-sm tracking-wide rounded-full bg-gradient-to-r from-green-600 to-green-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}