import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  id: string;
  name: string;
  date?: string;
  priority?: string;
  category?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  dueAt?: string;
  priority?: string;
  habitId?: string;
};

type UserDataContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;

  habits: Habit[];
  tasks: Task[];
  setHabits: (h: Habit[]) => void;
  setTasks: (t: Task[]) => void;

  loadHabits: () => Promise<void>;
  loadTasks: () => Promise<void>;

  addHabit: (h: Habit) => void;
  updateHabit: (h: Habit) => void;

  addTask: (t: Task) => void;
  updateTask: (t: Task) => void;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // 保留原 setUser 和 clearUser 功能
  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
    setHabits([]);
    setTasks([]);
  };

  // -----------------
  // Habit Logic (mock)
  const loadHabits = async () => {
    if (!user) return;
    console.log('⚠️ loadHabits: Habit API 未连接，返回空数组');
    // TODO: 替换为实际 API 调用
    setHabits([]);
  };

  const addHabit = (habit: Habit) => {
    setHabits(prev => [...prev, habit]);
  };

  const updateHabit = (updated: Habit) => {
    setHabits(prev => prev.map(h => (h.id === updated.id ? updated : h)));
  };

  // -----------------
  // Task Logic (mock)
  const loadTasks = async () => {
    if (!user) return;
    console.log('⚠️ loadTasks: Task API 未连接，返回空数组');
    // TODO: 替换为实际 API 调用
    setTasks([]);
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        clearUser,
        habits,
        tasks,
        setHabits,
        setTasks,
        loadHabits,
        loadTasks,
        addHabit,
        updateHabit,
        addTask,
        updateTask,
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
