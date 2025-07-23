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
  userTaskId?: number;
  title: string;
  description?: string|null;
  completed?: number;
  credit?: number;
  priority?: 'low' | 'medium' | 'high'| null;
  dueAt?: string | null;
  habitId?: number;
  createdAt?: string;
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
  updateHabit: (h: Habit) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;

  addTask: (t: Task) => Promise<void>;
  updateTask: (t: Task) => Promise<void>;
  deleteTask: (userTaskId: number) => Promise<void>;

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
  if (!user || !habit.userHabitId) return;

  try {
    const response = await fetch(`http://localhost:3000/habits/${user.id}/${habit.userHabitId}`, {
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


const deleteHabit = async (habitId: string) => {
  if (!user) return;
  try {
    const res = await fetch(`http://localhost:3000/habits/${user.id}/${habitId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      await loadHabits();  //reload
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
    const res = await fetch(`http://localhost:3000/users/${user.id}/tasks`);
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
    const res = await fetch(`http://localhost:3000/users/${user.id}/tasks`, {
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
      priority: t.priority ?? 'low',
      dueAt: t.dueAt ?? new Date().toISOString(),
      credit: t.credit ?? 0,
      completed: t.completed ?? 0,
    },
  };

  try {
    const res = await fetch(`http://localhost:3000/users/${user.id}/tasks/${t.userTaskId}`, {
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
    const res = await fetch(`http://localhost:3000/users/${user.id}/tasks/${userTaskId}`, {
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
