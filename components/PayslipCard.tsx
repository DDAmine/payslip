import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Payslip } from "../types";
import { formatPeriod, getMonthLabel } from "../utils";
import { ThemedText } from "./ThemedText";

interface PayslipCardProps {
  payslip: Payslip;
  onPress: () => void;
}

export function PayslipCard({ payslip, onPress }: PayslipCardProps) {
  const { colors } = useTheme();

  const monthLabel = getMonthLabel(payslip.fromDate);
  const periodLabel = formatPeriod(payslip.fromDate, payslip.toDate);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Payslip for ${monthLabel}, period ${periodLabel}`}
      accessibilityHint="Double tap to view details"
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            {monthLabel}
          </ThemedText>
          <ThemedText variant="secondary" type="caption">
            {periodLabel}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    marginBottom: 2,
  },
});


