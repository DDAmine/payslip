import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ThemedText } from "./ThemedText";

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export function YearFilter({
  years,
  selectedYear,
  onSelectYear,
}: YearFilterProps) {
  const { colors } = useTheme();

  const isAllSelected = selectedYear === null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* All option */}
      <Pressable
        onPress={() => onSelectYear(null)}
        style={[
          styles.chip,
          isAllSelected
            ? { backgroundColor: colors.primary }
            : { backgroundColor: colors.card, borderColor: colors.border },
          !isAllSelected && styles.chipOutline,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Show all years"
        accessibilityState={{ selected: isAllSelected }}
      >
        <Ionicons
          name="calendar-outline"
          size={14}
          color={isAllSelected ? "#FFFFFF" : colors.textSecondary}
        />
        <ThemedText
          style={[
            styles.chipText,
            { color: isAllSelected ? "#FFFFFF" : colors.textSecondary },
          ]}
        >
          All
        </ThemedText>
      </Pressable>

      {/* Year options */}
      {years.map((year) => {
        const isSelected = selectedYear === year;
        return (
          <Pressable
            key={year}
            onPress={() => onSelectYear(year)}
            style={[
              styles.chip,
              isSelected
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.card, borderColor: colors.border },
              !isSelected && styles.chipOutline,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Filter by year ${year}`}
            accessibilityState={{ selected: isSelected }}
          >
            <ThemedText
              style={[
                styles.chipText,
                { color: isSelected ? "#FFFFFF" : colors.textSecondary },
              ]}
            >
              {year}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  chipOutline: {
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});




