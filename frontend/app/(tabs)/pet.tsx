import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import TopBar from '@/components/topbar';
import { Ionicons } from '@expo/vector-icons';

export default function PetScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pet Info */}
        <View style={styles.sectionBox}>
          <View style={styles.petInfo}>
            <Image source={require('@/assets/images/placeholder.png')} style={styles.avatar} />
            <View>
              <Text style={styles.textLine}>Pet Name</Text>
              <Text style={styles.textLine}>Pet's Working Style</Text>
              <Text style={styles.textLine}>Pet's Current Planet</Text>
            </View>
          </View>
        </View>

        {/* Hall of Fame */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Hall of Fame</Text>
          <Text style={styles.subText}>this will have all badges, from travel et</Text>
          <TouchableOpacity style={styles.rowEnd} onPress={() => router.push('/main/Insights')}>
            <Text style={styles.linkText}>View Insights</Text>
            <Ionicons name="arrow-forward" size={16} />
          </TouchableOpacity>
        </View>

        {/* Tip of the Day */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Tip of the day</Text>
        </View>

        {/* Mood Tracker */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Mood Tracker</Text>
          <View style={styles.grid}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <View key={idx} style={styles.dotBox}>
                <View style={styles.dot} />
              </View>
            ))}
          </View>
        </View>

        {/* Travel Unlock */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Unlock something by travelling</Text>
          <TouchableOpacity style={styles.rowEnd} onPress={() => router.push('../Travel')}>
            <Text style={styles.linkText}>Travel</Text>
            <Ionicons name="arrow-forward" size={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionBox: {
    backgroundColor: '#fdfdfe',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  textLine: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  dotBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
});
