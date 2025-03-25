import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // ✅ 추가

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/admin/login", form);
            localStorage.setItem("admin_jwt", res.data);
            alert("관리자 로그인 성공!");
            navigate("/admin/home"); // ✅ 로그인 후 이동
        } catch (err) {
            alert(err.response?.data || "로그인 실패");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">관리자 로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="username" value={form.username} onChange={handleChange} placeholder="아이디" />
                <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="비밀번호" />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
