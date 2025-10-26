import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAddress } from '../context/AddressContext';

const AddressSelectionScreen = ({ navigation }) => {
  const {
    addresses,
    selectedAddress,
    selectAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddress();

  const handleSelectAddress = (address) => {
    selectAddress(address);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      Alert.alert('No Address Selected', 'Please select a delivery address');
      return;
    }
    navigation.navigate('TimeSlotSelection');
  };

  const handleAddNewAddress = () => {
    navigation.navigate('AddEditAddress', { mode: 'add' });
  };

  const handleEditAddress = (address) => {
    navigation.navigate('AddEditAddress', { mode: 'edit', address });
  };

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAddress(addressId),
        },
      ]
    );
  };

  const renderAddressCard = (address) => {
    const isSelected = selectedAddress?.id === address.id;

    return (
      <TouchableOpacity
        key={address.id}
        style={[styles.addressCard, isSelected && styles.selectedCard]}
        onPress={() => handleSelectAddress(address)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.radioContainer}>
            <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
              {isSelected && <View style={styles.radioInner} />}
            </View>
            <View style={styles.addressTypeContainer}>
              <Icon
                name={address.type === 'Home' ? 'home' : address.type === 'Work' ? 'work' : 'location-on'}
                size={18}
                color="#0b8a0b"
                style={styles.typeIcon}
              />
              <Text style={styles.addressType}>{address.type}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.nameText}>{address.name}</Text>
          <Text style={styles.phoneText}>{address.phone}</Text>
          <Text style={styles.addressText}>
            {address.houseNo}, {address.area}
          </Text>
          {address.landmark && (
            <Text style={styles.landmarkText}>Near {address.landmark}</Text>
          )}
          <Text style={styles.addressText}>
            {address.city}, {address.state} - {address.pincode}
          </Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditAddress(address)}
          >
            <Icon name="edit" size={18} color="#0b8a0b" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteAddress(address.id)}
          >
            <Icon name="delete" size={18} color="#ff4444" />
            <Text style={[styles.actionText, { color: '#ff4444' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Delivery Address</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Address List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="location-off" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No addresses saved</Text>
            <Text style={styles.emptySubtext}>Add a new address to continue</Text>
          </View>
        ) : (
          addresses.map((address) => renderAddressCard(address))
        )}

        {/* Add New Address Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNewAddress}
          activeOpacity={0.7}
        >
          <Icon name="add-circle" size={24} color="#0b8a0b" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Continue Button */}
      {addresses.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !selectedAddress && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedAddress}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
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
    paddingBottom: 100,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    borderColor: '#0b8a0b',
    backgroundColor: '#f0f9f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: '#0b8a0b',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0b8a0b',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    marginRight: 6,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#0b8a0b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  landmarkText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#0b8a0b',
    fontWeight: '500',
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#0b8a0b',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b8a0b',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  continueButton: {
    backgroundColor: '#0b8a0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});

export default AddressSelectionScreen;