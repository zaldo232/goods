import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuthStore } from "../store/authStore";
import KakaoLoginButton from "../components/KakaoLoginButton";
import NaverLoginButton from "../components/NaverLoginButton";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/api/auth/login", formData);
            const token = response.data;
            setToken(token);
            localStorage.setItem("jwt", token);
            navigate("/");
        } catch (err) {
            setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">아이디</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="mt-2 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                    >
                        회원가입
                    </button>
                </form>

                {/* ✅ 소셜 로그인 구역 */}
                <div className="mt-6 border-t pt-4 text-center">
                    <p className="text-sm text-gray-500 mb-3">또는 소셜 계정으로 로그인</p>
                    <div className="flex flex-col gap-2">
                        <KakaoLoginButton />
                        <NaverLoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
