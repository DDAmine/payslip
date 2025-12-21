import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface BadgeProps {
  text: string;
  style?: ViewStyle;
}

export function Badge({ text, style }: BadgeProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: colors.badgeBg }, style]}>
      <Text style={[styles.text, { color: colors.badgeText }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
});
