import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCart } from "../components/CartContext";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useState } from "react";
import { LoginModal } from "../components/modal/LoginModal";
import { useAuthStore } from "../stores/authStore";

const Cart = () => {
  const { cartItems, removeFromCart, removeMulFromCart } = useCart();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => selectedIds.includes(item.id));

  // 전체 선택 토글
  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((item) => item.id));
    }
  };

  // 개별 선택 토글
  const handleToggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  // 선택된 상품 삭제
  const handleDeleteSelected = () => {
    removeMulFromCart(selectedIds);
    setSelectedIds([]);
  };

  const handleGoShopping = () => {
    navigate("/");
  };

  const handleOrder = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    // 주문 로직 (예시: alert)
    alert("주문이 완료되었습니다!");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-24 text-center">
        <p className="mb-4 text-lg">장바구니가 비어 있습니다.😢</p>
        <Button onClick={handleGoShopping}>쇼핑하러 가기</Button>
      </div>
    );
  }

  // 총 주문 금액 계산
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  return (
    <div className="pt-24 px-6 md:px-10">
      <h1 className="text-3xl font-bold mb-6 border-b-2 border-gray-400 pb-2">장바구니</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div
            className="mb-2 flex items-center justify-between px-4 text-gray-600 font-semibold"
            style={{ width: "100%" }}
          >
            <div style={{ width: "50%" }}></div>
            <div className="text-center flex-1">수량</div>
            <div className="w-32 text-center">가격</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="mb-4 flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4" style={{ width: "50%" }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => {
                    handleToggleItem(item.id);
                  }}
                />
                <img
                  src={item.productImage}
                  alt={item.name}
                  style={{ height: 80, width: 80, objectFit: "contain" }}
                />
                <p className="font-semibold">{item.name}</p>
              </div>

              <p className="flex-1 text-center font-semibold">{item.quantity} 개</p>

              <p className="w-32 text-center font-bold">
                {(item.price * item.quantity).toLocaleString()} 원
              </p>

              <button onClick={() => removeFromCart(item)} className="text-gray-500 cursor-pointer">
                <MdRemoveShoppingCart size={18} />
              </button>
            </div>
          ))}

          <div className="flex justify-between text-sm">
            <div className="flex ">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleToggleAll}
                className="mr-1 accent-blue-500 cursor-pointer"
              />
              <span>전체 선택</span>
            </div>
            <div>
              <button onClick={handleDeleteSelected} className="text-gray-500 cursor-pointer">
                선택 삭제
              </button>
            </div>
          </div>
        </div>

        {/* 주문 요약 박스 */}
        <div className="w-full md:w-64 p-6 bg-gray-200 rounded-lg flex flex-col justify-between mt-4 md:mt-0 md:mr-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-4">주문금액</h2>
            <div className="flex justify-between">
              <span>총 주문 금액:</span>
              <span>{totalPrice.toLocaleString()} 원</span>
            </div>
            <div className="flex justify-between">
              <span>할인 금액:</span>
              <span>{discount.toLocaleString()} 원</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>최종 결제 금액:</span>
              <span>{finalPrice.toLocaleString()} 원</span>
            </div>
          </div>
          <Button className="mt-6" onClick={handleOrder}>
            주문하기
          </Button>
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
