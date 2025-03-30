import React from "react";
import { useNavigate } from "react-router-dom";

const RecentProducts = () => {
    const navigate = useNavigate();
    const recent = JSON.parse(localStorage.getItem("recentProducts")) || [];

    if (recent.length === 0) return null;

    return (
        <div className="mt-8 p-4 w-full max-w-4xl bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">최근 본 상품</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recent.map((item) => (
                    <div
                        key={item.id}
                        className="cursor-pointer hover:shadow rounded border p-2"
                        onClick={() => navigate(`/products/${item.id}`)}
                    >
                        <img
                            src={`http://localhost:8080${item.image}`}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded"
                        />
                        <p className="mt-2 text-sm text-center">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentProducts;
