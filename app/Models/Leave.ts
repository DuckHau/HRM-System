// app/Models/Leave.ts
import mongoose, { Schema } from 'mongoose';
import { ILeave } from '@/app/Types/Leave';

// Tạo schema cho Leave với tham chiếu đến Employee
const LeaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }, // Tham chiếu đến mô hình Employee
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', required: true },
});

// Export model
export default mongoose.models.Leave || mongoose.model('Leave', LeaveSchema);
