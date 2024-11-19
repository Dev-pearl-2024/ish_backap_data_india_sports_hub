import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';
import Carousel from 'react-native-snap-carousel';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SLIDER_WIDTH = Dimensions.get('window').width + 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.86);

const Plans = () => {
  const navigation = useNavigation();
  const isCarousel = React.useRef(null);
  // let deepLink = 'abc://auth';

  const getDeepLink = (path = '') => {
    const scheme = 'https';
    const prefix =
      Platform.OS == 'android' ? `${scheme}://indiasportshub.com/` : `${scheme}://`;
    return prefix + path;
  };

  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        let deepLink = getDeepLink('auth');

        const result = await InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'black',
          ephemeralWebSession: true,
          preferredControlTintColor: 'black',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: 'black',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        console.log(result, 'res');

        if (result.type === 'success') {
          console.log('success');
        }
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const initiatePayment = async () => {
    let userId = await AsyncStorage.getItem('userId');
    const raw = {
      userId,
      planName: 'premium',
      amount: 99,
      redirectUrl: getDeepLink('auth'),
    };

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    };

    axios
      .post(
        'https://prod.indiasportshub.com/payment-gateway/buy/plan',
        raw,
        requestOptions,
      )
      .then(response => {
        const url = response?.data?.result?.paymentDetails?.result?.redirectUrl;
        openLink(url);
      })
      .catch(error =>
        setError(error.message || 'An unexpected error occurred'),
      );
  };

  const listItems = [
    'Detailed Live Scores & commentary',
    'Live Chatting for Users',
    'Event Calendar of all Sports',
    'Special Olympic Coverage',
    'Athlete Profiles & Bio',
    'Tournament Details',
    'Past Archive Scores & Results',
    'Records',
    'Rankings',
    'Statistics',
    'News and Blogs',
    'Interviews',
    'Highlight reels',
    'Live commentary by experts',
  ];

  const renderCarouselItem = ({item, index}) => {
    return (
      <ScrollView contentContainerStyle={{paddingBottom: 200}}>
        <View
          style={{
            padding: 20,
            backgroundColor: COLORS.white,
            borderRadius: 15,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Image source={require('../../assets/icons/premium-icon.png')} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.black,
                marginLeft: 5,
              }}>
              Premium Member
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 15,
              borderWidth: 1,
              borderRadius: 15,
              padding: 10,
              borderColor: COLORS.primary,
              width: '30%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                {rupeeSymbol}
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                99
              </Text>
            </View>
            <Text style={{color: COLORS.light_gray}}>Per Month</Text>
          </View>
          <View style={{marginBottom: 80}}>
            {listItems.map(data => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/checkmark.png')}
                    style={{
                      color: COLORS.white,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.light_gray,
                      fontSize: 16,
                      marginBottom: 5,
                    }}>
                    {data}
                  </Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => initiatePayment()}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const rupeeSymbol = '\u20B9';

  return (
    <SafeAreaView>
      <BackHeader />
      <View>
        <Text
          style={{
            borderRadius: 12,
            backgroundColor: COLORS.white,
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.black,
            padding: 20,
          }}>
          Plans & Subscriptions
        </Text>
      </View>
      <Carousel
        layout="default"
        // layoutCardOffset={0} // Adjust gap between cards
        ref={isCarousel}
        data={[1]}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        loop={false}
        activeSlideAlignment="center" // Align active slide to the start
        inactiveSlideScale={1} // Prevent scaling of inactive slides
        inactiveSlideOpacity={1} // Prevent opacity change of inactive slides
      />
    </SafeAreaView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  settingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    alignItems: 'center',
  },
  subscribeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
