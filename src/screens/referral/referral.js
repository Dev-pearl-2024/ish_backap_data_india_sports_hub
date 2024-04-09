import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';

const Referral = () => {
  const navigation = useNavigation();

  const referralText = 'SAN000000';

  const handleCopy = async () => {
    try {
      await Clipboard.setString(referralText);
      Alert.alert('Copied to Clipboard', 'Referral code copied successfully');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={{width: '33%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '33%',
            alignItems: 'center',
          }}>
          <LogoIcon />
        </View>

        <View style={styles.noticification}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchIcon style={{marginRight: 24}} />
            <NoticificationIcon />
          </View>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('user-profile')}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../../assets/images/profileImg.png')}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>SANKALP MISHRA</Text>
                <Image
                  source={require('../../assets/icons/checkmark.png')}
                  style={styles.checkmarkIcon}
                />
              </View>
              <Text style={styles.emailAddress}>Sankalp89mishra</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.premiumContainer}>
          <View style={styles.premiumSection}>
            <Image
              source={require('../../assets/icons/premium-icon.png')}
              style={styles.badgeIcon}
            />
            <Text style={styles.premiumText}>
              Premium User Expires on 01/12/2024
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.referContainer}>
        <Text style={styles.referText}>
          Refer a Friend/Relative. If they also become a Premium Member, you get
          additional 1 month of Premium membership added to you.
        </Text>

        <View style={styles.copyContainer}>
          <View style={styles.copyInnerSection}>
            <Text style={styles.copyText}>Referral code – SAN000000</Text>
            <TouchableOpacity onPress={handleCopy}>
              <Image
                source={require('../../assets/icons/copy-icon.png')}
                style={styles.copyIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Image
              source={require('../../assets/icons/share-icon.png')}
              style={styles.shareIcon}
            />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copySeparator} />


        <TouchableOpacity style={styles.referralBtn} onPress={() => {navigation.navigate("referral-list")}}>
          <Text style={styles.referralBtnText}>My Referrals</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Referral;

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
    borderRadius: 15,
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
  referContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  referSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  copyInnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.light_gray,
    padding: 15,
  },
  copyText:{
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    marginLeft: 10,
  },
  shareText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.white,
  },
  copyIcon: {
    marginHorizontal: 3,
  },
  copySeparator: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  referralBtn: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 200,
    marginTop: 30,
    marginLeft: 10,
  },
  referralBtnText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center'
  }
});
