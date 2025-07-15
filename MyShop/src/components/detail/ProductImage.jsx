const ProductImage = ({ product }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <img src={product.ProductImage} alt={product.name} className="w-50" />
    </div>
  );
};

export default ProductImage;
