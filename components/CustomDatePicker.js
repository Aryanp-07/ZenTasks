import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const CustomDatePicker = ({ isVisible, onClose, onSelectDate, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());

  const handleSelectDate = (date) => {
    const selectedDate = new Date(date.timestamp);
    setSelectedDate(selectedDate);
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Select Due Date</Text>
          <Calendar
            current={selectedDate.toISOString().split('T')[0]}
            onDayPress={handleSelectDate}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: { selected: true, selectedColor: '#3B82F6' },
            }}
            theme={{
              backgroundColor: '#1F2937',
              calendarBackground: '#1F2937',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#3B82F6',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#3B82F6',
              dayTextColor: '#fff',
              textDisabledColor: '#4B5563',
              dotColor: '#3B82F6',
              selectedDotColor: '#ffffff',
              arrowColor: '#3B82F6',
              monthTextColor: '#fff',
              textDayFontFamily: 'SpaceGrotesk_400Regular',
              textMonthFontFamily: 'SpaceGrotesk_400Regular',
              textDayHeaderFontFamily: 'SpaceGrotesk_400Regular',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});

export default CustomDatePicker;

