import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { FileType } from "../types";
import { getErrorMessage } from "./error";
import { showErrorToast, showSuccessToast } from "./toast";

function getMimeType(fileType: FileType, extension: string): string {
  switch (fileType) {
    case FileType.PDF:
      return `application/${extension}`;
    case FileType.Image:
      return `image/${extension}`;
    default:
      return "application/octet-stream";
  }
}

function extractFileName(fileName: string): string {
  if (!fileName) return "file";

  const cleanPath = fileName.replace(/\/+$/, "");
  const lastSlashIndex = cleanPath.lastIndexOf("/");
  const lastSegment =
    lastSlashIndex >= 0 ? cleanPath.slice(lastSlashIndex + 1) : cleanPath;
  const queryIndex = lastSegment.indexOf("?");
  const cleanName =
    queryIndex >= 0 ? lastSegment.slice(0, queryIndex) : lastSegment;

  return cleanName || "file";
}

export async function downloadFile(
  url: string,
  fileName: string
): Promise<string | null> {
  if (!FileSystem.documentDirectory) {
    showErrorToast("Download Error", "Storage not available");
    return null;
  }

  const safeFileName = extractFileName(fileName);
  const folderUri = FileSystem.documentDirectory + "documents/";
  const fileUri = folderUri + safeFileName;

  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists && !fileInfo.isDirectory) {
      return fileUri;
    }

    const folderInfo = await FileSystem.getInfoAsync(folderUri);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    }

    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    return uri;
  } catch (error) {
    const errorMessage = getErrorMessage(error, "Failed to download file");
    showErrorToast("Download Error", errorMessage);
    return null;
  }
}

export async function shareFile(
  localFilePath: string,
  fileType: FileType
): Promise<void> {
  const extension = localFilePath.split(".").pop();
  if (!extension) {
    showErrorToast("Share Error", "Invalid file format");
    return;
  }

  const mimeType = getMimeType(fileType, extension);

  await Sharing.shareAsync(`file://${localFilePath}`, {
    dialogTitle: "Save Payslip",
    mimeType,
  });
}

export async function downloadAndShareFile(
  url: string,
  fileName: string,
  fileType: FileType
): Promise<boolean> {
  showSuccessToast("Downloading...", "Please wait");

  const localFilePath = await downloadFile(url, fileName);

  if (localFilePath) {
    showSuccessToast("Download Complete", "Opening share options...");
    await shareFile(localFilePath, fileType);
    return true;
  }

  return false;
}

export async function shareFileWithMimeType(
  url: string,
  fileName: string,
  mimeType: string
): Promise<void> {
  const localFilePath = await downloadFile(url, fileName);

  if (localFilePath) {
    try {
      await Sharing.shareAsync(`file://${localFilePath}`, {
        dialogTitle: "Save Payslip",
        mimeType,
      });
    } finally {
      await FileSystem.deleteAsync(localFilePath, { idempotent: true });
    }
  }
}
