'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ILeave } from '@/app/Types/Leave';
import { FaCalendarAlt, FaClipboardCheck, FaInfoCircle, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa'; // Import biểu tượng từ react-icons
const LeavePage = () => {
  const [leaves, setLeaves] = useState<ILeave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch leaves data when the component mounts
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('/Api/Leaves', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLeaves(response.data.data as ILeave[]);
      } catch (error) {
        console.error('Error fetching leave records:', error);
        setError('Không thể tải danh sách đơn nghỉ phép.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  // Handle status change in the dropdown
  const handleStatusChange = (leaveId: string, newStatus: string) => {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave._id === leaveId ? { ...leave, status: newStatus } : leave
      ) as ILeave[]
    );
  };

  // Update the leave status in the database
  const updateLeaveStatus = async (leaveId: string, status: string) => {
    setUpdating(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.put(
        `/Api/Leaves/${leaveId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Cập nhật trạng thái thành công!');
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      setError('Không thể cập nhật trạng thái.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-8">
    {/* Nút quay lại Dashboard ở góc trái trên cùng */}
    <div className="absolute top-4 left-4">
        <Link href="/Pages/Admin/Dashboard">
            <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
                <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
            </div>
        </Link>
    </div>
      <h1 className="text-4xl font-bold text-white text-center mb-10">Lịch Sử Đơn Nghỉ Phép</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
              <strong className="font-bold">Lỗi! </strong>
              <span>{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
              <strong className="font-bold">Thành công! </strong>
              <span>{successMessage}</span>
            </div>
          )}
          <table className="min-w-full bg-white rounded-lg shadow-lg text-gray-800 border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Tên Nhân Viên</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Loại Nghỉ Phép</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Ngày Bắt Đầu</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Ngày Kết Thúc</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Lý Do</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Trạng Thái</th>
                <th className="py-3 px-6 text-left text-gray-600 uppercase font-semibold text-sm">Cập Nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaves.map((leave) => {
                const startDate = leave.startDate ? new Date(leave.startDate).toLocaleDateString() : 'N/A';
                const endDate = leave.endDate ? new Date(leave.endDate).toLocaleDateString() : 'N/A';

                return (
                  <tr key={leave._id} className="hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                    <td className="py-3 px-6 flex items-center">
                      <FaUserAlt className="text-blue-500 mr-2" />
                      {leave.employeeId && leave.employeeId.name ? leave.employeeId.name : 'N/A'}
                    </td>
                    <td className="py-3 px-6">{leave.leaveType || 'N/A'}</td>
                    <td className="py-3 px-6">{startDate}</td>
                    <td className="py-3 px-6">{endDate}</td>
                    <td className="py-3 px-6">{leave.reason || 'N/A'}</td>
                    <td className="py-3 px-6">
                      <select
                        value={leave.status}
                        onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => updateLeaveStatus(leave._id, leave.status)}
                        className={`px-3 py-1 rounded text-white font-semibold ${
                          leave.status === 'approved'
                            ? 'bg-green-500 hover:bg-green-600'
                            : leave.status === 'pending'
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Cập Nhật'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeavePage;
