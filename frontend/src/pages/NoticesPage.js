import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoticesPage = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get('/api/notices');
                setNotices(res.data);
            } catch (err) {
                alert('공지사항을 불러오지 못했습니다.');
            }
        };
        fetchNotices();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">공지사항</h2>
            {notices.length === 0 ? (
                <p>등록된 공지사항이 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {notices.map((notice) => (
                        <li key={notice.noticeId} className="border p-4 rounded shadow">
                            <Link to={`/notices/${notice.noticeId}`} className="font-semibold text-blue-600 hover:underline">
                                {notice.title}
                            </Link>
                            <p className="text-xs text-gray-500">작성일: {new Date(notice.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticesPage;
