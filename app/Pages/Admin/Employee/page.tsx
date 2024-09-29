// app/Pages/Employee/Management/page.tsx
'use client'; // Đánh dấu là Client Component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IEmployee } from '@/app/Types/Employee';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<IEmployee[] | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        dateOfBirth: '',
        startDate: '',
        address: '',
        status: 'active',
        password: '',
        salary: 0,
        role: 'User', // Thêm trường role với giá trị mặc định là 'user'
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchEmployees = async () => {
        const response = await fetch('/Api/Employees');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const employeeData = { ...formData, salary: parseFloat(formData.salary.toString()) };

        try {
            if (editingId) {
                await axios.put(`/Api/Employees/${editingId}`, employeeData);
                setEditingId(null);
            } else {
                await axios.post('/Api/Employees', employeeData);
            }
            fetchEmployees(); // Cập nhật danh sách sau khi thêm/cập nhật
            setFormData({
                name: '',
                email: '',
                phone: '',
                position: '',
                department: '',
                dateOfBirth: '',
                startDate: '',
                address: '',
                status: 'active',
                password: '',
                salary: 0,
                role: 'user', // Đặt lại role về giá trị mặc định
            });
        } catch (error: unknown) {
            console.error("Error submitting form:", error);
        }
    };

    const handleEdit = (employee: IEmployee) => {
        setFormData({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            position: employee.position,
            department: employee.department,
            dateOfBirth: new Date(employee.dateOfBirth).toISOString().split('T')[0],
            startDate: new Date(employee.startDate).toISOString().split('T')[0],
            address: employee.address,
            status: employee.status,
            password: '',
            salary: employee.salary,
            role: employee.role, // Bao gồm role trong khi chỉnh sửa
        });
        setEditingId(employee._id);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/Api/Employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div className="relative p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
        {/* Nút quay lại trang trước hoặc trang chính ở góc trái trên cùng */}
        <div className="absolute top-4 left-4">
            <Link href="/Pages/Admin/Dashboard">
                <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
                    <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
                </div>
            </Link>
        </div>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Quản Lý Nhân Viên</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Form thêm/cập nhật nhân viên */}
                <form className="space-y-4 bg-white p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 md:col-span-1" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{editingId ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Tên" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="text" name="position" value={formData.position} onChange={handleInputChange} placeholder="Chức vụ" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Phòng ban" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Địa chỉ" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />

                        {/* Thêm trường role */}
                        <select name="role" value={formData.role} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300">
                            <option value="user">User</option>
                            <option value="Admin">Admin</option>
                        </select>

                        <select name="status" value={formData.status} onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300">
                            <option value="active">Kích hoạt</option>
                            <option value="inactive">Ngưng hoạt động</option>
                            <option value="probation">Thử việc</option>
                        </select>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Mật khẩu" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                        <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="Lương" className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300" required />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
                        {editingId ? 'Cập nhật' : 'Thêm nhân viên'}
                    </button>
                </form>

                {/* Bảng danh sách nhân viên */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Danh Sách Nhân Viên</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-600">Tên Nhân Viên</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Chức Vụ</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Trạng Thái</th>
                                    <th className="px-6 py-3 text-left text-gray-600">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employees && employees.map((employee: IEmployee) => (
                                    <tr key={employee._id} className="hover:bg-gray-100 transition duration-300">
                                        <td className="px-6 py-4">{employee.name}</td>
                                        <td className="px-6 py-4">{employee.position}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-white ${employee.status === 'active' ? 'bg-green-500' : employee.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                                {employee.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button onClick={() => handleEdit(employee)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300">Sửa</button>
                                            <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeManagement;
