import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import TopBar from '@/components/topbar';

import { useFonts } from 'expo-font';

const MOCK_TASKS = [
  { id: '1', title: 'CD', duration: '1 week', priority: 'High', recommended: true },
  { id: '2', title: 'Task', duration: '1 week', priority: 'High', recommended: false },
  { id: '3', title: 'Sub Task', duration: '1 week', priority: 'Medium', recommended: false },
];

const calendarDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const calendarData = [0, 1, 2, 3, 4, 5, 6]; // indices for simplicity

export default function PetScreen() {
  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    Lalezar: require('@/assets/fonts/Lalezar-Regular.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const [viewMode, setViewMode] = useState<'smart' | 'calendar'>('smart');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [recommendationCount, setRecommendationCount] = useState(340);

  const renderTaskCard = (task: any) => (
    <TouchableOpacity
      key={task.id}
      style={[styles.taskCard, selectedTaskId === task.id && styles.selectedTask]}
      onPress={() => setSelectedTaskId(selectedTaskId === task.id ? null : task.id)}>
      <Text style={styles.body}>{task.title}</Text>
      <Text style={styles.body}>{task.duration}</Text>
      <Text style={styles.body}>{task.priority}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.topBox}>
        <Image source={require('@/assets/images/placeholder.png')} style={styles.placeholder} />
        <Text style={styles.star}>⭐ {recommendationCount} +</Text>
        <TouchableOpacity style={styles.kitchen}>
          <Text style={styles.body}>Habit Kitchen →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.toggleHeader}>
        <Text style={styles.toChew}>+ To Chew</Text>
        <TouchableOpacity onPress={() => setViewMode('smart')}><Text style={viewMode === 'smart' ? styles.active : undefined}>Smart Sort</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setViewMode('calendar')}><Text style={viewMode === 'calendar' ? styles.active : undefined}>Calendar view</Text></TouchableOpacity>
      </View>

      {viewMode === 'smart' ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {MOCK_TASKS.map(renderTaskCard)}
      </ScrollView>
      ) : (
        <View style={styles.calendarWrap}>
          <View style={styles.calendarTabs}>
            <Text style={styles.active}>Month</Text>
            <Text>Week</Text>
            <Text>Day</Text>
          </View>
          <View style={styles.calendarDays}>
            {calendarDays.map((day) => <Text key={day} style={styles.day}>{day}</Text>)}
          </View>
          <View style={styles.calendarGrid}>
            {calendarData.map((_, idx) => (
              <View key={idx} style={[styles.cell, idx === 5 && styles.activeCell]}></View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  h1: {
    fontFamily: 'Lalezar',
    fontSize: 24,
    lineHeight: 32,
    // color: '#000',
  },
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: '#000',
  },
  body: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  caption: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  buttonText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize:16,
    lineHeight: 24,
    color:'#000'
  },

  topBox: { alignItems: 'center', marginTop:36, marginBottom: 36 },
  avatar: { position: 'absolute', left: 0, top: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#ccc' },
  placeholder: { width: 100, height: 100, marginVertical: 8 },
  star: { fontSize: 16, fontWeight: '600' },
  kitchen: { position: 'relative', marginTop:40, marginRight:0 },
  toggleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft:25, marginRight:25 },
  toChew: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#000'
  },
  active: { borderBottomWidth: 2, borderColor: '#000' },

  taskCard: {
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  
  
  selectedTask: { backgroundColor: '#eee', borderColor: 'purple' },
  calendarWrap: { padding:35 },
  calendarTabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  calendarDays: { flexDirection: 'row', justifyContent: 'space-around' },
  day: { fontWeight: 'bold', width: 24, textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  cell: { width: 40, height: 40, backgroundColor: '#eee', margin: 2 },
  activeCell: { backgroundColor: '#000' },
  container: { flex: 1 },
});
