const TotalPrice = ({ price, quantity }) => {
  return (
    <div className="flex justify-between">
      <p>총 상품 금액</p>
      <span>{(Number(price) * quantity).toLocaleString()} 원</span>
    </div>
  );
};

export default TotalPrice;
