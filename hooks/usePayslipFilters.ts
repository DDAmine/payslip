import { useCallback, useMemo, useState } from "react";
import { Payslip, SortOrder } from "../types";
import {
  filterPayslipsByText,
  filterPayslipsByYear,
  getUniqueYears,
  sortPayslipsByDate,
} from "../utils";

interface UsePayslipFiltersOptions {
  payslips: Payslip[];
  defaultSortOrder?: SortOrder;
}

interface UsePayslipFiltersReturn {
  // State
  sortOrder: SortOrder;
  searchText: string;
  selectedYear: number | null;
  availableYears: number[];
  filteredPayslips: Payslip[];
  hasActiveFilters: boolean;

  // Actions
  setSortOrder: (order: SortOrder) => void;
  toggleSortOrder: () => void;
  setSearchText: (text: string) => void;
  setSelectedYear: (year: number | null) => void;
  clearFilters: () => void;
}

export function usePayslipFilters({
  payslips,
  defaultSortOrder = SortOrder.Newest,
}: UsePayslipFiltersOptions): UsePayslipFiltersReturn {
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Get available years from payslips data
  const availableYears = useMemo(() => getUniqueYears(payslips), [payslips]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(
    () => searchText.trim().length > 0 || selectedYear !== null,
    [searchText, selectedYear]
  );

  // Apply all filters and sorting
  const filteredPayslips = useMemo(() => {
    let result = payslips;

    // Apply year filter
    if (selectedYear !== null) {
      result = filterPayslipsByYear(result, selectedYear);
    }

    // Apply text filter
    if (searchText.trim()) {
      result = filterPayslipsByText(result, searchText);
    }

    // Apply sorting
    result = sortPayslipsByDate(result, sortOrder);

    return result;
  }, [payslips, searchText, sortOrder, selectedYear]);

  // Toggle sort order between newest and oldest
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) =>
      prev === SortOrder.Newest ? SortOrder.Oldest : SortOrder.Newest
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchText("");
    setSelectedYear(null);
    setSortOrder(defaultSortOrder);
  }, [defaultSortOrder]);

  return {
    // State
    sortOrder,
    searchText,
    selectedYear,
    availableYears,
    filteredPayslips,
    hasActiveFilters,

    // Actions
    setSortOrder,
    toggleSortOrder,
    setSearchText,
    setSelectedYear,
    clearFilters,
  };
}
