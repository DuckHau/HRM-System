import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Leave from '@/app/Models/Leave';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Lấy dữ liệu từ request
        const leaveData = await req.json();

        // // Kiểm tra xem yêu cầu nghỉ phép có trùng lặp không
        // const existingLeave = await Leave.findOne({ 
        //     employeeId: leaveData.employeeId, 
        //     leaveType: leaveData.leaveType, 
        //     startDate: leaveData.startDate 
        // });
        
        // if (existingLeave) {
        //     return NextResponse.json({ message: 'Leave request already exists for this date and type' }, { status: 400 });
        // }

        // Tạo đối tượng nghỉ phép mới
        const leave = new Leave(leaveData);
        await leave.save();

        return NextResponse.json({ success: true, data: leave }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// GET method for fetching all leave requests
export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        // Fetch leave records with the employee details populated
        const leaves = await Leave.find().populate('employeeId', 'name'); // Populate only the name field
        return NextResponse.json({ success: true, total: leaves.length, data: leaves }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
        }
    }
}
