// src/pages/AdminProductAddPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProductAddPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "", // 🔥 카테고리 ID 저장
    });
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]); // 🔥 카테고리 목록 저장

    const token = localStorage.getItem("admin_jwt");

    // 🔍 카테고리 목록 불러오기
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => {
                console.error("❌ 카테고리 불러오기 실패:", err);
                alert("카테고리 목록을 불러올 수 없습니다.");
            });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product", JSON.stringify(form));

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            await axios.post("http://localhost:8080/api/products/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("상품이 등록되었습니다!");
            navigate("/admin/products");
        } catch (err) {
            console.error("❌ 상품 등록 실패:", err);
            alert("상품 등록에 실패했습니다.");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">상품 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <input name="name" value={form.name} onChange={handleChange} placeholder="상품명" className="w-full p-2 border" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="설명" className="w-full p-2 border" />
                <input name="price" value={form.price} onChange={handleChange} placeholder="가격" type="number" className="w-full p-2 border" />
                <input name="stock" value={form.stock} onChange={handleChange} placeholder="재고" type="number" className="w-full p-2 border" />

                {/* ✅ 카테고리 드롭다운 */}
                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full p-2 border"
                    required
                >
                    <option value="">카테고리 선택</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>

                <input type="file" multiple onChange={handleImageChange} className="w-full p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    상품 등록
                </button>
            </form>
        </div>
    );
};

export default AdminProductAddPage;
