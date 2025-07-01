import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4336409261443505/5930017865';

const GoogleAd = () => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log('✅ Ad loaded')}
        onAdFailedToLoad={error => console.log('❌ Ad failed to load:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default GoogleAd;
