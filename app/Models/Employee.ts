// models/Employee.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IEmployee {
  email: string;
  password: string;
}
const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  startDate: { type: Date, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'probation'], required: true },
  password: { type: String, required: true },
  salary: { type: Number, required: true },
  role: { type: String, required: true, default:"User", enum: ['Admin', 'User'] }
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)
