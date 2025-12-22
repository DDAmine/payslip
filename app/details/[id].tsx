import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import {
  EmptyState,
  GradientHeader,
  PayslipDetails,
  ThemedView,
} from "../../components";
import { getPayslipById } from "../../data/payslips";
import { getMonthLabel } from "../../utils";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const payslip = getPayslipById(id);

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
  };

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
      <PayslipDetails payslip={payslip} onDownload={handleDownload} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
