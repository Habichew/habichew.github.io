// frontend/app/home.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';
import ItemModal from 'components/ui/ItemModal';
import ProgressBar from 'components/ui/ProgressBar';
import { useHabitSearch } from '../../hooks/useHabitSearch';
import { calculateHabitProgress } from '../../hooks/calculateHabitProgress';

const Home = () => {
  const { user, habits, tasks, addHabit, updateHabit, addTask } = useUser();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const filteredHabits = useHabitSearch(habits, search);

  const handleSaveHabit = (habitData: any) => {
    if (!habitData.id) {
      addHabit({ ...habitData, id: Date.now().toString(), userId: user?.id });
    } else {
      updateHabit(habitData);
    }
  };

  const handleSaveTask = (taskData: any) => {
    const id = taskData.id || Date.now().toString();
    addTask({ ...taskData, id });
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.topBar}>
        <TextInput style={styles.habitName} value="Habit1" editable={false} />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Task List</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.plusIcon}>＋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.noTaskText}>
        You don’t have any task for the habit
        {'\n'}Generate tasks with just a click or use
        {'\n'}+ to add your own !
      </Text>

      <TouchableOpacity style={styles.generateBtn}>
        <Text style={styles.generateBtnText}>Generate Tasks</Text>
      </TouchableOpacity>

      <ItemModal
        visible={showModal}
        type="task"
        onClose={() => {
          setEditTask(null);
          setShowModal(false);
        }}
        onSave={handleSaveTask}
        initialData={editTask ?? undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Home;
