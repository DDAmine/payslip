import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { SortOrder } from "../types";
import { ThemedText } from "./ThemedText";

interface SortButtonProps {
  sortOrder: SortOrder;
  onToggle: () => void;
}

export function SortButton({ sortOrder, onToggle }: SortButtonProps) {
  const { colors } = useTheme();

  const label = sortOrder === SortOrder.Newest ? "Newest" : "Oldest";
  const icon = sortOrder === SortOrder.Newest ? "arrow-down" : "arrow-up";

  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.button,
        { backgroundColor: colors.badgeBg, borderColor: colors.border },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Sort by ${label} first. Tap to change sort order.`}
    >
      <Ionicons name={icon} size={14} color={colors.badgeText} />
      <ThemedText style={[styles.text, { color: colors.badgeText }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
});
