import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { useTheme } from "../context/ThemeContext";
import { FileType } from "../types";
import { getErrorMessage, showErrorToast } from "../utils";
import { ThemedText } from "./ThemedText";

interface FilePreviewProps {
  source: number;
  fileType: FileType;
}

export function FilePreview({ source, fileType }: FilePreviewProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sourcet = {
    uri: "https://pdfobject.com/pdf/sample.pdf",
    cache: true,
  };
  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleError = useCallback((err: unknown, fallback: string) => {
    setIsLoading(false);
    const errorMessage = getErrorMessage(err, fallback);
    setError(errorMessage);
    showErrorToast("Preview Error", errorMessage);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
  }, []);

  if (error) {
    return (
      <View
        style={[
          styles.container,
          styles.errorContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View
          style={[styles.errorIcon, { backgroundColor: colors.primaryLight }]}
        >
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color={colors.primary}
          />
        </View>
        <ThemedText type="subtitle" style={styles.errorTitle}>
          Unable to load preview
        </ThemedText>
        <ThemedText variant="secondary" type="caption" style={styles.errorText}>
          {error}
        </ThemedText>
        <Pressable
          onPress={handleRetry}
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          accessibilityLabel="Retry loading preview"
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <ThemedText style={styles.retryText}>Try Again</ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {isLoading && (
        <View style={[styles.loadingOverlay, { backgroundColor: colors.card }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText
            variant="secondary"
            type="caption"
            style={styles.loadingText}
          >
            Loading preview...
          </ThemedText>
        </View>
      )}

      {fileType === FileType.PDF ? (
        <Pdf
          source={sourcet}
          style={styles.pdf}
          onLoadComplete={handleLoadComplete}
          onError={(err) => handleError(err, "Failed to load PDF")}
          enablePaging
          horizontal
          trustAllCerts={false}
        />
      ) : (
        <Image
          source={source}
          style={styles.image}
          contentFit="contain"
          onLoad={handleLoadComplete}
          onError={(err) => handleError(err, "Failed to load image")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    minHeight: 400,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 12,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
