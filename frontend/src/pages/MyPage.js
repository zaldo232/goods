import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const MyPage = () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showChangePw, setShowChangePw] = useState(false);

    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/api/user/me")
            .then((res) => {
                setUserInfo(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("유저 정보 불러오기 실패:", err);
                logout();
                navigate("/login");
            });
    }, [token, logout, navigate]);

    const handleChangePassword = async () => {
        try {
            const res = await api.post("/api/user/change-password", {
                currentPassword: currentPw,
                newPassword: newPw,
            });

            setMessage("✅ 비밀번호 변경 완료!");
            setCurrentPw("");
            setNewPw("");
            setShowChangePw(false);
        } catch (err) {
            console.error(err);
            setMessage("❌ 비밀번호 변경 실패: 현재 비밀번호를 확인하세요.");
        }
    };

    if (loading) return <div className="p-4">불러오는 중...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">마이페이지</h2>

                {/* ✅ 메시지 표시 영역 */}
                {message && (
                    <div
                        className="p-2 mb-4 rounded text-center font-semibold"
                        style={{
                            backgroundColor: message.startsWith("✅") ? "#e0f7e9" : "#fdecea",
                            color: message.startsWith("✅") ? "#2e7d32" : "#c62828",
                        }}
                    >
                        {message}
                    </div>
                )}

                {/* 사용자 정보 */}
                <div className="text-left text-gray-700 space-y-2">
                    <p><strong>아이디:</strong> {userInfo.username}</p>
                    <p><strong>이메일:</strong> {userInfo.email}</p>
                    <p><strong>전화번호:</strong> {userInfo.phoneNumber}</p>
                </div>

                <hr className="my-4" />

                {/* 비밀번호 변경 토글 */}
                <button
                    onClick={() => setShowChangePw(!showChangePw)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
                >
                    비밀번호 변경
                </button>

                {showChangePw && (
                    <div className="mt-4 space-y-2">
                        <input
                            type="password"
                            placeholder="현재 비밀번호"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="새 비밀번호"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={handleChangePassword}
                            className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                        >
                            변경하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
