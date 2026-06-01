import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import Application from "./pages/Application";
import Blogs from "./pages/Blogs";
import Contact_us from "./pages/Contact_us";

import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./ScrollToTop";

// Product Pages
import PolymerDispersion from "./pages/PolymerDispersion";
import PaniEB from "./pages/products/PaniEB";
import PaniKot from "./pages/products/PaniKot";
import Masterbatch from "./pages/products/Masterbatch";
import OrmeconST from "./pages/products/OrmeconST";
import OrmeconAL from "./pages/products/OrmeconAL";

// Conductive Polymer Dispersion Page
import ConductivePolymerDispersion from "./pages/conductive-polymer-dispersion";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact_us" element={<Contact_us />} />

          {/* Conductive Polymer Dispersion */}
          <Route
            path="/conductive-polymer-dispersion"
            element={<ConductivePolymerDispersion />}
          />

          <Route
            path="/polymerdispersion"
            element={<PolymerDispersion />}
          />

          {/* Product Routes */}
          <Route path="/products/pani-eb" element={<PaniEB />} />
          <Route path="/products/pani-kot" element={<PaniKot />} />
          <Route path="/products/masterbatch" element={<Masterbatch />} />
          <Route path="/products/ormecon-st" element={<OrmeconST />} />
          <Route path="/products/ormecon-al" element={<OrmeconAL />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;