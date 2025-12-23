import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPayslipAsset } from "../data/payslips";
import { Payslip } from "../types";
import { ActionButton } from "./ActionButton";
import { FilePreview } from "./FilePreview";
import { PayslipInfo } from "./PayslipInfo";

interface PayslipDetailsProps {
  payslip: Payslip;
  onDownload: () => void;
  isDownloading?: boolean;
}

export function PayslipDetails({
  payslip,
  onDownload,
  isDownloading = false,
}: PayslipDetailsProps) {
  const asset = getPayslipAsset(payslip);
  const insets = useSafeAreaInsets();

  const contentContainerStyle = useMemo(
    () => [
      styles.scrollContent,
      { paddingBottom: Math.max(insets.bottom, 20) + 20 },
    ],
    [insets.bottom]
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      <PayslipInfo payslip={payslip} />

      <View style={styles.previewContainer}>
        <FilePreview source={asset} fileType={payslip.fileType} />
      </View>

      <View style={styles.actions}>
        <ActionButton
          label="Download Payslip"
          icon="download-outline"
          onPress={onDownload}
          variant="primary"
          loading={isDownloading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 16,
  },
  previewContainer: {
    height: 500,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
});
