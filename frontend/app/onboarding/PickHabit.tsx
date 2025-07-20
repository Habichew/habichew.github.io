import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomDropdown from '../../components/ui/select';
import { useUser, Habit } from '../context/UserContext';

export default function PickHabit() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [customHabit, setCustomHabit] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('Choose a category');
  const [showDropdown, setShowDropdown] = useState(false);
  const [presets, setPresets] = useState<any[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    fetch('http://localhost:3000/presets/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const fetchPresets = async (categoryId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/presets/categories/${categoryId}/habits`);
      const data = await res.json();
      setPresets(data);
    } catch (err) {
      console.error('Failed to fetch presets', err);
    }
  };

  const handleSelectCategory = (id: number, name: string) => {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
    setShowDropdown(false);
    fetchPresets(id);
  };

  const handleSubmitHabit = async (habit: string, habitId?: number) => {
  if (!userId) {
    alert('Please log in first');
    return;
  }

  try {
    const payload: any = {
      ...(habitId ? { habitId } : {}),
      customTitle: habit
    };

    const response = await fetch(`http://localhost:3000/habits/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to create habit');
    }

    const result = await response.json();
    console.log('Created:', result);

    // optional cleanup
    setModalVisible(false);
    setCustomHabit('');

    router.push({
      pathname: '/onboarding/PickTask',
      params: {
        habit,
        habitId: result.habit.userHabitId
      }
    });

  } catch (error) {
    console.error('Add habit error:', error);
    alert('Failed to add habit. Please try again.');
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/previouscat2.png')} style={styles.petImage} />

      <Text style={styles.title}>Choose a habit to feed your pet</Text>

      {/* <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.dropdownText}>{selectedCategoryName}</Text>
        <View style={styles.dropdownArrowCircle}>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </TouchableOpacity> */}

      <CustomDropdown
        items={categories.map((cat) => ({ label: cat.name, value: String(cat.id) }))}
        value={selectedCategoryId ? String(selectedCategoryId) : null}
        setValue={(val) => {
          if (val !== null) {
            const cat = categories.find((c) => String(c.id) === val);
            if (cat) {
              setSelectedCategoryId(cat.id);
              fetchPresets(cat.id);
            }
          }
        }}
        style={{ width: '100%'}}
        placeholder="Choose a category"
      />

      {/* Scrollable habit list with fixed height */}
      <ScrollView style={styles.habitList}>
        {presets.map((habit, idx) => (
          <TouchableOpacity key={idx} style={styles.habitItem} onPress={() => handleSubmitHabit(habit.title, habit.id)}>
            <Text style={styles.habitText}>{habit.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add custom habit */}
      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>Or add your own</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Your Own Habit</Text>
            <TextInput
              value={customHabit}
              onChangeText={setCustomHabit}
              placeholder="Enter a habit"
              placeholderTextColor={'#999'}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSubmitHabit(customHabit)} style={styles.saveBtn}>
                <Text style={styles.submitText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 24, backgroundColor: '#fff', alignItems: 'center'
  },
  petImage: {
    width: 160, height: 160, marginBottom: 24
  },
  title: {
    fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20
  },
  dropdownBtn: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#000'
  },
  dropdownText: {
    fontWeight: 'bold', fontSize: 16, color: '#222'
  },
  dropdownArrowCircle: {
    backgroundColor: '#000',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownArrow: {
    color: '#1CC282', fontSize: 18
  },
  dropdownList: {
    position: 'absolute',
    width: '100%',
    maxHeight:80,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 6
  },
  dropdownItem: {
    paddingVertical: 10, paddingHorizontal: 20
  },
  dropdownItemText: {
    fontSize: 16, color: '#333'
  },
  habitList: {
    flexGrow: 0,
    maxHeight: 260,
    width: '100%',
    marginBottom: 20
  },
  habitItem: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 4
  },
  habitText: {
    fontSize: 16, fontStyle: 'italic', color: '#444'
  },
  addBtn: {
    backgroundColor: '#1CC282',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 40,
    marginTop: 'auto',
    marginBottom:100,
  },
  addText: {
    fontSize: 16, fontWeight: 'bold', color: '#000'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelText: { padding: 10, color: '#999', fontWeight: 'bold' },
  submitText: { color: '#000', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#1CC282',
    borderRadius: 24,
    alignItems: 'center',
    padding: 10
  }
});
