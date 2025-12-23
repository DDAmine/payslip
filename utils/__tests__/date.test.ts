import { Payslip, FileType, SortOrder } from "../../types";
import {
  formatDate,
  formatPeriod,
  getMonthLabel,
  getYear,
  getUniqueYears,
  sortPayslipsByDate,
  filterPayslipsByYear,
  filterPayslipsByText,
} from "../date";

describe("Date Utilities", () => {
  describe("formatDate", () => {
    it("formats date in short format", () => {
      const result = formatDate("2024-12-15", "short");
      expect(result).toBe("Dec 15");
    });

    it("formats date in medium format", () => {
      const result = formatDate("2024-12-15", "medium");
      expect(result).toBe("Dec 15, 2024");
    });

    it("formats date in long format", () => {
      const result = formatDate("2024-12-15", "long");
      expect(result).toBe("December 15, 2024");
    });

    it("defaults to medium format", () => {
      const result = formatDate("2024-06-01");
      expect(result).toBe("Jun 1, 2024");
    });
  });

  describe("formatPeriod", () => {
    it("formats period with short dates", () => {
      const result = formatPeriod("2024-12-01", "2024-12-31");
      expect(result).toBe("Dec 1 – Dec 31");
    });

    it("handles different months", () => {
      const result = formatPeriod("2024-01-15", "2024-02-15");
      expect(result).toBe("Jan 15 – Feb 15");
    });
  });

  describe("getMonthLabel", () => {
    it("returns month and year", () => {
      const result = getMonthLabel("2024-12-15");
      expect(result).toBe("December 2024");
    });

    it("works for different months", () => {
      expect(getMonthLabel("2023-06-01")).toBe("June 2023");
      expect(getMonthLabel("2024-01-31")).toBe("January 2024");
    });
  });

  describe("getYear", () => {
    it("extracts year from date string", () => {
      expect(getYear("2024-12-01")).toBe(2024);
      expect(getYear("2023-06-15")).toBe(2023);
    });
  });

  describe("getUniqueYears", () => {
    const mockPayslips: Payslip[] = [
      { id: "1", fromDate: "2024-12-01", toDate: "2024-12-31", file: "test.pdf", fileType: FileType.PDF },
      { id: "2", fromDate: "2024-06-01", toDate: "2024-06-30", file: "test.pdf", fileType: FileType.PDF },
      { id: "3", fromDate: "2023-12-01", toDate: "2023-12-31", file: "test.pdf", fileType: FileType.PDF },
      { id: "4", fromDate: "2023-06-01", toDate: "2023-06-30", file: "test.pdf", fileType: FileType.PDF },
    ];

    it("returns unique years sorted descending", () => {
      const result = getUniqueYears(mockPayslips);
      expect(result).toEqual([2024, 2023]);
    });

    it("returns empty array for empty input", () => {
      const result = getUniqueYears([]);
      expect(result).toEqual([]);
    });
  });

  describe("sortPayslipsByDate", () => {
    const mockPayslips: Payslip[] = [
      { id: "1", fromDate: "2024-06-01", toDate: "2024-06-30", file: "test.pdf", fileType: FileType.PDF },
      { id: "2", fromDate: "2024-12-01", toDate: "2024-12-31", file: "test.pdf", fileType: FileType.PDF },
      { id: "3", fromDate: "2024-03-01", toDate: "2024-03-31", file: "test.pdf", fileType: FileType.PDF },
    ];

    it("sorts by newest first", () => {
      const result = sortPayslipsByDate(mockPayslips, SortOrder.Newest);
      expect(result[0].id).toBe("2");
      expect(result[1].id).toBe("1");
      expect(result[2].id).toBe("3");
    });

    it("sorts by oldest first", () => {
      const result = sortPayslipsByDate(mockPayslips, SortOrder.Oldest);
      expect(result[0].id).toBe("3");
      expect(result[1].id).toBe("1");
      expect(result[2].id).toBe("2");
    });

    it("does not mutate original array", () => {
      const original = [...mockPayslips];
      sortPayslipsByDate(mockPayslips, SortOrder.Newest);
      expect(mockPayslips).toEqual(original);
    });
  });

  describe("filterPayslipsByYear", () => {
    const mockPayslips: Payslip[] = [
      { id: "1", fromDate: "2024-12-01", toDate: "2024-12-31", file: "test.pdf", fileType: FileType.PDF },
      { id: "2", fromDate: "2024-06-01", toDate: "2024-06-30", file: "test.pdf", fileType: FileType.PDF },
      { id: "3", fromDate: "2023-12-01", toDate: "2023-12-31", file: "test.pdf", fileType: FileType.PDF },
    ];

    it("filters by specific year", () => {
      const result = filterPayslipsByYear(mockPayslips, 2024);
      expect(result).toHaveLength(2);
      expect(result.every((p) => getYear(p.fromDate) === 2024)).toBe(true);
    });

    it("returns all payslips when year is null", () => {
      const result = filterPayslipsByYear(mockPayslips, null);
      expect(result).toHaveLength(3);
    });

    it("returns empty array when no matches", () => {
      const result = filterPayslipsByYear(mockPayslips, 2022);
      expect(result).toHaveLength(0);
    });
  });

  describe("filterPayslipsByText", () => {
    const mockPayslips: Payslip[] = [
      { id: "1", fromDate: "2024-12-01", toDate: "2024-12-31", file: "test.pdf", fileType: FileType.PDF },
      { id: "2", fromDate: "2024-06-01", toDate: "2024-06-30", file: "test.pdf", fileType: FileType.PDF },
      { id: "3", fromDate: "2023-12-01", toDate: "2023-12-31", file: "test.pdf", fileType: FileType.PDF },
    ];

    it("filters by month name", () => {
      const result = filterPayslipsByText(mockPayslips, "December");
      expect(result).toHaveLength(2);
    });

    it("filters case-insensitively", () => {
      const result = filterPayslipsByText(mockPayslips, "june");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("returns all payslips for empty search", () => {
      const result = filterPayslipsByText(mockPayslips, "");
      expect(result).toHaveLength(3);
    });

    it("returns all payslips for whitespace-only search", () => {
      const result = filterPayslipsByText(mockPayslips, "   ");
      expect(result).toHaveLength(3);
    });
  });
});


