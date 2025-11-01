// src/config/api.config.js

import { Platform } from 'react-native';

// For Android Emulator, use 10.0.2.2 to access localhost
// For iOS Simulator, use localhost or 127.0.0.1
// For physical device, use your computer's IP address

const getBaseURL = () => {
  // Change this to your computer's IP address if testing on physical device
  // Example: 'http://192.168.1.100:8080/api'
  
  if (__DEV__) {
    // Development configuration
    return Platform.OS === 'android' 
      ? 'http://10.0.2.2:8080/api'  // Android emulator
      : 'http://localhost:8080/api'; // iOS simulator
  }
  
  // Production configuration
  return 'https://your-production-url.com/api';
};

export const API_CONFIG = {
  BASE_URL: getBaseURL(),
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Customer endpoints
  CUSTOMERS: '/customers',
  CUSTOMER_BY_ID: (id) => `/customers/${id}`,
  
  // Product endpoints
  PRODUCTS: '/products',
  PRODUCTS_AVAILABLE: '/products/available',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  UPDATE_STOCK: (id, quantity) => `/products/${id}/stock?quantity=${quantity}`,
  
  // Order endpoints
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDERS_BY_CUSTOMER: (customerId) => `/orders/customer/${customerId}`,
  ORDERS_BY_STATUS: (status) => `/orders/status/${status}`,
  UPDATE_ORDER_STATUS: (id, status) => `/orders/${id}/status?status=${status}`,
};