// app/profile/send-feedback.tsx
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SendFeedback() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={styles.backBtn}>

        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>SEND FEEDBACK</Text>
      <Text style={styles.text}>
        Would you mind taking a second to tell us how we can make Habichew better for you?
      </Text>

      <TextInput
        style={styles.inputLarge}
        placeholder="Thoughts And Comments"
        placeholderTextColor="#999"
        multiline
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backBtn: { marginTop: 16 },
  backText: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  text: { fontSize: 14, color: '#333', marginBottom: 12, lineHeight: 22 },
  bold: { fontWeight: 'bold' },
  inputLarge: {
    height: 180,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    padding: 16,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
});
