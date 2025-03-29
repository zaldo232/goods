import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminNoticesPage = () => {
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const token = localStorage.getItem('admin_jwt');
                const res = await axios.get('/api/admin/notices', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNotices(res.data);
            } catch (err) {
                alert('공지 목록을 불러오지 못했습니다.');
            }
        };
        fetchNotices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            const token = localStorage.getItem('admin_jwt');
            await axios.delete(`/api/admin/notices/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotices(notices.filter((n) => n.noticeId !== id));
            alert('삭제되었습니다.');
        } catch (err) {
            alert('삭제 실패');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">공지사항 관리</h2>
                <Link to="/admin/notices/new" className="bg-green-600 text-white px-4 py-2 rounded">+ 새 공지</Link>
            </div>
            {notices.length === 0 ? (
                <p>공지사항이 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {notices.map((notice) => (
                        <li key={notice.noticeId} className="border p-4 rounded shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{notice.title}</p>
                                    <p className="text-xs text-gray-500">
                                        작성일: {new Date(notice.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/notices/${notice.noticeId}/edit`)}
                                        className="text-blue-600 underline"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(notice.noticeId)}
                                        className="text-red-600 underline"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminNoticesPage;
