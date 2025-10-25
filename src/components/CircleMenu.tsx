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
  iconUri: ImageSourcePropType; // Can be a local image or a remote URL
  onPress?: () => void;
};

const CircleMenu = ({ title, iconUri, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {/* ✅ Pass iconUri directly — do not wrap it in { uri: iconUri } */}
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
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default CircleMenu;
