import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = ({ onSearch, resetSearch }) => {
  const location = useLocation();
  const hideSearch = ["/signin"].includes(location.pathname);

  return (
    <>
      <Navbar onSearch={onSearch} resetSearch={resetSearch} hideSearch={hideSearch} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
