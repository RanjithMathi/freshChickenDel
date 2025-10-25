import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleWhatsAppShare = () => {
    const message = `Check out this product: ${product.title} - ${product.price}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.title} to cart`);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      {/* Fixed Top Icons - Stay on top while scrolling */}
      <SafeAreaView style={styles.topIconsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Right Side Icons */}
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleFavorite}
          >
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? '#ff4444' : '#fff'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleWhatsAppShare}
          >
            <IconFA name="whatsapp" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable Content including Image */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image - Now Scrollable */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
          {/* Gradient Overlay for better icon visibility at top */}
          <View style={styles.gradientOverlay} />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Product Title */}
          <Text style={styles.productTitle}>{product.title}</Text>

          {/* Product Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>
              Our premium fresh chicken is sourced from trusted local farms, ensuring the highest 
              quality and freshness. Each piece is carefully selected and hygienically packed to 
              maintain its natural flavor and nutritional value. Perfect for grilling, roasting, 
              or curry preparations. Rich in protein and low in fat, this chicken is ideal for 
              health-conscious consumers looking for quality meat products.
            </Text>
          </View>

          {/* Storage Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Storage Instructions</Text>
            <Text style={styles.description}>
              • Store in refrigerator at 0-4°C immediately after purchase{'\n'}
              • Use within 2 days of purchase for best quality{'\n'}
              • For longer storage, freeze at -18°C or below{'\n'}
              • Thaw frozen chicken in refrigerator before cooking{'\n'}
              • Do not refreeze once thawed{'\n'}
              • Keep raw chicken separate from cooked foods
            </Text>
          </View>

          {/* Marketed By */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marketed By</Text>
            <Text style={styles.description}>
              Fresh Chicken Mart Private Limited{'\n'}
              Namakkal, Tamil Nadu - 637001{'\n'}
              FSSAI License No: 12345678901234{'\n'}
              Customer Care: +91 9876543210
            </Text>
          </View>

          {/* Extra space for bottom fixed section */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Section - Price & Add to Cart */}
      <View style={styles.bottomSection}>
        <View style={styles.bottomContainer}>
          {/* Left Side - Price */}
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          {/* Right Side - Add Button & Delivery Info */}
          <View style={styles.addSection}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Icon name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <Icon name="local-shipping" size={14} color="#0b8a0b" />
              <Text style={styles.deliveryText}>Delivered within 30 minutes</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topIconsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addSection: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  addToCartButton: {
    backgroundColor: '#0b8a0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    elevation: 2,
    shadowColor: '#0b8a0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  deliveryText: {
    fontSize: 11,
    color: '#0b8a0b',
    fontWeight: '500',
  },
});

export default ProductDetailScreen;