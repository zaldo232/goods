import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const res = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("주문 내역 조회 실패:", err);
        alert("주문 내역을 불러오지 못했습니다.");
      }
    };

    fetchOrders();
  }, []);

  const goToOrderDetail = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
      <div style={{ padding: "20px" }}>
        <h2>🧾 나의 주문 내역</h2>
        {orders.length === 0 ? (
            <p>주문 내역이 없습니다.</p>
        ) : (
            <ul>
              {orders.map((order) => (
                  <li
                      key={order.orderId}
                      style={{
                        marginBottom: "20px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                      }}
                  >
                    <h3
                        style={{ color: "#007bff", cursor: "pointer" }}
                        onClick={() => goToOrderDetail(order.orderId)} // 클릭 시 이동
                    >
                      주문 번호: #{order.orderId}
                    </h3>
                    <p>주문 일시: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>총 결제 금액: {order.totalPrice.toLocaleString()}원</p>
                    <p>결제 방식: {order.paymentMethod}</p>
                    <p>상태: {order.status}</p>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default OrdersPage;
