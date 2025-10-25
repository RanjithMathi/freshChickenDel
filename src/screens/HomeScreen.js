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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircleMenu from '../components/CircleMenu';
import ProductCard from '../components/ProductCard';

// Local images
import product1 from '../assets/images/careo-1.jpg';
import product2 from '../assets/images/careo-2.jpg';
import product3 from '../assets/images/careo-3.jpg';

const products = [
  { id: '1', title: 'Fresh Chicken Breast- 500g', price: '₹199', image: product1 },
  { id: '2', title: 'Tender Chicken Legs- 1kg', price: '₹249', image: product2 },
  { id: '3', title: 'Chicken Wings-500g', price: '₹179', image: product3 },
];

const bannerImages = [
  require('../assets/images/careo-1.jpg'),
  require('../assets/images/careo-2.jpg'),
  require('../assets/images/careo-3.jpg'),
  require('../assets/images/careo-4.jpg'),
  require('../assets/images/careo-5.jpg'),
];

const { width } = Dimensions.get('window');

const HEADER_TOP_HEIGHT = 60;
const SEARCH_BAR_HEIGHT = 50;

const HomeScreen = () => {
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
        <Image source={require('../assets/icons/tendercut.png')} style={styles.profileImage} />
        <Text style={styles.companyName}>Fresh Chicken</Text>
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
          <CircleMenu title="Chicken" iconUri={require('../assets/icons/chicken.png')} />
          <CircleMenu title="Tender Cut" iconUri={require('../assets/icons/tendercut.png')} />
          <CircleMenu title="Chicken Fry" iconUri={require('../assets/icons/chickenfry.png')} />
        </View>

        {/* Product Sections */}
        {['Flash Sale', 'Festival Sale', 'Diwali Sale'].map((section) => (
          <View key={section} style={styles.productSection}>
            <Text style={styles.sectionTitle}>{section}</Text>
            <View style={styles.productGrid}>
              {products.map(product => (
                <ProductCard
                  key={`${section}-${product.id}`}
                  image={product.image}
                  title={product.title}
                  price={product.price}
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
    backgroundColor: '#0b8a0b', // Green background behind the notch/status bar
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dd7805ff',
  },
  companyName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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
    marginTop: 16,
  },
  productSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    marginHorizontal: 16,
    color: '#222',
  },
});

export default HomeScreen;