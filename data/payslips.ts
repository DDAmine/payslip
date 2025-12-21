import { Payslip } from "../types";

export const PAYSLIPS: Payslip[] = [
  {
    id: "1",
    fromDate: "2024-12-01",
    toDate: "2024-12-31",
    file: "payslip_dec_2024.pdf",
  },
  {
    id: "2",
    fromDate: "2024-11-01",
    toDate: "2024-11-30",
    file: "payslip_nov_2024.pdf",
  },
  {
    id: "3",
    fromDate: "2024-10-01",
    toDate: "2024-10-31",
    file: "payslip_oct_2024.pdf",
  },
  {
    id: "4",
    fromDate: "2024-09-01",
    toDate: "2024-09-30",
    file: "payslip_sep_2024.pdf",
  },
  {
    id: "5",
    fromDate: "2024-08-01",
    toDate: "2024-08-31",
    file: "payslip_aug_2024.pdf",
  },
];

export function getPayslipById(id: string): Payslip | undefined {
  return PAYSLIPS.find((payslip) => payslip.id === id);
}

