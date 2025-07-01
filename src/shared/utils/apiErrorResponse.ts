// src/shared/utils/apiErrorResponse.ts
import type { ApiResponse } from "../types/ApiResponse";

export function buildErrorResponse<T>(
  message = "Error interno del servidor",
  code = 500
): ApiResponse<T> {
  return {
    code,
    message,
    data: [] as T,
    timestamp: new Date().toISOString(),
    trace_id: crypto.randomUUID?.() || "trace-local-error",
  };
}