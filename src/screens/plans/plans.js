import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../constants/Colors";
import Carousel from "react-native-snap-carousel";
import {
  requestSubscription,
  initConnection,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  getSubscriptions,
  finishTransaction,
  useIAP,
  getProducts,
  acknowledgePurchaseAndroid
} from "react-native-iap";
import ReferralCodeModal from "../../components/Popup/ReferralSignup";
import dynamicSize from "../../utils/DynamicSize";

const SLIDER_WIDTH = Dimensions.get("window").width + 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.86);
const {width,height} = Dimensions.get('screen')

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
  // 'Highlight reels',
  // 'Live commentary by experts',
];

var _subscriptions = [];

const Plans = ({ route }) => {
  const navigation = useNavigation();
  const isCarousel = useRef(null);
  const isInitialized = useRef(false);  // Flag to track IAP initialization
 // const [subscriptions, setSubscriptions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)


  console.log('route', route?.params)

  const subscriptionSkus = Platform.select({
    ios: ["indiasportshubpremium"],
    android: ["indiasportshubpremium"],
  });

  // Initialize IAP connection
  useEffect(() => {
    const initializeIAP = async () => {
      if (!isInitialized.current) {  // Ensure initialization happens only once
        try {
          const result = await initConnection();
          if (result) {
            console.log("IAP initialized successfully.", result);
            if (Platform.OS === "android") {
              await flushFailedPurchasesCachedAsPendingAndroid();
            }
            await fetchSubscriptions();
            isInitialized.current = true; // Mark as initialized
          }
        } catch (error) {
          console.error("Error initializing IAP:", error);
        }
      }
    };

    initializeIAP();

    return () => {
      endConnection();
    };
  }, []); // Empty dependency array to ensure this runs once

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    // //for ios
    // try {
    //   const requestPayload = {
    //     sku: 'indiasportshubpremium',
    //     ...({ subscriptionOffers: [{ subscriptionSkus}] }),
    //   };

    //   let ok = await requestSubscription(requestPayload);
    //   console.log('ok',ok)
    // } catch (err) {
    //   const { code, message } = err;
    //   console.warn(code, message);
    // }




    //for android
    try {
      const subs = await getSubscriptions({ skus: subscriptionSkus });
      const tempProduct = await getProducts({ skus: subscriptionSkus })
      _subscriptions = subs;
      setLoading(false)
      // setSubscriptions(subs);
      console.log("[IAP] Subscriptions fetched successfully 222", typeof subs, JSON.stringify(tempProduct));
      console.log("[IAP] Subscriptions fetched successfully", typeof subs, JSON.stringify(subs));
    } catch (err) {
      alert("Alert! Facing issue while fetching the plan. Please contact to support team for further help.")
      setLoading(false)
      console.error("[IAP] Error loading subscriptions:", err);
    }
  };

  // Handle purchases
  // const { currentPurchase } = useIAP();
  const {subscriptions,}= useIAP()
  const currentPurchase = null;

  console.log("=========================subscripiton", subscriptions)

  // useEffect(() => {
  //   if (currentPurchase && !isProcessing) {
  //     setIsProcessing(true);
  //     handleTransaction(currentPurchase);
  //   }
  // }, [currentPurchase, isProcessing]);

  const handleTransaction = async (purchase) => {
    if (isProcessing) return;  // Prevent processing if already handling

    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        console.log("Transaction receipt:", receipt);
        await finishTransaction({ purchase, isConsumable: false });
        console.log("Transaction finished successfully");
      } catch (error) {
        console.error("Error processing transaction:", error);
      } finally {
        setIsProcessing(false);  // Reset processing state
      }
    }
  };

  const handleBuySubscriptions = async () => {
    // if (!subscriptions || subscriptions.length === 0) {
    //   console.log("No subscriptions available.");
    //   return;
    // }

    if (!_subscriptions || _subscriptions.length === 0) {
      console.log("No subscriptions available.");
      return;
    }

    const subscription = _subscriptions[0];
    const offerToken =
      Platform.OS === "android"
        ? subscription?.subscriptionOfferDetails?.[1]?.offerToken
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
      if (purchaseData) {
        // setIsSuccessfullRecipt(true)
        // endConnection()
        // sendReceiptToBackend(purchaseData);
        // route?.params(purchaseData)
        // navigation.goBack();
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'Result', params: purchaseData }],
        // });
        // navigation.('Result',purchaseData)
       
        navigation?.reset({
          index: 0,
          routes: [{ name: 'Result', params: { purchaseData } }],
        });
      }
      // navigation.goBack();
    } catch (err) {
      // alert('There was an error while buying the subscription, please contact to support for further detais');
      console.error("Subscription error:", err);
    }
  };

  const sendReceiptToBackend = async (purchase) => {
    const userID = await AsyncStorage.getItem('userId');

    console.log('purchase==>>', purchase)

    let _body = {
      userId: userID,
      amount: 200,
      status: 'Success',
      pgTransaction: '1234123123',
      pgDataDump: {},
      platform: Platform.OS
    }

    console.log('_body', _body)

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

  const renderCarouselItem = ({ item, index }) => (
    <ScrollView contentContainerStyle={{ paddingBottom: dynamicSize(150) }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={require("../../assets/icons/premium-icon.png")} />
          <Text style={styles.headerText}>Premium Member</Text>
        </View>
        <TouchableOpacity
          // onPress={()=>handleBuySubscriptions()}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.subscriptionBox}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹</Text>
              <Text style={styles.price}>99</Text>
            </View>
            <Text style={styles.priceDescription}>Per Annum</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginBottom: 80 }}>
          {listItems.map((data, index) => {
            return (
              <View
                key={index}
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
        {/* {!modalVisible && <TouchableOpacity
              onPress={()=>setModalVisible(true)}
              style={[styles.ReferralBtn]}>
                <Text style={{color:COLORS.primary}}>Add Referral</Text>
            </TouchableOpacity>} */}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView>
      <ReferralCodeModal modalVisible={modalVisible} setModalVisible={setModalVisible} payment={handleBuySubscriptions} />
      <View>
        <Text style={styles.title}>Plans & Subscriptions</Text>
      </View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={[1]}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        loop={false}
        activeSlideAlignment="center"
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      {loading &&
      <View style={styles.absoluteWrapper}>
        <ActivityIndicator color={COLORS.white} size={'large'} />
      </View>
}
    </SafeAreaView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  title: {
    borderRadius: 12,
    backgroundColor: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    padding: 20,
  },
  absoluteWrapper:{width,height,
    backgroundColor:'rgba(0,0,0,0.5)',
    position:'absolute',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  card: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginLeft: 5,
  },
  ReferralBtn: {
    marginTop: 48,
    width: '90%',
    alignSelf: 'center',
    height: 52,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    color: COLORS.primary,
    borderWidth:1,
    borderColor:COLORS.primary
  },
  subscriptionBox: {
    flexDirection: "column",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: COLORS.primary,
    width: "30%",
  },
  priceContainer: {
    flexDirection: "row",
    gap: 5,
  },
  price: {
    fontSize: 35,
    fontWeight: "bold",
    color: COLORS.black,
  },
  priceDescription: {
    color: COLORS.light_gray,
  },
});
