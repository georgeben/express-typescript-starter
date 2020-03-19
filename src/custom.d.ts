import { User } from './types';

declare module 'express' {
  export interface Request {
     user?: User
  }
}