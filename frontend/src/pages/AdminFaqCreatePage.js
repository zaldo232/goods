import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminFaqCreatePage = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.post('/api/admin/faqs', {
                question,
                answer,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            alert('FAQ가 등록되었습니다.');
            navigate('/admin/faqs');
        } catch (err) {
            alert('등록 실패');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">📘 FAQ 등록</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border w-full p-2 mb-2"
                    type="text"
                    placeholder="질문을 입력하세요"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                <textarea
                    className="border w-full p-2 mb-2"
                    rows="6"
                    placeholder="답변을 입력하세요"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">등록</button>
                    <Link to="/admin/faqs" className="text-blue-600 underline self-center">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminFaqCreatePage;
