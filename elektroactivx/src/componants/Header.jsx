import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "APPLICATIONS", href: "/applications" },
  { label: "BLOGS", href: "/blogs" },
  { label: "CONTACT US", href: "/contact_us" },
];

const productLinks = [
  { label: "Conductive Polymer Dispersion", href: "/products/dispersion" },
  { label: "Polyaniline Emeraldine Base", href: "/products/pani-eb" },
  { label: "PAni-KOT Coating", href: "/products/pani-kot" },
  { label: "Polyaniline Masterbatches", href: "/products/masterbatch" },
  { label: "ORMECON ST Primer", href: "/products/ormecon-st" },
  { label: "ORMECON AL Primer", href: "/products/ormecon-al" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !isHome || scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="ElektroactivX"
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {

            if (link.label === "PRODUCTS") {
              return (
                <div key={link.label} className="relative group">

                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `text-sm font-medium flex items-center gap-1 ${
                        isActive ? "text-emerald-400" : "text-white/80 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                    <span className="text-[10px] mt-[1px]">▾</span>
                  </NavLink>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-[calc(100%+16px)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div
                      className={`w-64 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2
                      ${!isHome || scrolled ? "bg-black/60" : "bg-black/20"}
                    `}
                    >
                      {productLinks.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm ${
                              isActive
                                ? "text-emerald-400 bg-white/5"
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                </div>
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-emerald-400" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } bg-black/80 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">

          {navLinks.map((link) => {
            if (link.label === "PRODUCTS") {
              return (
                <div key={link.label}>

                  {/* Toggle button for PRODUCTS on mobile */}
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className="w-full flex items-center justify-between text-base text-white/80 hover:text-white"
                  >
                    <span>{link.label}</span>
                    <span
                      className="text-xs transition-transform duration-300"
                      style={{ transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Collapsible dropdown */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: productsOpen ? "400px" : "0px", opacity: productsOpen ? 1 : 0 }}
                  >
                    <div className="pl-4 flex flex-col gap-2 border-l border-white/10 mt-2">
                      {productLinks.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          onClick={() => { setMenuOpen(false); setProductsOpen(false); }}
                          className="text-sm text-white/70 hover:text-white"
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                </div>
              );
            }

            return (
              <div key={link.label}>
                <NavLink
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-white/80 hover:text-white"
                >
                  {link.label}
                </NavLink>
              </div>
            );
          })}

        </nav>
      </div>
    </header>
  );
}