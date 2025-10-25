import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '../components/ProductCard';

const SectionProductsScreen = ({ route, navigation }) => {
  const { sectionName, products } = route.params;

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Header */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{sectionName}</Text>

          {/* Empty view for centering the title */}
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            image={item.image}
            title={item.title}
            price={item.price}
            product={item}
            navigation={navigation}
            onAdd={() => console.log(`Added ${item.title}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  productList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
});

export default SectionProductsScreen;