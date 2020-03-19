export interface Config {
  port: string;
  logFormat: string;
}

export interface ApiResponse {
  message: string;
  data?: any;
  error?: any;
}