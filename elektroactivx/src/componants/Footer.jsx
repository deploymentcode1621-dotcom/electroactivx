import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">

          {/* ── Left: Brand + Contact ── */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <a href="/" className="text-white text-3xl font-bold tracking-tight">
              ElektroactivX
            </a>

            <div>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Branch: 604, Ramanbag Society, Shaniwar Peth, Pune, 411030, Maharashtra
              </p>
            </div>

            <a href="tel:+46761309427" className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit">
              +46761309427
            </a>

            <a href="mailto:hi@elektroactivx.com" className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit">
              hi@elektroactivx.com
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">X</a>
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">Facebook</a>
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">Instagram</a>
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">YouTube</a>
            </div>
          </div>

          {/* ── Right: Nav Columns ── */}
          <div className="lg:w-3/4 grid grid-cols-2 gap-10">

            {/* Products */}
            <div>
              <p className="text-white text-sm font-bold mb-4">Products</p>
              <ul className="flex flex-col gap-2">
                {["Cells", "Lithium-ion", "Sodium-ion", "Lithium-metal", "Systems", "Voltpack Core", "Voltpack Mobile System"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About us */}
            <div>
              <p className="text-white text-sm font-bold mb-4">About us</p>
              <ul className="flex flex-col gap-2">
                {["Management", "Stories", "Opinion"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light">© 2025 ElektroactivX. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="text-gray-600 text-xs hover:text-white transition-colors font-light">
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer