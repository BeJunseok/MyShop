import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose }) => {
  const nav = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100">
      <div className="relative bg-white rounded-xl shadow-2xl w-80 p-6 text-center animate-fadeIn">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition hover:cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* 아이콘 */}
        <div className="flex justify-center m-4 text-blue-600">
          <FiShoppingCart size={40} />
        </div>

        {/* 메시지 */}
        <p className="text-lg font-semibold text-gray-800 mb-6">장바구니에 추가되었습니다!</p>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => nav("/")}
            className="text-sm text-blue-600 underline hover:text-blue-900 hover:cursor-pointer"
          >
            쇼핑 계속하기
          </button>

          <button
            onClick={() => nav("/cart")}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:cursor-pointer"
          >
            장바구니 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
