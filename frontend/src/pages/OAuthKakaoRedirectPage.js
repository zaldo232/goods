import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const OAuthKakaoRedirectPage = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            const code = new URL(window.location.href).searchParams.get('code');

            if (!code) {
                alert('카카오 인가 코드가 없습니다.');
                navigate('/login');
                return;
            }

            try {
                const res = await axios.post('/api/oauth/kakao/code', { code });
                const token = res.data.token;

                setToken(token);
                localStorage.setItem('jwt', token);

                alert('카카오 로그인 완료!');
                navigate('/');
            } catch (err) {
                console.error(err);
                alert('카카오 로그인 실패');
                navigate('/login');
            }
        };

        handleKakaoLogin();
    }, [navigate, setToken]);

    return (
        <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
            로그인 처리 중입니다...
        </div>
    );
};

export default OAuthKakaoRedirectPage;
