import React from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsLight: require('@/assets/fonts/Poppins-Light.ttf'),
    Lalezar: require('@/assets/fonts/Lalezar-Regular.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
