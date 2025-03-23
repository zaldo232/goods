import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
    const { id } = useParams(); // URL에서 ID 추출
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = "/login";
            return;
        }

        axios
            .get(`http://localhost:8080/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("상품 상세 오류:", err);
                if (err.response?.status === 401) {
                    alert("토큰이 유효하지 않아요. 다시 로그인해주세요.");
                    localStorage.removeItem("jwt");
                    window.location.href = "/login";
                }
            });
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.post(
                "http://localhost:8080/api/cart/add",
                {
                    productId: product.productId,
                    quantity: 1, // 기본 수량 1개
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("장바구니에 담았습니다!");
        } catch (err) {
            console.error("장바구니 담기 실패:", err);
            alert("장바구니 담기에 실패했습니다.");
        }
    };

    if (!product) return <div>불러오는 중...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price.toLocaleString()}원</p>
            <p>재고: {product.stock}개</p>
            <button onClick={handleAddToCart}>장바구니 담기</button>
        </div>
    );
};

export default ProductDetailPage;
