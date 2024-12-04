import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';

export default function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedTags, setEditedTags] = useState(task.tags.join(', '));
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdate = () => {
    onUpdateTask(task.id, editedTitle, editedTags.split(',').map(tag => tag.trim()).filter(tag => tag), editedDueDate);
    setIsEditing(false);
  };

  const handleDateSelect = (date) => {
    setEditedDueDate(date);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <TextInput
            style={styles.editInput}
            value={editedTags}
            onChangeText={setEditedTags}
            placeholder="Tags (comma-separated)"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateInputText}>
              {editedDueDate ? editedDueDate.toLocaleDateString() : 'Set due date (optional)'}
            </Text>
          </TouchableOpacity>
          <CustomDatePicker
            isVisible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onSelectDate={handleDateSelect}
            initialDate={editedDueDate}
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.taskContainer}>
          <View style={styles.taskHeader}>
            <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
              <Ionicons
                name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={task.completed ? "#60A5FA" : "#9CA3AF"}
              />
            </TouchableOpacity>
            <Text style={[styles.taskTitle, task.completed && styles.completedTitle]}>
              {task.title}
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(true)}>
                <Ionicons name="create-outline" size={24} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => onDeleteTask(task.id)}>
                <Ionicons name="trash-outline" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tagsContainer}>
            {task.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          {task.dueDate && (
            <Text style={styles.dueDate}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    overflow: 'hidden',
  },
  editContainer: {
    padding: 16,
  },
  editInput: {
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  dateInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    paddingVertical: 15,
    marginBottom: 16,
  },
  dateInputText: {
    color: '#9CA3AF',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  updateButton: {
    alignSelf: 'flex-end',
  },
  taskContainer: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  completedTitle: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  dueDate: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});

