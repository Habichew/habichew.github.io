# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Test on Mobiles via Expo go

1. Install Expo Go on your mobile
2. Run the project through Expo module
3. Switch to Expo Go mode
   ```bash
   Press 's' to enter Expo Go
   ```
4. Enter EAS account (the account for Expo.dev) in the IDE. This step might take a while.
5. Open your mobile and scan the QR code to see the preview.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## File Structure

``` 
frontend/
├── app/ # Main routing & screen entry points
│ ├── (tabs)/ # Tab-based layout routing
│ │ ├── _layout.tsx # Root layout for tab navigation
│ │ ├── explore.tsx # Tab: Explore
│ │ ├── index.tsx # Tab: Home (default route)
│ │ ├── pet.tsx # Tab: Pet system
│ │ ├── Tasks.tsx # Tab: Task manager
│ │ └── Travel.tsx # Tab: Travel reward system
│ │
│ ├── auth/ # Authentication screens
│ │ ├── sign-in.tsx
│ │ └── sign-up.tsx
│ │
│ ├── main/ # Primary pages in the app
│ │ ├── AddTasks.tsx
│ │ ├── Insights.tsx
│ │ ├── Kitchen.tsx
│ │ └── MoodCheck.tsx
│ │
│ ├── onboarding/ # wip pages
│ └── +not-found.tsx # Fallback route for unknown paths
│
├── assets/ # Static assets (images, fonts, etc.)
│ ├── fonts/
│ └── images/
│
├── components/ # Reusable visual UI components
│ ├── ui/
│ │ ├── Collapsible.tsx # Expand/collapse UI component
│ │ ├── ExternalLink.tsx # Safe external URL handling
│ │ ├── HapticTab.tsx # Haptic tab button wrapper
│ │ ├── HelloWave.tsx # Greeting animation
│ │ ├── ParallaxScrollView.tsx # Custom scroll experience
│ │ ├── ThemedText.tsx # Text with theme adaptation
│ │ └── ThemedView.tsx # View wrapper with theming
│ └── topbar.tsx # Topbar with dynamic title/theme
│
├── constants/ # Constant values (e.g. color theme)
│ └── Colors.ts
│
├── hooks/ # Custom React hooks
│ ├── useColorScheme.ts
│ ├── useColorScheme.web.ts
│ └── useThemeColor.ts
│
├── node_modules/ # Installed dependencies (auto-generated)
├── .gitignore # Files/directories to exclude from Git
├── app.json # Expo configuration
├── eas.json # EAS (Expo Application Services) build config
├── eslint.config.js # Linting rules
├── expo-env.d.ts # Type declarations for Expo env
├── package.json # Project metadata and dependencies
├── package-lock.json # Locked dependency versions
├── tsconfig.json # TypeScript configuration
└── README.md # You are here
```