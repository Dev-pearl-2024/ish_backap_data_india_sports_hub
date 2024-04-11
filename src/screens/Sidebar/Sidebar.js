import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
const Sidebar = () => {
  const navigation = useNavigation();

  const handleNavigation = screen => {
    switch (screen) {
      case 'sports':
        navigation.navigate('all-sports');
        break;
      case 'tournament':
        navigation.navigate('AllTournament');
        break;
      case 'records':
        navigation.navigate('AllRecords');
        break;
      case 'ranking':
        navigation.navigate('AllRanking');
        break;
      case 'ranking':
        navigation.navigate('archives');
        break;
      case 'ranking':
        navigation.navigate('favorites');
        break;
      default:
        break;
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

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('sports')}>
          <Text style={styles.navigationItemText}>All Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('tournament')}>
          <Text style={styles.navigationItemText}>All Tournament</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('records')}>
          <Text style={styles.navigationItemText}>All Records</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('ranking')}>
          <Text style={styles.navigationItemText}>All Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('archives')}>
          <Text style={styles.navigationItemText}>All Archives</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => handleNavigation('favourites')}>
          <Text style={styles.navigationItemText}>All Favourites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.referContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('referral');
          }}>
          <View style={styles.referSection}>
            <Image
              source={require('../../assets/icons/referIcon.png')}
              style={styles.referIcon}
            />
            <Text style={styles.referText}>Refer a Friend & Win</Text>
          </View>
        </TouchableOpacity>
      </View>
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
});
