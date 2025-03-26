import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const InquiryDetailPage = () => {
    const { id } = useParams();
    const [inquiry, setInquiry] = useState(null);

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`/api/inquiries/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInquiry(response.data);
            } catch (err) {
                alert('문의 상세 정보를 불러오지 못했습니다.');
            }
        };

        fetchInquiry();
    }, [id]);

    if (!inquiry) {
        return <div className="p-4">로딩 중...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{inquiry.title}</h2>
            <p className="mb-4 text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>

            <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold">📩 관리자 답변</h3>
                {inquiry.status === 'ANSWERED' ? (
                    <p className="mt-2 whitespace-pre-wrap">{inquiry.response}</p>
                ) : (
                    <p className="text-gray-500">아직 답변이 등록되지 않았습니다.</p>
                )}
            </div>

            <Link to="/inquiries" className="block mt-6 text-blue-600 underline">
                ← 문의 목록으로 돌아가기
            </Link>
        </div>
    );
};

export default InquiryDetailPage;
