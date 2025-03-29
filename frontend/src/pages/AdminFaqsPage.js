import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminFaqsPage = () => {
    const [faqs, setFaqs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get('/api/admin/faqs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFaqs(res.data);
            } catch (err) {
                alert('FAQ 목록을 불러오지 못했습니다.');
            }
        };
        fetchFaqs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.delete(`/api/admin/faqs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFaqs(faqs.filter(f => f.faqId !== id));
            alert('삭제되었습니다.');
        } catch (err) {
            alert('삭제 실패');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">FAQ 관리</h2>
                <Link to="/admin/faqs/new" className="bg-green-600 text-white px-4 py-2 rounded">
                    + 새 FAQ
                </Link>
            </div>
            {faqs.length === 0 ? (
                <p>등록된 FAQ가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {faqs.map((faq) => (
                        <li key={faq.faqId} className="border p-4 rounded shadow">
                            <p className="font-semibold mb-2">Q. {faq.question}</p>
                            <p className="text-gray-600 whitespace-pre-wrap mb-2">A. {faq.answer}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/faqs/${faq.faqId}/edit`)}
                                    className="text-blue-600 underline"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDelete(faq.faqId)}
                                    className="text-red-600 underline"
                                >
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminFaqsPage;
