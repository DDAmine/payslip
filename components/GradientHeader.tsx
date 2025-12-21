import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { ThemedText } from "./ThemedText";

interface GradientHeaderProps {
  /** Main title text */
  title?: string;
  /** Subtitle text below title */
  subtitle?: string;
  /** Show back button on the left */
  showBackButton?: boolean;
  /** Callback when back button is pressed */
  onBackPress?: () => void;
  /** Custom element for left side (overrides back button) */
  leftElement?: ReactNode;
  /** Custom element for right side */
  rightElement?: ReactNode;
  /** Additional content below the header row (e.g., search bar) */
  children?: ReactNode;
  /** Center the title (useful with back button) */
  centerTitle?: boolean;
  /** Custom gradient start color (defaults to primaryLight) */
  gradientStart?: string;
  /** Custom gradient end color (defaults to background) */
  gradientEnd?: string;
  /** Container style override */
  style?: ViewStyle;
  /** Content style override */
  contentStyle?: ViewStyle;
}

export function GradientHeader({
  title,
  subtitle,
  showBackButton,
  onBackPress,
  leftElement,
  rightElement,
  children,
  centerTitle = false,
  gradientStart,
  gradientEnd,
  style,
  contentStyle,
}: GradientHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const startColor = gradientStart ?? colors.primaryLight;
  const endColor = gradientEnd ?? colors.background;

  const renderLeftElement = () => {
    if (leftElement) return leftElement;

    if (showBackButton) {
      return (
        <Pressable
          onPress={onBackPress}
          style={[
            styles.iconButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      );
    }

    return centerTitle ? <View style={styles.placeholder} /> : null;
  };

  const renderTitle = () => {
    if (!title) return null;

    return (
      <View
        style={[styles.titleContainer, centerTitle && styles.titleCentered]}
      >
        <ThemedText type="title">{title}</ThemedText>
        {subtitle && (
          <ThemedText
            variant="secondary"
            type="caption"
            style={styles.subtitle}
          >
            {subtitle}
          </ThemedText>
        )}
      </View>
    );
  };

  const renderRightElement = () => {
    if (rightElement) return rightElement;
    return centerTitle ? <View style={styles.placeholder} /> : null;
  };

  const hasHeaderRow = title || leftElement || rightElement || showBackButton;

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      locations={[0, 1]}
      style={[styles.gradient, { paddingTop: insets.top }, style]}
    >
      <View style={[styles.content, contentStyle]}>
        {hasHeaderRow && (
          <View style={styles.headerRow}>
            {renderLeftElement()}
            {renderTitle()}
            {renderRightElement()}
          </View>
        )}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
  },
  titleCentered: {
    alignItems: "center",
  },
  subtitle: {
    marginTop: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  placeholder: {
    width: 44,
  },
});
