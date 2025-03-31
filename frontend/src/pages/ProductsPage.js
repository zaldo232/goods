import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState(""); // 🔍 검색어
    const [categoryId, setCategoryId] = useState(""); // 🧩 카테고리 ID
    const [categories, setCategories] = useState([]); // 카테고리 목록

    // 전체 상품 목록
    useEffect(() => {
        api.get("/api/products")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    console.error("서버 응답이 배열이 아님:", res.data);
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.error("상품 불러오기 실패:", err);
                setProducts([]);
            })
            .finally(() => {
                setLoading(false);
            });

        // 카테고리도 같이 가져오기
        api.get("/api/categories")
            .then((res) => {
                console.log("카테고리 목록 👉", res.data);
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("카테고리 불러오기 실패:", err);
            });
    }, []);

    const handleSearch = () => {
        api.get("/api/products/search", {
            params: {
                keyword: keyword || undefined,
                categoryId: categoryId || undefined,
            },
        })
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("검색 실패:", err);
                setProducts([]);
            });
    };

    if (loading) return <div className="p-8">로딩 중...</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">상품 목록</h2>

            {/* 🔍 검색/필터 영역 */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="상품명 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="px-3 py-2 border rounded w-full md:w-1/2"
                />

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="px-3 py-2 border rounded w-full md:w-1/4 bg-white text-black"
                >
                    <option value="">전체 카테고리</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
                >
                    검색
                </button>
            </div>

            {/* 🛒 상품 목록 */}
            {products.length === 0 ? (
                <p>상품이 없습니다.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.productId}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                        >
                            {product.images.length > 0 && (
                                <img
                                    src={`http://localhost:8080${product.images[0].imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <p className="font-bold text-blue-600 mb-4">
                                {product.price.toLocaleString()}원
                            </p>
                            <Link
                                to={`/products/${product.productId}`}
                                className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                            >
                                상세보기
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
