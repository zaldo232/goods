import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const pgToken = searchParams.get("pg_token");
    const tid = sessionStorage.getItem("tid"); // 준비 단계에서 저장했다면
    const orderId = sessionStorage.getItem("orderId");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        const approvePayment = async () => {
            try {
                const response = await axios.get("/api/payment/kakao/approve", {
                    params: {
                        tid,
                        pg_token: pgToken,
                        orderId,
                        userId
                    }
                });

                console.log("✅ 결제 승인 성공", response.data);
                alert("결제가 완료되었습니다!");
                // 여기서 주문 상태 변경 or 주문 완료 페이지 이동
            } catch (err) {
                console.error("❌ 결제 승인 실패", err);
                alert("결제 승인에 실패했습니다.");
            }
        };

        if (pgToken) {
            approvePayment();
        }
    }, [pgToken]);

    return (
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold">결제 진행 중입니다...</h2>
        </div>
    );
};

export default PaymentSuccessPage;
