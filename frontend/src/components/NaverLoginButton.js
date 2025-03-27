// 📁 components/NaverLoginButton.js
import React from "react";

const NAVER_CLIENT_ID = "D97ivFB_S4nieo77_laQ"; // 실제 값으로 교체
const REDIRECT_URI = "http://localhost:3000/oauth/naver";
const STATE = "test1234";

const NaverLoginButton = () => {
    const handleLogin = () => {
        const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`;
        window.location.href = url;
    };

    return (
        <button
            onClick={handleLogin}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mt-2"
        >
            네이버 로그인
        </button>
    );
};

export default NaverLoginButton;
