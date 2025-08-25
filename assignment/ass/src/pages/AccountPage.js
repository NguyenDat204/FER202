import React from "react";
import { useAuth } from "../contexts/AuthContext";

function AccountPage() {
    const { user } = useAuth();

    if (!user) return <p className="p-6">Bạn chưa đăng nhập</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
            <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="avatar-img rounded-full mb-4"
            />
            <p><b>Tên:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Username:</b> {user.username}</p>
        </div>
    );
}

export default AccountPage;
