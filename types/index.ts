export interface Payslip {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
}

export enum SortOrder {
  Newest = "newest",
  Oldest = "oldest",
}
