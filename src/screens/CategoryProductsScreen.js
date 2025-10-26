import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '../components/ProductCard';

// Import images
import product1 from '../assets/images/careo-5.jpg';
import product2 from '../assets/images/careo-3.jpg';
import product3 from '../assets/images/careo-1.jpg';

// Complete category-wise product data
const categoryData = {
  Chicken: [
    { id: 'c1', title: 'Fresh Chicken Breast - 500g', price: '₹199', image: product1, category: 'Chicken' },
    { id: 'c2', title: 'Tender Chicken Legs - 1kg', price: '₹249', image: product2, category: 'Chicken' },
    { id: 'c3', title: 'Chicken Wings - 500g', price: '₹179', image: product3, category: 'Chicken' },
    { id: 'c4', title: 'Whole Chicken - 1.2kg', price: '₹299', image: product1, category: 'Chicken' },
    { id: 'c5', title: 'Chicken Drumsticks - 500g', price: '₹189', image: product2, category: 'Chicken' },
    { id: 'c6', title: 'Boneless Chicken Thigh - 500g', price: '₹229', image: product3, category: 'Chicken' },
  ],
  Mutton: [
    { id: 'm1', title: 'Fresh Mutton Curry Cut - 500g', price: '₹449', image: product2, category: 'Mutton' },
    { id: 'm2', title: 'Mutton Leg Piece - 500g', price: '₹479', image: product1, category: 'Mutton' },
    { id: 'm3', title: 'Mutton Chops - 500g', price: '₹499', image: product3, category: 'Mutton' },
    { id: 'm4', title: 'Mutton Boneless - 500g', price: '₹529', image: product2, category: 'Mutton' },
    { id: 'm5', title: 'Mutton Liver - 250g', price: '₹149', image: product1, category: 'Mutton' },
  ],
  Fish: [
    { id: 'f1', title: 'Fresh Pomfret - 500g', price: '₹349', image: product3, category: 'Fish' },
    { id: 'f2', title: 'King Fish Slices - 500g', price: '₹399', image: product1, category: 'Fish' },
    { id: 'f3', title: 'Salmon Fillet - 250g', price: '₹449', image: product2, category: 'Fish' },
    { id: 'f4', title: 'Rohu Fish - 500g', price: '₹199', image: product3, category: 'Fish' },
    { id: 'f5', title: 'Tuna Steak - 250g', price: '₹379', image: product1, category: 'Fish' },
  ],
  Seafood: [
    { id: 's1', title: 'Fresh Prawns Large - 500g', price: '₹599', image: product2, category: 'Seafood' },
    { id: 's2', title: 'Tiger Prawns - 500g', price: '₹749', image: product3, category: 'Seafood' },
    { id: 's3', title: 'Squid Rings - 250g', price: '₹299', image: product1, category: 'Seafood' },
    { id: 's4', title: 'Crab Meat - 250g', price: '₹449', image: product2, category: 'Seafood' },
    { id: 's5', title: 'Lobster - 500g', price: '₹1299', image: product3, category: 'Seafood' },
  ],
  Eggs: [
    { id: 'e1', title: 'Farm Fresh Eggs - 6pcs', price: '₹45', image: product1, category: 'Eggs' },
    { id: 'e2', title: 'Brown Eggs - 12pcs', price: '₹95', image: product2, category: 'Eggs' },
    { id: 'e3', title: 'Organic Free Range Eggs - 6pcs', price: '₹75', image: product3, category: 'Eggs' },
    { id: 'e4', title: 'Country Eggs - 30pcs Tray', price: '₹199', image: product1, category: 'Eggs' },
    { id: 'e5', title: 'Quail Eggs - 12pcs', price: '₹65', image: product2, category: 'Eggs' },
  ],
  'Ready to Cook': [
    { id: 'r1', title: 'Chicken Tikka Marinated - 500g', price: '₹279', image: product3, category: 'Ready to Cook' },
    { id: 'r2', title: 'Tandoori Chicken - 4pcs', price: '₹299', image: product1, category: 'Ready to Cook' },
    { id: 'r3', title: 'Fish Fry Cut - 500g', price: '₹329', image: product2, category: 'Ready to Cook' },
    { id: 'r4', title: 'Mutton Seekh Kebab - 250g', price: '₹249', image: product3, category: 'Ready to Cook' },
    { id: 'r5', title: 'Chicken Wings BBQ - 500g', price: '₹259', image: product1, category: 'Ready to Cook' },
    { id: 'r6', title: 'Prawn Masala Ready - 250g', price: '₹349', image: product2, category: 'Ready to Cook' },
  ],
};

const categories = ['All Categories', 'Chicken', 'Mutton', 'Fish', 'Seafood', 'Eggs', 'Ready to Cook'];

const CategoryProductsScreen = ({ route, navigation }) => {
  // Get initial category from navigation params, default to 'All Categories'
  const initialCategory = route?.params?.category || 'All Categories';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Get products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === 'All Categories') {
      // Return all products from all categories
      return Object.values(categoryData).flat();
    }
    return categoryData[selectedCategory] || [];
  };

  const filteredProducts = getFilteredProducts();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header with Dropdown */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Category Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText} numberOfLines={1}>
            {selectedCategory}
          </Text>
          <Icon 
            name={dropdownVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>

        <View style={styles.headerSpacer} />
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <ScrollView style={styles.dropdownScroll}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedCategory === category && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedCategory === category && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                  {selectedCategory === category && (
                    <Icon name="check" size={20} color="#0b8a0b" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Products Grid */}
      <ScrollView style={styles.content}>
        <View style={styles.productsContainer}>
          <Text style={styles.resultText}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
          </Text>

          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                product={product}
                onAdd={() => console.log(`Added ${product.title}`)}
              />
            ))}
          </View>

          {filteredProducts.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="inventory-2" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>
                Try selecting a different category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  headerSpacer: {
    width: 36,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    maxHeight: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownScroll: {
    maxHeight: 400,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f9f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
    color: '#0b8a0b',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsContainer: {
    padding: 16,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default CategoryProductsScreen;