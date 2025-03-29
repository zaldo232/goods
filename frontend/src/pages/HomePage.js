import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import RecentProducts from "../components/RecentProducts";

const HomePage = () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            api.get("/api/user/me")
                .then((res) => {
                    setUserInfo(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("유저 정보 불러오기 실패:", err);
                    setError("유저 정보를 불러오는 중 오류가 발생했습니다.");
                    setLoading(false);
                    logout();
                    navigate("/login");
                });
        } else {
            setLoading(false);
        }
    }, [token, logout, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">홈 페이지</h1>

                {loading ? (
                    <p className="text-gray-500">로딩 중...</p>
                ) : token ? (
                    <>
                        <p className="text-green-500">로그인 성공!</p>
                        {error && <p className="text-red-500">{error}</p>}
                        {userInfo ? (
                            <div className="mt-4">
                                <p className="text-gray-700">아이디: <strong>{userInfo.username}</strong></p>
                                <p className="text-gray-700">이메일: <strong>{userInfo.email}</strong></p>
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
            {/* 최근 본 상품 표시 */}
            <RecentProducts />
        </div>
    );
};

export default HomePage;
