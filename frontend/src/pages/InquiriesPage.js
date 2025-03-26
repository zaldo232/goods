import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('/api/inquiries', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInquiries(response.data);
            } catch (err) {
                alert('문의 목록을 불러오지 못했습니다.');
            }
        };

        fetchInquiries();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">내 문의 목록</h2>
                <Link to="/inquiries/new" className="text-blue-600 underline">+ 새 문의 작성</Link>
            </div>
            {inquiries.length === 0 ? (
                <p>문의가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {inquiries.map((item) => (
                        <li key={item.inquiryId} className="border p-4 rounded shadow">
                            <Link to={`/inquiries/${item.inquiryId}`} className="font-semibold hover:underline">
                                {item.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                상태: {item.status === 'ANSWERED' ? '답변 완료' : '대기 중'}
                            </p>
                            <p className="text-xs text-gray-400">작성일: {new Date(item.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InquiriesPage;
