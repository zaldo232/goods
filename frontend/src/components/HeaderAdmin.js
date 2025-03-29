import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_jwt');
        navigate('/admin/login');
    };

    return (
        <header className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
            <Link to="/admin/home" className="text-xl font-bold text-white">관리자</Link>

            <nav className="flex gap-4 text-sm">
                <Link to="/admin/products">상품관리</Link>
                <Link to="/admin/categories">카테고리</Link>
                <Link to="/admin/orders">주문관리</Link>
                <Link to="/admin/inquiries">문의관리</Link>
                <Link to="/admin/notices">공지</Link>
                <Link to="/admin/faqs">FAQ</Link>
            </nav>

            <button onClick={handleLogout} className="text-red-400 font-semibold text-sm">
                로그아웃
            </button>
        </header>
    );
};

export default HeaderAdmin;
