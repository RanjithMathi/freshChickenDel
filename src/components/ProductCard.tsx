// src/components/ProductCard.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

type ProductCardProps = {
  image: ImageSourcePropType;
  title: string;
  price: string;
  onAdd?: () => void;
};

const ProductCard = ({ image, title, price, onAdd }: ProductCardProps) => {
  return (
   <View style={styles.card}>
  <Image source={image} style={styles.image} />
  <View style={styles.info}>
    <Text style={styles.title} numberOfLines={2}>{title}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

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
    height: 270,        // Increased card height
  },
  image: {
    width: '100%',
    height: 180,       // Increased image height
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
    // marginBottom: 10,
  },
//   addButton: {
//   backgroundColor: '#fff',       // White background
//   paddingVertical: 8,
//   borderRadius: 5,
//   alignItems: 'center',
//   borderWidth: 2,                
//   borderColor: '#66bb6a',        // Lighter green border
// },
// addText: {
//   color: '#28a745',              // Green text
//   fontWeight: 'bold',
// },
priceContainer: {
  flexDirection: 'row',      // Align price and button horizontally
  justifyContent: 'space-between', // Push them to opposite ends
  alignItems: 'center',
  // marginTop: 5,
},

// price: {
//   fontSize: 16,
//   fontWeight: 'bold',
//   color: '#000',
// },

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
