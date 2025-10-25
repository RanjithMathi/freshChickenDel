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
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
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
    height: 300,        // Increased card height
  },
  image: {
    width: '100%',
    height: 180,       // Increased image height
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
