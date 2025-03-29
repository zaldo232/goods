import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50">
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">결제 취소</h1>
            <p className="text-gray-700">결제가 사용자의 요청으로 취소되었습니다.</p>
            <button
                onClick={() => navigate("/cart")}
                className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                장바구니로 이동
            </button>
        </div>
    );
};

export default PaymentCancel;
