import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminInquiryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [responseText, setResponseText] = useState('');

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get(`/api/admin/inquiries/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInquiry(res.data);
            } catch (err) {
                alert('문의 상세 정보를 불러올 수 없습니다.');
            }
        };

        fetchInquiry();
    }, [id]);

    const handleAnswerSubmit = async () => {
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.put(`/api/admin/inquiries/${id}/response`, {
                response: responseText
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('답변이 등록되었습니다.');
            navigate('/admin/inquiries');
        } catch (err) {
            alert('답변 등록에 실패했습니다.');
        }
    };

    if (!inquiry) return <div className="p-4">로딩 중...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">문의 상세</h2>
            <p className="font-semibold mb-1">제목: {inquiry.title}</p>
            <p className="whitespace-pre-wrap mb-4">내용: {inquiry.content}</p>

            <h3 className="text-lg font-semibold mt-6">관리자 답변</h3>
            {inquiry.status === 'ANSWERED' ? (
                <p className="mt-2 whitespace-pre-wrap text-gray-700">{inquiry.response}</p>
            ) : (
                <div className="mt-2">
          <textarea
              className="border w-full p-2 mb-2"
              rows="5"
              placeholder="답변을 입력하세요..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
          />
                    <button
                        onClick={handleAnswerSubmit}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        답변 등록
                    </button>
                </div>
            )}

            <Link to="/admin/inquiries" className="block mt-6 text-blue-600 underline">
                ← 목록으로 돌아가기
            </Link>
        </div>
    );
};

export default AdminInquiryDetailPage;
