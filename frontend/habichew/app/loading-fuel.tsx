import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_STARDUST = 100;
const INCREMENT = 10;

export default function LoadingScreen() {
  const [stardust, setStardust] = useState(0);

  useEffect(() => {
    const loadAndUpdateStardust = async () => {
      const storedValue = await AsyncStorage.getItem('stardust');
      let current = storedValue ? parseInt(storedValue) : 0;

      current += INCREMENT;
      if (current >= MAX_STARDUST) {
        current = 0; // reset
      }

      setStardust(current);
      await AsyncStorage.setItem('stardust', current.toString());
    };

    loadAndUpdateStardust();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/rocket.png')} style={styles.rocket} />
      <Text style={styles.text}>You did great! Loading fuel for your rocket now...</Text>

      <Progress.Bar
        progress={stardust / MAX_STARDUST}
        width={240}
        color="#1a1a1a"
        unfilledColor="#ccc"
        borderRadius={4}
        height={10}
        style={{ marginVertical: 16 }}
      />

      <Text style={styles.percentage}>Stardust: {stardust}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  rocket: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});
