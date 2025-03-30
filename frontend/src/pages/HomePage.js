import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const HomePage = () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [recommended, setRecommended] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        if (token) {
            api.get("/api/user/me")
                .then((res) => setUserInfo(res.data))
                .catch((err) => {
                    console.error("유저 정보 불러오기 실패:", err);
                    setError("유저 정보를 불러오는 중 오류가 발생했습니다.");
                    logout();
                    navigate("/login");
                })
                .finally(() => setLoading(false));

            // 추천 상품 / 베스트셀러 데이터 요청
            api.get("/api/products/recommended")
                .then((res) => setRecommended(res.data))
                .catch(() => console.log("추천 상품 불러오기 실패"));

            api.get("/api/products/best-sellers")
                .then((res) => setBestSellers(res.data))
                .catch(() => console.log("베스트셀러 불러오기 실패"));
        } else {
            setLoading(false);
        }
    }, [token, logout, navigate]);

    const ProductCard = ({ product }) => (
        <div className="border rounded p-4 shadow hover:shadow-md transition">
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.price.toLocaleString()}원</p>
        </div>
    );


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center mb-8">
                <h1 className="text-2xl font-bold mb-4">홈 페이지</h1>

                {loading ? (
                    <p className="text-gray-500">로딩 중...</p>
                ) : token ? (
                    <>
                        <p className="text-green-500">로그인 성공!</p>
                        {error && <p className="text-red-500">{error}</p>}
                        {userInfo ? (
                            <div className="mt-4">
                                <p className="text-gray-700">
                                    아이디: <strong>{userInfo.username}</strong>
                                </p>
                                <p className="text-gray-700">
                                    이메일: <strong>{userInfo.email}</strong>
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500">유저 정보를 불러올 수 없습니다.</p>
                        )}
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500">로그인이 필요합니다.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            로그인
                        </button>
                    </>
                )}
            </div>

            {/* ✅ 추천 상품 */}
            {recommended.length > 0 && (
                <div className="w-full max-w-6xl mb-12">
                    <h2 className="text-xl font-bold mb-4"> 추천 상품</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {recommended.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {/* ✅ 베스트 셀러 */}
            {bestSellers.length > 0 && (
                <div className="w-full max-w-6xl">
                    <h2 className="text-xl font-bold mb-4"> 베스트 셀러</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {bestSellers.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
