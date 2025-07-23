// app/(tabs)/_layout.tsx
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BottomBar from "@/components/bottomBar";

export default function TabLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
      <>
          <View style={[styles.container, {paddingTop: insets.top, marginBottom: insets.bottom, backgroundColor: 'white'}]}>
              <Tabs
                  screenOptions={{
                      headerShown: false,
                      tabBarStyle: { display: 'none' },
                  }}
              >
                  <Tabs.Screen name="home" />
                  <Tabs.Screen name="tasks" />
                  <Tabs.Screen name="pet" />
                  <Tabs.Screen name="insights" />
                  <Tabs.Screen name="profile" />
              </Tabs>
              <BottomBar></BottomBar>
          </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
