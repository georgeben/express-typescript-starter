export interface Config {
  port: string;
  logFormat: string;
  jwtSecret: string;
  dbUrl: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export type Schema = {
  users: User[];
};