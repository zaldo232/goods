import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";  // 메인 페이지 (구현 예정)
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage"; // 폴더 구조에 맞게 경로 수정!
import OrdersPage from "./pages/OrdersPage";
import OrdersDetailPage from "./pages/OrdersDetailPage";
import WishlistPage from "./pages/WishlistPage"
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductListPage from "./pages/AdminProductListPage";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import AdminProductAddPage from "./pages/AdminProductAddPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailPage from "./pages/AdminOrderDetailPage";
import InquiriesPage from './pages/InquiriesPage';
import InquiryDetailPage from './pages/InquiryDetailPage';
import InquiriesNewPage from './pages/InquiriesNewPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import AdminInquiryDetailPage from './pages/AdminInquiryDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/products" element={<ProductsPage />} /> f
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrdersDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/signup" element={<AdminSignupPage />} />
                <Route path="/admin/home" element={<AdminHomePage />} />
                <Route path="/admin/products" element={<AdminProductListPage />} />
                <Route path="/admin/products/edit/:id" element={<AdminProductEditPage />} />
                <Route path="/admin/products/add" element={<AdminProductAddPage />} />
                <Route path="/admin/categories" element={<AdminCategoryPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
                <Route path="/inquiries" element={<InquiriesPage />} />
                <Route path="/inquiries/new" element={<InquiriesNewPage />} />
                <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
                <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
                <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
