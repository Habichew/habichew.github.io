// frontend/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Alert} from "react-native";

const backendUrl = process.env.BACKEND_URL

export type User = {
  id: number;
  email: string;
  username: string;
  profileImg?: string;
  mood?: string | null;
  petId?: number | null;
  credits?: number;
  tasksNum?: number;
};

export type Habit = {
  userHabitId: number | undefined;
  habitTitle: string;
  goalDate?: string | null;
  startDate: string;
  priority?: number | null;
  frequency?: string | null;
  isArchived?: number;
};

export type Task = {
  userTaskId?: number;
  title: string;
  description?: string|null;
  completed?: boolean;
  credit?: number;
  priority?: 'low' | 'medium' | 'high'| null;
  dueAt?: string | null;
  //Habitid is used here because of the previous confusion,
  habitId?: number;
  createdAt?: string;
};

export type Pet = {
  id: string;
  name: string;
  mood?: string;
  personality?: string;
  level?: number;
  hunger?: number;
  createdAt?: string;
};

type UserDataContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;

  habits: Habit[];
  tasks: Task[];
  pet: Pet | null;
  setHabits: (h: Habit[]) => void;
  setTasks: (t: Task[]) => void;
  setPet: (p: Pet) => void;

  loadHabits: () => Promise<void>;
  loadTasks: () => Promise<void>;
  loadPet: () => Promise<void>;

  addHabit: (userId: string, h: Habit) => Promise<void>;
  updateHabit: (h: Habit) => Promise<void>;
  deleteHabit: (userHabitId: number) => Promise<void>;

  addTask: (t: Task) => Promise<void>;
  updateTask: (t: Task) => Promise<void>;
  deleteTask: (userTaskId: number) => Promise<void>;

};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pet, setPet] = useState<Pet | null>(null);

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
    setHabits([]);
    setTasks([]);
  };

  
  // ----------------- Habit Logic -----------------
const loadHabits = async () => {
  if (!user) return;
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/habits/${user.id}`);
    const data = await res.json();
    setHabits(data);
  } catch (err) {
    console.error('Failed to load habits:', err);
  }
};

const addHabit = async (userId: string, habit: Habit) => {
  try {
    const payload = {
      customTitle: habit.habitTitle,
      priority: habit.priority ?? null,
      startDate: habit.startDate,
      goalDate: habit.goalDate ?? null,
      frequency: habit.frequency ?? null,
    };
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/habits/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to add habit');
    const data = await response.json();
    console.log('Habit added:', data);
    await loadHabits();
  } catch (error) {
    console.error('Add habit failed:', error);
  }
};

const updateHabit = async (habit: Habit) => {
  if (!user || !habit.userHabitId) return;

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/habits/${user.id}/${habit.userHabitId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customTitle: habit.habitTitle,
        priority: habit.priority,
        startDate: habit.startDate,
        goalDate: habit.goalDate,
        frequency: habit.frequency,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to update habit');
    }

    const data = await response.json();
    console.log('Habit updated successfully:', data);

    // reload habit table
    await loadHabits();
  } catch (error) {
    console.error('Failed to update habit:', error);
  }
};

const deleteHabit = async (userHabitId: number) => {
  if (!user) return;
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/habits/${user.id}/${userHabitId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      await loadHabits();
    } else {
      const errData = await res.json();
      console.error('Delete failed:', errData.message);
    }
  } catch (err) {
    console.error('Failed to delete habit:', err);
  }
};



// ----------------- Task Logic -----------------
const loadTasks = async () => {
  if (!user) return;
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${user.id}/tasks`);
    const data = await res.json();
    const mapped = data.map((t: any) => {
      const habit = habits.find(h => h.userHabitId === t.userHabitId);
      return {
        userTaskId: t.userTaskId,
        habitId: t.userHabitId, 
        title: t.taskTitle,
        description: t.description,
        priority: t.priority,
        dueAt: t.dueAt,
        credit: t.credit,
        completed: t.completed,
        habitTitle: habit?.habitTitle || '', 
      };
    });

    setTasks(mapped);
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
};

const addTask = async (t: Task) => {
  if (!user) return;

  const payload = {
    task: {
      customTitle: t.title,
      taskId: null,
      userHabitId: t.habitId,
      description: t.description,
      priority: t.priority,
      dueAt: t.dueAt,
      credit: t.credit,
    },
  };

  console.log("Payload to send:", payload);

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${user.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await loadTasks();
    } else {
      const err = await res.json();
      console.error('Failed to add task:', err);
    }
  } catch (err) {
    console.error('Error adding task:', err);
  }
};


const updateTask = async (t: Task) => {
  if (!user || !t.userTaskId) return;

  const payload = {
    task: {
      customTitle: t.title,
      description: t.description ?? '',
      priority: t.priority || null,
      dueAt: t.dueAt || null,
      credit: t.credit ?? 0,
      completed: t.completed ?? 0,
    },
  };

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${user.id}/tasks/${t.userTaskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await loadTasks();
    } else {
      const err = await res.json();
      console.error('Failed to update task:', err);
    }
  } catch (err) {
    console.error(' Failed to update task:', err);
  }
};

const deleteTask = async (userTaskId: number) => {
  if (!user) return;
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${user.id}/tasks/${userTaskId}`, {
      method: 'DELETE',
    });
    if (res.ok) await loadTasks();
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
};

  // -----------------
  // Pet Logic
  const loadPet = async () => {
    if (!user) {
      console.log("no user found");
      return;
    }
    console.log("load user's pet");
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${user.id}/pet`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const petData = await response.json();

      if (response.ok) {
        setPet(petData[0]);
        console.log('loaded pet', petData);
      } else {
        Alert.alert('Missing input', 'Please enter email and password');
      }
    } catch (error) {
        Alert.alert('Error', 'Failed to connect to the server');
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        clearUser,
        habits,
        tasks,
        pet,
        setHabits,
        setTasks,
        setPet,
        loadHabits,
        loadTasks,
        loadPet,
        addHabit,
        updateHabit,
        deleteHabit,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
