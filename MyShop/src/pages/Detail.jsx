import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../components/CartContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuntity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = products.find((p) => String(p.id) === id);
    setProduct(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="mt-36 text-center font-bold text-gray-500">로딩중...</div>;
  }

  if (!product) {
    return (
      <div className="mt-36 text-center font-bold text-gray-500">상품을 찾을 수 없습니다.</div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsModalOpen(true);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const hanldeDecrease = () => {
    if (quantity > 1) setQuntity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuntity((prev) => prev + 1);
  };

  return (
    <>
      <div className="mt-36 mx-auto px-24 min-w-4xl max-w-6xl">
        <div className=" bg-white rounded-2xl shadow-lg p-4 flex text-black">
          <div className="flex flex-1 items-center">
            <img src={product.productImage} className="w-50 " />
          </div>

          <div className="flex flex-col flex-1 gap-5 mr-2">
            <div className="flex justify-between">
              <p>{product.category}</p>
              <button onClick={handleLike} className="text-xl">
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <span className="font-semibold">$ {product.price}</span>
            </div>

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

            <div className="flex justify-between">
              <p>총 상품 금액</p>
              <span>$ {(Number(product.price) * quantity).toLocaleString()}</span>
            </div>

            <Button variant="Cart" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Detail;
