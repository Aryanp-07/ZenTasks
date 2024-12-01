import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = (title, tags, dueDate) => {
    const newTasks = [...tasks, { id: Date.now().toString(), title, tags, completed: false, dueDate, createdAt: Date.now() }];
    setTasks(sortTasks(newTasks));
    saveTasks(newTasks);
  };

  const handleUpdateTask = (id, title, tags, dueDate) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, title, tags, dueDate } : task
    );
    setTasks(sortTasks(newTasks));
    saveTasks(newTasks);
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(sortTasks(newTasks));
    saveTasks(newTasks);
  };

  const handleToggleComplete = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks(newTasks));
    saveTasks(newTasks);
  };

  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return b.createdAt - a.createdAt;
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <TaskInput onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  content: {
    flex: 1,
    padding: 16,
    top: 30,
  },
});
