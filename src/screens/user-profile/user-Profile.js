import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';

const UserProfile = () => {
  const navigation = useNavigation();

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
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/profileImg.png')}
              style={styles.profileImage}
              resizeMode="cover"
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

      <View style={styles.navigationContainer}>
        <View style={styles.navigationItem}>
          <Text
            style={{...styles.navigationItemText, color: COLORS.light_gray}}>
            Age:
          </Text>
          <Text style={styles.navigationItemText}>32</Text>
        </View>
        <View style={styles.navigationItem}>
          <Text
            style={{...styles.navigationItemText, color: COLORS.light_gray}}>
            Gender:
          </Text>
          <Text style={styles.navigationItemText}>Male</Text>
        </View>
        <View style={styles.navigationItem}>
          <Text
            style={{...styles.navigationItemText, color: COLORS.light_gray}}>
            Email id:
          </Text>
          <Text style={styles.navigationItemText}>Sankalpabc@gmail.com</Text>
        </View>
        <View style={styles.navigationItem}>
          <Text
            style={{...styles.navigationItemText, color: COLORS.light_gray}}>
            Phone Number:
          </Text>
          <Text style={styles.navigationItemText}>9953558983</Text>
        </View>
        <View style={styles.navigationItem}>
          <Text
            style={{...styles.navigationItemText, color: COLORS.light_gray}}>
            Location:
          </Text>
          <Text style={styles.navigationItemText}>India, Delhi</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.settingContainer}
      onPress={() => navigation.navigate('settings')}>
        <View style={styles.settingSection}>
          <Image
            source={require('../../assets/icons/settingIcon.png')}
            style={styles.referIcon}
          />
          <Text style={styles.referText}>Settings</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserProfile;

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
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
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
    marginTop: 5,
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
    marginBottom: 2,
  },
  emailAddress: {
    textAlign: 'center',
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
    flexDirection: 'row',
  },
  navigationItemText: {
    marginLeft:5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  settingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  settingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
