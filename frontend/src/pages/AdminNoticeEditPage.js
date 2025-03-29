import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AdminNoticeEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get(`/api/admin/notices/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                alert('공지 정보를 불러올 수 없습니다.');
            }
        };

        fetchNotice();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.put(`/api/admin/notices/${id}`, {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('수정 완료!');
            navigate('/admin/notices');
        } catch (err) {
            alert('수정 실패');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">공지사항 수정</h2>
            <form onSubmit={handleUpdate}>
                <input
                    className="border w-full p-2 mb-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="border w-full p-2 mb-2"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">수정하기</button>
                    <Link to="/admin/notices" className="text-blue-600 underline self-center">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default AdminNoticeEditPage;
