import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/products")
            .then((res) => {
                console.log("📦 응답 데이터 확인:", res.data);
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    console.error("서버 응답이 배열이 아닙니다:", res.data);
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
    }, []);

    if (loading) return <div className="p-8">로딩 중.</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">상품 목록</h2>

            {products.length === 0 ? (
                <p>상품이 없습니다.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.productId}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                        >
                            {/* 이미지 표시 */}
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
