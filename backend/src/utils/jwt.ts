import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string, role: string) => {
  console.log('generate access token', JWT_ACCESS_SECRET, userId, role);
    
  return jwt.sign({userId, role}, JWT_ACCESS_SECRET, {expiresIn: '15m'})
};

export const generateRefreshToken = (userId: string, role:string) => {
  return jwt.sign({ userId, role }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
