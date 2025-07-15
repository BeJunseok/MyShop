import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { fetchProductById } from "../apis/products";
import { useQuery } from "@tanstack/react-query";

import Modal from "../components/detail/Modal";
import ProductInfo from "../components/detail/ProductInfo";
import ProductImage from "../components/detail/ProductImage";

const Detail = () => {
  const { id } = useParams(); // URL에서 상품 id 가져오기
  const { addToCart } = useCart(); // 장비구니 추가

  const [quantity, setQuantity] = useState(1); // 구매 수량
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

  // 에러 발생시
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
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // 수량 증가
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      {/* 상세 페이지 */}
      <div className="mt-36 mx-auto px-24 min-w-4xl max-w-6xl">
        <div className=" bg-white rounded-2xl shadow-lg p-4 text-black flex">
          <ProductImage product={product} />
          <ProductInfo
            product={product}
            liked={liked}
            handleLike={handleLike}
            quantity={quantity}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {/* 모달 표시 */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Detail;
