import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import {
  EmptyState,
  GradientHeader,
  PayslipDetails,
  ThemedView,
} from "../../components";
import { getPayslipById } from "../../data/payslips";
import { FileType } from "../../types";
import { downloadAndShareFile, getMonthLabel } from "../../utils";

// Simulated URLs for download (replace with actual API endpoint)
const SAMPLE_PDF_URL = "https://pdfobject.com/pdf/sample.pdf";
const SAMPLE_IMAGE_URL = "https://picsum.photos/800/1200.jpg";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const payslip = getPayslipById(id);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleDownload = useCallback(async () => {
    if (!payslip || isDownloading) return;

    setIsDownloading(true);
    try {
      // Use sample URLs for simulation
      // In production, this would be the actual file URL from your API
      const isPdf = payslip.fileType === FileType.PDF;
      const sourceUrl = isPdf ? SAMPLE_PDF_URL : SAMPLE_IMAGE_URL;
      const fileName = isPdf
        ? `payslip_${payslip.id}.pdf`
        : `payslip_${payslip.id}.jpg`;

      await downloadAndShareFile(sourceUrl, fileName, payslip.fileType);
    } finally {
      setIsDownloading(false);
    }
  }, [payslip, isDownloading]);

  // Handle payslip not found
  if (!payslip) {
    return (
      <ThemedView style={styles.container}>
        <GradientHeader
          title="Details"
          showBackButton
          onBackPress={handleBack}
          centerTitle
        />
        <EmptyState
          icon="alert-circle-outline"
          title="Payslip not found"
          message="The payslip you're looking for doesn't exist or has been removed."
        />
      </ThemedView>
    );
  }

  const monthLabel = getMonthLabel(payslip.fromDate);

  return (
    <ThemedView style={styles.container}>
      <GradientHeader
        title={monthLabel}
        showBackButton
        onBackPress={handleBack}
        centerTitle
      />
      <PayslipDetails
        payslip={payslip}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
