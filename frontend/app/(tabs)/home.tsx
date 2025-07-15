// frontend/app/home.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';
import ItemModal from 'components/ui/ItemModal';
import ProgressBar from 'components/ui/ProgressBar';
import { useHabitSearch } from '../../hooks/useHabitSearch';
import { calculateHabitProgress } from '../../hooks/calculateHabitProgress';
import type { Habit } from '../context/UserContext';


const Home = () => {
  const { user, habits, tasks, addHabit, updateHabit } = useUser();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editHabit, setEditHabit] = useState<Habit | null>(null); 


  const filteredHabits = useHabitSearch(habits, search);

  const handleSaveHabit = (habitData: any) => {
    if (!habitData.id) {
      addHabit({ ...habitData, id: Date.now().toString(), userId: user?.id });
    } else {
      updateHabit(habitData);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/previouscat4.png')} style={styles.catImage} />

      <View style={styles.header}>
        <Text style={styles.title}>To-Do</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.addButton}>Add Habit</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Habit"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const progress = calculateHabitProgress(item.id, tasks);
          return (
            <View style={styles.habitCard}>
              <Text style={styles.habitTitle}>{item.name}</Text>
              <ProgressBar progress={progress} />
              <View style={styles.tagsRow}>
                {item.date && <Text style={styles.tag}>📅 {item.date}</Text>}
                {item.priority && <Text style={styles.tag}>🚩 {item.priority}</Text>}
                {item.category && <Text style={styles.tag}>📆 {item.category}</Text>}
                <TouchableOpacity onPress={() => setEditHabit(item)}>
                  <Text style={styles.editIcon}>✎</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <ItemModal
        visible={showModal || !!editHabit}
        type="habit"
        initialData={editHabit ?? undefined}
        onClose={() => {
          setEditHabit(null);
          setShowModal(false);
        }}
        onSave={handleSaveHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#fff'
  },
  catImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#1CC282',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  habitCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    marginRight: 6,
  },
  editIcon: {
    fontSize: 16,
    marginLeft: 6,
  },
});

export default Home;
