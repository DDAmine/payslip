import { ScrollView, StyleSheet, View } from "react-native";
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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Payslip Info Card */}
      <PayslipInfo payslip={payslip} />

      {/* File Preview */}
      <View style={styles.previewContainer}>
        <FilePreview source={asset} fileType={payslip.fileType} />
      </View>

      {/* Action Buttons */}
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
    paddingBottom: 40,
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

