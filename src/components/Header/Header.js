import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../constants/Colors';
import MenuHumberger from '../../assets/icons/menu-hamburger.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import { useNavigation } from '@react-navigation/native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Header = () => {
  const navigation = useNavigation();
  const [unReadNotification, setUnReadNotification] = useState(0)

  const updateUserLastSeen = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `https://prod.indiasportshub.com/user-activity`,
        data: {
          userId: userId,
          homeNotificationLastSeen: {
            'notification': new Date()
          }
        }
      });
      getUnreadMessageCount()
    } catch (e) {
    }
  }

  const getUnreadMessageCount = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/user-activity/unread/message/count/${userId}`,
      });

      if (response?.data?.unreadChats) {
        setUnReadNotification(response?.data?.unreadNotificationsCount)
        return response?.data?.unreadNotificationsCount
      }
    } catch (error) {
      console.log(error, 'Error:');
    }
  };

  useEffect(() => {
    getUnreadMessageCount()
  })

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={{ width: '33%' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Sidebar');
            }}>
            <MenuHumberger />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{
            width: '33%',
            alignItems: 'center',
          }}>
          <LogoIcon />
        </TouchableOpacity>

        <View style={styles.noticification}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('search');
              }}>
              <SearchIcon style={{ marginRight: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                updateUserLastSeen()
                navigation.navigate('notification');
              }}>
              {unReadNotification > 0 && <View style={{
                position: 'absolute',
                display: 'flex',
                backgroundColor: COLORS.red,
                padding: 3,
                bottom: 10,
                left: 2,
                borderRadius: 100,
                zIndex: 100
              }}>
                <Text style={{ color: COLORS.black, fontSize: 9, fontWeight: '800' }}>
                  {unReadNotification > 99 ? `99+` : unReadNotification}
                </Text>
              </View>}
              <NoticificationIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
    marginTop: -10
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },
});
