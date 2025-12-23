import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { FileType, Payslip } from "../types";
import { formatPeriodWithYear } from "../utils";
import { ThemedText } from "./ThemedText";

interface PayslipInfoProps {
  payslip: Payslip;
}

export function PayslipInfo({ payslip }: PayslipInfoProps) {
  const { colors } = useTheme();

  const periodLabel = formatPeriodWithYear(payslip.fromDate, payslip.toDate);
  const fileTypeLabel = payslip.fileType === FileType.PDF ? "PDF Document" : "Image";
  const fileIcon = payslip.fileType === FileType.PDF ? "document-text" : "image";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {/* Period Row */}
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Ionicons name="calendar-outline" size={18} color={colors.muted} />
          <ThemedText variant="secondary" type="caption">
            Period
          </ThemedText>
        </View>
        <ThemedText type="body">{periodLabel}</ThemedText>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* File Type Row */}
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Ionicons name={fileIcon} size={18} color={colors.muted} />
          <ThemedText variant="secondary" type="caption">
            File Type
          </ThemedText>
        </View>
        <View style={styles.fileTypeBadge}>
          <View
            style={[
              styles.fileTypeIcon,
              { backgroundColor: colors.primaryLight },
            ]}
          >
            <Ionicons name={fileIcon} size={14} color={colors.primary} />
          </View>
          <ThemedText type="body">{fileTypeLabel}</ThemedText>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* ID Row */}
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Ionicons name="finger-print-outline" size={18} color={colors.muted} />
          <ThemedText variant="secondary" type="caption">
            ID
          </ThemedText>
        </View>
        <ThemedText variant="muted" type="caption">
          #{payslip.id}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  fileTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fileTypeIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});



