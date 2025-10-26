import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useOrder } from '../context/OrderContext';

const OrderTrackingScreen = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);

  // Track status progression
  const [currentStatus, setCurrentStatus] = useState('preparing'); // confirmed, preparing, out_for_delivery, delivered

  const trackingSteps = [
    {
      id: 'confirmed',
      label: 'Order Confirmed',
      icon: 'check-circle',
      time: order?.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
    },
    {
      id: 'preparing',
      label: 'Preparing Order',
      icon: 'restaurant',
      time: '',
    },
    {
      id: 'out_for_delivery',
      label: 'Out for Delivery',
      icon: 'local-shipping',
      time: '',
    },
    {
      id: 'delivered',
      label: 'Delivered',
      icon: 'done-all',
      time: '',
    },
  ];

  const getStepStatus = (stepId) => {
    const stepIndex = trackingSteps.findIndex((s) => s.id === stepId);
    const currentIndex = trackingSteps.findIndex((s) => s.id === currentStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const handleCallDelivery = () => {
    Linking.openURL('tel:+919876543210');
  };

  const renderTrackingStep = (step, index) => {
    const status = getStepStatus(step.id);
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isLast = index === trackingSteps.length - 1;

    return (
      <View key={step.id} style={styles.stepContainer}>
        <View style={styles.stepLeft}>
          {/* Icon Circle */}
          <View
            style={[
              styles.stepCircle,
              isCompleted && styles.stepCircleCompleted,
              isActive && styles.stepCircleActive,
            ]}
          >
            <Icon
              name={isCompleted ? 'check' : step.icon}
              size={24}
              color={isCompleted || isActive ? '#fff' : '#ccc'}
            />
          </View>

          {/* Connecting Line */}
          {!isLast && (
            <View
              style={[
                styles.connectingLine,
                isCompleted && styles.connectingLineCompleted,
              ]}
            />
          )}
        </View>

        <View style={styles.stepRight}>
          <Text
            style={[
              styles.stepLabel,
              (isCompleted || isActive) && styles.stepLabelActive,
            ]}
          >
            {step.label}
          </Text>
          {step.time && (
            <Text style={styles.stepTime}>{step.time}</Text>
          )}
          {isActive && (
            <View style={styles.activeBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.activeText}>In Progress</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Order ID Card */}
        <View style={styles.orderIdCard}>
          <Text style={styles.orderIdLabel}>Order ID</Text>
          <Text style={styles.orderIdValue}>{order?.id}</Text>
        </View>

        {/* Delivery Info Card */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Icon name="schedule" size={24} color="#0b8a0b" />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
              <Text style={styles.deliveryTime}>{order?.deliverySlot?.time}</Text>
            </View>
          </View>
        </View>

        {/* Tracking Steps */}
        <View style={styles.trackingCard}>
          <Text style={styles.trackingTitle}>Order Status</Text>
          <View style={styles.trackingSteps}>
            {trackingSteps.map((step, index) => renderTrackingStep(step, index))}
          </View>
        </View>

        {/* Delivery Person Card (shown when out for delivery) */}
        {currentStatus === 'out_for_delivery' && (
          <View style={styles.deliveryPersonCard}>
            <View style={styles.personHeader}>
              <View style={styles.personAvatar}>
                <Icon name="person" size={32} color="#fff" />
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.personName}>Ramesh Kumar</Text>
                <Text style={styles.personRole}>Delivery Partner</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={14} color="#ffa500" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              onPress={handleCallDelivery}
              activeOpacity={0.8}
            >
              <Icon name="phone" size={20} color="#fff" />
              <Text style={styles.callButtonText}>Call Delivery Partner</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Delivery Address */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Icon name="location-on" size={22} color="#0b8a0b" />
            <Text style={styles.addressTitle}>Delivery Address</Text>
          </View>
          <View style={styles.addressContent}>
            <Text style={styles.addressType}>{order?.address?.type}</Text>
            <Text style={styles.addressName}>{order?.address?.name}</Text>
            <Text style={styles.addressDetail}>
              {order?.address?.houseNo}, {order?.address?.area}
            </Text>
            <Text style={styles.addressDetail}>
              {order?.address?.city}, {order?.address?.state} - {order?.address?.pincode}
            </Text>
            <Text style={styles.addressPhone}>{order?.address?.phone}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.itemsTitle}>Order Items ({order?.items?.length})</Text>
          {order?.items?.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Payment Info */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>
              {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 
               order?.paymentMethod === 'upi' ? 'UPI' : 'Card'}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{order?.total}</Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpCard}>
          <Icon name="help-outline" size={20} color="#666" />
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>Contact customer support for assistance</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  orderIdCard: {
    backgroundColor: '#0b8a0b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  orderIdValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  deliveryCard: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0b8a0b',
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfo: {
    marginLeft: 12,
  },
  deliveryLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b8a0b',
  },
  trackingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  trackingSteps: {
    paddingLeft: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCircleCompleted: {
    backgroundColor: '#0b8a0b',
  },
  stepCircleActive: {
    backgroundColor: '#0b8a0b',
  },
  connectingLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 4,
  },
  connectingLineCompleted: {
    backgroundColor: '#0b8a0b',
  },
  stepRight: {
    flex: 1,
    paddingTop: 12,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  stepLabelActive: {
    color: '#333',
  },
  stepTime: {
    fontSize: 12,
    color: '#666',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0b8a0b',
    marginRight: 6,
  },
  activeText: {
    fontSize: 12,
    color: '#0b8a0b',
    fontWeight: '600',
  },
  deliveryPersonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0b8a0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personInfo: {
    marginLeft: 12,
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  personRole: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b8a0b',
    paddingVertical: 12,
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  addressContent: {
    paddingLeft: 30,
  },
  addressType: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b8a0b',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  itemsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b8a0b',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b8a0b',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  helpContent: {
    marginLeft: 12,
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  helpText: {
    fontSize: 13,
    color: '#666',
  },
});

export default OrderTrackingScreen;