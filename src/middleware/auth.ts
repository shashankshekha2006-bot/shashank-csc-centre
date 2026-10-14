import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user?: DecodedIdToken | { uid: string; email: string; name?: string; role: string };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token' });
  }

  const token = authHeader.split('Bearer ')[1].trim();

  // Check for admin passcode session or Firebase Auth token
  if (token === 'admin-session-shashank-2026') {
    req.user = {
      uid: 'admin_shashank_csc',
      email: 'shashankshekha2006@gmail.com',
      name: 'Shashank Shekhar',
      role: 'admin'
    };
    return next();
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying authorization token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
