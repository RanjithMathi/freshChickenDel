import React from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0b8a0b" barStyle="light-content" />
      
      {/* Custom Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>❤️ Favorites</Text>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Start adding items to your favorites!</Text>
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});

export default FavoritesScreen;