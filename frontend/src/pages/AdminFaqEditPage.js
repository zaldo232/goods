import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AdminFaqEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get(`/api/admin/faqs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setQuestion(res.data.question);
                setAnswer(res.data.answer);
            } catch (err) {
                alert('FAQ를 불러오지 못했습니다.');
            }
        };
        fetchFaq();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.put(`/api/admin/faqs/${id}`, {
                question,
                answer
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('수정 완료!');
            navigate('/admin/faqs');
        } catch (err) {
            alert('수정 실패');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">FAQ 수정</h2>
            <form onSubmit={handleUpdate}>
                <input
                    className="border w-full p-2 mb-2"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                <textarea
                    className="border w-full p-2 mb-2"
                    rows="6"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">수정</button>
                    <Link to="/admin/faqs" className="text-blue-600 underline self-center">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminFaqEditPage;
