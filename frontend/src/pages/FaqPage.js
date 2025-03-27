import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await axios.get('/api/faqs'); // 공개 API
                setFaqs(res.data);
            } catch (err) {
                alert('FAQ를 불러오지 못했습니다.');
            }
        };
        fetchFaqs();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">📘 자주 묻는 질문 (FAQ)</h2>
            {faqs.length === 0 ? (
                <p>등록된 FAQ가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {faqs.map((faq) => (
                        <li key={faq.faqId} className="border p-4 rounded shadow">
                            <p className="font-semibold mb-2">Q. {faq.question}</p>
                            <p className="text-gray-700 whitespace-pre-wrap">A. {faq.answer}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FaqPage;
