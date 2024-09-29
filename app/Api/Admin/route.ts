import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Employee from '@/app/Models/Employee';
import LeaveRequest from '@/app/Models/Leave';

// GET method for admin dashboard summary
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Tổng số nhân viên
        const totalEmployees = await Employee.countDocuments();

        // Số đơn nghỉ phép đang chờ duyệt
        const pendingLeaves = await LeaveRequest.countDocuments({ status: 'pending' });

        // Có thể thêm các dữ liệu khác như: payroll, phòng ban, etc.
        
        return NextResponse.json({
            success: true,
            data: {
                totalEmployees,
                pendingLeaves,
                // Thêm các dữ liệu cần thiết khác
            },
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
