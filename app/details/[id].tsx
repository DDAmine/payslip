import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { GradientHeader, ThemedText, ThemedView } from "../../components";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <GradientHeader
        title="Details"
        showBackButton
        onBackPress={() => router.back()}
        centerTitle
      />

      <ThemedView style={styles.content}>
        <ThemedText type="title">Payslip #{id}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
