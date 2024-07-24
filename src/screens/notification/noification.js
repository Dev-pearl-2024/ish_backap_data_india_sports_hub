import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const data = [
  {
    title: 'This is a dummy noticification.',
    event: 'Event Name.',
  },
  {
    title: 'This is a dummy noticification.',
    event: 'Event Name.',
  },
];
export default function Notification() {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
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
        url: `http://15.206.246.81:3000/notification/get-previous/${userId}`,
      });
      setLoading(false);
      setNotificationList(response?.data?.data || []);
    } catch (error) {
      console.log(error, 'erro');
      setLoading(false);
      throw new Error('Failed to get referral data');
    }
  };
  return (
    <View>
      <BackHeader />
      <Text style={styles.titleText}>Notifications</Text>
      {notificationList.map((item, index) => {
        return (
          <TouchableOpacity
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
                source={{uri: item.banner}}
                defaultSource={require('../../assets/images/notification.png')}
                style={{width: 60, height: 60, borderRadius: 50}}
              />
            </View>
            <View>
              <Text
                style={{color: COLORS.black, fontSize: 14, fontWeight: 700}}>
                {item.title}
              </Text>
              <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                {item.body}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
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
