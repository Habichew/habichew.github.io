// app/(tasks)/PickTask.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const CATEGORIES = ['Work', 'Health', 'Learning'];
const TASKS = ['Design', 'Yoga', 'Read', 'Walk', 'Code', 'Meditate', 'Study', 'Sleep'];

export default function PickTask() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const router = useRouter();

  const toggleTask = (task: string) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose a category</Text>
      <View style={styles.dropdownWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
          {CATEGORIES.map((cat) => <Picker.Item label={cat} value={cat} key={cat} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Choose a task</Text>
      <View style={styles.taskArea}>
        {TASKS.map((task) => (
          <TouchableOpacity
            key={task}
            style={[styles.tag, selectedTasks.includes(task) && styles.selectedTag]}
            onPress={() => toggleTask(task)}>
            <Text style={styles.tagText}>{task}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => router.push({ pathname: '/onboarding/GenerateSubTask', params: { task: selectedTasks[0] || '' } })}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  label: { fontWeight: 'bold', marginTop: 20 },
  dropdownWrapper: { borderWidth: 1, borderColor: '#ccc', marginTop: 8 },
  taskArea: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20, backgroundColor: '#f0f1f4', padding: 20,
  },
  tag: {
    backgroundColor: '#484C59', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14,
  },
  selectedTag: {
    backgroundColor: '#1c1f26',
  },
  tagText: { color: '#fff' },
  continueBtn: {
    backgroundColor: '#484C59', paddingVertical: 14, marginTop: 30, borderRadius: 6, alignItems: 'center',
  },
  btnText: { color: 'white', fontWeight: 'bold' },
});