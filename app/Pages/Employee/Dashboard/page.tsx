'use client';

import Link from 'next/link';
import { FaUserEdit, FaFileAlt, FaArrowLeft } from 'react-icons/fa'; // Thêm icon từ react-icons

const UserDashboard = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-8">
      {/* Nút quay lại Dashboard */}
      <div className="absolute top-4 left-4">
        <Link href="/Pages/Auth/Login">
          <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
            <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
          </div>
        </Link>
      </div>

      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl mx-auto transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">User Dashboard</h1>
        
        {/* Navigation Links with Icons */}
        <div className="flex flex-col space-y-6">
          <Link href="/Pages/Employee/Profile">
            <div className="p-6 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl text-white font-bold text-center cursor-pointer flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <FaUserEdit className="text-2xl" /> <span>Edit Profile</span>
              </span>
              <FaUserEdit className="text-2xl opacity-20" />
            </div>
          </Link>

          <Link href="/Pages/Employee/Leave">
            <div className="p-6 bg-green-500 hover:bg-green-600 rounded-xl shadow-xl text-white font-bold text-center cursor-pointer flex items-center justify-between transform hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <FaFileAlt className="text-2xl" /> <span>Submit Leave Request</span>
              </span>
              <FaFileAlt className="text-2xl opacity-20" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
