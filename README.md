# Payslip App

A React Native mobile application for viewing and managing payslips. Users can browse their payslip history, filter by year or search, sort by date, preview PDF and image files, and download/share payslips.

## Tech Stack & Library Choices

### Framework

- **Expo SDK 54** with **expo-router** - Chose Expo over bare React Native CLI for faster development, simplified native module handling via config plugins, and streamlined build process. Expo Router provides file-based routing similar to Next.js.

### Core Libraries

| Library                          | Purpose             | Why Chosen                                                               |
| -------------------------------- | ------------------- | ------------------------------------------------------------------------ |
| `expo-router`                    | Navigation          | File-based routing, type-safe navigation params, deep linking support    |
| `expo-linear-gradient`           | UI gradients        | Native gradient support for header styling                               |
| `expo-image`                     | Image rendering     | Modern image component with caching and better performance than RN Image |
| `react-native-pdf`               | PDF viewing         | Reliable PDF rendering with paging support                               |
| `expo-file-system`               | File operations     | Cross-platform file download and storage                                 |
| `expo-sharing`                   | Share functionality | Native share dialog integration                                          |
| `react-native-safe-area-context` | Safe areas          | Proper handling of notches and home indicators                           |
| `react-native-toast-message`     | User feedback       | Non-intrusive success/error notifications                                |

### State Management

- **React Context** for theme management - lightweight solution for a simple app; avoids Redux/Zustand overhead for just theme state.

### Testing

- **Jest** + **jest-expo** + **@testing-library/react-native** - Standard React Native testing stack with good Expo integration.

### Development

- **TypeScript** - Type safety across the codebase
- **ESLint** - Code quality and consistency
- **expo-dev-client** - Development builds with native module support

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js** v18+ (v22 recommended for testing)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS** (macOS only):
  - Xcode 15+
  - iOS Simulator or physical device
  - CocoaPods: `sudo gem install cocoapods`
- **Android**:
  - Android Studio with SDK 34+
  - Android Emulator or physical device
  - Java 17+

## Getting Started

### Quick Start: Download Pre-built Dev Builds

For quick testing, download the pre-built development builds directly:

| Platform    | Download Link                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| **Android** | [Download APK](https://expo.dev/accounts/chaoscry/projects/payslip/builds/a94c3c1b-f927-4e36-82ce-1cb660be1447)   |
| **iOS**     | [Download Build](https://expo.dev/accounts/chaoscry/projects/payslip/builds/90181c80-9d8c-4f12-9640-a7472ca20eec) |

After installing the dev build, run `npm start` and scan the QR code to connect.

---

### Build From Source

### 1. Install the Development Build

Download and install the appropriate development build from the links above:

- **Android**: Install the APK directly on your device/emulator
- **iOS**: Install via the Expo build page (requires device registration or simulator)

> **Note**: This app uses native modules (`react-native-pdf`, `react-native-blob-util`) that require a development build. **Expo Go will not work**.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

Once you have the development build installed:

```bash
npm start
# or
npx expo start --dev-client
```

Press `i` for iOS simulator or `a` for Android emulator.

## Running Tests

```bash
# Run all tests (single run)
npm test -- --watchAll=false

# Run tests in watch mode
npm test

# Run specific test file
npm test -- utils/__tests__/date.test.ts --watchAll=false
```

**Note**: Tests require Node.js v22+. If using nvm:

```bash
nvm use 22
npm test -- --watchAll=false
```

## Project Architecture

```
payslip/
├── app/                    # Screens (expo-router file-based routing)
│   ├── _layout.tsx         # Root layout with ThemeProvider
│   ├── index.tsx           # Home screen - payslip list
│   └── details/
│       └── [id].tsx        # Details screen - single payslip
├── components/             # Reusable UI components
│   ├── ThemedView.tsx      # Theme-aware View wrapper
│   ├── ThemedText.tsx      # Theme-aware Text with typography
│   ├── GradientHeader.tsx  # Reusable gradient header
│   ├── PayslipCard.tsx     # List item component
│   ├── PayslipDetails.tsx  # Details layout component
│   ├── FilePreview.tsx     # PDF/Image preview
│   ├── SearchBar.tsx       # Search input
│   ├── SortButton.tsx      # Sort toggle
│   ├── YearFilter.tsx      # Year filter chips
│   └── ...
├── context/                # React Context providers
│   └── ThemeContext.tsx    # Light/Dark theme management
├── constants/              # App constants
│   └── theme.ts            # Color palettes for light/dark modes
├── data/                   # Data layer
│   └── payslips.ts         # Mock payslip data and helpers
├── hooks/                  # Custom React hooks
│   └── usePayslipFilters.ts # Filter/sort logic encapsulation
├── types/                  # TypeScript definitions
│   └── index.ts            # Payslip, FileType, SortOrder types
├── utils/                  # Helper functions
│   ├── date.ts             # Date formatting and filtering
│   ├── download.ts         # File download and share logic
│   ├── error.ts            # Error message extraction
│   └── toast.ts            # Toast notification helpers
└── assets/
    └── payslips/           # Mock PDF and image files
```

### Key Design Decisions

1. **Separation of Concerns**: Screens are thin - business logic lives in hooks (`usePayslipFilters`), UI in components, and utilities are pure functions.

2. **Theme System**: Context-based theming with typed color palettes ensures consistent styling across light/dark modes.

3. **Component Composition**: `GradientHeader` and `PayslipDetails` are composed of smaller components, making them flexible and reusable.

4. **Type Safety**: All data structures, navigation params, and component props are fully typed. No `any` types used.

5. **Error Handling**: Centralized error extraction (`getErrorMessage`) and toast-based user feedback for all async operations.

## Features

- **Payslip List**: Scrollable list with period display
- **Sorting**: Toggle between newest/oldest first
- **Filtering**: Search by month name, filter by year
- **Theme Support**: Light and dark mode with toggle
- **File Preview**: In-app PDF and image viewing
- **Download & Share**: Save files and share via native dialog
- **Accessibility**: Proper labels and roles on interactive elements

## Known Limitations

1. **Mock Data Only**: The app uses hardcoded mock data and sample files for downloads. No real API integration.

2. **PDF Preview Source**: Currently uses a hardcoded sample PDF URL for preview testing. Local asset preview requires additional configuration.

3. **No Persistence**: Theme preference and filter states are not persisted across app restarts.

4. **Limited Error Recovery**: While errors are caught and displayed, some edge cases (network timeouts, corrupted files) may not have optimal UX.

5. **No Offline Support**: Downloads require network; no offline caching of previously viewed payslips.

6. **Single Language**: English only, no i18n support.

## Future Improvements

With more time, I would add:

### High Priority

- [ ] Real API integration with proper data fetching (React Query/SWR)
- [ ] Persist theme preference with AsyncStorage
- [ ] Local asset preview for bundled PDF/images
- [ ] Loading skeletons for better perceived performance
- [ ] Pull-to-refresh on payslip list

### Medium Priority

- [ ] Offline caching with downloaded file history
- [ ] More comprehensive test coverage (integration tests, E2E with Detox)
- [ ] Haptic feedback on interactions
- [ ] Animated transitions between screens
- [ ] Pagination for large payslip lists

### Nice to Have

- [ ] i18n/localization support
- [ ] Biometric authentication for sensitive data
- [ ] Push notifications for new payslips
- [ ] Export multiple payslips as ZIP
- [ ] Analytics and crash reporting

## Scripts Reference

| Command                        | Description                  |
| ------------------------------ | ---------------------------- |
| `npm start`                    | Start Expo dev server        |
| `npm run ios`                  | Start on iOS simulator       |
| `npm run android`              | Start on Android emulator    |
| `npm run lint`                 | Run ESLint                   |
| `npm test`                     | Run Jest tests in watch mode |
| `npm test -- --watchAll=false` | Run tests once               |

## License

Private - All rights reserved.
