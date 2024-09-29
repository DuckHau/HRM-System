// app/Api/Payroll/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Payroll from '@/app/Models/Payroll';
import { checkPermissions } from '@/app/Utils/authMiddleware'; 

// GET: Lấy thông tin bảng lương theo ID (Chỉ dành cho Admin)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const permissionCheck = await checkPermissions(['Admin'])(req);
  if (permissionCheck) return permissionCheck;

  try {
    await dbConnect();
    const payroll = await Payroll.findById(params.id);
    if (!payroll) return NextResponse.json({ success: false, message: 'Payroll record not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: payroll }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
  }
}

// PUT: Cập nhật thông tin bảng lương (Chỉ dành cho Admin)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const permissionCheck = await checkPermissions(['Admin'])(req);
  if (permissionCheck) return permissionCheck;

  try {
    await dbConnect();
    const updateData = await req.json();
    const updatedPayroll = await Payroll.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true });

    if (!updatedPayroll) return NextResponse.json({ success: false, message: 'Payroll record not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: updatedPayroll }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
  }
}

// DELETE: Xóa bản ghi bảng lương (Chỉ dành cho Admin)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const permissionCheck = await checkPermissions(['Admin'])(req);
  if (permissionCheck) return permissionCheck;

  try {
    await dbConnect();
    const deletedPayroll = await Payroll.findByIdAndDelete(params.id);

    if (!deletedPayroll) return NextResponse.json({ success: false, message: 'Payroll record not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Payroll record deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
  }
}
