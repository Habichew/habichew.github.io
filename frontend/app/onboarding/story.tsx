import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function StoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/placeholder.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.line}>You wake up… weightless.</Text>
        <Text style={styles.line}>Something happened. Your ship is drifting.</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/onboarding/info-1')} style={styles.arrowContainer}>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '60%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  textContainer: {
    height: '40%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  line: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  arrow: {
    fontSize: 18,
    color: '#000',
  },
});
