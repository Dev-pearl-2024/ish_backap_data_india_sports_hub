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
  getProducts,
  requestSubscription,
  useIAP,
  validateReceiptIos,
  initConnection,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid
} from 'react-native-iap';
import { subscribeToTopic } from '@react-native-firebase/messaging';


const SLIDER_WIDTH = Dimensions.get('window').width + 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.86);



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
  const isAndroid = Platform.OS === 'android'; // check platform is android or not

const [connection, setConnection] = useState(false);// set in-app purchase is connected or not
const subscriptionSkus = Platform.select({
  ios: ["indiasportshubpremium"],
  android:["indiasportshubpremium"]
});


  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();

  const isFetching = useRef(false);


  // console.log(":Subscriotiuon", subscriptions)


  // let deepLink = 'abc://auth';

  const getDeepLink = (path = '') => {
    const scheme = 'https';
    const prefix =
      Platform.OS == 'android' ? `${scheme}://indiasportshub.com/` : `${scheme}://`;
    return prefix + path;
  };


  // {console.log("current ", currentPurchase)}



const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializeIAP = async () => {
      try {
        await initConnection();
        if (isAndroid) await flushFailedPurchasesCachedAsPendingAndroid();
      } catch (error) {
        console.error('Error initializing IAP:', error);
      }
    };

    initializeIAP();

    return () => {
      endConnection();
    };
  }, []);

  // useEffect(() => {

  //   console.log('connected====>>>>>>',connected)
  //   if (connected) {
  //     // getSubscriptions({ skus: subscriptionSkus }).catch((err) =>
  //     //   console.error('[IAP] Error loading subscriptions:', err),
  //     // );
  //   }
  // }, [connected]);

  useEffect(() => {
    console.log('connected====>>>>>>', connected);

    if (connected && !isFetching.current) {
      isFetching.current = true; // Prevent subsequent calls
      getSubscriptions({ skus: subscriptionSkus })
        .then(() => {
          console.log('[IAP] Subscriptions fetched successfully');
        })
        .catch((err) => {
          console.error('[IAP] Error loading subscriptions:', err);
          isFetching.current = false; // Reset on error to allow retry
        });
    }
  }, [connected]);


  useEffect(() => {
    if (currentPurchase && !isProcessing) {
      // setIsProcessing(false);
      handleTransaction(currentPurchase);
    }
  }, [currentPurchase]);

  const handleTransaction = async (purchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        console.log('Transaction receipt:', receipt);

        // Send receipt to the backend
        // await sendReceiptToBackend(purchase);

        // Finish the transaction
        await finishTransaction({ purchase, isConsumable: false });
        console.log('Transaction finished successfully');
      } catch (error) {
        console.error('Error processing transaction:', error);
      } finally {
        // setIsProcessing(false);
      }
    }
  };

  const sendReceiptToBackend = async (purchase) => {
    const userID = await AsyncStorage.getItem('userId');

    console.log('purchase==>>',purchase)
  
    let _body = {
      userId:userID,
      amount:200,
      status:'Success',
      pgTransaction:'1234123123',
      pgDataDump:{},
      platform:Platform.OS
    }

    console.log('_body',_body)

    // try {
    //   const response = await axios({
    //     method: 'POST',
    //     url: `https://prod.indiasportshub.com/transaction`,
    //   });
    //   // console.log(response?.data, 'response from user Details');
    //   if (response?.data?.message === 'User found successfully') {
    //     await AsyncStorage.setItem('userData', JSON.stringify(data.data));
    //   }
    //   setUserData(response.data)
    //   return response.data;
    // } catch (error) {
    //   throw new Error('Failed get User Details', error);
    // }
  };

  const handleBuySubscriptions = async () => {
    if (!subscriptions || subscriptions.length === 0) {
      console.log("No subscriptions available.");
      return;
    }
  
    const subscription = subscriptions[0]; // Assuming you're picking the first subscription
    const offerToken =
      Platform.OS === "android"
        ? subscription?.subscriptionOfferDetails?.[0]?.offerToken
        : null;
  
    if (Platform.OS === "android" && !offerToken) {
      console.error("Offer token is required for Android subscriptions.");
      return;
    }
  
    try {
      const purchaseData = await requestSubscription({
        sku: subscription?.productId,
        ...(offerToken && {
          subscriptionOffers: [{ sku: subscription?.productId, offerToken }],
        }),
      });
  
      console.log("Purchase successful:", purchaseData);
  
      // TODO: Send purchaseData to your backend for verification and storage
    } catch (err) {
      console.error("Subscription error:", err);
    }
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


  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({message: 'handleGetPurchaseHistory', error});
    }
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
          <TouchableOpacity onPress={()=> handleBuySubscriptions(subscriptions)}>


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
          </TouchableOpacity>
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
      <View>
      

      </View>
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
