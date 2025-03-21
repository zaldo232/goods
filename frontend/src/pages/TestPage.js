import React, { useEffect, useState } from "react";
import api from "../api/api";

const TestPage = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/api/test")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                console.error("Error fetching test data:", error);
            });
    }, []);

    return (
        <div>
            <h1>백엔드 연결 테스트</h1>
            <p>{message || "로딩 중..."}</p>
        </div>
    );
};

export default TestPage;
