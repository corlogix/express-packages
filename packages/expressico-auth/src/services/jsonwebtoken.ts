import jwt from 'jsonwebtoken';
import context from '../context';

export function signNewToken(payload: any) {
  const { tokenSecret, tokenLife: expiresIn } = context;
  return jwt.sign(payload, tokenSecret, { expiresIn });
}

export function verifyToken(token: string) {
  const { tokenSecret } = context;
  return jwt.verify(token, tokenSecret);
}