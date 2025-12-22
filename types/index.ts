export enum FileType {
  PDF = "pdf",
  Image = "image",
}

export interface Payslip {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
  fileType: FileType;
}

export enum SortOrder {
  Newest = "newest",
  Oldest = "oldest",
}
