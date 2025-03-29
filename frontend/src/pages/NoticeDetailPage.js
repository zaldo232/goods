import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const NoticeDetailPage = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await axios.get(`/api/notices/${id}`);
                setNotice(res.data);
            } catch (err) {
                alert('공지사항을 불러오지 못했습니다.');
            }
        };
        fetchNotice();
    }, [id]);

    if (!notice) return <div className="p-4">로딩 중...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{notice.title}</h2>
            <p className="text-sm text-gray-500 mb-4">작성일: {new Date(notice.createdAt).toLocaleString()}</p>
            <div className="whitespace-pre-wrap">{notice.content}</div>

            <Link to="/notices" className="block mt-6 text-blue-600 underline">
                 공지사항 목록으로 돌아가기
            </Link>
        </div>
    );
};

export default NoticeDetailPage;
