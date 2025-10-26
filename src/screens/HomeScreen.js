import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircleMenu from '../components/CircleMenu';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Local images
import product1 from '../assets/images/careo-5.jpg';
import product2 from '../assets/images/careo-3.jpg';
import product3 from '../assets/images/careo-1.jpg';

const products = [
  { id: '1', title: 'Fresh Chicken Breast- 500g', price: '₹199', image: product1 },
  { id: '2', title: 'Tender Chicken Legs- 1kg', price: '₹249', image: product2 },
  { id: '3', title: 'Chicken Wings-500g', price: '₹179', image: product3 },
];

// Create larger product array with duplicates for section pages
const createLargerProductArray = () => {
  const largerArray = [];
  for (let i = 0; i < 4; i++) {
    products.forEach((product, index) => {
      largerArray.push({
        ...product,
        id: `${product.id}-${i}-${index}`,
      });
    });
  }
  return largerArray;
};

const bannerImages = [
  require('../assets/images/careo-1.jpg'),
  require('../assets/images/careo-5.jpg'),
  require('../assets/images/careo-3.jpg'),
];

const { width } = Dimensions.get('window');

const HEADER_TOP_HEIGHT = 60;
const SEARCH_BAR_HEIGHT = 50;

const HomeScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width * 0.8 + 16));
    setCurrentIndex(index);
  };

  const handleViewAll = (sectionName) => {
    navigation.navigate('SectionProducts', {
      sectionName,
      products: createLargerProductArray(),
    });
  };

  const handleCategoryPress = (categoryName) => {
    // Navigate to CategoryProducts screen with selected category
    navigation.navigate('CategoryProducts', {
      category: categoryName,
    });
  };

  // Animate header up & search bar sliding to top
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_TOP_HEIGHT],
    outputRange: [0, -HEADER_TOP_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_TOP_HEIGHT / 2, HEADER_TOP_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_TOP_HEIGHT],
    outputRange: [HEADER_TOP_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Status Bar Styling */}
      <StatusBar backgroundColor="#0b8a0b" barStyle="light-content" />

      {/* Safe area for status bar with green background */}
      <SafeAreaView style={styles.statusBarBackground} />

      {/* Animated Top Header */}
      <Animated.View
        style={[
          styles.headerTopRow,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        {/* Location Section - Left Side */}
        <TouchableOpacity style={styles.locationContainer}>
          <Icon name="location-on" size={20} color="#fff" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.pincodeText}>637001</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              Namakkal, Tamil Nadu
            </Text>
          </View>
        </TouchableOpacity>

        {/* Logo - Right Side */}
        <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
      </Animated.View>

      {/* Search bar that moves up on scroll */}
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            transform: [{ translateY: searchBarTranslateY }],
          },
        ]}
      >
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search products..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: HEADER_TOP_HEIGHT + SEARCH_BAR_HEIGHT,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Carousel */}
        <FlatList
          ref={flatListRef}
          data={bannerImages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.bannerImage} resizeMode="cover" />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={styles.carouselContainer}
          getItemLayout={(_, index) => ({
            length: width * 0.8 + 16,
            offset: (width * 0.8 + 16) * index,
            index,
          })}
        />

        {/* Circle Menu */}
        <View style={styles.menuRow}>
          <CircleMenu 
            title="Chicken" 
            iconUri={require('../assets/categories/chicken.jpg')}
            onPress={() => handleCategoryPress('Chicken')}
          />
          <CircleMenu 
            title="Tender Cut" 
            iconUri={require('../assets/categories/readytocook.jpg')}
            onPress={() => handleCategoryPress('Ready to Cook')}
          />
          <CircleMenu 
            title="Egg" 
            iconUri={require('../assets/categories/eggs.jpg')}
            onPress={() => handleCategoryPress('Eggs')}
          />
        </View>

        {/* Product Sections */}
        {['Flash Sale', 'Festival Sale', 'Diwali Sale'].map((section) => (
          <View key={section} style={styles.productSection}>
            {/* Section header with title + View All */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section}</Text>

              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => handleViewAll(section)}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Icon name="arrow-forward" size={16} color="#dd7805" />
              </TouchableOpacity>
            </View>

            {/* Product grid */}
            <View style={styles.productGrid}>
              {products.map((product) => (
                <ProductCard
                  key={`${section}-${product.id}`}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  product={product}
                  onAdd={() => console.log(`Added ${product.title}`)}
                />
              ))}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBarBackground: {
    backgroundColor: '#0b8a0b',
  },
  headerTopRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_TOP_HEIGHT,
    backgroundColor: '#0b8a0b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: '70%',
  },
  locationTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
  },
  pincodeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
  addressText: {
    color: 'white',
    fontSize: 11,
    opacity: 0.9,
    lineHeight: 14,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dd7805ff',
  },
  searchBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SEARCH_BAR_HEIGHT,
    backgroundColor: '#0b8a0b',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 11,
    elevation: 6,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    fontSize: 14,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  carouselContainer: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  bannerImage: {
    width: width * 0.8,
    height: 160,
    borderRadius: 12,
    marginRight: 16,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  productSection: {
    marginTop: 34,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#dd7805',
    fontWeight: '600',
  },
});

export default HomeScreen;