import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  type: 'habit' | 'task';
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
};

const ItemModal: React.FC<Props> = ({ visible, type, initialData, onClose, onSave }) => {
  const isEdit = !!initialData;
  const [formData, setFormData] = useState<any>({
    name: '',
    title: '',
    description: '',
    date: '',
    dueAt: '',
    priority: '',
    category: '',
    habitId: '',
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else {
      setFormData({
        name: '',
        title: '',
        description: '',
        date: '',
        dueAt: '',
        priority: '',
        category: '',
        habitId: '',
      });
    }
  }, [initialData]);

  const handleSave = () => {
    const id = formData.id || Date.now().toString();
    onSave({ ...formData, id });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* 标题栏 */}
          <Text style={styles.title}>
            {type === 'habit'
              ? isEdit ? 'HabitEdit' : 'HabitAdd'
              : isEdit ? 'Task edit' : 'Task Add'}
          </Text>

          {/* 表单字段 */}
          {type === 'habit' ? (
            <>
              <TextInput
                placeholder="Habit1 / AddHabit"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
              />
              <View style={styles.row}>
                <Text style={styles.tag}>📅 {formData.date || 'DDL'}</Text>
                <Text style={styles.tag}>🚩 {formData.priority || 'Priority'}</Text>
                <Text style={styles.tag}>📆 {formData.category || 'Category'}</Text>
              </View>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Task1 / AddTask"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={formData.title}
                onChangeText={text => setFormData({ ...formData, title: text })}
              />
              <View style={styles.row}>
                <Text style={styles.tag}>📅 {formData.dueAt || 'DDL'}</Text>
                <Text style={styles.tag}>🚩 {formData.priority || 'Priority'}</Text>
                <Text style={styles.tag}>Belonged Habit</Text>
              </View>
            </>
          )}

          {/* 底部按钮 */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>{isEdit ? 'Save' : 'Create'}</Text>
            </TouchableOpacity>
          </View>

          {/* 删除图标，仅显示不绑定功能 */}
          <Ionicons name="trash-outline" size={24} color="#555" style={styles.deleteIcon} />
        </View>
      </View>
    </Modal>
  );
};

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
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

export default ItemModal;
