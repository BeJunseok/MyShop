import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://supersweetcorn.store/products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setLoading(false);
        if (error.response && error.response.status === 500) {
          console.error("Error 500: 서버 오류가 발생했습니다");
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchProducts();
  }, []);

  // 검색어가 2글자 이상일 때만 필터 적용, 아니면 전체를 보이게
  const filteredProducts =
    searchTerm.length >= 2
      ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products;

  if (loading) {
    return <div className="mt-36 px-24">로딩 중...</div>;
  }

  if (isError) {
    return <div className="mt-36 px-24 text-red-500">상품을 불러오는 중 오류가 발생했습니다.</div>;
  }

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
}
