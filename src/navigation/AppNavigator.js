import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'favorite';
            } else if (route.name === 'Categories') {
              iconName = 'category';
            } else if (route.name === 'Cart') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Account') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0b8a0b',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          headerShown: false, // Hide default header since HomeScreen has its own
        })}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen}
          options={{title: 'Favorites'}}
        />
        <Tab.Screen 
          name="Categories" 
          component={CategoriesScreen}
          options={{title: 'Categories'}}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            title: 'Cart',
            tabBarBadge: 2, // Shows notification badge
          }}
        />
        <Tab.Screen 
          name="Account" 
          component={AccountScreen}
          options={{title: 'Account'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;