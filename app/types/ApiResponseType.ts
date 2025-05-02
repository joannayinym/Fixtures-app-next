export interface ApiResponse<T = any> {
  message: string;
  count?: number;
  data?: T;
  error?: string;
}
