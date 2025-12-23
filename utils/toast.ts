import Toast from "react-native-toast-message";

export function showSuccessToast(title: string, message?: string) {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    visibilityTime: 3000,
    position: "bottom",
  });
}

export function showErrorToast(title: string, message?: string) {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    visibilityTime: 4000,
    position: "bottom",
  });
}

export function showInfoToast(title: string, message?: string) {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    visibilityTime: 3000,
    position: "bottom",
  });
}



