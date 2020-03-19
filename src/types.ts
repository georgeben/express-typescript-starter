export interface Config {
  port: string;
  logFormat: string;
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