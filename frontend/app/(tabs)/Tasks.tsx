// Tasks.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Image } from 'react-native';
import { useUser } from '../context/UserContext';
import TaskModal from '../../components/ui/TaskModal';
import { Ionicons } from '@expo/vector-icons';

export default function Tasks() {
  const { user } = useUser();
  const userId = user?.id;
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/tasks`);
      const data = await res.json();
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          style={styles.search}
          placeholder="Search Taskname or belonged habit"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Task List</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskSub}>belong to {item.habitId ? `Habit${item.habitId}` : 'None'}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>📅 {new Date(item.dueAt).toDateString()}</Text>
                  <Text style={styles.metaText}>⚑ Priority {item.priority}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TaskModal
        visible={modalVisible}
        onClose={() => {
            setModalVisible(false);
            setEditingTask(null);
            fetchTasks();
        }}
        onSave={() => {
            setModalVisible(false);
            setEditingTask(null);
            fetchTasks();
        }}
        task={editingTask}
        />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  topBar: {
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 16,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  taskSub: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#444',
  },
});
