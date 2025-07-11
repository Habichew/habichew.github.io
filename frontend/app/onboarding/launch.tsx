import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

export default function LaunchScreen() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/placeholder.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.subtitle}>Welcome to</Text>
        <TouchableOpacity onPress={() => router.push('/onboarding/story')} activeOpacity={0.9}>
          <Animated.Image
            source={require('@/assets/images/habichewLogo.png')}
            style={[styles.logo, { transform: [{ translateY: floatAnim }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
  },
  imageContainer: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 72,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  logo: {
    width: 300,
    height: 160,
    marginBottom: 24,
  },
});
