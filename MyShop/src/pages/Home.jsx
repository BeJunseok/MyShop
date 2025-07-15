import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchAllProducts, fetchProductsByName } from "../apis/products";

export default function Home({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        let data;
        if (searchTerm.length >= 2) {
          data = await fetchProductsByName(searchTerm);
        } else {
          data = await fetchAllProducts();
        }

        // 응답 구조에 따라 배열만 추출
        let productArray = [];
        if (Array.isArray(data)) {
          productArray = data;
        } else if (data && Array.isArray(data.products)) {
          productArray = data.products;
        } else if (data && Array.isArray(data.data)) {
          productArray = data.data;
        } else {
          productArray = [];
        }

        setProducts(productArray);
      } catch (error) {
        setProducts([]);
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [searchTerm]);

  if (loading) {
    return <div className="mt-36 px-24">로딩 중...</div>;
  }

  if (errorMsg) {
    return <div className="mt-36 px-24 text-red-500">{errorMsg}</div>;
  }

  return (
    <div className="mt-36 px-24">
      <div className="grid ph:grid-cols-2 dt:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} {...product} />)
        ) : (
          <p className="text-center col-span-full mt-20 text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
