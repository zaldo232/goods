import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/reviews/product/${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error("리뷰 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            alert("로그인이 필요합니다.");
            window.location.href = "/login";
            return;
        }

        axios
            .get(`http://localhost:8080/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setProduct(res.data))
            .catch((err) => {
                console.error("상품 상세 오류:", err);
                alert("상품 정보를 불러올 수 없습니다.");
            });

        fetchReviews();
    }, [id]);

    // ✅ 장바구니 담기
    const handleAddToCart = async () => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.post(
                "http://localhost:8080/api/cart/add",
                {
                    productId: product.productId,
                    quantity: 1,
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

    // ✅ 리뷰 작성
    const handleReviewSubmit = async () => {
        const token = localStorage.getItem("jwt");
        try {
            await axios.post(
                "http://localhost:8080/api/reviews",
                {
                    productId: id,
                    rating,
                    content,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("리뷰가 작성되었습니다!");
            setRating(5);
            setContent("");
            fetchReviews();
        } catch (err) {
            console.error("리뷰 작성 실패:", err);
            alert(err.response?.data || "리뷰 작성 중 오류가 발생했습니다.");
        }
    };

    // ✅ 평균 별점 계산
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : null;

    if (!product) return <div>불러오는 중...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>가격: {product.price.toLocaleString()}원</p>
            <p>재고: {product.stock}개</p>
            <button onClick={handleAddToCart}>장바구니 담기</button>

            <hr />
            <h3>📝 리뷰</h3>

            {averageRating && (
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    ⭐ 평균 별점: {averageRating}점 ({reviews.length}개 리뷰)
                </div>
            )}

            <div style={{ marginBottom: "20px" }}>
                <label>
                    평점:
                    <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                        {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>
                                {r}점
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <textarea
                    placeholder="리뷰 내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginTop: "8px" }}
                />
                <button onClick={handleReviewSubmit} style={{ marginTop: "8px" }}>
                    리뷰 등록
                </button>
            </div>

            {reviews.length === 0 ? (
                <p>아직 작성된 리뷰가 없습니다.</p>
            ) : (
                <ul>
                    {reviews.map((review, index) => (
                        <li
                            key={index}
                            style={{
                                borderBottom: "1px solid #ccc",
                                marginBottom: "10px",
                                paddingBottom: "10px",
                            }}
                        >
                            <strong>{review.username}</strong> ⭐ {review.rating}점
                            <p>{review.content}</p>
                            <small>작성일: {new Date(review.createdAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductDetailPage;
