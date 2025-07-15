import { FaRegHeart, FaHeart } from "react-icons/fa";
import ControlQuantity from "./ControlQuantity";
import Button from "../Button";
import TotalPrice from "./TotalPrice";

const ProductInfo = ({
  product,
  liked,
  handleLike,
  quantity,
  handleDecrease,
  handleIncrease,
  handleAddToCart,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-5 mr-2">
      {/* 카테고리 + 찜 버튼 */}
      <div className="flex justify-between ">
        <p>{product.category}</p>
        <button onClick={handleLike} className="text-xl">
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* 상품명 + 가격 */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <span className="font-semibold">{product.price.toLocaleString()} 원</span>
      </div>

      {/* 상품 상세 정보 */}
      <div>
        <p className="text-gray-500 text-sm truncate max-w-sm">{product.description}</p>
      </div>

      {/* 수량 조절 */}
      <ControlQuantity
        quantity={quantity}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />

      <TotalPrice price={product.price} quantity={quantity} />

      <Button variant="Cart" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfo;
