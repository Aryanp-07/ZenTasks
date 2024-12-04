import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './components/TaskList';
import AddTaskScreen from './components/AddTaskScreen';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
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

  const handleAddTask = (title, tags, dueDate, subtasks) => {
    const newTasks = [...tasks, { 
      id: Date.now().toString(), 
      title, 
      tags, 
      completed: false, 
      dueDate, 
      createdAt: Date.now(), 
      subtasks 
    }];
    setTasks(sortTasks(newTasks));
    saveTasks(newTasks);
    setShowAddTask(false);
  };

  const handleUpdateTask = (id, title, tags, dueDate, subtasks) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, title, tags, dueDate, subtasks } : task
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
        <View style={styles.header}>
          <Image source={require('./assets/Vector.png')} style={styles.logo} />
          <Text style={styles.companyName}>ZenTasks</Text>
        </View>
        {showAddTask ? (
          <AddTaskScreen onAddTask={handleAddTask} onClose={() => setShowAddTask(false)} />
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => setShowAddTask(true)}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </>
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    top: 30,
  },
  floatingButton: {
    position: 'absolute',
    right: 165,
    bottom: 80,
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
