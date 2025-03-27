import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLoginButton = () => {
    const REST_API_KEY = '64a07f3f9c23b05fdb4addd7338d6672';
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(REST_API_KEY);
        }

        // 리디렉트 이후 access token 처리
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (code) {
            // 백엔드에 전달
            axios.post('/api/oauth/kakao', { accessToken: code }) // 실제로는 code → token 교환 필요
                .then(res => {
                    localStorage.setItem('jwt', res.data.token);
                    alert('로그인 성공!');
                    window.location.href = '/';
                })
                .catch(err => {
                    console.error(err);
                    alert('로그인 실패');
                });
        }
    }, []);

    const handleLogin = () => {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoAuthUrl;
    };

    return (
        <button onClick={handleLogin} className="bg-yellow-400 px-4 py-2 rounded font-semibold">
            🟡 카카오 로그인
        </button>
    );
};

export default KakaoLoginButton;
