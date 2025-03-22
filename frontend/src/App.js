import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";  // 메인 페이지 (구현 예정)
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/products" element={<ProductsPage />} /> f
            </Routes>
        </Router>
    );
}

export default App;
