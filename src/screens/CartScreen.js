import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CartScreen = () => {
  const [cartItems] = React.useState([
    {id: 1, name: 'Chicken Breast', qty: 2, price: 250},
    {id: 2, name: 'Fish Fillet', qty: 1, price: 400},
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0b8a0b" barStyle="light-content" />
      
      {/* Custom Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Shopping Cart</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>Add items to get started!</Text>
          </View>
        ) : (
          <>
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹{item.price} × {item.qty}</Text>
                  </View>
                  <Text style={styles.itemTotal}>₹{item.qty * item.price}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>₹{total}</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </>
        )}
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
  itemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b8a0b',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b8a0b',
  },
  checkoutButton: {
    backgroundColor: '#0b8a0b',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;