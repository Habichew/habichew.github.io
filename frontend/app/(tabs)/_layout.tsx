// app/(tabs)/_layout.tsx
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomBar from '@/components/bottomBar';

export default function TabLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, 
        }}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Tasks" />
        <Tabs.Screen name="Pet" />
        <Tabs.Screen name="Insight" />
        <Tabs.Screen name="Profile" />
      </Tabs>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
