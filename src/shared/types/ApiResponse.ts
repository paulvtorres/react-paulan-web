// src/shared/types/ApiResponse.ts

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
  trace_id: string;
}