'use client';

import Link from 'next/link';
import { FaUserTie, FaMoneyCheckAlt, FaClipboardList, FaArrowLeft } from 'react-icons/fa';

const DashboardPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
      {/* Nút quay lại trang trước hoặc trang chính ở góc trái trên cùng */}
      <div className="absolute top-4 left-4">
        <Link href="/Pages/Auth/Login">
          <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
            <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
          </div>
        </Link>
      </div>

      {/* Nội dung Dashboard */}
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Admin Dashboard</h1>
        
        {/* Các liên kết điều hướng được sắp xếp theo chiều dọc */}
        <div className="flex flex-col space-y-6">
          {/* Quản lý Nhân viên */}
          <Link href="/Pages/Admin/Employee">
            <div className="p-6 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl text-white font-bold text-center cursor-pointer flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <FaUserTie className="text-2xl" /> <span>Quản lý Nhân viên</span>
              </span>
              <FaUserTie className="text-2xl opacity-20" />
            </div>
          </Link>

          {/* Quản lý Bảng lương */}
          <Link href="/Pages/Admin/Payroll">
            <div className="p-6 bg-green-500 hover:bg-green-600 rounded-xl shadow-xl text-white font-bold text-center cursor-pointer flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <FaMoneyCheckAlt className="text-2xl" /> <span>Quản lý Bảng lương</span>
              </span>
              <FaMoneyCheckAlt className="text-2xl opacity-20" />
            </div>
          </Link>

          {/* Quản lý Đơn phép */}
          <Link href="/Pages/Admin/LeaveRequest">
            <div className="p-6 bg-red-500 hover:bg-red-600 rounded-xl shadow-xl text-white font-bold text-center cursor-pointer flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <FaClipboardList className="text-2xl" /> <span>Quản lý Đơn phép</span>
              </span>
              <FaClipboardList className="text-2xl opacity-20" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
