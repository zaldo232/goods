import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ 추가
import api from "../api/api";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => {
                console.error("상품 불러오기 실패:", err);
            });
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">상품 목록</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.productId}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <p className="font-bold text-blue-600 mb-4">{product.price}원</p>

                        {/* ✅ 상세보기 링크 추가 */}
                        <Link
                            to={`/products/${product.productId}`}
                            className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                        >
                            상세보기
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
