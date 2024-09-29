# Hệ thống Quản lý Nhân sự (HRM System)

Hệ thống Quản lý Nhân sự (HRM) là một ứng dụng web giúp quản lý nhân viên, lương, và đơn phép. Dự án này được xây dựng bằng **Next.js**, **MongoDB**, và **Tailwind CSS**.

## 🌟 Giới thiệu
Dự án được thiết kế để giúp các công ty quản lý thông tin nhân viên, tính lương, và xử lý các yêu cầu nghỉ phép một cách hiệu quả và chuyên nghiệp được lên ý tưởng và phát triển bởi chủ sở hữu dự án - Tôi - Tiêu Trọng Đức Hậu .

## 🚀 Chức năng chính
- **Quản lý Nhân viên**: Thêm, chỉnh sửa, và xóa thông tin nhân viên.
- **Quản lý Bảng lương**: Quản lý lương, thưởng, và các khoản khấu trừ.
- **Quản lý Đơn phép**: Tạo, phê duyệt, và theo dõi đơn phép.
- **Phân quyền**: Chức năng phân quyền với hai vai trò chính là Admin và User.

## 💻 Cài đặt và Chạy dự án

### Yêu cầu hệ thống
- Node.js (>= 14.x)
- MongoDB (cài đặt cục bộ hoặc sử dụng MongoDB Atlas)

### Cài đặt dự án

1. **Clone dự án**:
   ```bash
   git clone https://github.com/DuckHau/hrm-system.git
   cd hrm-system
2. **Cài đặt các gói cần thiết**:
    1. dependencies (cho Production)
        @heroicons/react
        axios
        bcrypt
        bcryptjs
        dotenv
        jsonwebtoken
        jwt-decode
        mongoose
        next
        next-auth
        react
        react-dom
        react-icons
    2. devDependencies (cho Development)
        @types/bcrypt
        @types/bcryptjs
        @types/jsonwebtoken
        @types/mongoose
        @types/node
        @types/react
        @types/react-dom
        eslint
        eslint-config-next
        postcss
        tailwindcss
        typescript

3. **Cấu hình biến môi trường:**:
**Tạo một tệp .env trong thư mục gốc và cấu hình như sau:**
    **MongoDb** MONGODB_URI=mongodb://localhost:27017/hrm-system
    **JWT** JWT_SECRET=your_jwt_secret_key
    **URL** NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

4. **Chạy dự án**
**Khởi động server** npm run dev

## 📂 Cấu trúc dự án
hrm-system/
│
├── app/                   # Next.js pages & components
│   ├── Api                # Các endpoint API nội bộ
│   ├── Components         # Các thành phần giao diện tái sử dụng
│   ├── Models             # Models của MongoDB
│   ├── Pages              # Các trang chính của ứng dụng
│   ├── Types              # Các kiểu dữ liệu TypeScript dùng trong dự án
│   └── Utils              # Các hàm và tiện ích tái sử dụng
├── node_modules/          # Các gói npm được cài đặt
├── .env                   # Tệp cấu hình biến môi trường
├── .eslint.json           # Cấu hình ESLint
├── .gitignore             # Tệp cấu hình các thư mục/tệp cần bỏ qua khi đẩy lên Git
├── next-env.d.ts          # Tệp cấu hình TypeScript cho Next.js
├── next.config.mjs        # Cấu hình Next.js
├── package.json           # Danh sách các gói npm và các scripts
├── package-lock.json      # Khóa phiên bản các gói npm
├── postcss.config.js      # Cấu hình cho PostCSS
├── README.md              # Tệp hướng dẫn sử dụng dự án
└── public/                # Thư mục chứa các tệp tĩnh (favicon, hình ảnh, ...)

## 📖 Cách sử dụng
**1. Đăng nhập**
Sử dụng tài khoản admin mẫu hoặc đăng ký tài khoản mới.
**2. Quản lý Nhân viên**
Vào mục "Quản lý Nhân viên" để thêm, sửa, hoặc xóa thông tin nhân viên.
**3. Quản lý Bảng lương**
Vào mục "Quản lý Bảng lương" để xem và chỉnh sửa lương của nhân viên.
**4. Quản lý Đơn phép**
Tạo, phê duyệt, hoặc từ chối đơn phép.

## 👤 Tài khoản mẫu
**Hãy add file Json vào Database để được tài khoản đăng nhặp**
    **Admin**
Email: admin@gmail.com
Mật khẩu: admin
    **User**
Email: tuan@gmail.com
Mật khẩu: tuan

**🔗 API Endpoints**
Dưới đây là một số API endpoints chính của dự án:

**Nhân viên**
GET /Api/Employees - Lấy danh sách nhân viên
POST /Api/Employees - Thêm nhân viên mới
PATCH /Api/Employees/:id - Cập nhật thông tin nhân viên
DELETE /Api/Employees/:id - Xóa nhân viên
GET /Api/Employees/:id - Lấy danh sách nhân viên theo id

**Bảng lương**
GET /Api/Payroll - Lấy danh sách bảng lương
POST /Api/Payroll - Tạo bảng lương mới
PATCH /Api/Payroll/:id - Cập nhật bảng lương
DELETE /Api/Payroll/:id - Xóa bảng lương

**Đơn phép**
GET /Api/Leaves - Lấy danh sách đơn phép
POST /Api/Leaves - Tạo đơn phép mới
PATCH /Api/Leaves/:id - Cập nhật đơn phép
DELETE /Api/Leaves/:id - Xóa đơn phép
GET /Api/Employees - Lấy danh sách nhân viên

## 🛠️ Ghi chú
Đảm bảo rằng MongoDB đang chạy trên máy cục bộ hoặc sử dụng kết nối với MongoDB Atlas.
Dự án được phát triển và thử nghiệm với Node.js 14.x.

## 📞 Liên hệ
Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:
**Email** : phqtquin3@gmail.com
**GitHub** : DuckHau