import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/BlueLogo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
const Sidebar = () => {
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
      navigation.navigate('Login');
      // Navigate to the login screen or perform any other action after logout
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    } finally {
      navigation.navigate('Login');
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const isFocused = useIsFocused();
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
    }
  }, [isFocused]);

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
      }
    };
    return (
      <TouchableOpacity
        style={[
          styles.premiumContainer,
          isPremiumUser ? {} : {backgroundColor: COLORS.primary},
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
              isPremiumUser ? {} : {color: COLORS.white},
            ]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      
      <ScrollView>
        <BackHeader />
        <ScrollView style={{marginBottom: 10}}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('user-profile')}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={
                      userData?.image
                        ? {uri: userData?.image}
                        : require('../../assets/images/profileImg.png')
                    }
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
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
            {renderPremiumContainer()}
          </View>

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
            <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('favorites')}>
              <Text style={styles.navigationItemText}>My Favourites</Text>
            </TouchableOpacity>
            {userData && userData.userType !== "user" && <TouchableOpacity
              style={styles.navigationItem}
              onPress={() => handleNavigation('admin')}>
              <Text style={styles.navigationItemText}>Access Admin Panel</Text>
            </TouchableOpacity>}
          </View>

          <View style={styles.referContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('referral');
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('referral');
              }}>
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
                Linking.openURL('https://play.google.com/store/apps/details?id=com.indiasportshub')

              }}>
              <View style={styles.referSection}>
                <Text style={styles.referText}>Rate the App</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.referContainer2}>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  referContainer2: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginTop: 15,
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
