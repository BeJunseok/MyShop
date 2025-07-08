import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCart } from "../components/CartContext";
import productsData from "../data/products.json";

const Cart = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleGoShopping = () => {
    navigate("/");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="pt-24 text-center">
        <p className="mb-4 text-lg">장바구니가 비어 있습니다.😢</p>
        <Button onClick={handleGoShopping}>쇼핑하러 가기</Button>
      </div>
    );
  }

  console.log(cartItems);
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
            <div className="w-32 text-right">가격</div>
          </div>

          {cartItems.map((item, index) => (
            <div key={index} className="mb-4 flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4" style={{ width: "50%" }}>
                <img
                  src={item.productImage}
                  alt={item.name}
                  style={{ height: 80, width: 80, objectFit: "contain" }}
                />
                <p className="font-semibold">{item.name}</p>
              </div>

              <p className="flex-1 text-center font-semibold">{item.quantity} 개</p>

              <p className="w-32 text-right font-bold">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* 주문 요약 박스 */}
        <div className="w-full md:w-64 p-6 bg-gray-200 rounded-lg flex flex-col justify-between mt-4 md:mt-0 md:mr-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-4">주문금액</h2>
            <div className="flex justify-between">
              <span>총 주문 금액:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>할인 금액:</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>최종 결제 금액:</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button className="mt-6">주문하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
