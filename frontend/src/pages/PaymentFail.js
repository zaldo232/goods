import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
            <h1 className="text-3xl font-bold text-red-600 mb-4">결제 실패 ❌</h1>
            <p className="text-gray-700">결제 중 오류가 발생했습니다.</p>
            <button
                onClick={() => navigate("/cart")}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                장바구니로 이동
            </button>
        </div>
    );
};

export default PaymentFail;
