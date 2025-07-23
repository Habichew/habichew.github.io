import React, { useState, useEffect } from 'react';
import {ScrollView, View,Text,TextInput,FlatList,TouchableOpacity,Image,StyleSheet,Dimensions,} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser, Habit } from '../context/UserContext';
import ItemModal from '@/components/ui/HabitModal';
import BottomBar from "@/components/bottomBar";
import {SystemBars} from "react-native-edge-to-edge";

const screenWidth = Dimensions.get('window').width;
const scale = (value: number) => (screenWidth / 375) * value;

const Home = () => {
  const { user, habits, loadHabits, addHabit, updateHabit } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHabits, setFilteredHabits] = useState(habits);
  const [modalVisible, setModalVisible] = useState(false);
  const [editHabit, setEditHabit] = useState<Partial<Habit> | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (user) loadHabits();
  }, [user]);

  useEffect(() => {
    setFilteredHabits(
      habits.filter(habit =>
        habit.habitTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, habits]);

  const handleAdd = () => {
    setEditHabit(null);
    setModalVisible(true);
  };

  const handleSave = async (data: any) => {
    if (editHabit) {
      await updateHabit({ ...data, userHabitId: editHabit.userHabitId });
    } else {
      await addHabit(user!.id.toString(), data);
    }
    await loadHabits();
  };


  const handleEdit = (habit: any) => {
    setEditHabit(habit);
    setModalVisible(true);
  };

  const handlePressHabit = (habit: any) => {
    router.push({
      pathname: './tasks',

      params: {
        habitId: habit.userHabitId,
        habitName: habit.habitTitle,
      },
    });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const day = date.getUTCDate();
      const month = date.toLocaleString('default', { month: 'short' });
      return `${day} ${month}`;
    } catch {
      return '';
    }
  };

  const getPriorityLabel = (value: string | number) => {
    switch (Number(value)) {
      case 1:
        return 'High Priority';
      case 2:
        return 'Medium Priority';
      case 3:
        return 'Low Priority';
      default:
        return 'Priority';
    }
  };

  const renderHabit = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => handlePressHabit(item)}
    activeOpacity={0.8}
  >
    <View style={styles.headerRow}>
      <Text style={styles.title}>{item.habitTitle}</Text>
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Ionicons name="pencil-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>

    <View style={styles.progressBarBackground}>
      <View style={styles.progressBarFill} />
    </View>

    <View style={styles.tagRow}>
      <View style={styles.tag}>
        <Ionicons name="calendar-outline" size={16} color="black" />
        <Text style={styles.tagText}> {formatDate(item.goalDate)}</Text>
      </View>

      <View style={styles.tag}>
        <Ionicons name="flag-outline" size={16} color="black" />
        <Text style={styles.tagText}> {getPriorityLabel(item.priority)}</Text>
      </View>

      <View style={styles.tag}>
        <Ionicons name="time-outline" size={16} color="black" />
        <Text style={styles.tagText}> {item.frequency}</Text>
      </View>

    </View>
  </TouchableOpacity>
);

  return (
      <>
        <SystemBars style={"light"}></SystemBars>
        <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
          <Image
              source={require('@/assets/images/previouscat4.png')}
              style={styles.catImage}
              resizeMode="contain"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>To-Do</Text>
            <TouchableOpacity onPress={handleAdd}>
              <Text style={{
                backgroundColor: '#1CC282',
                padding: 10,
                borderRadius: 20,
                fontWeight: 'bold',
                color: '#000'
              }}>
                Add Habit
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
              placeholder="Search Habit"
              placeholderTextColor="#888"
              style={{
                backgroundColor: '#eee',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 10,
                marginBottom: 12,
              }}
              value={searchTerm}
              onChangeText={setSearchTerm}
          />
          <ScrollView style={{paddingBottom: 100}}>
            <FlatList
                data={filteredHabits}
                keyExtractor={(item, index) =>
                    item.userHabitId ? String(item.userHabitId) : String(index)
                }
                renderItem={renderHabit}
            />
          </ScrollView>
          <ItemModal
              visible={modalVisible}
              initialData={editHabit ?? undefined}
              onClose={() => setModalVisible(false)}
              onSave={handleSave}
          />
        </View>
        <BottomBar/>
      </>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth > 400 ? 24 : 16,
    paddingTop: scale(60),
    backgroundColor: '#fff',
  },
  catImage: {
    width: '100%',
    height: 180,
    marginBottom: 10,
    zIndex: 0,         
    position: 'relative', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  addButton: {
    backgroundColor: '#1CC282',
    color: 'white',
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderRadius: scale(24),
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    fontSize: scale(14),
    marginBottom: scale(12),
  },
  habitCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: scale(16),
    padding: scale(14),
    marginBottom: scale(12),
  },
  habitTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: scale(6),
  },
  editIcon: {
    fontSize: scale(16),
    marginLeft: scale(6),
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(12),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#111',
  },
  progressBarBackground: {
    height: scale(16),
    backgroundColor: '#fff',
    borderRadius: scale(8),
    marginTop: scale(8),
    marginBottom: scale(12),
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    width: screenWidth * 0.6, // placeholder for 60% progress
    backgroundColor: '#dab7ff',
    borderRadius: scale(8),
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    marginBottom: scale(4),
  },
  tagText: {
    fontSize: scale(11),
    color: '#000',
    marginLeft: scale(4),
  },
});


export default Home;
