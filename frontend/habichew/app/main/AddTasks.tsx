import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView
} from 'react-native';
import TopBar from '@/components/topbar';
import { Ionicons } from '@expo/vector-icons';

const mockTasks = [
  {
    id: '1',
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the new product landing page.',
    due: 'Today',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Develop user authentication',
    description: 'Implement login and registration flow with social media integration.',
    due: 'Tomorrow',
    priority: 'Medium'
  }
];

export default function AddTasksScreen() {
  const [tab, setTab] = useState<'Habits' | 'Tasks'>('Tasks');
  const [input, setInput] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <TopBar />

      {/* Tab Toggle */}
      <View style={styles.tabRow}>
        {['Habits', 'Tasks'].map(t => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t as 'Habits' | 'Tasks')}
            style={[styles.tabButton, tab === t && styles.tabSelected]}>
            <Text>{t}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons name="add" size={20} />
        </TouchableOpacity>
      </View>

      {/* Add Task Section */}
      <View style={styles.addBox}>
        <Text style={styles.addTitle}>Add a Task</Text>
        <TextInput placeholder="Add sub tasks..." style={styles.subInput} />
        <TextInput placeholder="Add sub tasks..." style={styles.subInput} />
        <View style={styles.iconRow}>
          <Ionicons name="time-outline" size={18} />
          <Ionicons name="calendar-outline" size={18} style={{ marginLeft: 16 }} />
        </View>
        <TouchableOpacity style={styles.subBtn}>
          <Text style={styles.subBtnText}>Generate sub-tasks</Text>
        </TouchableOpacity>
      </View>

      {/* Pagination Progress */}
      <View style={styles.progressBar}>
        <View style={[styles.bar, { width: '45%' }]} />
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* Task Cards */}
      <ScrollView style={styles.cardList}>
        {mockTasks.map(task => (
          <View key={task.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{task.title}</Text>
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={16} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardDesc}>{task.description}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={14} />
              <Text style={styles.metaText}>{task.due}</Text>
              <Ionicons name="flag-outline" size={14} style={{ marginLeft: 12 }} />
              <Text style={styles.metaText}>{task.priority}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8fb' },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e4e6eb',
    marginRight: 8,
    borderRadius: 4
  },
  tabSelected: {
    backgroundColor: '#cbd0d6'
  },
  plusButton: {
    marginLeft: 'auto',
    padding: 6,
    backgroundColor: '#e4e6eb',
    borderRadius: 4
  },
  addBox: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  addTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8
  },
  subInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
    marginBottom: 6
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12
  },
  subBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#484C59',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  subBtnText: {
    color: '#fff',
    fontWeight: '600'
  },
  progressBar: {
    marginHorizontal: 16,
    marginTop: 4
  },
  bar: {
    height: 4,
    backgroundColor: '#484C59',
    borderRadius: 2
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginLeft: 6
  },
  dotActive: {
    backgroundColor: '#484C59'
  },
  cardList: {
    marginHorizontal: 16,
    marginTop: 12
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14
  },
  cardDesc: {
    fontSize: 13,
    marginTop: 4
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center'
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4
  }
});
