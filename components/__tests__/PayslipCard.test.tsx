import { render, fireEvent } from "@testing-library/react-native";
import { PayslipCard } from "../PayslipCard";
import { FileType, Payslip } from "../../types";

// Mock the ThemeContext
jest.mock("../../context/ThemeContext", () => ({
  useTheme: () => ({
    colors: {
      card: "#FFFFFF",
      border: "#EAE7E2",
      primary: "#8B7CF6",
      primaryLight: "#E9E6FF",
      textPrimary: "#1F2937",
      textSecondary: "#6B7280",
      muted: "#9CA3AF",
    },
  }),
}));

describe("PayslipCard", () => {
  const mockPayslip: Payslip = {
    id: "1",
    fromDate: "2024-12-01",
    toDate: "2024-12-31",
    file: "payslip.pdf",
    fileType: FileType.PDF,
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders payslip month label", () => {
    const { getByText } = render(
      <PayslipCard payslip={mockPayslip} onPress={mockOnPress} />
    );

    expect(getByText("December 2024")).toBeTruthy();
  });

  it("renders payslip period", () => {
    const { getByText } = render(
      <PayslipCard payslip={mockPayslip} onPress={mockOnPress} />
    );

    expect(getByText("Dec 1 – Dec 31")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByRole } = render(
      <PayslipCard payslip={mockPayslip} onPress={mockOnPress} />
    );

    const button = getByRole("button");
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility label", () => {
    const { getByLabelText } = render(
      <PayslipCard payslip={mockPayslip} onPress={mockOnPress} />
    );

    expect(
      getByLabelText(/Payslip for December 2024, period Dec 1 – Dec 31, PDF file/)
    ).toBeTruthy();
  });

  it("renders different file types correctly", () => {
    const imagePayslip: Payslip = {
      ...mockPayslip,
      fileType: FileType.Image,
    };

    const { getByLabelText } = render(
      <PayslipCard payslip={imagePayslip} onPress={mockOnPress} />
    );

    expect(getByLabelText(/Image file/)).toBeTruthy();
  });
});


