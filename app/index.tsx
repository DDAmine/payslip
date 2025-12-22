import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  EmptyState,
  GradientHeader,
  PayslipCard,
  SearchBar,
  SortButton,
  ThemedView,
  ThemeToggle,
  YearFilter,
} from "../components";
import { PAYSLIPS } from "../data/payslips";
import { usePayslipFilters } from "../hooks";
import { Payslip } from "../types";

export default function HomeScreen() {
  const router = useRouter();

  const {
    sortOrder,
    searchText,
    selectedYear,
    availableYears,
    filteredPayslips,
    hasActiveFilters,
    toggleSortOrder,
    setSearchText,
    setSelectedYear,
  } = usePayslipFilters({ payslips: PAYSLIPS });

  const handlePayslipPress = useCallback(
    (id: string) => {
      router.push(`/details/${id}`);
    },
    [router]
  );

  const renderPayslipItem = useCallback(
    ({ item }: { item: Payslip }) => (
      <PayslipCard payslip={item} onPress={() => handlePayslipPress(item.id)} />
    ),
    [handlePayslipPress]
  );

  const keyExtractor = useCallback((item: Payslip) => item.id, []);

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        icon={hasActiveFilters ? "search-outline" : "document-text-outline"}
        title={hasActiveFilters ? "No results found" : "No payslips yet"}
        message={
          hasActiveFilters
            ? "Try adjusting your filters"
            : "Your payslips will appear here once available"
        }
      />
    ),
    [hasActiveFilters]
  );

  return (
    <ThemedView style={styles.container}>
      <GradientHeader title="Payslips" rightElement={<ThemeToggle />}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by month..."
        />
        <View style={styles.filterRow}>
          <SortButton sortOrder={sortOrder} onToggle={toggleSortOrder} />
          <View style={styles.yearFilterContainer}>
            <YearFilter
              years={availableYears}
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
            />
          </View>
        </View>
      </GradientHeader>

      <FlatList
        data={filteredPayslips}
        renderItem={renderPayslipItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  yearFilterContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
});
