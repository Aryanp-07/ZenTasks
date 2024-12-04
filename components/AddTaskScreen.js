import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';

export default function AddTaskScreen({ onAddTask, onClose }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    if (title.trim()) {
      onAddTask(title, tags.split(',').map(tag => tag.trim()).filter(tag => tag), dueDate);
      setTitle('');
      setTags('');
      setDueDate(null);
    }
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
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
          {dueDate ? dueDate.toLocaleDateString() : 'Set due date (optional)'}
        </Text>
      </TouchableOpacity>
      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        initialDate={dueDate}
      />
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

