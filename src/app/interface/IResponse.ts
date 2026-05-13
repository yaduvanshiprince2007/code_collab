// types/api-response.ts

export interface IResponse {
  success: boolean;           // Indicates success/failure
  status: number;             // HTTP status code
  message: string | null;     // Human-readable message
  data: unknown;                    // Actual response data
  errors: string | null;         // Validation or error details
  traceId: string | null;     // Trace ID for debugging
}