// app/Pages/Profile/EditProfile.tsx hoặc pages/profile/edit.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


const EditProfile: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [originalData, setOriginalData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState<string | null>(null);

    // Lấy thông tin từ token
    useEffect(() => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            try {
                // Decode token để lấy thông tin người dùng
                const decoded: any = jwtDecode(token);
                const id = decoded.id; // Giả sử token chứa trường `id`
                setUserId(id); // Lưu userId vào state
            } catch (error) {
                console.error('Error decoding token:', error);
                setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            }
        } else {
            setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
        }
    }, []);

    // Hàm để lấy thông tin cá nhân dựa trên ID
    // Hàm để lấy thông tin cá nhân dựa trên ID
    const fetchUserProfile = async () => {
        if (!userId) return;
    
        try {
            // Gửi request để lấy thông tin cá nhân
            const response = await axios.get(`http://localhost:3000/Api/Employees/${userId}`);
            
            // Log toàn bộ dữ liệu trả về để kiểm tra
            console.log('Dữ liệu trả về từ API:', response.data);
    
            // Trích xuất dữ liệu thực tế từ response.data.data
            const { name, email, phone, address } = response.data.data;
    
            // Cập nhật state chỉ với 4 trường đó
            setFormData({ name, email, phone, address });
            setOriginalData({ name, email, phone, address });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Không thể tải thông tin người dùng. Vui lòng thử lại.');
            setLoading(false);
        }
    };
    


    // Lấy dữ liệu người dùng khi component được render lần đầu
    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    // Xử lý sự thay đổi của các input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý khi người dùng nhấn submit form
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Chỉ gửi các trường đã thay đổi
        const updatedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== originalData[key as keyof typeof originalData])
        );
    
        if (Object.keys(updatedData).length === 0) {
            alert('Không có thông tin nào được thay đổi.');
            return;
        }
    
        try {
            console.log('Sending updated data:', updatedData); // Kiểm tra dữ liệu trước khi gửi
    
            // Gửi request PATCH tới API
            const response = await axios.patch(`http://localhost:3000/Api/Employees/${userId}`, updatedData);
            
            alert('Cập nhật thông tin thành công!');
            setOriginalData(formData); // Cập nhật lại dữ liệu gốc sau khi cập nhật thành công
        } catch (error) {
            console.error('Error updating profile:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response data:', error.response.data); // Kiểm tra phản hồi từ server
                alert(`Lỗi cập nhật: ${error.response.data.message || 'Vui lòng kiểm tra lại dữ liệu'}`);
            } else {
                alert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
            }
        }
    };
    

    // Hiển thị thông báo tải dữ liệu nếu đang tải
    if (loading) {
        return <div className="text-center">Đang tải dữ liệu...</div>;
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="relative p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
            {/* Nút quay lại Dashboard */}
            <div className="absolute top-4 left-4">
                <Link href="/Pages/Employee/Dashboard">
                    <div className="bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer">
                        <FaArrowLeft className="h-6 w-6" /> {/* Icon Back */}
                    </div>
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-white mb-6 text-center">Chỉnh Sửa Thông Tin Cá Nhân</h1>
           
            <form className="space-y-4 bg-white p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 md:w-1/2 mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Sửa Thông Tin Cá Nhân</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Số điện thoại"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Địa chỉ"
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
