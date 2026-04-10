import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <>
      <Header />

      <main className={isHome ? "" : "pt-20"} style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
export default MainLayout;
