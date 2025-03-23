import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    // 장바구니 불러오기
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

    // 수량 변경
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

    // 장바구니 항목 삭제
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

    return (
        <div style={{ padding: "20px" }}>
            <h2>🛒 내 장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있어요.</p>
            ) : (
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
            )}
        </div>
    );
};

export default CartPage;
