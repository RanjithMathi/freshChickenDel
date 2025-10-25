import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CategoriesScreen = () => {
  const categories = [
    {id: 1, name: 'Chicken', icon: '🍗', count: 12},
    {id: 2, name: 'Mutton', icon: '🥩', count: 8},
    {id: 3, name: 'Fish', icon: '🐟', count: 15},
    {id: 4, name: 'Seafood', icon: '🦐', count: 10},
    {id: 5, name: 'Eggs', icon: '🥚', count: 5},
    {id: 6, name: 'Ready to Cook', icon: '🍖', count: 20},
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0b8a0b" barStyle="light-content" />
      
      {/* Custom Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count} items</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0b8a0b',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 12,
    color: '#999',
  },
});

export default CategoriesScreen;