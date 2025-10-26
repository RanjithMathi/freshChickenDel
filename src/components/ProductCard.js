import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductCard = ({ image, title, price, onAdd, product }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  
  const handleCardPress = () => {
    if (product) {
      navigation.navigate('ProductDetailScreen', { product });
    }
  };

  const handleAddPress = (e) => {
    e.stopPropagation(); // Prevent card press when clicking Add
    
    if (product) {
      addToCart(product, 1);
    }
    
    // Call the original onAdd if provided
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={handleCardPress}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddPress}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    height: 270,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: '#888',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#66bb6a',
    alignItems: 'center',
  },
  addText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
});

export default ProductCard;