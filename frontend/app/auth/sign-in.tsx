import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import CustomInput from '@/components/ui/input';
import { useUser } from '../context/UserContext';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);


const handleSignIn = async () => {
  if (email && password) {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data[0]);//save user data for global use
        alert('Sign in successful!');
        router.replace('../(tabs)/home');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  } else {
    Alert.alert('Missing input', 'Please enter email and password');
  }
};


  return (   
    <View style={styles.screen}>
      <View style={styles.purpleBackground}>
      <Text style={styles.title}>Welcome back,{'\n'}ready to continue?</Text>

      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>


      <Text style={styles.orText}>OR LOG IN WITH</Text>

      <View style={styles.iconRow}>
        <FontAwesome name="google" size={24} color="#555" />
        <FontAwesome name="apple" size={24} color="#555" style={styles.icon} />
        <FontAwesome name="facebook" size={24} color="#555" style={styles.icon} />
      </View>

      <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
        <Text style={styles.link}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text></Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
    purpleBackground: {
    width: '100%',
    backgroundColor: '#DAB7FF',
    paddingBottom: 40,
    paddingTop: 200,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 32,
  },
  signInButton: {
    backgroundColor: '#1CC282',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
  },
  signInText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#444',
    textAlign: 'center',
    marginVertical: 8,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
    marginTop:30,
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
  inputFocused: {
  backgroundColor: '#f0f0f0', 
},
});
