import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminOrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem("admin_jwt");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setOrder(res.data))
            .catch(err => {
                console.error("❌ 주문 상세 불러오기 실패:", err);
                alert("주문 상세 정보를 불러올 수 없습니다.");
            });
    }, [id]);

    if (!order) return <div>불러오는 중...</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">📦 주문 상세</h2>
            <p><strong>주문번호:</strong> {order.orderId}</p>
            <p><strong>총금액:</strong> {order.totalPrice.toLocaleString()}원</p>
            <p><strong>상태:</strong> {order.status}</p>
            <p><strong>결제 방식:</strong> {order.paymentMethod}</p>
            <p><strong>주문일:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">🛍️ 상품 목록</h3>
            <ul className="list-disc ml-6">
                {order.items.map((item, idx) => (
                    <li key={idx}>
                        {item.productName} - {item.quantity}개 / {item.price.toLocaleString()}원
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOrderDetailPage;
