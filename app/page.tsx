// app/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DashboardLandingPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://1office.vn/wp-content/uploads/2020/10/quan-ly-nhan-su-2-e1632800759551.jpg')` }}>
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center text-white px-8">
        
        {/* Header Section */}
        <header className="absolute top-0 left-0 w-full flex justify-center items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-90">
  <h1 className="text-3xl font-bold">Quản Lí Nhân Sự</h1>
</header>

        {/* Main Content */}
        <main className="text-center mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Chào mừng bạn đến với ứng dụng của chúng tôi</h1>
          <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto animate-fade-in">Giải pháp toàn diện giúp doanh nghiệp tối ưu hóa quy trình, nâng cao hiệu suất làm việc, và phát triển đội ngũ nhân tài, từ quản lý dữ liệu nhân sự đến hỗ trợ chiến lược phát triển bền vững</p>
          <Link href="/Pages/Auth/Login">
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 animate-bounce">Bắt đầu thôi nào !!!</button>
          </Link>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-900 bg-opacity-75">
          <p className="text-sm">© 2024 Human Resources Management. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLandingPage;
