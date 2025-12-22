import { FileType, Payslip } from "../types";

// Asset references for payslip files
export const PAYSLIP_ASSETS = {
  pdf: require("../assets/payslips/payslip1.pdf"),
  image: require("../assets/payslips/payslip.png"),
};

export const PAYSLIPS: Payslip[] = [
  {
    id: "1",
    fromDate: "2024-12-01",
    toDate: "2024-12-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
  {
    id: "2",
    fromDate: "2024-11-01",
    toDate: "2024-11-30",
    file: "payslip.png",
    fileType: FileType.Image,
  },
  {
    id: "3",
    fromDate: "2024-10-01",
    toDate: "2024-10-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
  {
    id: "4",
    fromDate: "2024-09-01",
    toDate: "2024-09-30",
    file: "payslip.png",
    fileType: FileType.Image,
  },
  {
    id: "5",
    fromDate: "2024-08-01",
    toDate: "2024-08-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
  {
    id: "6",
    fromDate: "2024-07-01",
    toDate: "2024-07-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
  {
    id: "7",
    fromDate: "2024-06-01",
    toDate: "2024-06-30",
    file: "payslip.png",
    fileType: FileType.Image,
  },
  {
    id: "8",
    fromDate: "2023-12-01",
    toDate: "2023-12-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
  {
    id: "9",
    fromDate: "2023-11-01",
    toDate: "2023-11-30",
    file: "payslip.png",
    fileType: FileType.Image,
  },
  {
    id: "10",
    fromDate: "2023-10-01",
    toDate: "2023-10-31",
    file: "payslip1.pdf",
    fileType: FileType.PDF,
  },
];

export function getPayslipById(id: string): Payslip | undefined {
  return PAYSLIPS.find((payslip) => payslip.id === id);
}

export function getPayslipAsset(payslip: Payslip): number {
  return payslip.fileType === FileType.PDF
    ? PAYSLIP_ASSETS.pdf
    : PAYSLIP_ASSETS.image;
}
