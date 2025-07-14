// app/main/pick-habit.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function PickHabit() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [customHabit, setCustomHabit] = useState('');
  const [recommendedHabit, setRecommendedHabit] = useState(''); // to be updated via API later

  const handleSubmitCustomHabit = () => {
    // Save habit for use in PickTask page
    router.push({ pathname: '/onboarding/PickTask', params: { habit: customHabit } });
    setModalVisible(false);
    setCustomHabit('');
  };

  const handleSelectRecommendedHabit = () => {
    router.push({ pathname: '/onboarding/PickTask', params: { habit: recommendedHabit } });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/onboarding/info')}>
        <View style={styles.circleButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.petContainer}>
        <Image
          source={require('../../assets/images/previouscat2.png')} // Replace with your actual pet image path
          style={styles.petImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Choose a habit to{"\n"}feed your pet</Text>

      <TouchableOpacity style={styles.categoryBtn}>
        <Text style={styles.categoryText}>Choose a category</Text>
        <View style={styles.dropdownCircle}>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </TouchableOpacity>

      {/* Placeholder for future recommended habit */}
      <TouchableOpacity
        style={styles.recommendationBlock}
        onPress={handleSelectRecommendedHabit}
        disabled={!recommendedHabit}>
        <Text style={styles.recommendationText}>
          {recommendedHabit || 'Recommended habit will appear here'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>Or ddd your own</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
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
              <TouchableOpacity onPress={handleSubmitCustomHabit} style={styles.saveBtn}>
                <Text style={styles.submitText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

import { Image } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 80 },
  petContainer: { alignItems: 'center' },
  petImage: { width: 160, height: 160, marginBottom: 24 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  categoryBtn: {
    backgroundColor: '#eee',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 320,
    marginBottom: 20,
  },
  categoryText: { alignSelf:'center', fontWeight: 'bold', fontSize: 14, color:'#999' },
  dropdownCircle: {
    backgroundColor: '#000',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownArrow: { color: '#0f0', fontSize: 18, marginTop: -2 },
  recommendationBlock: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  recommendationText: { fontSize: 14, fontStyle: 'italic', color: '#666' },
  addBtn: {
    backgroundColor: '#1CC282',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 40,
  },
  addText: { fontWeight: 'bold', fontSize: 14, color: '#000' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelText: { padding:10, color: '#999', fontWeight: 'bold' },
  submitText: { color: '#000', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#1CC282',
    borderRadius: 24,
    alignItems: 'center',
    padding: 10,
  },
    circleButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  arrowText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
    backButton: {
    position: 'absolute',
    top: 28,
    left: 24,
    zIndex: 10,
  },
});
