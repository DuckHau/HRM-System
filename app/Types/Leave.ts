// app/Types/Leave.ts
import { Document, Types } from 'mongoose';

export interface ILeave extends Document{
  _id: string;  // ID của Leave
  employeeId: IEmployeeId;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IEmployeeId {
  _id: string;
  name: string;
}
