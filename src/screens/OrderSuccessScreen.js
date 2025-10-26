import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useOrder } from '../context/OrderContext';

const OrderSuccessScreen = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Success animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTrackOrder = () => {
    navigation.navigate('OrderTracking', { orderId: order.id });
  };

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const getEstimatedDeliveryTime = () => {
    if (order?.deliverySlot?.time) {
      return order.deliverySlot.time.split(' - ')[1]; // Get end time
    }
    return '8:30 PM';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Icon name="check-circle" size={100} color="#0b8a0b" />
        </Animated.View>

        {/* Success Message */}
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your order. We'll deliver it soon.
          </Text>
        </Animated.View>

        {/* Order Details Card */}
        <Animated.View style={[styles.orderCard, { opacity: fadeAnim }]}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderLabel}>Order ID</Text>
            <Text style={styles.orderId}>{order?.id}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={20} color="#666" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Delivery Date</Text>
              <Text style={styles.detailValue}>{order?.deliverySlot?.date}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="schedule" size={20} color="#666" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Delivery Time</Text>
              <Text style={styles.detailValue}>{order?.deliverySlot?.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="location-on" size={20} color="#666" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Delivery Address</Text>
              <Text style={styles.detailValue}>
                {order?.address?.houseNo}, {order?.address?.area}
              </Text>
              <Text style={styles.detailValueSub}>
                {order?.address?.city}, {order?.address?.state}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <View style={styles.paymentLeft}>
              <Icon name="payment" size={20} color="#666" />
              <Text style={styles.paymentLabel}>Payment Method</Text>
            </View>
            <Text style={styles.paymentValue}>
              {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 
               order?.paymentMethod === 'upi' ? 'UPI' : 'Card'}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{order?.total}</Text>
          </View>
        </Animated.View>

        {/* Estimated Delivery */}
        <Animated.View style={[styles.estimateCard, { opacity: fadeAnim }]}>
          <Icon name="local-shipping" size={24} color="#0b8a0b" />
          <View style={styles.estimateContent}>
            <Text style={styles.estimateLabel}>Estimated Delivery By</Text>
            <Text style={styles.estimateTime}>{getEstimatedDeliveryTime()}</Text>
          </View>
        </Animated.View>

        {/* Order Items Summary */}
        <Animated.View style={[styles.itemsCard, { opacity: fadeAnim }]}>
          <Text style={styles.itemsTitle}>Order Summary</Text>
          <View style={styles.itemsCount}>
            <Icon name="shopping-bag" size={18} color="#666" />
            <Text style={styles.itemsText}>
              {order?.items?.length} item(s) ordered
            </Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrackOrder}
            activeOpacity={0.8}
          >
            <Icon name="local-shipping" size={20} color="#fff" />
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueShopping}
            activeOpacity={0.8}
          >
            <Icon name="shopping-cart" size={20} color="#0b8a0b" />
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Help Section */}
        <Animated.View style={[styles.helpCard, { opacity: fadeAnim }]}>
          <Icon name="headset-mic" size={20} color="#666" />
          <Text style={styles.helpText}>
            Need help? Contact our support team
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  successCircle: {
    marginTop: 40,
    marginBottom: 24,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0b8a0b',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  orderLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValueSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f9f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b8a0b',
  },
  estimateCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0b8a0b',
  },
  estimateContent: {
    marginLeft: 12,
  },
  estimateLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  estimateTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b8a0b',
  },
  itemsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  itemsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  itemsCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b8a0b',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0b8a0b',
    paddingVertical: 14,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b8a0b',
    marginLeft: 8,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
});

export default OrderSuccessScreen;