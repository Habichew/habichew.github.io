import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function DeleteAccountScreen() {
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          console.log('Account deleted');
          router.replace('/auth/sign-in');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={styles.backBtn}>

        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>DELETE ACCOUNT</Text>

      <Text style={styles.text}>
        If you delete your account, all your data will be permanently removed. This action cannot be undone.
      </Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backBtn: { marginTop: 16 },
  backText: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  text: { fontSize: 14, color: '#333', marginBottom: 20, lineHeight: 22 },
  deleteBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
