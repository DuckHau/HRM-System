// app/Models/Payroll.ts
import { Schema, model, Document } from 'mongoose';

interface IPayroll extends Document {
  employeeId: string; // ID của nhân viên
  salary: number; // Lương cơ bản của nhân viên
  bonus?: number; // Thưởng (nếu có)
  deductions?: number; // Khoản khấu trừ (nếu có)
  totalPay: number; // Tổng tiền lương sau khi tính toán
  paymentDate: Date; // Ngày thanh toán lương
  status: 'pending' | 'paid' | 'failed'; // Trạng thái thanh toán
}

const PayrollSchema: Schema<IPayroll> = new Schema({
  employeeId: { type: String, required: true }, // ID của nhân viên
  salary: { type: Number, required: true }, // Lương cơ bản
  bonus: { type: Number, default: 0 }, // Thưởng, mặc định là 0
  deductions: { type: Number, default: 0 }, // Khoản khấu trừ, mặc định là 0
  totalPay: { type: Number, required: true }, // Tổng tiền lương sau khi tính toán
  paymentDate: { type: Date, required: true }, // Ngày thanh toán lương
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending', // Mặc định là 'pending'
    required: true,
  }, // Trạng thái thanh toán
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

// Export model
const Payroll = model<IPayroll>('Payroll', PayrollSchema);
export default Payroll;
