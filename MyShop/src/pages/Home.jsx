import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const Home = ({ searchTerm }) => {
  // 검색어가 2글자 이상일 때만 필터 적용, 아니면 전체를 보이게
  const filteredProducts =
    searchTerm.length >= 2
      ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products;

  return (
    <div className="mt-36 px-24">
      <div className="grid ph:grid-cols-2 dt:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => <ProductCard key={index} {...product} />)
        ) : (
          <p className="text-center col-span-full mt-20 text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
