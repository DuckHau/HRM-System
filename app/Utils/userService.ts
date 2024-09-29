// app/Utils/userService.ts
import bcryptjs from 'bcryptjs';
import IEmployee from '@/app/Models/Employee'; // Thay thế đường dẫn theo model User của bạn

// Hàm tìm người dùng bằng email
export async function findUserByEmail(email: string) {
  return await IEmployee.findOne({ email });
}

// Hàm xác minh mật khẩu
export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

// Hàm băm mật khẩu (nếu cần dùng để tạo tài khoản mới)
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return hashedPassword;
}
