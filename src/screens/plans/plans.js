import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import React, {useEffect,useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';
import Carousel from 'react-native-snap-carousel';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {requestPurchase, withIAPContext,getProducts,initConnection} from 'react-native-iap';
//import * as RNIap from 'react-native-iap';
import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';








const SLIDER_WIDTH = Dimensions.get('window').width + 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.86);

const subscriptionSkus = Platform.select({
  ios: ["indiasportshub_premium"],
});

// const product = {
//   productId: 'indiasportshub_2024',
//   productName: 'Premium',
//   subscriptionOfferDetails: [{ offerToken: 'example_offer_token' }],
// };

const appStore_secret = 'd632489915314138829443cb5197f5dc';




const Plans = () => {
  const navigation = useNavigation();
  const isCarousel = React.useRef(null);
  const [loading, setLoading] = useState(false);


  const purchaseUpdateSubscriptionRef = useRef(null);
  const purchaseErrorSubscriptionRef = useRef(null);

  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();


  // let deepLink = 'abc://auth';

  const getDeepLink = (path = '') => {
    const scheme = 'https';
    const prefix =
      Platform.OS == 'android' ? `${scheme}://indiasportshub.com/` : `${scheme}://`;
    return prefix + path;
  };

 


  useEffect(() => {
    getSubscriptions({skus:        ['indiasportshubpremium', ],}).catch(
      e => console.log('[IAP] Error loading subscriptions', e),
    );

    console.log("subscriptions", subscriptions)
  }, [getSubscriptions]);



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

  const getItems = async () => {
    const itemSubs = Platform.select({
      ios: ['indiasportshubpremium', "indiasportshub_premium"],
      android: ['your_product_id'],
    });

    try {
      console.log("Fetching products...");
      console.log("SKUs:", itemSubs);

      // Use getSubscriptions for subscriptions
      const products = await RNIap.getSubscriptions({skus:itemSubs});

      console.log('Products fetched:', products);

      products.forEach(product => {
        console.log("Product details:", product.title, product.price, product.description);
      });

    } catch (error) {
      console.error("Error fetching products:", error);
    }
};

const handleBuySubscription = async (productId) => {
    try {
      const connection = await RNIap.initConnection();
      console.log('IAP connection result:', connection);

      if (connection) {
       // await getItems();
      } else {
        console.warn("IAP connection failed.");
      }

    } catch (error) {
      console.error("IAP connection error:", error);
    }
};

  // Example usage
  useEffect(() => {
   //r handleBuySubscription();
  }, []);
  

  // useEffect(() => {
  //   const initializeIAP = async () => {
  //     try {
  //       await initConnection();
  //       await flushFailedPurchasesCachedAsPendingAndroid();

  //       purchaseUpdateSubscriptionRef.current = purchaseUpdatedListener(
  //         async (purchase) => {
  //           console.log('purchaseUpdatedListener', purchase);
  //           const receipt = purchase.transactionReceipt;
  //           if (receipt) {
  //             try {
  //               const deliveryResult = await yourAPI.deliverOrDownloadFancyInAppPurchase(
  //                 receipt,
  //               );

  //               if (isSuccess(deliveryResult)) {
  //                 await finishTransaction({ purchase, isConsumable: true });
  //               } else {
  //                 // Handle failure or fraud
  //               }
  //             } catch (error) {
  //               console.error('Error handling purchase', error);
  //             }
  //           }
  //         },
  //       );

  //       purchaseErrorSubscriptionRef.current = purchaseErrorListener(
  //         (error) => {
  //           console.warn('purchaseErrorListener', error);
  //         },
  //       );
  //     } catch (error) {
  //       console.error('Error initializing in-app purchases', error);
  //     }
  //   };

  //   initializeIAP();

  //   return () => {
  //     if (purchaseUpdateSubscriptionRef.current) {
  //       purchaseUpdateSubscriptionRef.current.remove();
  //       purchaseUpdateSubscriptionRef.current = null;
  //     }

  //     if (purchaseErrorSubscriptionRef.current) {
  //       purchaseErrorSubscriptionRef.current.remove();
  //       purchaseErrorSubscriptionRef.current = null;
  //     }
  //   };
  // }, []);

  const purchase = async (sku) => {
    try {
      let purchaseParams = {
        sku:'indiasportshub_2024',
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      };
      if (Platform.OS === 'android') {
        purchaseParams = { skus: [sku] };
      }
      await requestPurchase(purchaseParams);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const subscribe = async (sku, offerToken = null) => {
    try {
      await requestPurchase({ sku:'indiasportshub_2024' });
  } catch (error) {
    console.log('error',error)
      alert('Error occurred while making purchase')
  }
  finally {
      // setLoading(false);
  }
    // try {
    //   const subscriptionParams = {
    //     sku,
    //     ...(offerToken && { subscriptionOffers: [{ sku, offerToken }] }),
    //   };
    //   await requestSubscription(subscriptionParams);
    // } catch (err) {
    //   console.warn(err.code, err.message);
    // }
  };
  const initiatePaymentIAP = async () => {
    alert('hjbjh')
  }

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
          {/* <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => handleBuySubscription('indiasportshubpremium')}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  };

  const rupeeSymbol = '\u20B9';

  return (
    <SafeAreaView>
      <BackHeader />
      <View style={{ marginTop: 10 }}>
            {subscriptions.map((subscription, index) => {
              const owned = purchaseHistory.find(
                (s) => s?.productId === subscription.productId,
              );
              console.log("subscriptions", subscription?.productId);
              return (
                <Text>jkbnkjb</Text>
                // <View style={styles.box} key={index}>
                //   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                //     <>
                //       <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                //     </>
                //   )}
                //   <View
                //     style={{
                //       flex: 1,
                //       flexDirection: "row",
                //       justifyContent: "space-between",
                //       marginTop: 10,
                //     }}
                //   >
                //     <Text
                //       style={{
                //         paddingBottom: 10,
                //         fontWeight: "bold",
                //         fontSize: 18,
                //         textTransform: "uppercase",
                //       }}
                //     >
                //       {subscription?.title}
                //     </Text>
                //     <Text
                //       style={{
                //         paddingBottom: 20,
                //         fontWeight: "bold",
                //         fontSize: 18,
                //       }}
                //     >
                //       {subscription?.localizedPrice}
                //     </Text>
                //   </View>
                //   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                //     <Text>
                //       Free for 1{" "}
                //       {subscription?.introductoryPriceSubscriptionPeriodIOS}
                //     </Text>
                //   )}
                //   <Text style={{ paddingBottom: 20 }}>
                //     {subscription?.description}
                //   </Text>
                //   {owned && (
                //     <Text style={{ textAlign: "center", marginBottom: 10 }}>
                //       You are Subscribed to this plan!
                //     </Text>
                //   )}
                 
                //   {loading && <ActivityIndicator size="large" />}
                //   {!loading && !owned && isIos && (
                //     <TouchableOpacity
                //       style={styles.button}
                //       onPress={() => {
                //         setLoading(true);
                //         handleBuySubscription(subscription.productId);
                //       }}
                //     >
                //       <Text style={styles.buttonText}>Subscribe</Text>
                //     </TouchableOpacity>
                //   )}
                // </View>
              );
            })}
          </View>
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
