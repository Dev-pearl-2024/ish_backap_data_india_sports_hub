import {StyleSheet, Text, View} from 'react-native';
// import {NativeAdView, TestIds} from 'react-native-google-mobile-ads';
// import {Na} from 'react-native-google-mobile-ads'

const NativeAdComponent = () => {
  return (
    // <NativeAdView
    //   unitId={'ca-app-pub-6637691341770899/2100701767'}
    //   onAdLoaded={() => {
    //     console.log('Native Ad Loaded');
    //   }}
    //   onAdFailedToLoad={error => {
    //     console.error('Failed to load native ad:', error);
    //   }}>
      <View style={styles.nativeAdContainer}>
        <Text style={styles.adHeadline}>This is a Native Ad</Text>
        <Text style={styles.adBody}>Ad Body text goes here</Text>
      </View>
    // </NativeAdView>
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

export default NativeAdComponent;
