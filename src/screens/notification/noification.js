import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Notification() {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    getNotificationList();
  }, [isFocused]);

  const getNotificationList = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/notification/get-previous/${userId}`,
      });
      setLoading(false);
      setNotificationList(response?.data?.data || []);
    } catch (error) {
      console.log(error, 'erro');
      setLoading(false);
      throw new Error('Failed to get referral data');
    }
  };

  const navigationToPage = (itemType) => {
    if (itemType?.notificationType == 'TOURNAMENT') {
      navigation.navigate('all-tournament');
    }
    if (itemType?.notificationType == 'ATHLETE') {
      navigation.navigate('athelete-profile', { athleteId: itemType?.notification_data });
    }
    if (itemType?.notificationType == 'RANKING') {
      navigation.navigate('all-ranking-index');
    }
    if (itemType?.notificationType == 'RECORD') {
      navigation.navigate('all-record-index');
    }
    if (itemType?.notificationType == 'NEWS') {
      navigation.navigate('latest-news-view');
    }
    if (itemType?.notificationType == 'EVENT') {
      // navigation.navigate('all-tournament');
    }
    if (itemType?.notificationType == 'SCORE') {
      // navigation.navigate('all-tournament');
    }

  }

  return (
    <ScrollView>
      <BackHeader />
      <Text style={styles.titleText}>Notifications</Text>
      {loading ? <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: "5%" }} /> :
        <>
          {notificationList.length === 0 && <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 100 }}>
            <Text style={{ color: COLORS.black }}>No Notification</Text>
          </View>}
          {notificationList.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigationToPage(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 16,
                  marginVertical: 5,
                  backgroundColor: COLORS.white,
                }}>
                <View>
                  <Image
                    source={{ uri: item.banner }}
                    defaultSource={require('../../assets/images/notification.png')}
                    style={{ width: 60, height: 60, borderRadius: 50 }}
                  />
                </View>
                <View>
                  <Text
                    style={{ color: COLORS.black, fontSize: 14, fontWeight: 700 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 14 }}>
                    {item.body}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
  },
});
