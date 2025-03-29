// src/pages/AdminCategoryPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const token = localStorage.getItem("admin_jwt");

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/categories", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data);
        } catch (err) {
            console.error("카테고리 목록 불러오기 실패:", err);
            alert("카테고리 목록을 불러올 수 없습니다.");
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return alert("카테고리 이름을 입력하세요!");
        try {
            await axios.post(
                "http://localhost:8080/api/categories",
                { categoryName: newCategory },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewCategory("");
            fetchCategories();
        } catch (err) {
            console.error("카테고리 등록 실패:", err);
            alert("카테고리 등록 실패");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCategories();
        } catch (err) {
            console.error("카테고리 삭제 실패:", err);
            alert("카테고리 삭제 실패");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">카테고리 관리</h2>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="새 카테고리 이름"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border p-2"
                />
                <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded">
                    등록
                </button>
            </div>

            <table className="table-auto w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">카테고리명</th>
                    <th className="border px-4 py-2">액션</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((cat) => (
                    <tr key={cat.categoryId}>
                        <td className="border px-4 py-2">{cat.categoryId}</td>
                        <td className="border px-4 py-2">{cat.categoryName}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDeleteCategory(cat.categoryId)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                {categories.length === 0 && (
                    <tr>
                        <td colSpan="3" className="text-center py-4">
                            카테고리가 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategoryPage;
