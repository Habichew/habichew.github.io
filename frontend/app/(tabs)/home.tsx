import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {Habit, useUser} from '../context/UserContext';
import ItemModal from '@/components/ui/HabitModal';
import Rive, {Fit} from "rive-react-native";
import {ScaledSheet} from "react-native-size-matters";

const screenWidth = Dimensions.get('window').width; const scale = (value: number) => (screenWidth / 375) * value;

const Home = () => {
  const { user, habits, loadHabits, addHabit, updateHabit, deleteHabit, calculateHabitProgress } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHabits, setFilteredHabits] = useState(habits);
  const [modalVisible, setModalVisible] = useState(false);
  const [editHabit, setEditHabit] = useState<Partial<Habit> | null>(null);
  const habitId = editHabit?.userHabitId; // number 
  const router = useRouter();

  useEffect(() => { if (user) loadHabits(); console.log("user", user) }, [user]);
  useEffect(() => { setFilteredHabits(habits.filter(h => h.habitTitle?.toLowerCase().includes(searchTerm.toLowerCase()))); }, [searchTerm, habits]);

  const handleAdd = () => { setEditHabit(null); setModalVisible(true); };
  const handleSave = async (data: any) => {
    if (editHabit) { await updateHabit({ ...data, userHabitId: editHabit.userHabitId }); } 
    else { await addHabit(user!.id.toString(), data); } 
    await loadHabits();
  };
  const handleEdit = (habit: any) => { setEditHabit(habit); setModalVisible(true); };

  const handlePressHabit = (habit: any) => { router.push({ pathname: './tasks', params: { habitId: habit.userHabitId, habitName: habit.habitTitle } }); };

  //Add animation here
  const handleTickHabit = async (habit: Habit) => {
  if (!habit.userHabitId) return;
  // await updateHabit({ ...habit, isCompleted: true });
  await updateHabit({ ...habit });
  console.log('trigger animation and complete habit');
  };

  const formatDate = (dateStr: string) => { if (!dateStr) return ''; try { const d = new Date(dateStr); const day = d.getUTCDate(); const month = d.toLocaleString('default', { month: 'short' }); return `${day} ${month}`; } catch { return ''; } };
  const getPriorityLabel = (val: string | number) => val == 1 ? 'High' : val == 2 ? 'Medium' : val == 3 ? 'Low' : 'Priority';

  const renderHabit = ({ item }: { item: any }) => {
    const progressMap = calculateHabitProgress();
    const percent = progressMap?.[item.userHabitId] ?? 0;

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePressHabit(item)} activeOpacity={0.5}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.habitTitle}</Text>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Ionicons name="pencil-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Ionicons name="calendar-outline" size={16} color="black" /><Text style={styles.tagText}> {formatDate(item.goalDate)}</Text></View>
          <View style={styles.tag}><Ionicons name="flag-outline" size={16} color="black" /><Text style={styles.tagText}> {getPriorityLabel(item.priority)}</Text></View>
          <View style={styles.tag}><Ionicons name="time-outline" size={16} color="black" />
            <Text style={[styles.tagText, !item.frequency && { color: '#000' }]}>{item.frequency || 'Frequency'}</Text>
          </View>
          {/* Add a ticking box here */}
          {/* Add completed field in the backend */}
          {/* {percent === 100 && !item.isCompleted && ( */}
          {percent === 100 && (
            <TouchableOpacity onPress={() => handleTickHabit(item)}>
              <Ionicons name="checkmark-circle-outline" size={28} color="#1CC282" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#DAB7FF' }}>
      <Rive
          artboardName={'Pet'}
          resourceName='pet'
          style={styles.pet}
          onPlay={(animationName, isStateMachine) => console.log("playing")}
      >
          <View style={{marginTop: "auto", flexDirection: "row", justifyContent: 'space-between', flexShrink: "auto", marginHorizontal: 20, height: "auto"}}>
            <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 20, maxWidth: 125, zIndex: 1, flex:1 }}>
              <Text onPress={handleAdd} style={{ textAlign: "center", backgroundColor: '#1CC282', padding: 10, borderRadius: 20, fontSize: 16, fontWeight: 'bold', color: '#000', bottom: 15, fontFamily: "Poppins", zIndex: 1, marginBottom: -15, width: "100%"}}>Add Habit</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: -10, marginRight: 10}}>
              <Image style={{}} source={require('@/assets/images/credit.png')}/>
              <Text style={{margin: 3, fontFamily: "Poppins", fontSize: 20 }}>{user?.credits ? user.credits : 0}</Text>
            </View>
          </View>
      </Rive>;
      {/*<Image source={require('@/assets/images/previouscat4.png')} style={styles.catImage} resizeMode="contain" />*/}
      <View style={styles.habitContainer}>
        <View style={styles.habitRow}>
          <Text style={styles.today}>Today</Text>

        </View>
        <TextInput placeholder="Search Habit" placeholderTextColor="#888" style={{ backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 12 }} value={searchTerm} onChangeText={setSearchTerm} />
        <FlatList style={{ paddingBottom: 10, paddingHorizontal: 10, marginHorizontal: -10}} data={filteredHabits} keyExtractor={(item, index) => item.userHabitId ? String(item.userHabitId) : String(index)} renderItem={renderHabit} />
        <ItemModal visible={modalVisible} initialData={editHabit ?? undefined} onClose={() => setModalVisible(false)} onSave={handleSave} onDelete={deleteHabit} habitId={habitId} />
      </View>
    </View>
  );

};

const styles = ScaledSheet.create({
  container: { flex: 1, paddingHorizontal: screenWidth > 400 ? 24 : 16, paddingTop: scale(60), backgroundColor: '#fff' },
  catImage: { width: '100%', height: 180, marginBottom: 10, zIndex: 0, position: 'relative' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: scale(12) },
  addButton: { backgroundColor: '#1CC282', color: 'white', paddingHorizontal: scale(20), paddingVertical: scale(8), borderRadius: scale(24), fontWeight: 'bold' },
  searchInput: { backgroundColor: '#f0f0f0', borderRadius: scale(12), paddingHorizontal: scale(16), paddingVertical: scale(10), fontSize: scale(14), marginBottom: scale(12) },
  habitCard: { backgroundColor: '#F6F6F6', borderRadius: scale(16), padding: scale(14), marginBottom: scale(12) },
  habitContainer: {flex: 1, marginBottom: 80, paddingHorizontal: 15, marginTop: 15},
  habitTitle: { fontSize: "10@s", fontWeight: 'bold', marginBottom: scale(8) },
  habitRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginHorizontal: "5@ms" },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: scale(6) },
  editIcon: { fontSize: scale(16), marginLeft: scale(6) },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, width: '100%' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '15@ms', fontWeight: 'bold', color: '#111' },
  pet: {width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'white'},
  progressBarBackground: { height: scale(16), backgroundColor: '#DCDCDC', borderRadius: scale(8), marginTop: scale(8), marginBottom: scale(12), overflow: 'hidden', width: '100%' },
  progressBarFill: { height: '100%', width: screenWidth * 0.6, backgroundColor: '#1CC282', borderRadius: scale(8) },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(8) },
  tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCDCDC', paddingHorizontal: scale(12), paddingVertical: scale(6), borderRadius: scale(20), marginBottom: scale(4) },
  tagText: { fontSize: '11@ms', color: '#000', marginLeft: scale(4) },
  today: { fontSize: "18@ms", fontWeight: 'bold', alignSelf: 'center' },
});

export default Home;
