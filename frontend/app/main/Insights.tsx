import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import TopBar from '@/components/bottomBar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InsightsScreen() {
  const [selectedTab, setSelectedTab] = useState<'Today' | 'Weekly' | 'Monthly'>('Weekly');
  const router = useRouter();

  const mockData = [2, 3, 3, 3, 2, 6, 2]; // Simulated bar chart height

  const habits = [
    { id: '1', label: 'Habit 1', icon: 'bed-outline' },
    { id: '2', label: 'Habit 2', icon: 'notifications-outline' },
    { id: '3', label: 'habit 3', icon: 'bed-outline' },
    { id: '4', label: 'habit 4', icon: 'notifications-outline' }
  ];

  return (
    <View style={styles.container}>
      <TopBar />

      <Text style={styles.title}>Insights</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {['Today', 'Weekly', 'Monthly'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab as any)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bar Chart */}
      <View style={styles.chartRow}>
        {mockData.map((value, idx) => (
          <View key={idx} style={styles.chartItem}>
            <View style={[styles.chartBar, { height: value * 20 }]} />
            <Text style={styles.dayLabel}>{
              ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]
            }</Text>
          </View>
        ))}
      </View>

      {/* Habit cards */}
      <View style={styles.habitGrid}>
        {habits.map(habit => (
          <View key={habit.id} style={styles.habitCard}>
            <Ionicons name={habit.icon as any} size={16} />
            <Text style={styles.habitText}>{habit.label}</Text>
          </View>
        ))}
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>✎ Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },
  title: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 8,
    marginBottom:20
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12
  },
  tabText: {
    fontSize: 14,
    color: '#555'
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#484C59',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 12
  },
  chartItem: {
    alignItems: 'center'
  },
  chartBar: {
    width: 14,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginBottom: 4
  },
  dayLabel: {
    fontSize: 10,
    color: '#444'
  },
  habitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    justifyContent: 'space-between'
  },
  habitCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  habitText: {
    fontSize: 14
  },
  editBtn: {
    backgroundColor: '#484C59',
    marginTop: 20,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
