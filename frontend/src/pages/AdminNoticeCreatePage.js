import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminNoticeCreatePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.post('/api/admin/notices', {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('공지사항이 등록되었습니다.');
            navigate('/admin/notices');
        } catch (err) {
            alert('등록에 실패했습니다.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">공지사항 등록</h2>
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
                    rows="8"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">등록</button>
                    <Link to="/admin/notices" className="text-blue-600 underline self-center">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminNoticeCreatePage;
