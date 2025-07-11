import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import TopBar from '@/components/bottomBar';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const placeholderImages = [
  require('@/assets/images/placeholder.png'),
  require('@/assets/images/placeholder.png'),
  require('@/assets/images/placeholder.png'),
];

const initialTreats = [
  { id: '1', title: 'Steps', value: 10, updated: '15 min ago' },
  { id: '2', title: 'Steps', value: 12, updated: '30 min ago' },
  { id: '3', title: 'Sleep', value: 7, updated: 'a day ago' },
  { id: '4', title: 'Nutrition', value: 9, updated: '5 min ago' },
];

export default function KitchenScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sliding recommendation bar*/}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          style={styles.carousel}
        >
          {placeholderImages.map((img, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <Image source={img} style={styles.image} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>

        {/* return arrow */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* content area */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Pet Treats</Text>

          <View style={styles.grid}>
            {initialTreats.map((treat) => (
              <View key={treat.id} style={styles.card}>
                <TouchableOpacity
                  style={styles.checkIcon}
                  onPress={() => toggleSelect(treat.id)}
                >
                  <Ionicons
                    name={
                      selected.includes(treat.id)
                        ? 'checkmark-circle'
                        : 'ellipse-outline'
                    }
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>{treat.title}</Text>
                <Text style={styles.cardValue}>{treat.value}</Text>
                <Text style={styles.cardTime}>updated {treat.updated}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/main/Insights')}
          >
            <Text style={styles.buttonText}>View Insights</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerWrapper: {
    backgroundColor: '#f4f4f7',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  carousel: {
    height: 200,
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: 140,
    resizeMode: 'contain',
  },
  backBtn: {
    marginLeft: 16,
    marginTop: 12,
  },
  backText: {
    fontSize: 22,
  },
  content: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#E8E9EC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardTime: {
    fontSize: 12,
    color: '#444',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  button: {
    backgroundColor: '#484C59',
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
