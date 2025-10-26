// src/components/CircleMenu.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  title: string;
  iconUri: ImageSourcePropType;
  onPress?: () => void;
};

const CircleMenu = ({ title, iconUri, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Image source={iconUri} style={styles.icon} />
      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f1e9eaff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // This clips the image to the circular boundary
    borderWidth: 2,
    borderColor: '#F3CF4B', // Violet color border
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'cover', // Changed from 'contain' to 'cover' to fill the circle
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default CircleMenu;