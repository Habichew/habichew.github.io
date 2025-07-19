import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  task?: any;
  habitId?: number;
}

export default function TaskModal({ visible, onClose, onSave, task, habitId }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueAt ? new Date(task.dueAt) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState(task?.priority || 1);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDueDate(task.dueAt ? new Date(task.dueAt) : null);
      setPriority(task.priority || 1);
    } else {
      setTitle('');
      setDueDate(null);
      setPriority(1);
    }
  }, [task, visible]);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      dueAt: dueDate ? dueDate.toISOString().split('T')[0] : null,
      priority,
      habitId: task?.habitId || habitId || null,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Add Task"
          />

          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: '#333' }}>{dueDate ? dueDate.toDateString() : 'Pick a date'}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={dueDate || new Date()}
              onChange={(_, selected) => {
                setShowDatePicker(false);
                if (selected) setDueDate(selected);
              }}
            />
          )}

          <Text style={styles.label}>Priority</Text>
          <TextInput
            value={String(priority)}
            onChangeText={(val) => setPriority(Number(val))}
            style={styles.input}
            keyboardType="numeric"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1CC282',
  },
  saveText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
