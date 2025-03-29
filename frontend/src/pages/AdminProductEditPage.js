import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    const [images, setImages] = useState([]);
    const token = localStorage.getItem("admin_jwt");

    // 기존 상품 정보 불러오기
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const { name, description, price, stock } = res.data;
                setForm({ name, description, price, stock });
            })
            .catch((err) => {
                console.error("상품 조회 실패:", err);
                alert("상품 정보를 불러올 수 없습니다.");
            });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("product", JSON.stringify(form));
        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axios.put(`http://localhost:8080/api/admin/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("상품이 수정되었습니다!");
            navigate("/admin/products");
        } catch (err) {
            console.error("상품 수정 실패:", err);
            alert("수정에 실패했습니다.");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">상품 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="상품명"
                    className="w-full p-2 border"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="설명"
                    className="w-full p-2 border"
                />
                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="가격"
                    type="number"
                    className="w-full p-2 border"
                />
                <input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="재고"
                    type="number"
                    className="w-full p-2 border"
                />

                {/* 이미지 업로드 */}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border"
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    수정 완료
                </button>
            </form>
        </div>
    );
};

export default AdminProductEditPage;
