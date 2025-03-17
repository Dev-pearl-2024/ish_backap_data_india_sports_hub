import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import User from "../../assets/icons/user.svg"
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/BlueLogo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import dynamicSize from '../../utils/DynamicSize';
import { Snackbar } from 'react-native-paper';
import RecordTable from '../../components/allsportsComponents/records/recordsTable';

const Sidebar = ({ route }) => {
  const navigation = useNavigation();

  const handleNavigation = screen => {
    switch (screen) {
      case 'sports':
        navigation.navigate('all-sports');
        break;
      case 'tournament':
        navigation.navigate('all-tournament');
        break;
      case 'records':
        navigation.navigate('all-record-index');
        break;
      case 'all-ranking-index':
        navigation.navigate('all-ranking-index');
        break;
      case 'archives':
        navigation.navigate('all-archieve');
        break;
      case 'favorites':
        navigation.navigate('Favorite');
        break;
      case 'calendar':
        navigation.navigate('calendar-index');
        break;
      case 'admin':
        navigation.navigate('admin-panel');
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("userId", "67d7b272ca1bdc59c37acc3a")
      navigation.navigate('Home');
      // Navigate to the login screen or perform any other action after logout
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    } finally {
      await AsyncStorage.setItem("userId", "67d7b272ca1bdc59c37acc3a")
      navigation.navigate('Home');
    }
  };

  const handleLogIn = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    } finally {
      navigation.navigate('Login');
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [purchaseData, setPuchaseData] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [accessToken, setAccessToken] = useState(null)

  const isFocused = useIsFocused();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const getUserData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      setIsLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/users/${userId}`,
      });
      setUserData(res?.data?.existing);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserData();
      // if(route?.params?.purchase){
      //   navigation.navigate('plans', setPuchaseData);
      // }
    }
  }, [isFocused]);

  useEffect(() => {
    if (purchaseData) {
      sendReceiptToBackend(purchaseData)
    }
  }, [purchaseData]);

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }
  useEffect(() => {
    getStoreData()
  }, [])

  const sendReceiptToBackend = async (purchase) => {
    try {
      setIsLoading(true);
      // Extract the first purchase object
      let receiptData = {};

      if (purchase?.transactionId) {
        receiptData = purchase
      } else {
        receiptData = purchase[0]

      }
      console.log("Receipt Data:", receiptData);

      // Parse the transactionReceipt field into a JSON object
      const transactionReceipt = typeof receiptData == 'string' ? JSON.parse(receiptData.transactionReceipt) : receiptData;

      // Retrieve the user ID from AsyncStorage
      const userID = await AsyncStorage.getItem('userId');
      if (!userID) throw new Error("User ID is missing");

      // Prepare the request body
      let _body = {
        userId: userID,
        amount: 10000, // Add the appropriate amount
        status: 'SUCCESS', // Add the appropriate status
        pgTransactionId: receiptData.transactionId, // Use the transactionId
        pgDataDump: transactionReceipt, // Parsed transactionReceipt
        platform: Platform.OS, // Current platform (iOS or Android)
      };

      // Send the receipt to the backend
      const response = await axios.post(
        'https://prod.indiasportshub.com/transaction',
        _body
      );

      console.log('response of success', response)
      setIsLoading(false);
      Alert.alert('Congratulations', 'Your subscription purchase was successful.')
      getUserData();
      handleReferralCodeSubmit();
      console.log("Response from Backend:", response.data);
      // Handle additional actions based on the response if needed
    } catch (error) {
      setIsLoading(false);
      console.error("Error in sendReceiptToBackend:", error.message);
    }
  };

  const handleReferralCodeSubmit = async () => {
    // Here you can perform validation or additional checks on the referral code
    // if (referralCode.trim() === '') {
    //   Alert.alert('Please enter a referral code.');
    //   return;
    // }
    let userId = await AsyncStorage.getItem('userId');
    let referralCode = await AsyncStorage.getItem('referralCode');

    if (!referralCode) {
      return
    }

    const response = await axios({
      method: 'POST',
      url: `https://prod.indiasportshub.com/users/use-referral-code/${userId}/${referralCode}`,
    });

    console.log('referral api', response)

    // if (response?.data?.data && response?.data?.data?.isInvalid) {
    //   Alert.alert('Something went wrong', response?.data?.data?.text);
    //   return;
    // }
  };

  const renderPremiumContainer = () => {
    const isPremiumUser = userData.isPremiumUser;

    const date = moment(userData?.subscriptionDetails?.endDate).format(
      'YYYY-MM-DD',
    );

    const text = isPremiumUser
      ? `Premium User Expires on ${date}`
      : 'Upgrade to Premium in just - 99₹';

    const performAction = () => {

      if (isPremiumUser) {
        onToggleSnackBar();
      } else {
        navigation.navigate('plans');
        // navigation.navigate('Result');
      }

    };
    return (
      <>
        {!isPremiumUser && <TouchableOpacity
          style={[
            styles.premiumContainer,
            isPremiumUser ? {} : { backgroundColor: COLORS.primary },
          ]}
          onPress={performAction}>
          <View style={styles.premiumSection}>
            <Image
              source={require('../../assets/icons/premium-icon.png')}
              style={styles.badgeIcon}
            />
            <Text
              style={[
                styles.premiumText,
                isPremiumUser ? {} : { color: COLORS.white },
              ]}>
              {text}
            </Text>
          </View>
        </TouchableOpacity>}
        {!accessToken && <TouchableOpacity
          style={[
            styles.premiumContainer,
            isPremiumUser ? {} : { backgroundColor: COLORS.primary },
          ]}
          onPress={()=> navigation.navigate("Login")}>
          <View style={styles.premiumSection}>
            {/* <Image
              source={require('../../assets/icons/premium-icon.png')}
              style={styles.badgeIcon}
            /> */}
            <Text
              style={[
                styles.premiumText,
                isPremiumUser ? {} : { color: COLORS.white },
              ]}>
              {"Login"}
            </Text>
          </View>
        </TouchableOpacity>}
      </>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <BackHeader />
        <ScrollView style={{ marginBottom: 10 }}>
          {isLoading ? <ActivityIndicator size={"large"} color={COLORS.primary} /> : <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => accessToken ? navigation.navigate('user-profile') : navigation.navigate('Login')}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  {userData?.image ? <Image
                    source={{ uri: userData?.image }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  /> :
                    <User width={dynamicSize(40)} height={dynamicSize(40)} />
                  }
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.profileName}>
                      {userData?.firstName} {userData?.lastName}
                    </Text>
                    {userData.isPremiumUser && (
                      <Image
                        source={require('../../assets/icons/checkmark.png')}
                        style={styles.checkmarkIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.emailAddress}>{userData?.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator size={"large"} color={COLORS.primary} /> : renderPremiumContainer()}
          </View>}

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('sports')}>
              <Text style={styles.navigationItemText}>All Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('tournament')}>
              <Text style={styles.navigationItemText}>Tournaments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('records')}>
              <Text style={styles.navigationItemText}>Records</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('all-ranking-index')}>
              <Text style={styles.navigationItemText}>Rankings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('archives')}>
              <Text style={styles.navigationItemText}>Archives</Text>
            </TouchableOpacity>
            {accessToken && <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('favorites')}>
              <Text style={styles.navigationItemText}>My Favourites</Text>
            </TouchableOpacity>}
            {!isLoading &&
              (userData && userData.userType !== "user" && <TouchableOpacity
                style={styles.navigationItem}
                onPress={() => handleNavigation('admin')}>
                <Text style={styles.navigationItemText}>Access Admin Panel</Text>
              </TouchableOpacity>)}
          </View>

          <View style={styles.referContainer}>
            <TouchableOpacity
              onPress={() => {
                accessToken ? navigation.navigate('referral') : navigation.navigate('Login')
              }}>
              <View style={styles.referSection}>
                <Image
                  source={require('../../assets/icons/referIcon.png')}
                  style={styles.referIcon2}
                />
                <Text style={styles.referText}>Refer a Friend & Win</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.referContainer}>
            <TouchableOpacity>
              <View style={styles.referSection}>
                <Text style={styles.referText}>Follow Us</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.indiasportshub.com')
                  }>
                  <Image
                    source={require('../../assets/social-icons/BrandLogo.jpg')}
                    style={styles.socialIcons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.instagram.com/indiasportshub?utm_source=qr&igsh=YnV5eHRjM3gzNDVq',
                    )
                  }>
                  <Image
                    source={require('../../assets/social-icons/Instagram.jpeg')}
                    style={styles.socialIcons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.linkedin.com/company/indiasportshub/',
                    )
                  }>
                  <Image
                    source={require('../../assets/social-icons/LinkedIn.jpeg')}
                    style={styles.socialIcons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://x.com/IndiaSportsHub?t=TtaVB1GqczjOhZq-TyUL8w&s=09',
                    )
                  }>
                  <Image
                    source={require('../../assets/social-icons/Twitter.jpeg')}
                    style={styles.socialIcons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://youtube.com/@indiasportshub?si=pvk5CtY-jgxpO610',
                    )
                  }>
                  <Image
                    source={require('../../assets/social-icons/Youtube.jpeg')}
                    style={styles.socialIcons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.referContainer}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('referral');
                // console.log
                Linking.openURL(Platform.OS == 'ios' ? 'https://apps.apple.com/us/app/indiasportshub/id6739810010' : 'https://play.google.com/store/apps/details?id=com.indiasportshub')

              }}>
              <View style={styles.referSection}>
                <Text style={styles.referText}>Rate the App</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.referContainer2}>
            {
              accessToken ? <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}>
                <View style={styles.referSection}>
                  <Image
                    source={require('../../assets/icons/logout.png')}
                    style={styles.referIcon2}
                  />
                  <Text style={styles.referText}>Log Out</Text>
                </View>
              </TouchableOpacity> : <TouchableOpacity
                onPress={() => {
                  handleLogIn();
                }}>
                <View style={styles.referSection}>
                  <Image
                    source={require('../../assets/icons/logout.png')}
                    style={styles.referIcon2}
                  />
                  <Text style={styles.referText}>Log in</Text>
                </View>
              </TouchableOpacity>
            }

          </View>

          {/* <View style={styles.referContainer2}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Alert',
                  'Are you sure you want to delete your account? Your account will enter a cooling period of 15 days, after which all your data will be permanently deleted.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: handleLogout,
                      style: 'destructive',
                    },
                  ],
                  { cancelable: true }
                );
              }}>
              <View style={styles.referSection}>
              <Image
                  source={require('../../assets/icons/delete.png')}
                  style={styles.referIcon2}
                />                
                <Text style={[styles.referText,{color:COLORS.red}]}>Delete Account</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          You are already on a premium plan.
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },
  profileContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkmarkIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  emailAddress: {
    fontSize: 12,
    color: COLORS.light_gray,
  },
  premiumContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 50,
    padding: 15,
    borderColor: COLORS.primary,
  },
  premiumSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    width: 22,
    height: 22,
  },
  premiumText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  navigationContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  navigationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  navigationItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  referContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  referContainer2: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginTop: 0,
  },
  referSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  referIcon2: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  socialIcons: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 15
  },
});
