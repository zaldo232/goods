import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin_jwt"); // ✅ 토큰 제거
        alert("로그아웃 되었습니다.");
        navigate("/admin/login"); // ✅ 로그인 페이지로 이동
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">관리자 홈</h2>
            <p className="mb-4">관리자 전용 페이지입니다.</p>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                로그아웃
            </button>
        </div>
    );
};

export default AdminHomePage;
