const ControlQuantity = ({ quantity, handleIncrease, handleDecrease }) => {
  return (
    <div className="flex justify-between">
      <p>구매 수량</p>
      <div className="flex gap-3">
        <button onClick={handleDecrease} className="text-xl cursor-pointer">
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button onClick={handleIncrease} className="text-xl cursor-pointer">
          +
        </button>
      </div>
    </div>
  );
};

export default ControlQuantity;
