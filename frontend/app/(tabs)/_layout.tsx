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
        <Tabs.Screen name="home" />
        <Tabs.Screen name="tasks" />
        <Tabs.Screen name="pet" />
        <Tabs.Screen name="insight" />
        <Tabs.Screen name="profile" />
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
