import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import BackButton from 'components/ui/BackButton';

<View style={{ marginTop: 50, marginLeft: 20 }}>
  <BackButton />
</View>


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
    <View style={styles.imageSection}>
      <Image source={storyImages[index]} style={styles.image} />
    </View>

    {/* text */}
    <View style={styles.textSection}>
      {storyTexts[index].map((line, i) => (
        <Text key={i} style={styles.line}>{line}</Text>
      ))}
    </View>

    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
      <View style={styles.circleButton}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.arrowContainer} onPress={handleNext}>
      <View style={styles.circleButton}>
        <Text style={styles.arrowText }>{'>'}</Text>
      </View>
    </TouchableOpacity>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textSection: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  line: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  backButton: {
  position: 'absolute',
  top: 28,
  left: 24,
  zIndex: 10,
},

  arrowContainer: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    zIndex: 10,
  },

  circleButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  arrowText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

