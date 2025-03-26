import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InquiriesNewPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.post('/api/inquiries', {
                title,
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('문의가 등록되었습니다.');
            navigate('/inquiries');
        } catch (err) {
            alert('문의 등록에 실패했습니다.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">문의 작성</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border w-full p-2 mb-2"
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="border w-full p-2 mb-2"
                    rows="6"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">작성하기</button>
            </form>
        </div>
    );
};

export default InquiriesNewPage;
