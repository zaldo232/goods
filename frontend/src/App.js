import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>홈 페이지</h1>} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </Router>
    );
}

export default App;
