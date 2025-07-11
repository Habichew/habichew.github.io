// app/profile/name.tsx
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

export default function ChangeName() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = () => {
    // connect this to backend logic
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={styles.backBtn}>

        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>CHANGE NAME</Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#999"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor="#999"
        value={lastName}
        onChangeText={setLastName}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backBtn: { marginTop: 16 },
  backText: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  input: {
    height: 48,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: '#222',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
