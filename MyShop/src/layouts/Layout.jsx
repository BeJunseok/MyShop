import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = ({ onSearch, resetSearch }) => {
  const location = useLocation();
  const hideSearch = ["/signin", "/register"].includes(location.pathname);    // SignIn, Register 페이지에서는 SearchBar X

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
