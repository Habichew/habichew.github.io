// app/(tabs)/pick-task.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PickTask() {
  const router = useRouter();
  const { habit } = useLocalSearchParams();

  const [taskInputs, setTaskInputs] = useState(['', '', '']);

  const handleChange = (text: string, index: number) => {
    const newTasks = [...taskInputs];
    newTasks[index] = text;
    setTaskInputs(newTasks);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/onboarding/PickHabit')}>
        <View style={styles.circleButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={require('@/assets/images/previouscat3.png')} 
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.habitText}>{habit || 'Your habit appears here'}</Text>

        <Text style={styles.descriptionText}>
          is too big for me to chew{'\n'}let’s break it down {'\n'}with just a click!
        </Text>
        <Text style={styles.edit}>or edit the text below to add your own</Text>
        {taskInputs.map((task, index) => (
          <View style={styles.taskRow} key={index}>
            <TextInput
              style={styles.taskInput}
              // placeholder="or edit the text to add your own"
              // placeholderTextColor="#BBBBBB"
              value={task}
              onChangeText={(text) => handleChange(text, index)}
            />
            <Text style={styles.editIcon}>✎</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>Generate Tasks</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.arrowContainer} onPress={() => router.push('/(tabs)/pet')}>
        <View style={styles.circleButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  image: {
    width: 150,
    height: 100,
    marginTop: 140,
    alignSelf:'center',
  },
  habitText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 16,
    alignSelf:'center',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#DAB7FF',
    fontWeight: 'bold',
    marginVertical: 16,
  },
  edit:{
    textAlign: 'center',
    fontSize:14,
    color:'#bbbbbb',
    margin:10,
  },
  taskRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
    marginLeft:24,
    marginRight:24,
  },
  taskInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 12,
    color: '#000',
  },
  editIcon: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  generateBtn: {
    backgroundColor: '#DAB7FF',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginLeft:24,
    marginRight:24,
  },
  generateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 28,
    left: 24,
    zIndex: 10,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 36,
    right: 24,
    zIndex: 10,
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
});
