import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/CartContext";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Detail from "./pages/Detail";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const resetSearch = () => setSearchTerm("");

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout onSearch={setSearchTerm} resetSearch={resetSearch} />}>
            <Route index element={<Home searchTerm={searchTerm} />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
