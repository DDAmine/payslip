import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  style?: ViewStyle;
}

export function ThemeToggle({ style }: ThemeToggleProps) {
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: colors.card, borderColor: colors.border },
        style,
      ]}
      accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
      accessibilityRole="button"
    >
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={20}
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});


