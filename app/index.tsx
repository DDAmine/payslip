import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import {
  GradientHeader,
  ThemedText,
  ThemedView,
  ThemeToggle,
} from "../components";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleViewDetails = () => {
    router.push("/details/1");
  };

  return (
    <ThemedView style={styles.container}>
      <GradientHeader title="Payslips" rightElement={<ThemeToggle />} />

      <ThemedView style={styles.content}>
        <Pressable
          onPress={handleViewDetails}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
            View Details
          </ThemedText>
        </Pressable>
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
    gap: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
