import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CartProvider, useCart } from './CartContext';
import ToastNotification from '../components/ToastNotification';

// Internal component that can access cart context
const ToastWrapper = ({ children }) => {
  const { toast, hideToast } = useCart();

  return (
    <View style={styles.container}>
      {children}
      <ToastNotification
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </View>
  );
};

// Main provider that wraps everything
export const CartProviderWithToast = ({ children }) => {
  return (
    <CartProvider>
      <ToastWrapper>{children}</ToastWrapper>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CartProviderWithToast;