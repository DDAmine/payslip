import { getErrorMessage } from "../error";

describe("Error Utilities", () => {
  describe("getErrorMessage", () => {
    it("returns string error as-is", () => {
      const result = getErrorMessage("Something went wrong");
      expect(result).toBe("Something went wrong");
    });

    it("extracts message from Error instance", () => {
      const error = new Error("Network error");
      const result = getErrorMessage(error);
      expect(result).toBe("Network error");
    });

    it("extracts message from object with message property", () => {
      const error = { message: "Custom error message" };
      const result = getErrorMessage(error);
      expect(result).toBe("Custom error message");
    });

    it("stringifies object without message property", () => {
      const error = { code: 500, status: "error" };
      const result = getErrorMessage(error);
      expect(result).toBe('{"code":500,"status":"error"}');
    });

    it("returns fallback for null", () => {
      const result = getErrorMessage(null, "Fallback message");
      expect(result).toBe("Fallback message");
    });

    it("returns fallback for undefined", () => {
      const result = getErrorMessage(undefined, "Fallback message");
      expect(result).toBe("Fallback message");
    });

    it("uses default fallback message", () => {
      const result = getErrorMessage(null);
      expect(result).toBe("An unexpected error occurred");
    });

    it("handles number input", () => {
      const result = getErrorMessage(404, "Not found");
      expect(result).toBe("Not found");
    });
  });
});


