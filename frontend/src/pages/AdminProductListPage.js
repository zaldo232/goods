import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        const token = localStorage.getItem("admin_jwt");
        try {
            const res = await axios.get("http://localhost:8080/api/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(res.data);
        } catch (err) {
            console.error("상품 목록 조회 실패:", err);
            alert("상품 목록을 불러오지 못했습니다.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) return;
        const token = localStorage.getItem("admin_jwt");
        try {
            await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("삭제 완료!");
            fetchProducts();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">상품 관리</h2>
            <table className="w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2">ID</th>
                    <th className="p-2">이름</th>
                    <th className="p-2">가격</th>
                    <th className="p-2">재고</th>
                    <th className="p-2">액션</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.productId} className="border-t">
                        <td className="p-2">{product.productId}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.price.toLocaleString()}원</td>
                        <td className="p-2">{product.stock}</td>
                        <td className="p-2">
                            <button
                                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                                onClick={() => navigate(`/admin/products/edit/${product.productId}`)}
                            >
                                수정
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => handleDelete(product.productId)}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductListPage;
