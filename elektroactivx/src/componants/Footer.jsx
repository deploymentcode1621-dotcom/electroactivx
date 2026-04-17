import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">

          {/* Left: Brand */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <a href="/" className="flex items-center">
  <img
    src="/images/logo.png"
    alt="ElektroactivX"
    className="h-12 w-auto object-contain"
  />
</a>

            <div className="text-gray-400 text-sm font-light leading-relaxed space-y-3">

  {/* India Address */}
  <div>
    <p className="text-white text-xs font-semibold mb-1">Elektroactivx Private Limited</p>
    <p>
HO: Lower Gangapara, Near Circuit House
Dibrugarh, 786125, Assam
    </p>
  </div>

  {/* Germany Address
  <div>
    <p className="text-white text-xs font-semibold mb-1">Germany</p>
    <p>
      Am Wischhof 38a<br/>
      D-22941 Jersbek OT Klein Hansdorf<br/>
      Germany
    </p>
  </div> */}

</div>

            <a
              href="tel:+46761309427"
              className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit"
            >
              +46761309427
            </a>

            <a
              href="mailto:hi@elektroactivx.com"
              className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit"
            >
Email : info@elektroactivx.com            </a>

            {/* Social Icons */}
            {/* <div className="flex items-center gap-5 mt-3 text-lg">
              <a href="#" className="text-white hover:text-emerald-400"><FaXTwitter /></a>
              <a href="#" className="text-white hover:text-emerald-400"><FaFacebookF /></a>
              <a href="#" className="text-white hover:text-emerald-400"><FaLinkedinIn /></a>
              <a href="#" className="text-white hover:text-emerald-400"><FaInstagram /></a>
              <a href="#" className="text-white hover:text-emerald-400"><FaYoutube /></a>
            </div> */}
          </div>

          {/* Right Section */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Products */}
            <div>
              <p className="text-white text-sm font-bold mb-4">Products</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Conductive Polymer Dispersion",
                  "Polyaniline Emeraldine Base",
                  "PAni-KOT Coating",
                  "Polyaniline Masterbatches",
                  "ORMECON ST Primer",
                  "ORMECON AL Primer",
                  
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm font-light hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <p className="text-white text-sm font-bold mb-4">About us</p>
              <ul className="flex flex-col gap-2">
                {["Management", "Stories"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm font-light hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            {/* <div>
              <p className="text-white text-sm font-bold mb-4">Location</p>

              <iframe
                src="https://www.google.com/maps?q=Ramanbag+Society+Shaniwar+Peth+Pune&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-md"
              ></iframe>

            </div> */}

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light">
            © 2025 ElektroactivX. All rights reserved.
          </p>

          <div className="flex gap-6">
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