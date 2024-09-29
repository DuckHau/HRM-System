'use client';
import Link from 'next/link'; // Import Link từ Next.js
import { FaArrowLeft } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

const CreateLeaveRequest = () => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userInfo, setUserInfo] = useState<DecodedToken | null>(null); // Store user info
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token); // Decode the JWT token
      setUserInfo(decoded); // Store the decoded information in the state
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!userInfo) {
        setError('Không tìm thấy thông tin nhân viên. Vui lòng đăng nhập lại.');
        return;
      }

      // Combine the form data with the decoded employee ID
      const dataToSend = {
        employeeId: userInfo.id, // Include the employee ID from the decoded token
        ...formData,
      };

      const response = await axios.post('/Api/Leaves', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Đơn nghỉ phép đã được gửi thành công!');
        setTimeout(() => {
          router.push('/Pages/Employee/Dashboard'); // Redirect to the employee dashboard after success
        }, 2000);
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi gửi đơn nghỉ phép. Vui lòng thử lại.');
      console.error('Error submitting leave request:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-8 flex items-center justify-center">
        {/* Nút quay lại Dashboard ở góc trái trên cùng */}
        <div className="absolute top-4 left-4">
            <Link href="/Pages/Employee/Dashboard">
                <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
                    <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
                </div>
            </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Tạo Đơn Nghỉ Phép</h1>

            {/* Hiển thị thông tin người dùng nếu có */}
            {userInfo && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
                    <p><strong>Nhân viên:</strong> {userInfo.email}</p>
                    <p><strong>Vai trò:</strong> {userInfo.role}</p>
                </div>
            )}

            {/* Hiển thị lỗi nếu có */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Lỗi! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Hiển thị thông báo thành công nếu có */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Thành công! </strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nội dung form vẫn giữ nguyên */}
                <div>
                    <label className="block text-gray-700">Loại Nghỉ Phép</label>
                    <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="" disabled>Chọn loại nghỉ phép</option>
                        <option value="annual">Trường hợp đặc biệt</option>
                        <option value="sick">Nghỉ ốm</option>
                        <option value="maternity">Nghỉ thai sản</option>
                        <option value="unpaid">Nghỉ không lương</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Ngày Bắt Đầu</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Ngày Kết Thúc</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Lý Do Nghỉ Phép</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Gửi Đơn
                </button>
            </form>
        </div>
    </div>
);
};



export default CreateLeaveRequest;
