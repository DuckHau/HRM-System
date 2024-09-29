// app/Api/Auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword } from '@/app/Utils/userService';
import { createAccessToken, createRefreshToken } from '@/app/Utils/Auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await findUserByEmail(email);

    // Kiểm tra xem mật khẩu có đúng không
    if (user && await verifyPassword(user.password, password)) {
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      const response = NextResponse.json({ token: accessToken, role: user.role }, { status: 200 });

      // Lưu refresh token trong cookie HTTP-only để bảo mật
      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 ngày
      });

      return response;
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
