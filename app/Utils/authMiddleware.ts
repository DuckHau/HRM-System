// utils/authMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/Utils/Auth'; // Hàm để xác thực JWT
import { findUserByEmail } from '@/app/Utils/userService'; // Hàm để tìm người dùng

// Middleware để kiểm tra quyền
// utils/authMiddleware.ts
export const checkPermissions = (allowedRoles: string[]) => {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    try {
      const decoded = verifyToken(token);

      if (decoded && typeof decoded !== 'string' && 'email' in decoded) {
        const user = await findUserByEmail(decoded.email);

        if (!user || !allowedRoles.includes(user.role)) {
          return NextResponse.json(
            { success: false, message: 'Access denied' },
            { status: 403 }
          );
        }

        req.headers.set('user', JSON.stringify(user)); // Attach user information if necessary
        return undefined; // Trả về undefined nếu user có quyền
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid token structure' },
          { status: 401 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
  };
};
