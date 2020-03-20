import { Config } from '../types';
export default function config(): Config {
  switch (process.env.APP_ENV) {
    case 'production':
      return {
        port: process.env.PORT as string,
        logFormat: 'combined',
        jwtSecret: process.env.JWT_SECRET as string,
        dbUrl: process.env.DATABASE_URL as string,
      }
    case 'test': 
      return {
        port: "3000",
        logFormat: 'dev',
        jwtSecret: process.env.JWT_SECRET as string,
        dbUrl: './src/db/test-db.json'
      }
    default:
      return {
        port: "3000",
        logFormat: 'dev',
        jwtSecret: process.env.JWT_SECRET as string,
        dbUrl: './src/db/db.json'
      }
  }
}