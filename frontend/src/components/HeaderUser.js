import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderUser = () => {
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">🛍 굿즈몰</Link>

            <nav className="flex gap-4 text-sm text-gray-700">
                <Link to="/products">상품</Link>
                <Link to="/cart">장바구니</Link>
                <Link to="/wishlist">찜</Link>
                <Link to="/orders">주문내역</Link>
                <Link to="/notices">공지사항</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/inquiries">1:1 문의</Link>
            </nav>

            <div className="text-sm">
                {token ? (
                    <>
                        <Link to="/mypage" className="mr-4 text-blue-600 font-semibold">마이페이지</Link>
                        <button onClick={handleLogout} className="text-red-500 font-semibold">로그아웃</button>
                    </>
                ) : (
                    <Link to="/login" className="text-blue-600 font-semibold">로그인</Link>
                )}
            </div>
        </header>
    );
};

export default HeaderUser;
