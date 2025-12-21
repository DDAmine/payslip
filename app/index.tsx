import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "../components";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { colors, toggleTheme, isDark } = useTheme();

  const handleViewDetails = () => {
    router.push("/details/1");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Payslips</ThemedText>

        <Pressable
          onPress={toggleTheme}
          style={[
            styles.button,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={20}
            color={colors.primary}
          />
          <ThemedText style={styles.buttonText}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </ThemedText>
        </Pressable>

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
    borderWidth: 1,
    gap: 8,
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
