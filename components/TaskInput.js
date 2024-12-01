import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskInput({ onAddTask }) {
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          {dueDate ? dueDate.toLocaleString() : 'Set due date'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 15,
    marginBottom: 16,
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  dateButton: {
    marginBottom: 0,
  },
  dateButtonText: {
    color: '#3B82F6',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    maxWidth: 50,
    marginRight:0,
    marginLeft: 'auto',
  },
});
