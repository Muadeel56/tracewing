# Mobile App Project Structure

This React Native Expo project is structured as follows:

## Folder Structure

```
mobile/
├── screens/           # All screen components
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   └── index.ts       # Screen exports
├── navigation/        # Navigation configuration
│   ├── AppNavigator.tsx
│   └── types.ts       # Navigation type definitions
├── components/        # Reusable UI components (empty for now)
├── assets/           # Images, fonts, and other static assets
├── constants/        # App constants and configuration
├── utils/            # Utility functions and helpers
└── hooks/            # Custom React hooks
```

## Navigation Flow

1. **LoginScreen** (Initial screen)
   - Login button → navigates to HomeScreen
   - "Register" link → navigates to RegisterScreen

2. **RegisterScreen**
   - Register button → navigates to HomeScreen
   - "Login" link → navigates back to LoginScreen

3. **HomeScreen**
   - Logout button → resets navigation to LoginScreen
   - No back button (headerLeft: null)

## Key Features

- **TypeScript**: Full TypeScript support with proper type definitions
- **React Navigation Stack**: Stack navigation with proper typing
- **Functional Components**: All components use React functional component pattern
- **Clean Architecture**: Organized folder structure for scalability
- **Type Safety**: Centralized navigation types in `navigation/types.ts`

## Running the App

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
``` 