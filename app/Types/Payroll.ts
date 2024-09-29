// types/Payroll.ts
import { Document } from 'mongoose';

// app/Types/Payroll.ts
export interface IPayroll extends Document {
  _id: string; // ID của Payroll
  employeeId: string; // ID của nhân viên
  salary: number; // Lương
  bonus?: number; // Thưởng (có thể có)
  deductions?: number; // Khấu trừ (có thể có)
  totalPay: number; // Tổng lương sau khi cộng thưởng và trừ khấu trừ
  paymentDate: string; // Ngày thanh toán
  status: 'pending' | 'paid'; // Trạng thái thanh toán
  createdAt?: string; // Thời gian tạo
  updatedAt?: string; // Thời gian cập nhật
}

