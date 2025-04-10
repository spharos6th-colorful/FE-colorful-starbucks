export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
export interface ApiResponseError {
  code: number;
  status: string;
  message: string;
}
