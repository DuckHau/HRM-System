import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Employee from '@/app/Models/Employee';

// POST method for creating a new employee


// GET method for fetching employees or a specific employee by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    try {
        const employee = await Employee.findById(params.id); // Lấy nhân viên theo ID
        if (!employee) {
            return NextResponse.json({ success: false, message: 'Employee not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: employee }, { status: 200 });
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

// PUT method for updating employee by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params; // Lấy ID từ params

    // Lấy dữ liệu từ body
    const body = await req.json();

    try {
        // Cập nhật nhân viên và trả về dữ liệu đã cập nhật
        const updatedEmployee = await Employee.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        // Nếu không tìm thấy nhân viên
        if (!updatedEmployee) {
            return NextResponse.json({ success: false, message: 'Employee not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedEmployee }, { status: 200 });
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
// DELETE method for deleting employee by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params; // Lấy ID từ params

    if (!id) {
        return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return NextResponse.json({ success: false, error: "Employee not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Employee deleted successfully" }, { status: 200 });
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

// PATCH method for partially updating employee by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params; // Extract the ID from params
    const body = await req.json(); // Get the data from the request body

    try {
        // Use findByIdAndUpdate with the $set operator to only update the fields provided in the request
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });

        // If the employee is not found
        if (!updatedEmployee) {
            return NextResponse.json({ success: false, message: 'Employee not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedEmployee }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            // If error is an instance of Error, handle it accordingly
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        } else {
            // Handle any other types of errors
            return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
        }
    }
}
