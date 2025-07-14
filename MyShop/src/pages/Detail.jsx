import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { fetchProductById } from "../apis/products";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const { id } = useParams(); // URL에서 상품 id 가져오기
  const { addToCart } = useCart(); // 장비구니 추가

  const [quantity, setQuntity] = useState(1); // 구매 수량
  const [liked, setLiked] = useState(false); // 찜 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  // 로딩 중 UI
  if (isLoading) {
    return <div className="mt-36 text-center font-bold text-gray-500">로딩중...</div>;
  }

  if (isError) {
    return (
      <div className="mt-36 text-center font-bold text-gray-500">에러 발생: {error.message}</div>
    );
  }

  // 상품이 없는 경우 예외 처리
  if (!product) {
    return (
      <div className="mt-36 text-center font-bold text-gray-500">상품을 찾을 수 없습니다.</div>
    );
  }

  // 장비구니 상품 추가 + 모달 열기
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsModalOpen(true);
  };

  // 찜 토글
  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  // 수량 감소
  const hanldeDecrease = () => {
    if (quantity > 1) setQuntity((prev) => prev - 1);
  };

  // 수량 증가
  const handleIncrease = () => {
    setQuntity((prev) => prev + 1);
  };

  return (
    <>
      {/* 상세 페이지 */}
      <div className="mt-36 mx-auto px-24 min-w-4xl max-w-6xl">
        <div className=" bg-white rounded-2xl shadow-lg p-4 flex text-black">
          {/* 이미지 */}
          <div className="flex flex-1 items-center">
            <img src={product.productImage} className="w-50 " />
          </div>

          {/* 카테고리 + 찜 버튼 */}
          <div className="flex flex-col flex-1 gap-5 mr-2">
            <div className="flex justify-between">
              <p>{product.category}</p>
              <button onClick={handleLike} className="text-xl">
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            {/* 상품명 + 가격 */}
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <span className="font-semibold">$ {product.price}</span>
            </div>

            <div>
              <p className="text-gray-500 text-sm truncate max-w-sm">{product.description}</p>
            </div>

            {/* 수량 조절 */}
            <div className="flex justify-between">
              <p>구매 수량</p>
              <div className="flex gap-3">
                <button onClick={hanldeDecrease} className="text-xl cursor-pointer">
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button onClick={handleIncrease} className="text-xl cursor-pointer">
                  +
                </button>
              </div>
            </div>

            {/* 총 상품 금액 */}
            <div className="flex justify-between">
              <p>총 상품 금액</p>
              <span>$ {(Number(product.price) * quantity).toLocaleString()}</span>
            </div>

            {/* 장바구니 버튼 */}
            <Button variant="Cart" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* 모달 표시 */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Detail;
