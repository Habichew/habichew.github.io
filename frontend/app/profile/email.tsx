import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChangeEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleSave = () => {
    // insert api here
    console.log('New email:', email);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={styles.backBtn}>

        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>CHANGE EMAIL</Text>

      <TextInput
        placeholder="New email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Confirm email"
        style={styles.input}
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backBtn: { marginTop: 16 },
  backText: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 12,
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
