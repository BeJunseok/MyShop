import { useState } from "react";
import Button from "./Button";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoginModal } from "./modal/LoginModal";

const ProductCard = ({ id, productImage, category, name, price }) => {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const product = { id, productImage, category, name, price };

  const handleAddToCart = (e) => {
    e.preventDefault(); //상세페이지로 넘어가는 것을 방지
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product, 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 사라짐
  };

  return (
    <>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      <Link to={`/product/${id}`}>
        <div className="relative bg-white rounded-2xl shadow-lg p-4 flex flex-col text-black text-left">
          {showAlert && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 text-sm px-4 py-2 rounded shadow">
              상품이 추가되었습니다!
            </div>
          )}

          <div className="w-full flex justify-center">
            <img src={productImage} alt={name} className="h-32 object-contain mb-4" />
          </div>
          <p className="text-sm text-gray-500">{category}</p>
          <h2 className="text-lg pt-4 font-semibold">{name}</h2>
          <div className="w-full flex justify-between items-center mt-2">
            <p className="text-base font-bold">{price.toLocaleString()} 원</p>
            <Button variant="Cart" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
