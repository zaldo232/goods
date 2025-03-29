import React from "react";
import axios from "axios";

const KakaoPayButton = ({ userId, itemName, totalAmount }) => {
    const handleClick = async () => {
        try {
            const response = await axios.post("/api/payment/kakao/ready", {
                userId,
                itemName,
                totalAmount
            });

            const redirectUrl = response.data.redirectUrl;
            window.location.href = redirectUrl; // 카카오 결제 페이지로 이동
        } catch (error) {
            console.error("카카오페이 결제 실패:", error);
            alert("결제 요청에 실패했습니다.");
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500"
        >
            카카오페이로 결제하기
        </button>
    );
};

export default KakaoPayButton;
