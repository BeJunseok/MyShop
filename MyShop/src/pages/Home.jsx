import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
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
        setProducts(data || []);
      } catch (error) {
        // handleApiError에서 한글 메시지로 throw됨
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
