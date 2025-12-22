import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface ThemedTextProps extends TextProps {
  variant?: "primary" | "secondary" | "muted";
  type?: "title" | "subtitle" | "body" | "caption";
}

export function ThemedText({
  style,
  variant = "primary",
  type = "body",
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  const colorMap = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    muted: colors.muted,
  };

  const typeStyles = {
    title: styles.title,
    subtitle: styles.subtitle,
    body: styles.body,
    caption: styles.caption,
  };

  return (
    <Text
      style={[{ color: colorMap[variant] }, typeStyles[type], style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
  },
});

