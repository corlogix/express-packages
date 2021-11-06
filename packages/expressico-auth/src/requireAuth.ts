import { RequestHandler } from 'express';
import { verifyToken } from './services/jsonwebtoken';

export function requireAuth(): RequestHandler {
  return (req, res, next) => {
    const authorization: string = req.headers?.authorization;
    if(!authorization) {
      res.status(401).json({ msg: "Unauthorized access" });
      return;
    }
    
    const token = authorization.replace("Bearer ", "");
    try {
      const user = verifyToken(token)
      if(user) {
        req.user = user;
        next();
      }
    } catch(err) {
      console.error(err);
      res.status(401).json({ msg: err?.message || "Invalid Token" });
    }
  }
}