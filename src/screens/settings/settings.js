import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotificationSwitch = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
    // setIsNotificationEnabled(previousState => !previousState);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const toggleDropdown = () => {
    setIsExpanded(prevState => !prevState);
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

  return (
    <SafeAreaView>
      <ScrollView>
        <BackHeader />

        <View style={styles.settingContainer}>
          <Text style={styles.referText}>SETTINGS</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>All Sports Notifications </Text>
            <Switch
              trackColor={{ false: COLORS.new_gray, true: COLORS.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotificationSwitch}
              value={isNotificationEnabled}
            // disabled
            />
          </View>
          {/* <View style={styles.separator} /> */}

          {/* <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={toggleDropdown}>
            <Text style={styles.settingText}>
              Notification of Only Selected Sports
            </Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.subitemsContainer}>
              <View style={styles.subitem}>
                <View style={styles.subitemFlex}>
                  <Image
                    source={require('../../assets/images/boxing.png')}
                    style={styles.sportIcon}
                  />
                  <Text style={styles.subitemText}>Boxing</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={styles.subitem}>
                <View style={styles.subitemFlex}>
                  <Image
                    source={require('../../assets/images/badminton.png')}
                    style={styles.referIcon}
                  />
                  <Text style={styles.subitemText}>Badminton</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={styles.subitem}>
                <View style={styles.subitemFlex}>
                  <Image
                    source={require('../../assets/images/kayak.png')}
                    style={styles.referIcon}
                  />
                  <Text style={styles.subitemText}>Kayak</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={styles.subitem}>
                <View style={styles.subitemFlex}>
                  <Image
                    source={require('../../assets/images/swimming.png')}
                    style={styles.referIcon}
                  />
                  <Text style={styles.subitemText}>Swimming</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={styles.subitem}>
                <View style={styles.subitemFlex}>
                  <Image
                    source={require('../../assets/images/tabletennis.png')}
                    style={styles.referIcon}
                  />
                  <Text style={styles.subitemText}>Table tennis</Text>
                </View>
                <View>
                  <Switch
                    trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={styles.separator} /> */}
          {/* <View style={styles.settingItem}>
            <Text style={styles.settingText}>
              Notifications of Only My Favourites
            </Text>
            <Switch
              trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>
              Notifications of Only My Favourites
            </Text>
            <Switch
              trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>
              Notifications & Updates on Whatsapp
            </Text>
            <Switch
              trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>
              Notification of Only Medals & Records
            </Text>
            <Switch
              trackColor={{false: COLORS.new_gray, true: COLORS.primary}}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}
        </View>

        <View style={styles.langContainer}>
          <View style={styles.langSection}>
            <Image
              source={require('../../assets/icons/referIcon.png')}
              style={styles.referIcon}
            />
            <Text style={styles.referText}>LANGUAGE - English</Text>
          </View>
          <TouchableOpacity disabled>
            <Text style={styles.editLang}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.langContainer}>
          <View style={styles.langSection}>
            <Text style={styles.referText}>Light Mode | Dark Mode</Text>
          </View>

          <Switch
            trackColor={{ false: COLORS.new_gray, true: COLORS.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled
          />
        </View>

        <View style={styles.langContainer}>
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
              {/* <Icon name="delete" size={20} color={COLORS.red} /> */}
              <Text style={[styles.referText, { color: COLORS.red }]}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

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
  settingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subitemsContainer: {},
  sportIcon: {
    width: 36,
    height: 36,
  },
  subitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  subitemFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subitemText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  langContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  langSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  editLang: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
