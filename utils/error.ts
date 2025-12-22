/**
 * Extract a readable error message from various error types
 * @param error - Error object, string, or unknown value
 * @param fallback - Fallback message if extraction fails
 */
export function getErrorMessage(
  error: unknown,
  fallback = "An unexpected error occurred"
): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    // Handle objects with message property
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
    // Last resort: stringify the object
    try {
      return JSON.stringify(error);
    } catch {
      return fallback;
    }
  }

  return fallback;
}

