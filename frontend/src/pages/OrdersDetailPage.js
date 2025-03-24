import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrdersDetailPage = () => {
    const { id } = useParams(); // 주문 ID 추출
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchOrderItems = async () => {
            const token = localStorage.getItem("jwt");
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/orders/${id}/items`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setItems(res.data);
            } catch (err) {
                console.error("주문 상세 조회 실패:", err);
                alert("주문 상세를 불러오지 못했습니다.");
            }
        };

        fetchOrderItems();
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>📦 주문 상세 내역 #{id}</h2>
            {items.length === 0 ? (
                <p>주문 내역이 없습니다.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li
                            key={item.productId}
                            style={{
                                marginBottom: "20px",
                                borderBottom: "1px solid #ccc",
                                paddingBottom: "10px",
                            }}
                        >
                            <h3>{item.productName}</h3>
                            <p>수량: {item.quantity}개</p>
                            <p>단가: {item.unitPrice.toLocaleString()}원</p>
                            <p>총합: {item.totalPrice.toLocaleString()}원</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersDetailPage;
