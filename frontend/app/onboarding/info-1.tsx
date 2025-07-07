// app/onboarding/info1.tsx
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function InfoScreen1() {
  const router = useRouter();
  const [pronoun, setPronoun] = useState('');
  const [petName, setPetName] = useState('');
  const handleBack = () => {
  router.push('/onboarding/story?index=4'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Image
        source={require('@/assets/images/placeholder.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Text style={styles.label}>Identity</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pronoun}
            onValueChange={(itemValue) => setPronoun(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select pronouns" value="" />
            <Picker.Item label="He/Him" value="he" />
            <Picker.Item label="She/Her" value="she" />
            <Picker.Item label="They/Them" value="they" />
          </Picker>
        </View>
        <TextInput
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/info-2')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  image: { height: 160, marginVertical: 20, alignSelf: 'center' },
  form: { marginTop: 20 },
  label: { fontSize: 14, marginBottom: 8 },
  pickerWrapper: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12,
  },
  picker: { height: 40 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginBottom: 20,
  },
  button: {
    backgroundColor: '#555A67', padding: 12, borderRadius: 4, alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
