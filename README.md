# Story Client

A React Native application built with Expo, Redux, and React Navigation.

## Project Structure

```
AwesomeExpoApp/
├── assets/                 # Static assets (images, fonts, videos, etc.)
├── src/                    # All source code lives here
│   ├── api/               # API service files
│   ├── components/        # Reusable components
│   ├── constants/         # Theme constants
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── navigation/       # React Navigation setup
│   ├── screens/          # Screen components
│   ├── store/            # Redux store
│   └── utils/            # Utility functions
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on iOS:

```bash
npm run ios
```

4. Run on Android:

```bash
npm run android
```

## Features

- React Navigation for routing
- Redux for state management
- TypeScript support
- Expo framework
- Clean project structure

## Dependencies

- @reduxjs/toolkit
- react-redux
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context
