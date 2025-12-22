import { Payslip, SortOrder } from "../types";

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string (e.g., "2024-12-01")
 * @param format - 'short' (Dec 1) | 'medium' (Dec 1, 2024) | 'long' (December 1, 2024)
 */
export function formatDate(
  dateString: string,
  format: "short" | "medium" | "long" = "medium"
): string {
  const date = new Date(dateString);

  const optionsMap: Record<
    "short" | "medium" | "long",
    Intl.DateTimeFormatOptions
  > = {
    short: { month: "short", day: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
  };

  return date.toLocaleDateString("en-US", optionsMap[format]);
}

/**
 * Format a payslip period as "fromDate – toDate"
 * @param fromDate - Start date ISO string
 * @param toDate - End date ISO string
 */
export function formatPeriod(fromDate: string, toDate: string): string {
  return `${formatDate(fromDate, "short")} – ${formatDate(toDate, "short")}`;
}

/**
 * Format a payslip period with year
 * @param fromDate - Start date ISO string
 * @param toDate - End date ISO string
 */
export function formatPeriodWithYear(fromDate: string, toDate: string): string {
  return `${formatDate(fromDate, "medium")} – ${formatDate(toDate, "medium")}`;
}

/**
 * Get the month label from a date (e.g., "December 2024")
 * @param dateString - ISO date string
 */
export function getMonthLabel(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/**
 * Get the year from a date string
 * @param dateString - ISO date string
 */
export function getYear(dateString: string): number {
  return new Date(dateString).getFullYear();
}

/**
 * Get unique years from a list of payslips
 * @param payslips - Array of payslips
 */
export function getUniqueYears(payslips: Payslip[]): number[] {
  const years = payslips.map((p) => getYear(p.fromDate));
  return [...new Set(years)].sort((a, b) => b - a);
}

/**
 * Sort payslips by date
 * @param payslips - Array of payslips
 * @param order - SortOrder.Newest | SortOrder.Oldest
 */
export function sortPayslipsByDate(
  payslips: Payslip[],
  order: SortOrder
): Payslip[] {
  return [...payslips].sort((a, b) => {
    const dateA = new Date(a.fromDate).getTime();
    const dateB = new Date(b.fromDate).getTime();
    return order === SortOrder.Newest ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Filter payslips by year
 * @param payslips - Array of payslips
 * @param year - Year to filter by (null for all)
 */
export function filterPayslipsByYear(
  payslips: Payslip[],
  year: number | null
): Payslip[] {
  if (year === null) return payslips;
  return payslips.filter((p) => getYear(p.fromDate) === year);
}

/**
 * Filter payslips by search text (matches month name or year)
 * @param payslips - Array of payslips
 * @param searchText - Text to search for
 */
export function filterPayslipsByText(
  payslips: Payslip[],
  searchText: string
): Payslip[] {
  if (!searchText.trim()) return payslips;

  const query = searchText.toLowerCase().trim();

  return payslips.filter((p) => {
    const monthLabel = getMonthLabel(p.fromDate).toLowerCase();
    const period = formatPeriod(p.fromDate, p.toDate).toLowerCase();
    return monthLabel.includes(query) || period.includes(query);
  });
}
