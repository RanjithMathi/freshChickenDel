import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const AccountScreen = () => {
  const menuItems = [
    {id: 1, icon: '👤', title: 'Edit Profile', subtitle: 'Update your information'},
    {id: 2, icon: '📍', title: 'Addresses', subtitle: 'Manage delivery addresses'},
    {id: 3, icon: '📦', title: 'Orders', subtitle: 'View order history'},
    {id: 4, icon: '💳', title: 'Payment Methods', subtitle: 'Manage payment options'},
    {id: 5, icon: '⚙️', title: 'Settings', subtitle: 'App preferences'},
    {id: 6, icon: '❓', title: 'Help & Support', subtitle: 'Get assistance'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0b8a0b" barStyle="light-content" />
      
      {/* Custom Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </SafeAreaView>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@example.com</Text>
          <Text style={styles.userPhone}>+91 1234567890</Text>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0b8a0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;