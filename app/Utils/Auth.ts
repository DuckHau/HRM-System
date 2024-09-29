// utils/Auth.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string): string | JwtPayload | null => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  } 

export const createAccessToken = (user: any) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string, // Đảm bảo biến JWT_SECRET đã được đặt trong .env
      { expiresIn: '100d' } // Access token có thời hạn 1 giờ
    );
  };
export const createRefreshToken = (user: any) => {
    return jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET as string, // Đảm bảo biến JWT_REFRESH_SECRET đã được đặt trong .env
      { expiresIn: '7d' } // Refresh token có thời hạn 7 ngày hoặc tùy chỉnh theo nhu cầu
    );
  };