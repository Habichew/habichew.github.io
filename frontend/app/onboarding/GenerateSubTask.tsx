// app/(tasks)/GenerateSubTask.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GenerateSubTask() {
  const { task } = useLocalSearchParams();
  const [inputs, setInputs] = useState(['', '', '']);

  const updateInput = (text: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/placeholder.png')} style={styles.image} />
      <Text style={styles.taskTitle}>
        "{task || 'Task'}"
      </Text>

      {inputs.map((val, idx) => (
        <TextInput
          key={idx}
          value={val}
          onChangeText={(text) => updateInput(text, idx)}
          placeholder={`Sub-task ${idx + 1}`}
          style={styles.input}
        />
      ))}

      <TouchableOpacity style={styles.goBtn}>
        <Text style={styles.goText}>Go</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: 'white' },
  image: { width: 200, height: 200, resizeMode: 'contain', marginVertical: 20 },
  taskTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 20 },
  input: {
    width: '100%', height: 50, backgroundColor: '#f0f1f4', borderRadius: 6, marginBottom: 12, paddingHorizontal: 10,
  },
  goBtn: {
    backgroundColor: '#707070', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 4, marginBottom: 24,
  },
  goText: { color: 'white' },
  saveBtn: {
    backgroundColor: '#484C59', paddingVertical: 14, borderRadius: 6, alignItems: 'center', width: '100%',
  },
  saveText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
