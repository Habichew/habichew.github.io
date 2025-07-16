// frontend/context/UserContext.tsx
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
  userHabitId: number| undefined;
  habitTitle: string;
  goalDate: string;
  startDate: string;
  priority: number;
  frequency: string;
  isArchived?: number;
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

  addHabit: (userId: string, h: Habit) => Promise<void>;
  //waiting for api
  updateHabit: (h: Habit) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;

  addTask: (t: Task) => Promise<void>;
  updateTask: (t: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

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
    const res = await fetch(`http://localhost:3000/habits/${user.id}`);
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
      priority: habit.priority,
      startDate: habit.startDate,
      goalDate: habit.goalDate,
      frequency: habit.frequency,
    };

    const response = await fetch(`http://localhost:3000/habits/${userId}`, {
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
  if (!user) return;

  try {
    const response = await fetch(`http://localhost:3000/habits/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          habit: {
            id: Number(habit.userHabitId),
            name: habit.habitTitle,
            taskId: 0,
          },
        },
      ]),
    });

    if (!response.ok) {
      throw new Error('Failed to update habit');
    }

    console.log('Habit updated successfully');
  } catch (error) {
    console.error('Failed to update habit:', error);
  }
};

  const deleteHabit = async (habitId: string) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}/habits/${habitId}`, {
        method: 'DELETE',
      });
      if (res.ok) await loadHabits();
    } catch (err) {
      console.error('Failed to delete habit:', err);
    }
  };

  // ----------------- Task Logic -----------------
  const loadTasks = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}/tasks`);
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const addTask = async (t: Task) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: t }),
      });
      if (res.ok) await loadTasks();
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const updateTask = async (t: Task) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: t }),
      });
      if (res.ok) await loadTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (res.ok) await loadTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
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
        deleteHabit,
        addTask,
        updateTask,
        deleteTask,
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
