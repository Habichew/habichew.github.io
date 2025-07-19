import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUser } from '../context/UserContext';
import TaskModal from '@/components/ui/TaskModal';
import { Ionicons } from '@expo/vector-icons';
import PickHabit from './PickHabit';

const defaultTasks = [
  { title: 'Start small steps', priority: 1 },
  { title: 'Track progress', priority: 2 },
  { title: 'Stay consistent', priority: 3 },
];

export default function PickTasks() {
  const { habit, habitId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  const hardcodedUserId = 1; // ✅ 用于测试，之后换成 user?.id
  const hardcodedHabitId = Number(habitId) || 1; // ✅ 用于测试

  const handleGenerateTasks = async () => {
    try {
      const promises = defaultTasks.map((task) =>
        fetch(`http://localhost:3000/users/${hardcodedUserId}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: { ...task, habitId: hardcodedHabitId } }),
        })
      );

      await Promise.all(promises);
      router.push('/(tabs)/home');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to generate tasks');
    }
  };

  const handleSaveCustomTask = async (task: any) => {
    try {
      await fetch(`http://localhost:3000/users/${hardcodedUserId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: { ...task, habitId: hardcodedHabitId } }),
      });
      Alert.alert('Success', 'Task added successfully');
      setTaskModalVisible(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add task');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.replace('./PickHabit')}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/images/previouscat2.png')} style={styles.petImage} />
      <Text style={styles.habitText}>{habit}</Text>

      <Text style={styles.info}>
        is too big for me to{'\n'}chew, let’s break it down{'\n'}with just a click!
      </Text>

      <TouchableOpacity style={styles.addCustom} onPress={() => setTaskModalVisible(true)}>
        <Ionicons name="add" size={24} color="#444" />
        <Text style={styles.grayHint}>or use + to add your own</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateTasks}>
        <Text style={styles.generateText}>Generate Tasks</Text>
      </TouchableOpacity>

      <TaskModal
        visible={taskModalVisible}
        onClose={() => setTaskModalVisible(false)}
        onSave={handleSaveCustomTask}
        habitId={hardcodedHabitId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    alignItems: 'center', paddingTop: 60,
  },
  back: {
    position: 'absolute', left: 20, top: 28,
  },
  backText: {
    fontSize: 24, fontWeight: 'bold',
  },
  petImage: {
    width: 160, height: 160, marginBottom: 12,
    resizeMode: 'contain',
  },
  habitText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    color: '#DAB7FF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
    marginVertical: 12,
  },
  addCustom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 60,
  },
  grayHint: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  generateBtn: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: '#DAB7FF',
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  generateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});
