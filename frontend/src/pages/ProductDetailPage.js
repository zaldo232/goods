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
            window.location.href = "/login"; // 또는 navigate("/login")
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
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            });
    }, [id]);

    if (!product) return <div>불러오는 중...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price.toLocaleString()}원</p>
            <p>재고: {product.stock}개</p>
            <button>장바구니 담기</button>
        </div>
    );
};

export default ProductDetailPage;
