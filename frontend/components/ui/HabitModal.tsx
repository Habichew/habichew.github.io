import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDropdown from './select';
import { webDateInputWrapper, webDateInput } from './webDateStyles';

type Props = {
  visible: boolean;
  initialData?: {
    habitTitle?: string;
    goalDate?: string | null;
    priority?: number | null;
    frequency?: string | null;
  };
  onClose: () => void;
  onSave: (data: {
  habitTitle: string;
  goalDate?: string | null;
  startDate: string;
  priority?: number | null;
  frequency?: string | null;
}) => void;
  onDelete?: (habitId: number) => void | Promise<void>;
  habitId?: number;
};

const HabitModal: React.FC<Props> = ({ visible, initialData, onClose, onSave, onDelete, habitId }) => {
  const isEdit = !!initialData;
  const [formData, setFormData] = useState<any>({ habitTitle: '', goalDate: '', priority: '', frequency: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (initialData) {
      const formatDate = (d: string | Date) => new Date(d).toISOString().split('T')[0];
      setFormData({
        habitTitle: initialData.habitTitle || '',
        goalDate: initialData.goalDate ? formatDate(initialData.goalDate) : '',
        priority: initialData.priority != null ? reversePriorityMap[initialData.priority] : '',
        frequency: initialData.frequency || '',
      });
    } else {
      setFormData({ habitTitle: '', goalDate: '', priority: '', frequency: '' });
    }
  }, [initialData]);

  const reversePriorityMap: Record<number, string> = { 1: 'High', 2: 'Medium', 3: 'Low' };
  const priorityMap: Record<string, number> = { Low: 3, Medium: 2, High: 1 };

  const handleSave = () => {
    if (!formData.habitTitle) return alert('Please enter a habit name.');
    const today = new Date().toISOString().split('T')[0];
    onSave({
      habitTitle: formData.habitTitle,
      goalDate: formData.goalDate || null,
      startDate: today,
      priority: formData.priority ? priorityMap[formData.priority] : null,
      frequency: formData.frequency || null,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{isEdit ? 'Edit Habit' : 'Add Habit'}</Text>
            {isEdit ? (
              <TouchableOpacity onPress={() => setShowConfirmDelete(true)}>
                <Ionicons name="trash-outline" size={24} color="#555" />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 24 }} />  // align
            )}
          </View>

          <TextInput placeholder="Add Habit" placeholderTextColor="#bbb" style={[styles.input, { height: 48 }]} value={formData.habitTitle} onChangeText={text => setFormData({ ...formData, habitTitle: text })} />
          {Platform.OS === 'web' ? (
            <View style={webDateInputWrapper}>
              <input type="date" value={formData.goalDate} onChange={(e) => setFormData({ ...formData, goalDate: e.target.value })} style={{ ...webDateInput, color: formData.goalDate ? '#000' : '#bbb' }} />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}><Text style={styles.tag}>{formData.goalDate || 'Goal Date'}</Text></TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker value={formData.goalDate ? new Date(formData.goalDate) : new Date()} mode="date" display="calendar" onChange={(event: any, selectedDate: Date | undefined) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const y = selectedDate.getFullYear(), m = selectedDate.getMonth() + 1, d = selectedDate.getDate();
                    const formattedDate = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                    setFormData({ ...formData, goalDate: formattedDate });
                  }
                }} />
              )}
            </>
          )}
          <CustomDropdown zIndex={4} zIndexInverse={3} items={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }]} value={formData.priority} setValue={val => val && setFormData({ ...formData, priority: val })} placeholder="Priority" />
          <CustomDropdown zIndex={2} zIndexInverse={1} items={[{ label: 'Daily', value: 'Daily' }, { label: 'Weekly', value: 'Weekly' }, { label: 'Monthly', value: 'Monthly' }]} value={formData.frequency} setValue={val => val && setFormData({ ...formData, frequency: val })} placeholder="Frequency" />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text style={styles.saveText}>{isEdit ? 'Save' : 'Create'}</Text></TouchableOpacity>
          </View>
        </View>
        {showConfirmDelete && (
          <View style={styles.confirmOverlay}>
            <View style={styles.confirmBox}>
              <Text style={styles.confirmText}>Are you sure you want to delete this habit?{'\n'}All related tasks will be deleted.</Text>
              <View style={styles.confirmButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowConfirmDelete(false)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={() => { if (onDelete && habitId) { onDelete(habitId); setShowConfirmDelete(false); onClose(); } }}><Text style={styles.saveText}>Delete</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default HabitModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#dab7ff', padding: 24, borderRadius: 24, width: '90%', position: 'relative' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', paddingHorizontal: 16, borderRadius: 24, fontWeight: 'bold', fontSize: 16, color: '#000', marginBottom: 16 },
  tag: { height: 48, backgroundColor: '#fff', borderRadius: 24, paddingHorizontal: 16, fontWeight: 'bold', fontSize: 16, color: '#bbb', textAlignVertical: 'center', textAlign: 'left', paddingTop: 12, marginBottom: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { backgroundColor: '#000', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  cancelText: { fontSize: 20, color: '#dab7ff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#1CC282', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  saveText: { fontSize: 20, color: '#000', fontWeight: 'bold' },
  deleteIcon: { position: 'absolute', top: 16, right: 16 },
  confirmOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#00000088', justifyContent: 'center', alignItems: 'center' },
  confirmBox: { backgroundColor: '#fff', padding: 24, borderRadius: 24, width: '80%', alignItems: 'center' },
  confirmText: { fontSize: 16, color: '#000', marginBottom: 16, textAlign: 'center' },
  confirmButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
