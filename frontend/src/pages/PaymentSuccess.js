import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-600 mb-4">결제 성공</h1>
            <p className="text-gray-700">결제가 정상적으로 완료되었습니다.</p>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                홈으로 이동
            </button>
        </div>
    );
};

export default PaymentSuccess;
