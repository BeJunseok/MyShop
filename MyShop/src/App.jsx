import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/CartContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const resetSearch = () => setSearchTerm("");

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onSearch={setSearchTerm} resetSearch={resetSearch} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
