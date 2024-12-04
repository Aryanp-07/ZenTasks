import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI("API_KEY");

export default function AddTaskScreen({ onAddTask, onClose }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [useAI, setUseAI] = useState(false);

  const handleAddTask = async () => {
    if (title.trim()) {
      let subtasks = [];
      if (useAI) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const prompt = `Break down the task: "${title}" into actionable subtasks. Give a maximum of 5 subtasks. The subtasks should not be lengthy sentences, just phrases should do. Also give the subtasks without any number bullets. Let it be plaintext with each subtasks in a new line.`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          subtasks = text.split('\n').filter(item => item.trim() !== '').map(item => ({
          title: item.trim(), // Using the subtask text as the 'name'
          completed: false,   // Setting the default state of each subtask to 'not completed'
        }));
        // console.log(subtasks);
        } catch (error) {
          console.error('Error generating subtasks:', error);
        }
      }
      const formattedDueDate = dueDate ? dueDate.toISOString() : null;
      onAddTask(title, tags.split(',').map(tag => tag.trim()).filter(tag => tag), formattedDueDate, subtasks);
      setTitle('');
      setTags('');
      setDueDate(null);
      setUseAI(false);
    }
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter tags (comma-separated)"
        placeholderTextColor="#9CA3AF"
        value={tags}
        onChangeText={setTags}
      />
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInputText}>
          {dueDate ? formatDate(dueDate) : 'Set due date (optional)'}
        </Text>
      </TouchableOpacity>
      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        initialDate={dueDate}
      />
      <View style={styles.aiSwitchContainer}>
        <Text style={styles.aiSwitchText}>Use AI to generate subtasks</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3B82F6" }}
          thumbColor={useAI ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setUseAI}
          value={useAI}
        />
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 15,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 15,
    marginBottom: 20,
  },
  dateInputText: {
    color: '#9CA3AF',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  aiSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  aiSwitchText: {
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});
