// frontend/app/(tabs)/tasks.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import ItemModal from '../../components/ui/HabitModal';
const TaskScreen = () => {
  const {
    user,
    tasks,
    habits,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
  } = useUser();

  const [filter, setFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [habitFilterName, setHabitFilterName] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!filter.trim()) {
      setFilteredTasks(tasks);
    } else {
      const term = filter.toLowerCase();
      setFilteredTasks(
        tasks.filter(
          t =>
            t.title?.toLowerCase().includes(term) ||
            habits.find(h => h.id === t.habitId)?.name?.toLowerCase().includes(term)
        )
      );
    }
  }, [filter, tasks]);

  const handleGenerateTasks = async () => {
    if (!selectedHabit) return;
    const generated = [
      { title: 'Drink Water', dueAt: '2025-06-30', priority: 'Low' },
      { title: 'Stretch', dueAt: '2025-06-30', priority: 'Medium' },
      { title: 'Journal', dueAt: '2025-06-30', priority: 'High' },
    ];

    for (const g of generated) {
      await addTask({
        id: Date.now().toString() + g.title,
        title: g.title,
        dueAt: g.dueAt,
        priority: g.priority,
        habitId: selectedHabit,
      });
    }
  };

  const renderTask = ({ item }: any) => {
    const habitName = habits.find(h => h.id === item.habitId)?.name;
    return (
      <View style={{ backgroundColor: '#eee', padding: 12, borderRadius: 12, marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', marginTop: 8, gap: 10 }}>
          <Text style={styles.tag}>📅 {item.dueAt || 'No Date'}</Text>
          <Text style={styles.tag}>🚩 {item.priority}</Text>
          {habitName && <Text style={styles.tag}>Belong to {habitName}</Text>}
        </View>
        <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity onPress={() => {
            setEditingTask(item);
            setModalVisible(true);
          }}>
            <Ionicons name="pencil" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Ionicons name="checkmark-done-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showTasks = selectedHabit
    ? filteredTasks.filter(t => t.habitId === selectedHabit)
    : filteredTasks;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff', padding: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setSelectedHabit('')}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Taskname or Belonged Habit"
          value={filter}
          onChangeText={setFilter}
          style={{
            flex: 1,
            marginLeft: 10,
            backgroundColor: '#eee',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        />
      </View>

      {selectedHabit && showTasks.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 80 }}>
          <Text style={{ textAlign: 'center', marginBottom: 16 }}>
            You don’t have any task for the habit{'\n'}
            Generate tasks with just a click or use + to add your own!
          </Text>
          <TouchableOpacity
            onPress={handleGenerateTasks}
            style={{
              backgroundColor: '#DAB7FF',
              paddingHorizontal: 30,
              paddingVertical: 14,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Generate Tasks</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={showTasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
        />
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 28,
          right: 28,
          backgroundColor: '#DAB7FF',
          padding: 12,
          borderRadius: 28,
        }}
        onPress={() => {
          setEditingTask(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>

      <ItemModal
        visible={modalVisible}
        type="task"
        initialData={editingTask}
        onClose={() => setModalVisible(false)}
        onSave={async (data) => {
          if (!data.habitId && selectedHabit) data.habitId = selectedHabit;
          if (editingTask) await updateTask(data);
          else await addTask(data);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles =StyleSheet.create({
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold', 
    fontSize: 12,
    color: '#000',
  },
  pageWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  instruction: {
    fontSize: 12,
    color: '#333',
    marginBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  habitName: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  plusIcon: {
    fontSize: 24,
    color: '#000',
  },
  noTaskText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    lineHeight: 22,
  },
  generateBtn: {
    backgroundColor: '#DAB7FF',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TaskScreen;
