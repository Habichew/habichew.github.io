import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '@/components/topbar';

const moods = ['😖', '😵', '😟', '😐', '😊'];

export default function MoodCheckScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const date = new Date();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <View style={styles.container}>
      <TopBar />

      {/* date */}
      <Text style={styles.dateText}>☀️  {dayOfWeek}  {day} {month}</Text>

      {/* photo */}
      <Image source={require('@/assets/images/placeholder.png')} style={styles.image} />

      {/* number */}
      <View style={styles.box}>
        <Text style={styles.boxText}>1</Text>
      </View>

      {/* text */}
      <Text style={styles.title}>Mood Checkpoint</Text>

      {/* Expression selection */}
      <View style={styles.moodRow}>
        {moods.map((mood, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedMood(index)}>
            <Text style={[
              styles.moodIcon,
              selectedMood === index && styles.moodSelected
            ]}>
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* switch */}
      <View style={styles.toggleRow}>
        <Ionicons name="notifications-outline" size={20} />
        <Text style={styles.toggleText}>Turn notifications on</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* GO */}
      <TouchableOpacity style={styles.goButton}>
        <Text style={styles.goText}>GO!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 24,
  },
  dateText: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginVertical: 12,
  },
  box: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    marginVertical: 8,
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 16,
  },
  moodIcon: {
    fontSize: 28,
    opacity: 0.5,
  },
  moodSelected: {
    opacity: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  toggleText: {
    fontSize: 14,
  },
  goButton: {
    backgroundColor: '#484C59',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 6,
  },
  goText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
