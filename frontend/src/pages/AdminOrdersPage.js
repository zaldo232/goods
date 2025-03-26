// src/pages/AdminOrdersPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [editStatus, setEditStatus] = useState({});
    const token = localStorage.getItem("admin_jwt");

    // 주문 목록 불러오기
    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setOrders(res.data);
                // 상태 초기값 설정
                const statusMap = {};
                res.data.forEach(order => {
                    statusMap[order.orderId] = order.status;
                });
                setEditStatus(statusMap);
            })
            .catch(err => {
                console.error("❌ 주문 목록 불러오기 실패:", err);
                alert("주문 정보를 불러오지 못했습니다.");
            });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setEditStatus({ ...editStatus, [orderId]: newStatus });
    };

    const updateOrderStatus = async (orderId) => {
        try {
            await axios.put(
                `http://localhost:8080/api/admin/orders/${orderId}/status?status=${editStatus[orderId]}`,
                {}, // Body 없음
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("주문 상태가 변경되었습니다.");
        } catch (err) {
            console.error("❌ 상태 변경 실패:", err);
            alert("상태 변경에 실패했습니다.");
        }
    };

    const statusOptions = ["PENDING", "CONFIRMED", "CANCELLED", "SHIPPED", "DELIVERED"];

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">🧾 주문 목록</h2>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">주문번호</th>
                    <th className="p-2 border">총 금액</th>
                    <th className="p-2 border">결제 방식</th>
                    <th className="p-2 border">상태</th>
                    <th className="p-2 border">변경</th>
                    <th className="p-2 border">주문일</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.orderId}>
                        <td className="p-2 border">{order.orderId}</td>
                        <td className="p-2 border">{order.totalPrice.toLocaleString()}원</td>
                        <td className="p-2 border">{order.paymentMethod}</td>
                        <td className="p-2 border">{order.status}</td>
                        <td className="p-2 border">
                            <select
                                value={editStatus[order.orderId]}
                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                className="border px-2 py-1"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => updateOrderStatus(order.orderId)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                변경
                            </button>
                        </td>
                        <td className="p-2 border">
                            {new Date(order.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrdersPage;
