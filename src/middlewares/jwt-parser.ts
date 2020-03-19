import { Request, Response, NextFunction } from 'express';
import { decodeJwt } from '../helpers/auth-helper';
import { findUserById } from '../services/User/user-service';

export default async function jwtParser(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next();
  }
  try {
    const requestToken = authorizationHeader!.split('Bearer ').pop()!.trim();
    const decoded = await decodeJwt(requestToken);
    const user =  findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    switch (error.name) {
      case 'JsonWebTokenError':
        return res.status(401).json({
          error: 'Invalid JWT supplied',
        });
      case 'TokenExpiredError':
        return res.status(401).json({
          error: 'Expired JWT token supplied.',
        });
      default:
        next(error);
    }
  }
}