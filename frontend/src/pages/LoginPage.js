import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";  // 백엔드 API 요청
import { useAuthStore } from "../store/authStore";  // 상태 관리

const LoginPage = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();  // JWT 저장 함수
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
            const token = response.data;  // JWT 토큰

            setToken(token);  // ✅ 토큰 저장 (상태 관리)
            localStorage.setItem("jwt", token);  // ✅ 로컬스토리지에도 저장
            navigate("/");  // ✅ 로그인 후 홈으로 이동
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

            </div>
        </div>
    );
};

export default LoginPage;
