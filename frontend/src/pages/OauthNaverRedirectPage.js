import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const OAuthNaverRedirectPage = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();

    useEffect(() => {
        const urlParams = new URL(window.location.href).searchParams;
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        if (code && state) {
            // ✅ 인증 헤더 제거
            delete axios.defaults.headers.common["Authorization"];

            axios
                .post("/api/oauth/naver/code", { code, state })
                .then((res) => {
                    const token = res.data;
                    localStorage.setItem("jwt", token);
                    setToken(token);
                    alert("네이버 로그인 성공");
                    navigate("/");
                })
                .catch((err) => {
                    console.error("네이버 로그인 실패", err);
                    alert("네이버 로그인 실패");
                    navigate("/login");
                });
        }
    }, [navigate, setToken]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">네이버 로그인 처리 중입니다...</p>
        </div>
    );
};

export default OAuthNaverRedirectPage;
