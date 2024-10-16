import {StyleSheet, Text, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

// Replace 'TestIds.BANNER' with your actual Ad Unit ID for production
const BannerAdComponent = () => {
  return (
    <BannerAd
      unitId={'ca-app-pub-6637691341770899/2100701767'} // Replace with your Ad Unit ID
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Banner Ad Loaded');
      }}
      onAdFailedToLoad={error => {
        console.error('Failed to load banner ad:', error);
      }}>
      <View style={styles.nativeAdContainer}>
        <Text style={styles.adHeadline}>This is a Native Ad</Text>
        <Text style={styles.adBody}>Ad Body text goes here</Text>
      </View>
    </BannerAd>
  );
};

const styles = StyleSheet.create({
  nativeAdContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    margin: 10,
  },
  adHeadline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adBody: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default BannerAdComponent;
