import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoriesScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Chicken', image: require('../assets/categories/chicken.jpg') },
    { id: 2, name: 'Mutton', image: require('../assets/categories/mutton.png') },
    { id: 3, name: 'Fish', image: require('../assets/categories/fish.jpg') },
    { id: 4, name: 'Seafood', image: require('../assets/categories/seafood.jpg') },
    { id: 5, name: 'Eggs', image: require('../assets/categories/eggs.jpg') },
    { id: 6, name: 'Ready to Cook', image: require('../assets/categories/readytocook.jpg') },
  ];

  const handleCategoryPress = (categoryName) => {
    // Navigate to CategoryProducts screen with selected category
    navigation.navigate('CategoryProducts', {
      category: categoryName,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Circular Menu */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.circleItem}
              onPress={() => handleCategoryPress(category.name)}
            >
              <View style={styles.circle}>
                <Image
                  source={category.image}
                  style={styles.circleImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.name}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // keeps notch and background white
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  circleItem: {
    width: '30%', // 3 per row
    alignItems: 'center',
    marginVertical: 16,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden', // ensures image stays inside circle
    backgroundColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: '#8b00ff', // Violet border to match HomeScreen CircleMenu
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CategoriesScreen;