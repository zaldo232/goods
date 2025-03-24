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
            </Routes>
        </Router>
    );
}

export default App;
