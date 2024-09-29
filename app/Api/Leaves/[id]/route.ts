import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Leave from '@/app/Models/Leave';

// GET method for fetching a specific leave request by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    try {
        const leave = await Leave.findById(params.id); // Lấy đơn nghỉ phép theo ID
        if (!leave) {
            return NextResponse.json({ success: false, message: 'Leave request not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: leave }, { status: 200 });
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

// PUT method for updating leave request by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params; // Lấy ID từ params

    // Lấy dữ liệu từ body
    const body = await req.json();

    try {
        // Cập nhật đơn nghỉ phép và trả về dữ liệu đã cập nhật
        const updatedLeave = await Leave.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        // Nếu không tìm thấy đơn nghỉ phép
        if (!updatedLeave) {
            return NextResponse.json({ success: false, message: 'Leave request not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedLeave }, { status: 200 });
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

// DELETE method for deleting leave request by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();

    const { id } = params; // Lấy ID từ params

    if (!id) {
        return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    try {
        const deletedLeave = await Leave.findByIdAndDelete(id);
        if (!deletedLeave) {
            return NextResponse.json({ success: false, error: "Leave request not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Leave request deleted successfully" }, { status: 200 });
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

