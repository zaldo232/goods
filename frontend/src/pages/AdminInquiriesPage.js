import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminInquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get('/api/admin/inquiries', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInquiries(res.data);
            } catch (err) {
                alert('문의 목록을 불러오지 못했습니다.');
            }
        };

        fetchInquiries();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">전체 문의 목록</h2>
            {inquiries.length === 0 ? (
                <p>문의가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {inquiries.map(inquiry => (
                        <li key={inquiry.inquiryId} className="border p-4 rounded shadow">
                            <Link to={`/admin/inquiries/${inquiry.inquiryId}`} className="font-semibold hover:underline">
                                {inquiry.title}
                            </Link>
                            <p className="text-sm text-gray-600">상태: {inquiry.status}</p>
                            <p className="text-xs text-gray-400">작성일: {new Date(inquiry.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminInquiriesPage;
