import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomDatePicker from './CustomDatePicker';

export default function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleComplete }) {
  // console.log('Task Subtasks:', task.subtasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedTags, setEditedTags] = useState(task.tags.join(', '));
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState(-1);

  const handleUpdate = () => {
    const formattedDueDate = editedDueDate ? editedDueDate.toISOString() : null;
    onUpdateTask(task.id, editedTitle, editedTags.split(',').map(tag => tag.trim()).filter(tag => tag), formattedDueDate, subtasks);
    setIsEditing(false);
  };

  const handleDateSelect = (date) => {
    setEditedDueDate(date);
  };

  const toggleSubtaskComplete = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
    onUpdateTask(task.id, task.title, task.tags, task.dueDate, updatedSubtasks);
  };

  const startEditingSubtask = (index) => {
  setEditingSubtaskIndex(index); // Start editing the subtask
};

const updateSubtask = (index, newTitle) => {
  const updatedSubtasks = [...subtasks];
  updatedSubtasks[index].name = newTitle; // Update the subtask title when editing is done
  setSubtasks(updatedSubtasks);
  onUpdateTask(task.id, task.title, task.tags, task.dueDate, updatedSubtasks); // Ensure task update
  setEditingSubtaskIndex(-1); // Exit editing mode
};


  const deleteSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
    onUpdateTask(task.id, task.title, task.tags, task.dueDate, updatedSubtasks);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderSubtask = ({ item, index }) => (
  <View style={styles.subtaskContainer}>
    <TouchableOpacity onPress={() => toggleSubtaskComplete(index)}>
      <Ionicons
        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
        size={20}
        color={item.completed ? "#60A5FA" : "#9CA3AF"}
      />
    </TouchableOpacity>

    {editingSubtaskIndex === index ? (
      <TextInput
        style={styles.subtaskInput}
        value={item.title} // The text is controlled via the item's 'name' attribute
        onChangeText={(newTitle) => {
          const updatedSubtasks = [...subtasks];
          updatedSubtasks[index].title = newTitle; // Update the name as the user types
          setSubtasks(updatedSubtasks); // Update the state with the new value
        }}
        onBlur={() => setEditingSubtaskIndex(-1)} // When blur (focus loss), stop editing
        autoFocus // Auto focus when editing starts
      />
    ) : (
      <Text style={[styles.subtaskTitle, item.completed && styles.completedSubtask]}>
        {item.title} {/* Display the subtask name */}
      </Text>
    )}

    <View style={styles.subtaskActions}>
      <TouchableOpacity onPress={() => startEditingSubtask(index)}>
        <Ionicons name="create-outline" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteSubtask(index)}>
        <Ionicons name="trash-outline" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
);


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
              {editedDueDate ? formatDate(editedDueDate) : 'Set due date (optional)'}
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
              Due: {formatDate(task.dueDate)}
            </Text>
          )}
          {subtasks.length > 0 && (
            <View style={styles.subtasksContainer}>
              <Text style={styles.subtasksHeader}>Subtasks:</Text>
              <FlatList
                data={subtasks}
                renderItem={renderSubtask}
                keyExtractor={(item, index) => index.toString()}
                style={styles.subtaskList}
              />
            </View>
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
    marginBottom: 8,
  },
  subtasksContainer: {
    marginTop: 12,
  },
  subtasksHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  subtaskList: {
    marginTop: 4,
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtaskTitle: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  subtaskInput: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
  },
  completedSubtask: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  subtaskActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
});