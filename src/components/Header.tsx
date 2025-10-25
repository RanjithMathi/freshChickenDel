// src/components/Header.tsx
import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Top row: Avatar and Logo */}
      <View style={styles.topRow}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
       <Image
  source={require('../assets/images/logo/logo.png')}
  style={styles.logo}
/>
      </View>

      {/* Bottom row: Search bar */}
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#666"
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    color: '#000',
  },
});

export default Header;
