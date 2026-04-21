import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";

// import Dispersion from "./pages/products/Dispersion";
import PaniEB from "./pages/products/PaniEB";
import PaniKot from "./pages/products/PaniKot";
import Masterbatch from "./pages/products/Masterbatch";
import OrmeconST from "./pages/products/OrmeconST";
import OrmeconAL from "./pages/products/OrmeconAL";

import Blogs from "./pages/Blogs";
import Contact_us from "./pages/Contact_us";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Application from "./pages/Application";
import MainLayout from "./layouts/MainLayout";
import PolymerDispersion from "./pages/PolymerDispersion";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />   {/* 👈 add here */}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />

          {/* <Route path="/products/dispersion" element={<Dispersion />} /> */}
          <Route path="/products/pani-eb" element={<PaniEB />} />
          <Route path="/products/pani-kot" element={<PaniKot />} />
          <Route path="/products/masterbatch" element={<Masterbatch />} />
          <Route path="/products/ormecon-st" element={<OrmeconST />} />
          <Route path="/products/ormecon-al" element={<OrmeconAL />} />

          <Route path="/applications" element={<Application />} />
          <Route path="/polymerdispersion" element={<PolymerDispersion />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact_us" element={<Contact_us />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;