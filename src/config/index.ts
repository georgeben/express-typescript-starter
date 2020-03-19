import { Config } from '../types';
export default function config(): Config {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        port: process.env.PORT as string,
        logFormat: 'combined',
        jwtSecret: process.env.JWT_SECRET as string,
      }
    default:
      return {
        port: "3000",
        logFormat: 'dev',
         jwtSecret: process.env.JWT_SECRET as string,
      }
  }
}