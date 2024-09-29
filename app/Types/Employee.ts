// types/Employee.ts
import { Document } from 'mongoose';

export interface IEmployee extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  dateOfBirth: Date;
  startDate: Date;
  address: string;
  status: 'active' | 'inactive' | 'probation'; // Giới hạn các giá trị cho status
  salary: number;
  role: 'Admin' | 'User';
}
