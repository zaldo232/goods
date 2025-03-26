import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("CARD"); // ✅ 추가

    const fetchCart = async () => {
        const token = localStorage.getItem("jwt");
        try {
            const res = await axios.get("http://localhost:8080/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(res.data);
        } catch (err) {
            console.error("장바구니 조회 실패:", err);
            alert("장바구니를 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (productId, newQuantity) => {
        const token = localStorage.getItem("jwt");

        try {
            await axios.patch(
                "http://localhost:8080/api/cart/update",
                {
                    productId,
                    quantity: newQuantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCart();
        } catch (err) {
            console.error("수량 변경 실패:", err);
            alert("수량 변경에 실패했습니다.");
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCart();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleOrder = async () => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.post(
                "http://localhost:8080/api/orders",
                { paymentMethod }, // ✅ 선택된 결제 방식 전달
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("주문이 완료되었습니다!");
            window.location.href = "/";
        } catch (err) {
            console.error("주문 실패:", err);
            alert("주문에 실패했습니다.");
        }
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>🛒 내 장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있어요.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li
                                key={item.productId}
                                style={{
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #ccc",
                                    paddingBottom: "10px",
                                }}
                            >
                                <h3>{item.productName}</h3>
                                <p>{item.description}</p>
                                <p>단가: {item.unitPrice.toLocaleString()}원</p>
                                <p>
                                    수량:{" "}
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(item.productId, item.quantity - 1)
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        –
                                    </button>
                                    <strong style={{ margin: "0 10px" }}>{item.quantity}</strong>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(item.productId, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </p>
                                <p>총합: {item.totalPrice.toLocaleString()}원</p>
                                <button
                                    onClick={() => handleDelete(item.productId)}
                                    style={{
                                        backgroundColor: "tomato",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    🗑 삭제
                                </button>
                            </li>
                        ))}
                    </ul>

                    <hr />
                    <h3>🧾 총 결제 금액: {totalPrice.toLocaleString()}원</h3>

                    {/* ✅ 결제 방식 선택 */}
                    <div style={{ marginTop: "20px" }}>
                        <label style={{ marginRight: "10px" }}>결제 방식:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{ padding: "5px" }}
                        >
                            <option value="CARD">카드 결제</option>
                            <option value="BANK_TRANSFER">무통장 입금</option>
                            <option value="KAKAO_PAY">카카오페이</option>
                            <option value="NAVER_PAY">네이버페이</option>
                        </select>
                    </div>

                    <button
                        onClick={handleOrder}
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        🛍 주문하기
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
