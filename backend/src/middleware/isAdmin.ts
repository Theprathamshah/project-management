import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { Role } from '@prisma/client';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const payload = verifyAccessToken(token);
    if (typeof payload !== 'string' && payload.role !== Role.ADMIN) {
      return res.status(403).json({
        message: 'User is not admin!'
      });
    }
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
