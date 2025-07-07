// app/onboarding/info2.tsx
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function InfoScreen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/placeholder.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>What’s your working style?</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/info-3')}>
        <Text style={styles.buttonText}>Slow Paced</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/info-3')}>
        <Text style={styles.buttonText}>Fast Paced</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white', alignItems: 'center' },
  image: { height: 160, marginVertical: 20 },
  label: { fontSize: 16, marginBottom: 16 },
  button: {
    borderWidth: 1, borderColor: '#000', borderRadius: 4,
    paddingVertical: 10, paddingHorizontal: 32, marginVertical: 8,
  },
  buttonText: { fontSize: 14 },
});
