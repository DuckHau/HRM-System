// app/Api/Payroll/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/Utils/dbConnect';
import Payroll from '@/app/Models/Payroll';
import { checkPermissions } from '@/app/Utils/authMiddleware'; 

// POST: Tạo mới bản ghi bảng lương (Chỉ dành cho Admin)
export async function POST(req: NextRequest) {
  const permissionCheck = await checkPermissions(['Admin'])(req);
  if (permissionCheck) return permissionCheck;

  try {
    await dbConnect();
    const payrollData = await req.json();
    const payroll = new Payroll(payrollData);
    await payroll.save();

    return NextResponse.json({ success: true, data: payroll }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
  }
}

// GET: Lấy tất cả các bản ghi bảng lương (Chỉ dành cho Admin)
export async function GET(req: NextRequest) {
  const permissionCheck = await checkPermissions(['Admin'])(req);
  if (permissionCheck) return permissionCheck;

  try {
    await dbConnect();
    const payrolls = await Payroll.find();
    return NextResponse.json({ success: true, total: payrolls.length, data: payrolls }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
  }
}
