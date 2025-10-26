import React, { createContext, useState, useContext } from 'react';

const AddressContext = createContext();

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within AddressProvider');
  }
  return context;
};

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'John Doe',
      phone: '+91 9876543210',
      houseNo: '123',
      area: 'Main Street',
      landmark: 'Near Central Park',
      city: 'Namakkal',
      state: 'Tamil Nadu',
      pincode: '637001',
      type: 'Home',
      isDefault: true,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  // Add new address
  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
      isDefault: addresses.length === 0 ? true : address.isDefault || false,
    };

    // If new address is set as default, remove default from others
    if (newAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, newAddress]);
    
    // Set as selected if it's the first address or marked as default
    if (addresses.length === 0 || newAddress.isDefault) {
      setSelectedAddress(newAddress);
    }

    return newAddress;
  };

  // Update existing address
  const updateAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          const updated = { ...addr, ...updatedData };
          
          // If this address is being set as default, remove default from others
          if (updated.isDefault && !addr.isDefault) {
            return updated;
          }
          return updated;
        }
        // Remove default from other addresses if this one is being set as default
        if (updatedData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      })
    );

    // Update selected address if it was modified
    if (selectedAddress?.id === id) {
      setSelectedAddress((prev) => ({ ...prev, ...updatedData }));
    }
  };

  // Delete address
  const deleteAddress = (id) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    
    setAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== id);
      
      // If deleted address was default, set first remaining as default
      if (addressToDelete?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true;
        setSelectedAddress(filtered[0]);
      }
      
      return filtered;
    });

    // Clear selected address if it was deleted
    if (selectedAddress?.id === id) {
      const remaining = addresses.filter((addr) => addr.id !== id);
      setSelectedAddress(remaining[0] || null);
    }
  };

  // Set default address
  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Select address for checkout
  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  // Get default address
  const getDefaultAddress = () => {
    return addresses.find((addr) => addr.isDefault) || addresses[0];
  };

  const value = {
    addresses,
    selectedAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    selectAddress,
    getDefaultAddress,
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};