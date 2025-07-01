import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InfoScreen3() {
  const [habits, setHabits] = useState<string[]>([]);
//setHabits is the function used to update this array.

  useEffect(() => {
    const fetchHabits = async () => {
      const recommended = await mockGetRecommendedHabits();
      setHabits(recommended);
    };
//useEffect is a side effect hook that is executed after the component is rendered for the first time.
//  This means that this effect is only executed once.

    fetchHabits();
  }, []);

  const mockGetRecommendedHabits = async () => {
    return ['Read', 'Workout', 'Meditate', 'Hydrate', 'Stretch', 'Plan'];
  };
//Simulate the results returned by the backend
//Can be replaced in the future: const recommended = await fetch('https://your-api/recommendations');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a habit to FEED to your pet</Text>
      <ScrollView contentContainerStyle={styles.bubbleContainer}>
        {habits.map((habit, idx) => (
          <View key={idx} style={[styles.bubble, idx % 3 === 0 && styles.largeBubble]}>
            <Text style={styles.bubbleText}>{habit}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
  bubbleContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 16,
  },
  bubble: {
    width: 104, height: 104, borderRadius: 62,
    backgroundColor: '#E6E6EB', alignItems: 'center', justifyContent: 'center',
  },
  largeBubble: {
    width: 190, height: 190, borderRadius: 95,
    backgroundColor: '#BEBEC4',
  },
  bubbleText: { fontWeight: 'bold', fontSize: 18 },
});
