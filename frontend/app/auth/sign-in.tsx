import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email && password) {
      // Login simulation successful, jump to home page
      router.replace('../tabs');
    } else {
      Alert.alert('Missing input', 'Please enter email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>


      <Text style={styles.orText}>OR LOG IN WITH</Text>

      <View style={styles.iconRow}>
        <FontAwesome name="google" size={24} color="#555" />
        <FontAwesome name="apple" size={24} color="#555" style={styles.icon} />
        <FontAwesome name="facebook" size={24} color="#555" style={styles.icon} />
      </View>

      <TouchableOpacity onPress={() => router.push('./auth/sign-up')}>
        <Text style={styles.link}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 32,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  signInText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#444',
    textAlign: 'center',
    marginVertical: 8,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
  },
  icon: {
    marginLeft: 20,
  },
});
