import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Platform,
  Alert,
  Linking,
  InteractionManager,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LatestNews from '../../components/HomeComponents/LatestNews';
import LatestInterNation from '../../components/HomeComponents/LatestInterNation';
import LatestDomestic from '../../components/HomeComponents/LatestDomestic';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import iconData from '../../data/sportsDataSmall.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HandleLogout from '../../utils/HandleLogout.js';
import messaging from '@react-native-firebase/messaging';
import dynamicSize from '../../utils/DynamicSize.js';
import UpdateApp from '../updateApp/updateApp.js';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { HomeTour } from '../app-tour/homepage-tour.js';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import guiderMan from '../../assets/images/our-guider.png'
import { RefreshControl } from 'react-native';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [activeTab, setActiveTab] = useState(-1);
  const [sportName, setSportName] = useState('');
  const [internationalData, setInternationalData] = useState([]);
  const [domesticData, setDomesticData] = useState([]);
  const [newinterData, setNewInterData] = useState([]);
  let normalArr = [];
  const isFocused = useIsFocused();
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [userData, setUserData] = useState("")
  const [isUIReady, setIsUIReady] = useState(false);
  const {
    canStart,
    start,
    stop,
    eventEmitter,
  } = useTourGuideController()

  useEffect(() => {
    // Listen for foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    const unsubscribeOnInitial = messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        setTimeout(() => {
          if (remoteMessage) {
            if (remoteMessage?.data?.notification_type == 'TOURNAMENT') {
              navigation.navigate('all-tournament');
            }
            if (remoteMessage?.data?.notification_type == 'ATHLETE') {
              navigation.navigate('athelete-profile', { athleteId: remoteMessage?.data?.notification_data });
            }
            if (remoteMessage?.data?.notification_type == 'RANKING') {
              navigation.navigate('all-ranking-index');
            }
            if (remoteMessage?.data?.notification_type == 'RECORD') {
              navigation.navigate('all-record-index');
            }
            if (remoteMessage?.data?.notification_type == 'NEWS') {
              navigation.navigate('latest-news-view');
            }
            if (remoteMessage?.data?.notification_type == 'EVENT') {
              // navigation.navigate('all-tournament');
            }
            if (remoteMessage?.data?.notification_type == 'SCORE') {
              // navigation.navigate('all-tournament');
            }
          }
        }, 1500);

      });

    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage?.data?.notification_type == 'TOURNAMENT') {
          navigation.navigate('all-tournament');
        }
        if (remoteMessage?.data?.notification_type == 'ATHLETE') {
          navigation.navigate('athelete-profile', { athleteId: remoteMessage?.data?.notification_data });
        }
        if (remoteMessage?.data?.notification_type == 'RANKING') {
          navigation.navigate('all-ranking-index');
        }
        if (remoteMessage?.data?.notification_type == 'RECORD') {
          navigation.navigate('all-record-index');
        }
        if (remoteMessage?.data?.notification_type == 'NEWS') {
          navigation.navigate('latest-news-view');
        }
        if (remoteMessage?.data?.notification_type == 'EVENT') {
          // navigation.navigate('all-tournament');
        }
        if (remoteMessage?.data?.notification_type == 'SCORE') {
          // navigation.navigate('all-tournament');
        }
        // Handle the notification click here
        const { title, body } = remoteMessage.notification;
        console.log(`Notification Title: ${title}, Body: ${body}`);

        // Navigate or perform any desired action based on the notification
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
      unsubscribeOnInitial();
    };
  }, []);

  const getUserDetails = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/users/${userID}`,
      });

      if (response?.data?.message === 'User found successfully') {
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
      }

      setUserData(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Failed get User Details', error);
    }
  };
  const getHomePageData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let userData = await AsyncStorage.getItem('userData') || '{}';
      const { accessToken } = JSON.parse(userData)
      setIsLoading(true);
      const query = {
        status: 'all',
        page: 1,
        limit: 10,
        sportName: sportName,
        from: "homepage"
      }
      if (userId) {
        query.userId = userId
      }

      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/events/homepage/data`,
        params: query,
        headers: {
          'accessToken': accessToken
        }
      });

      if (res.data.status === 409) {
        HandleLogout(navigation)
      }
      setEventData(res.data.data, 'res data');
      setIsLoading(false);
      setFilterLoading(false);
    } catch (e) {
      setIsLoading(false);
      setFilterLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = 'android.permission.POST_NOTIFICATIONS'; // RAW string
      if (Platform.Version >= 33) {
        try {
          const result = await request(permission);
          console.log(result === RESULTS.GRANTED, result, RESULTS.GRANTED)
          if (result === RESULTS.GRANTED) {
          } else {
            Alert.alert(
              '🔔 Notifications Disabled',
              'You’ve turned off notifications. Enable them in settings to stay updated .',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => {
                    if (Platform.OS === 'ios') {
                      openSettings().catch(() => {
                        Alert.alert('Unable to open settings');
                      });
                    } else {
                      Linking.openSettings(); // For Android
                    }
                  },
                },
              ],
              { cancelable: true }
            );
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    }
  };

  useEffect(() => {
    getHomePageData();
  }, [sportName, filterLoading]);

  useEffect(() => {
    if (eventData && eventData?.internationalEvents && eventData?.domasticEvents) {
      const allInterEventData = eventData?.internationalEvents?.map(event => event?.data)
      const allDomesticEventData = eventData?.domasticEvents?.map(event => event?.data)

      setInternationalData(allInterEventData);
      setDomesticData(allDomesticEventData);

      allInterEventData.forEach(interEvent => {
        interEvent?.map(data => {
          if (!normalArr.includes(data.sport)) {
            normalArr.push(data.sport);
          }
        });
      });

      allDomesticEventData.forEach(domesticEvent => {
        domesticEvent?.map(data => {
          if (!normalArr.includes(data.sport)) {
            normalArr.push(data.sport);
          }
        });
      });

      // const mergeDataIcon = normalArr?.map(sport => {
      //   const foundsportName = iconData?.find(
      //     item => item?.name?.toLowerCase() === sport?.toLowerCase()
      //   );
      //   return foundsportName ? { sport, icon: foundsportName.icon } : sport;
      // });

    }
  }, [eventData]);

  useEffect(() => {
    let sportIconsArray = []
    iconData?.map((item) => {
      sportIconsArray.push({ sport: item.name.toUpperCase(), icon: item.icon })
    });
    setNewInterData(sportIconsArray);
  }, [])

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        BackHandler.exitApp();
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);

  useEffect(() => {
    getUserDetails()
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestNotificationPermission();
    }, 10000)

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (canStart) {
      start()
    }
  }, [canStart])

  const handleOnStart = () => console.log('start')
  const handleOnStop = () => console.log('stop')
  const handleOnStepChange = () => console.log(`stepChange`)

  useEffect(() => {
    eventEmitter.on('start', handleOnStart)
    eventEmitter.on('stop', handleOnStop)
    eventEmitter.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter.off('start', handleOnStart)
      eventEmitter.off('stop', handleOnStop)
      eventEmitter.off('stepChange', handleOnStepChange)
    }
  }, [])

  return (
    <View>
      {/* <TourGuideZone
        zone={1}
        text={'This is app header! 🎉'}
        borderRadius={16}
      > */}
      <Header />
      {/* </TourGuideZone> */}
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          onRefresh={() => {
            getHomePageData();
          }}
          refreshing={isLoading}
          colors={[COLORS.primary, COLORS.dark_gray]}
          tintColor="#000"
          title="Refreshing..."
        />}
      >
        {/* <RefreshControl
          onRefresh={() => {
            getHomePageData();
          }}
          refreshing={isLoading}
          colors={['#ff0000']}
          tintColor="#000"
          title="Refreshing..."
        > */}
        {/* <TourGuideZone
          zone={2}
          text={'This is International event cards'}
          borderRadius={16}
        > */}
        <View style={{ flexDirection: 'row' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 6,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={activeTab === -1 ? styles.categoryButton : styles.categoryButtonInactive}
              onPress={() => { setActiveTab(-1), setSportName(''), setFilterLoading(true) }}>
              <Text
                style={
                  activeTab === -1 ? styles.activeText : styles.inactiveText
                }>
                View All
              </Text>
            </TouchableOpacity>
            {newinterData?.map((data, id) => {
              // if (!data) return null
              const { sport, icon } = data
              return (
                <TouchableOpacity
                  key={sport || id}
                  style={
                    activeTab === id
                      ? styles.categoryButton
                      : styles.categoryButtonInactive
                  }
                  onPress={() => {
                    setActiveTab(id)
                    setSportName(sport)
                    setFilterLoading(true)
                  }}
                >
                  {icon ? icon : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {/* </TourGuideZone> */}

        {/* <TourGuideZone
          zone={3}
          text={'This is International event cards'}
          borderRadius={16}
        > */}
        <LatestInterNation
          internationalData={internationalData}
          isLoading={isLoading}
          setInternationalData={setInternationalData}
          userData={userData}
        />
        {/* </TourGuideZone> */}

        {/* <TourGuideZone
          zone={4}
          text={'This is domestic event cards.'}
          borderRadius={16}
        > */}
        <LatestDomestic
          internationalData={domesticData}
          isLoading={isLoading}
          setInternationalData={setDomesticData}
          userData={userData}
        />
        {/* </TourGuideZone> */}
        {/* </RefreshControl> */}
        {/* <TourGuideZone
          zone={5}
          text={'This is domestic event cards.'}
          borderRadius={16}
        > */}
        <LatestNews showTitle={true} limit />
        {/* </TourGuideZone> */}
        <View style={{ height: dynamicSize(100) }} />
      </ScrollView>
      <UpdateApp />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },

  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
  carouselHeadingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
});
