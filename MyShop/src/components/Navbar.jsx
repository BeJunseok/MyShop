import { Link } from "react-router-dom";
import FrameCart from "../assets/FrameCart.svg";
import FrameProfile from "../assets/FrameProfile.svg";
import FrameHamburger from "../assets/FrameHamburger.svg";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { LoginModal } from "./modal/LoginModal";
import { useAuthStore } from "../stores/authStore";

const Navbar = ({ onSearch, resetSearch, hideSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
    // else: 링크 이동
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-black text-white px-10 items-center z-50 border-b border-gray-200">
        <div className="flex items-center space-x-10">
          <Link to="/" onClick={resetSearch} className="font-bold text-xl cursor-pointer">
            MyShop
          </Link>
          <Link to="/Profile">
            <img src={FrameProfile} alt="profile" className="w-6 h-6" />
          </Link>
          <Link to="/Cart" onClick={handleCartClick}>
            <img src={FrameCart} alt="cart" className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex-grow flex justify-center">
          {!hideSearch && <SearchBar onSearch={onSearch} />}
        </div>

        <div>
          {isLoggedIn ? (
            <button onClick={clearAuth} className="text-white">
              Logout
            </button>
          ) : (
            <Link to="/signin" className="text-white">
              sign in
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden fixed top-0 left-0 right-0 h-20 bg-black text-white px-6 items-center justify-between z-50 border-b border-gray-600">
        <Link to="/" onClick={resetSearch} className="font-bold text-xl cursor-pointer">
          MyShop
        </Link>
        <div className="flex-grow flex justify-center">
          {!hideSearch && <SearchBar onSearch={onSearch} />}
        </div>
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          <img src={FrameHamburger} alt="hamburger" className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile SideBar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-36 bg-black transform transition-transform duration-100 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <Link
          to="/"
          onClick={() => {
            resetSearch();
            setIsOpen(false);
          }}
          className="block text-white font-bold text-xl px-4 py-4"
        >
          MyShop
        </Link>

        <div className="flex flex-col items-center pt-24 space-y-6">
          <Link to="/signin" className="text-white">
            sign in
          </Link>
          <Link to="/Profile">
            <img src={FrameProfile} alt="profile" className="w-6 h-6" />
          </Link>
          <Link to="/Cart" onClick={handleCartClick}>
            <img src={FrameCart} alt="cart" className="w-6 h-6" />
          </Link>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;
