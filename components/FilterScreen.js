import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FilterScreen({ onApplyFilters, onClose, allTags, activeFilters }) {
  const [selectedTags, setSelectedTags] = useState(activeFilters);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const applyFilters = () => {
    onApplyFilters(selectedTags);
  };

  const renderTag = ({ item }) => (
    <View style={styles.tagWrapper}>
      <TouchableOpacity
        style={[styles.tag, selectedTags.includes(item) && styles.selectedTag]}
        onPress={() => toggleTag(item)}
      >
        <Text style={[styles.tagText, selectedTags.includes(item) && styles.selectedTagText]}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Filter Tasks</Text>
        <TouchableOpacity onPress={applyFilters}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={allTags}
        renderItem={renderTag}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.tagList}
        columnWrapperStyle={styles.tagRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  applyText: {
    color: '#3B82F6',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  tagList: {
    padding: 16,
  },
  tagRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tagWrapper: {
    flex: 1,
    maxWidth: '33%',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: '90%',
    alignItems: 'center',
  },
  selectedTag: {
    backgroundColor: '#3B82F6',
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  selectedTagText: {
    fontWeight: 'bold',
  },
});

