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
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDropdown from './select';

import {
  webDateInputWrapper,
  webDateInput,
} from './webDateStyles';

type Props = {
  visible: boolean;
  initialData?: {
    habitTitle?: string;
    goalDate?: string;
    priority?: number;
    frequency?: string;
  };
  onClose: () => void;
  onSave: (data: {
    habitTitle: string;
    goalDate: string;
    startDate: string;
    priority: number;
    frequency: string;
  }) => void;
};

const HabitModal: React.FC<Props> = ({ visible, initialData, onClose, onSave }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState<any>({
    habitTitle: '',
    goalDate: '',
    priority: '',
    frequency: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        habitTitle: initialData.habitTitle || '',
        goalDate: initialData.goalDate || '',
        priority: initialData.priority || '',
        frequency: initialData.frequency || '',
      });
    } else {
      setFormData({ habitTitle: '', goalDate: '', priority: '', frequency: '' });
    }
  }, [initialData]);

  const priorityMap: Record<string, number> = {
    Low: 3,
    Medium: 2,
    High: 1,
  };

  const handleSave = () => {
    if (!formData.habitTitle) {
      alert('Please enter a habit name.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const dataToSend = {
      habitTitle: formData.habitTitle,
      goalDate: formData.goalDate || today,
      startDate: today,
      priority: priorityMap[formData.priority] || 3,
      frequency: formData.frequency || 'Daily',
    };

    onSave(dataToSend);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{isEdit ? 'Edit Habit' : 'Add Habit'}</Text>

          <TextInput
            placeholder="Add Habit"
            placeholderTextColor="#bbb"
            style={[styles.input, { height: 48 }]}
            value={formData.habitTitle}
            onChangeText={text => setFormData({ ...formData, habitTitle: text })}
          />

          {Platform.OS === 'web' ? (
            <View style={webDateInputWrapper}>
              <input
                type="date"
                value={formData.goalDate}
                onChange={(e) =>
                  setFormData({ ...formData, goalDate: e.target.value })
                }
                style={{
                  ...webDateInput,
                  color: formData.goalDate ? '#000' : '#bbb',
                }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.tag}>
                  {formData.goalDate || 'Goal Date'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.goalDate ? new Date(formData.goalDate) : new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(event: any, selectedDate: Date | undefined) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate.toISOString().split('T')[0];
                      setFormData({ ...formData, goalDate: formatted });
                    }
                  }}
                />
              )}
            </>
          )}

          <CustomDropdown
            zIndex={4}
            zIndexInverse={3}
            items={[
              { label: 'Low', value: 'Low' },
              { label: 'Medium', value: 'Medium' },
              { label: 'High', value: 'High' },
            ]}
            value={formData.priority}
            setValue={(val) => val && setFormData({ ...formData, priority: val })}
            placeholder="Priority"
          />

          <CustomDropdown
            zIndex={2}
            zIndexInverse={1}
            items={[
              { label: 'Daily', value: 'Daily' },
              { label: 'Weekly', value: 'Weekly' },
              { label: 'Monthly', value: 'Monthly' },
            ]}
            value={formData.frequency}
            setValue={(val) => val && setFormData({ ...formData, frequency: val })}
            placeholder="Frequency"
          />

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

export default HabitModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#dab7ff',
    padding: 24,
    borderRadius: 24,
    width: '90%',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 24,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  tag: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#bbb',
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingTop: 12,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  cancelText: {
    fontSize: 20,
    color: '#dab7ff',
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#1CC282',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  saveText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  deleteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
