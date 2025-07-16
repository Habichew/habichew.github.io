import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CustomDropdown from './select';
import { webDateInput, webDateInputWrapper, webDateLabel } from './webDateStyles';

interface Props {
  visible: boolean;
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const TaskModal: React.FC<Props> = ({ visible, initialData, onClose, onSave }) => {
  const isEdit = !!initialData;

const [formData, setFormData] = useState<{
  id?: string;
  title: string;
  description: string;
  dueAt: string;
  priority: string;
  habitId: string;
  }>({
  id: '',
  title: '',
  description: '',
  dueAt: '',
  priority: '',
  habitId: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueAt: '',
        priority: '',
        habitId: '',
      });
    }
  }, [initialData]);

  const handleSave = () => {
    const id = formData.id || Date.now().toString();
    const dueDate = formData.dueAt || new Date().toISOString().split('T')[0];

    onSave({
      ...formData,
      id,
      dueAt: dueDate,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{isEdit ? 'Task Edit' : 'Task Add'}</Text>

          <TextInput
            placeholder="AddTask"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={formData.title}
            onChangeText={text => setFormData({ ...formData, title: text })}
          />

          {/* Due Date */}
          {Platform.OS === 'web' ? (
            <View style={webDateInputWrapper}>
              <Text style={webDateLabel}></Text>
              <input
                type="text"
                value={formatDate(formData.dueAt)}
                placeholder="DDL"
                onFocus={(e) => {
                  e.target.type = 'date';
                }}
                onBlur={(e) => {
                  e.target.type = 'text';
                }}
                onChange={(e) =>
                  setFormData({ ...formData, dueAt: e.target.value })
                }
                style={webDateInput}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.tag}>{formData.dueAt || 'DDL'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dueAt ? new Date(formData.dueAt) : new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const iso = selectedDate.toISOString().split('T')[0];
                      setFormData({ ...formData, dueAt: iso });
                    }
                  }}
                />
              )}
            </>
          )}

          {/* Priority Dropdown */}
          <CustomDropdown
            zIndex={3}
            zIndexInverse={2}
            items={[
              { label: 'Low', value: 'Low' },
              { label: 'Medium', value: 'Medium' },
              { label: 'High', value: 'High' },
            ]}
            value={formData.priority}
            setValue={(val: string | null) => {
              if (val !== null) {
                setFormData({ ...formData, priority: val });
              }
            }}
            placeholder="Priority"
          />

          {/* Habit Relation Input (Optional) */}
          <TextInput
            placeholder="Belonged Habit"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={formData.habitId}
            onChangeText={text => setFormData({ ...formData, habitId: text })}
          />

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>{isEdit ? 'Save' : 'Create'}</Text>
            </TouchableOpacity>
          </View>

          <Ionicons name="trash-outline" size={24} color="#555" style={styles.deleteIcon} />
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#DAB7FF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 28,
  },
  cancelText: {
    color: '#DAB7FF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  saveBtn: {
    backgroundColor: '#1CC282',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 28,
  },
  saveText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
