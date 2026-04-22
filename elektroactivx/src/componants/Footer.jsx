import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_0.8fr] gap-12 lg:gap-12">
          
          {/* Column 1: Logo + India HQ */}
          <div className="flex flex-col gap-5">
            <a href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="ElektroactivX"
                className="h-12 w-auto object-contain"
              />
            </a>

            <div>
              <p className="text-white text-sm font-bold mb-4">India (HQ)</p>
              <p className="text-gray-400 text-sm leading-7">
                Elektroactivx Private Limited <br />
                Lower Gangapara, Behind Circuit House <br />
                Dibrugarh, Assam, 786125 India
              </p>
            </div>
          </div>

          {/* Column 2: Pune Branch */}
          <div>
            <p className="text-white text-sm font-bold mb-4">India (Branch)</p>

            <p className="text-gray-400 text-sm leading-7">
              604, Ramanbag Society <br />
              Shaniwar Peth <br />
              Pune, 411030 <br />
              Maharashtra
            </p>

            <a
              href="tel:+919028004416"
              className="flex items-center gap-2 text-white text-sm underline underline-offset-4 mt-4 hover:text-emerald-400 transition-colors"
            >
              <FaPhoneAlt className="text-xs" />
              + 91 9028004416
            </a>

            <a
              href="mailto:info@Elektroactivx.co"
              className="flex items-center gap-2 text-white text-sm underline underline-offset-4 mt-2 hover:text-emerald-400 transition-colors break-all"
            >
              <FaEnvelope className="text-xs" />
              info@elektroactivx.com
            </a>
          </div>

          {/* Column 3: Germany */}
          <div>
            <p className="text-white text-sm font-bold mb-4">Germany</p>

            <p className="text-gray-400 text-sm leading-7">
              Am Wischhof 38a <br />
              D-22941 Jersbek OT <br />
              Klein Hansdorf <br />
              Germany
            </p>
          </div>

          {/* Column 4: Products */}
          <div>
            <p className="text-white text-sm font-bold mb-4">Products</p>

            <ul className="flex flex-col gap-3">
              {[
                "Polyaniline Emeraldine Base",
                "PAni-KOT Coating",
                "Polyaniline Masterbatches",
                "ORMECON ST Primer",
                "ORMECON AL Primer",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm leading-6 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: About us */}
          <div>
            <p className="text-white text-sm font-bold mb-4">About us</p>

            <ul className="flex flex-col gap-3">
              {["Management", "Stories"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm leading-6 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light">
            © 2026 ElektroactivX. All rights reserved.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 text-xs hover:text-white transition-colors font-light"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;