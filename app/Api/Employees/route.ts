import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Employee from '@/app/Models/Employee';
import { hashPassword } from '@/app/Utils/userService'

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Lấy dữ liệu từ request
        const { email, password, ...otherData } = await req.json();

        // Kiểm tra xem email đã tồn tại chưa
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
        }

        // Băm mật khẩu
        const hashedPassword = await hashPassword(password);

        // Tạo đối tượng nhân viên mới với mật khẩu đã băm
        const employee = new Employee({ ...otherData, email, password: hashedPassword });
        await employee.save();

        return NextResponse.json({ success: true, data: employee }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
// GET method for fetching all employees
export async function GET(req: NextRequest) {
    await dbConnect();

    try {
        const employees = await Employee.find(); // Lấy tất cả nhân viên
        return NextResponse.json({ success: true, total: employees.length, data: employees }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            // Nếu error là một instance của Error, bạn có thể truy cập message
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        } else {
            // Xử lý các loại lỗi khác nếu cần
            return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
        }
    }
}
