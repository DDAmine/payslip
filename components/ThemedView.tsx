import { View, ViewProps } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface ThemedViewProps extends ViewProps {
  variant?: "background" | "card";
}

export function ThemedView({
  style,
  variant = "background",
  ...props
}: ThemedViewProps) {
  const { colors } = useTheme();

  const backgroundColor = variant === "card" ? colors.card : colors.background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
