// src/pages/AdminSignupPage.js
import React, { useState } from "react";
import axios from "axios";

const AdminSignupPage = () => {
    const [form, setForm] = useState({ username: "", password: "", email: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/admin/signup", form);
            alert("관리자 회원가입 완료!");
        } catch (err) {
            alert(err.response?.data || "에러 발생");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">관리자 회원가입</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="username" value={form.username} onChange={handleChange} placeholder="아이디" />
                <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="비밀번호" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default AdminSignupPage;
