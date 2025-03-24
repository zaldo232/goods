import React, { useEffect, useState } from "react";
import axios from "axios";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("jwt");
            try {
                const res = await axios.get("http://localhost:8080/api/wishlist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWishlist(res.data);
            } catch (err) {
                console.error("위시리스트 불러오기 실패:", err);
                alert("찜한 상품 목록을 불러오지 못했습니다.");
            }
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.delete(`http://localhost:8080/api/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWishlist(wishlist.filter((item) => item.productId !== productId));
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("찜 목록에서 삭제에 실패했습니다.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>❤️ 찜한 상품</h2>
            {wishlist.length === 0 ? (
                <p>찜한 상품이 없습니다.</p>
            ) : (
                <ul>
                    {wishlist.map((item) => (
                        <li key={item.productId} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                            <h3>{item.productName}</h3>
                            <p>{item.description}</p>
                            <p>가격: {item.price.toLocaleString()}원</p>
                            <button onClick={() => handleRemove(item.productId)} style={{ color: "red" }}>
                                찜 취소
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishlistPage;
