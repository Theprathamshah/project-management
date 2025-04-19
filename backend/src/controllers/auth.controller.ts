import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../utils/jwt';
import prisma from '../../prisma/client';



export const register = async (req: Request, res: Response): Promise<Response|undefined> => {
  try {
        
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
      
    if (existing) return res.status(400).json({ message: 'Email already in use' });
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
      
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (error) {
        
  }
};

export const login = async (req: Request, res: Response): Promise<Response|undefined> => {
  try {
    const { email, password } = req.body;
    console.log("email and password are", email , password);
    
    const user = await prisma.user.findFirst({ where: { email } });
    console.log('user is', user);
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
      
    const match = await bcrypt.compare(password, user.password);
    console.log('match is', match);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
      
    const accessToken = generateAccessToken(user.id, user.role);
    console.log('access token is', accessToken);
    const refreshToken = generateRefreshToken(user.id, user.role);
    console.log('refresh token is', refreshToken);
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });
      
    res.status(200).json({
      accessToken,
      refreshToken,
    });
        
  } catch (error) {
        
  }
};

export const refresh = async (req: Request, res: Response) : Promise<Response | undefined> => {

  try {
        
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });
      
    try {
      const payload = verifyRefreshToken(refreshToken) as { userId: string };
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
      
      const newAccessToken = generateAccessToken(user.id);
      const newRefreshToken = generateRefreshToken(user.id);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });
      
      res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
  } catch (error) {
        
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
        
    const { userId } = req.body;
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
        
  }
};

export const authApiCheck = async (req: Request, res: Response) => {
  console.log('Auth api check hit');
  try {
    res.status(200).json({ message: 'Auth API is up and working'})
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Internal server error' });
  }
}