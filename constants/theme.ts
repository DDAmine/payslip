export const Colors = {
  light: {
    primary: "#8B7CF6",
    primaryLight: "#E9E6FF",
    background: "#FAF9F6",
    card: "#FFFFFF",
    border: "#EAE7E2",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    muted: "#9CA3AF",
    badgeBg: "#F1EDFF",
    badgeText: "#6D5BD0",
  },
  dark: {
    primary: "#9B8CFF",
    primaryLight: "#3A3470",
    background: "#0F1020",
    card: "#17182B",
    border: "#2A2C46",
    textPrimary: "#E5E7EB",
    textSecondary: "#B0B3C5",
    muted: "#8B8FA8",
    badgeBg: "#2D2A55",
    badgeText: "#C7C2FF",
  },
} as const;

export type Theme = "light" | "dark";
export type ThemeColors = {
  primary: string;
  primaryLight: string;
  background: string;
  card: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  muted: string;
  badgeBg: string;
  badgeText: string;
};
