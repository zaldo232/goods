import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import OrdersDetailPage from "./pages/OrdersDetailPage";
import WishlistPage from "./pages/WishlistPage";
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
import NoticesPage from './pages/NoticesPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import AdminNoticeCreatePage from './pages/AdminNoticeCreatePage';
import AdminNoticesPage from './pages/AdminNoticesPage';
import AdminNoticeEditPage from './pages/AdminNoticeEditPage';
import FaqPage from './pages/FaqPage';
import AdminFaqCreatePage from './pages/AdminFaqCreatePage';
import AdminFaqsPage from './pages/AdminFaqsPage';
import AdminFaqEditPage from './pages/AdminFaqEditPage';
import HeaderUser from './components/HeaderUser';
import HeaderAdmin from './components/HeaderAdmin';
import OAuthKakaoRedirectPage from './pages/OAuthKakaoRedirectPage';
import OauthNaverRedirectPage from "./pages/OauthNaverRedirectPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";

function App() {
    const isAdmin = localStorage.getItem('admin_jwt');

    return (
        <Router>
            <>
                {isAdmin ? <HeaderAdmin /> : <HeaderUser />}
                <div className="pt-4 px-2 md:px-6">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/products" element={<ProductsPage />} />
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
                        <Route path="/notices" element={<NoticesPage />} />
                        <Route path="/notices/:id" element={<NoticeDetailPage />} />
                        <Route path="/admin/notices/new" element={<AdminNoticeCreatePage />} />
                        <Route path="/admin/notices" element={<AdminNoticesPage />} />
                        <Route path="/admin/notices/:id/edit" element={<AdminNoticeEditPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/admin/faqs/new" element={<AdminFaqCreatePage />} />
                        <Route path="/admin/faqs" element={<AdminFaqsPage />} />
                        <Route path="/admin/faqs/:id/edit" element={<AdminFaqEditPage />} />
                        <Route path="/oauth/kakao" element={<OAuthKakaoRedirectPage />} />
                        <Route path="/oauth/naver" element={<OauthNaverRedirectPage />} />
                        <Route path="/payment/success" element={<PaymentSuccess />} />
                        <Route path="/payment/fail" element={<PaymentFail />} />
                        <Route path="/payment/cancel" element={<PaymentCancel />} />
                    </Routes>
                </div>
            </>
        </Router>
    );
}

export default App;
