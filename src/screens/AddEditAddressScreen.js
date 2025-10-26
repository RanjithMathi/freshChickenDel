import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAddress } from '../context/AddressContext';

const AddEditAddressScreen = ({ navigation, route }) => {
  const { mode = 'add', address } = route.params || {};
  const { addAddress, updateAddress } = useAddress();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    houseNo: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home',
    isDefault: false,
  });

  useEffect(() => {
    if (mode === 'edit' && address) {
      setFormData(address);
    }
  }, [mode, address]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, phone, houseNo, area, city, state, pincode } = formData;

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    if (!houseNo.trim()) {
      Alert.alert('Error', 'Please enter house/flat number');
      return false;
    }
    if (!area.trim()) {
      Alert.alert('Error', 'Please enter area/street');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter city');
      return false;
    }
    if (!state.trim()) {
      Alert.alert('Error', 'Please enter state');
      return false;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit PIN code');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (mode === 'add') {
      addAddress(formData);
      Alert.alert('Success', 'Address added successfully');
    } else {
      updateAddress(address.id, formData);
      Alert.alert('Success', 'Address updated successfully');
    }

    navigation.goBack();
  };

  const renderAddressTypeButton = (type, icon) => {
    const isSelected = formData.type === type;
    return (
      <TouchableOpacity
        style={[styles.typeButton, isSelected && styles.typeButtonSelected]}
        onPress={() => handleInputChange('type', type)}
        activeOpacity={0.7}
      >
        <Icon
          name={icon}
          size={22}
          color={isSelected ? '#fff' : '#0b8a0b'}
        />
        <Text style={[styles.typeButtonText, isSelected && styles.typeButtonTextSelected]}>
          {type}
        </Text>
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
        <Text style={styles.headerTitle}>
          {mode === 'add' ? 'Add New Address' : 'Edit Address'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
        </View>

        {/* Address Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Details</Text>

          <View style={styles.inputContainer}>
            <Icon name="home" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="House/Flat Number *"
              value={formData.houseNo}
              onChangeText={(value) => handleInputChange('houseNo', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="location-on" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Area/Street *"
              value={formData.area}
              onChangeText={(value) => handleInputChange('area', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="place" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Landmark (Optional)"
              value={formData.landmark}
              onChangeText={(value) => handleInputChange('landmark', value)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Icon name="location-city" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="City *"
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Icon name="map" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="State *"
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="pin-drop" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="PIN Code *"
              value={formData.pincode}
              onChangeText={(value) => handleInputChange('pincode', value)}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        </View>

        {/* Address Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Type</Text>
          <View style={styles.typeContainer}>
            {renderAddressTypeButton('Home', 'home')}
            {renderAddressTypeButton('Work', 'work')}
            {renderAddressTypeButton('Other', 'location-on')}
          </View>
        </View>

        {/* Default Address */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => handleInputChange('isDefault', !formData.isDefault)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, formData.isDefault && styles.checkboxChecked]}>
            {formData.isDefault && <Icon name="check" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Save as default address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {mode === 'add' ? 'Add Address' : 'Update Address'}
          </Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0b8a0b',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  typeButtonSelected: {
    backgroundColor: '#0b8a0b',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b8a0b',
    marginLeft: 6,
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#0b8a0b',
    borderColor: '#0b8a0b',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0b8a0b',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b8a0b',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#0b8a0b',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AddEditAddressScreen;