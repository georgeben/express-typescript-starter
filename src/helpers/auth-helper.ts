import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index';
const { jwtSecret } = config();

export function hashPassword(password: string, rounds = 10): string {
  const hash = bcrypt.hashSync(password, rounds);
  return hash;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const match = await bcrypt.compare(password, hash);
  return match;
}

export function signJwt(payload: string | object, options?: object): string {
  const token = jwt.sign(payload, jwtSecret, options);
  return token;
}

export function decodeJwt(token: string): any {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
}
