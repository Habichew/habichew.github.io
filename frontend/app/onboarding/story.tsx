import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';

const storyImages = [
  require('../../assets/images/story1.png'),
  require('../../assets/images/story2.png'),
  require('../../assets/images/story3.png'),
  require('../../assets/images/story4.png'),
  require('../../assets/images/story5.png'),
];

const storyTexts = [
  ["You wake up… weightless.", "Something happened. Your ship is drifting."],
  ["A flashing red light catches your eye.", "The control panel is blinking."],
  ["You float towards it.", "There's a message: SYSTEM FAILURE."],
  ["You reach for the manual override.", "Your fingers tremble."],
  ["With a deep breath, you press the button.", "A new journey begins…"],
];

export default function StoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialIndex = parseInt(params.index as string) || 0;
  const [index, setIndex] = useState(initialIndex);

  const handleNext = () => {
    if (index < storyImages.length - 1) {
      setIndex(index + 1);
    } else {
      router.push('/onboarding/info-1');
    }
  };

  const handleBack = () => {
    if (index === 0) {
      router.push('../onboarding/launch');
    } else {
      setIndex(index - 1); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={storyImages[index]} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        {storyTexts[index].map((line, i) => (
          <Text key={i} style={styles.line}>{line}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.arrowContainer} onPress={handleNext}>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
      backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
