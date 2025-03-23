import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LatestNews from '../../components/HomeComponents/LatestNews';
import LatestInterNation from '../../components/HomeComponents/LatestInterNation';
import LatestDomestic from '../../components/HomeComponents/LatestDomestic';
import BlueHockey from '../../assets/icons/sportIcons/BlueHockey.js';
import BlueBasketball from '../../assets/icons/sportIcons/BlueBasketball.js';
import BlueBaseball from '../../assets/icons/sportIcons/BlueBaseball.js';
import BlueFootball from '../../assets/icons/sportIcons/BlueFootball.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageEventRequest } from '../../redux/actions/eventActions.js';
import PreLoader from '../../components/loader/fullLoader.js';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import iconData from '../../data/sportsDataSmall.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HandleLogout from '../../utils/HandleLogout.js';
import messaging from '@react-native-firebase/messaging';
import dynamicSize from '../../utils/DynamicSize.js';
import UpdateApp from '../updateApp/updateApp.js';


const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [activeTab, setActiveTab] = useState(-1);
  const [sportName, setSportName] = useState('');
  const [internationalData, setInternationalData] = useState([]);
  const [domesticData, setDomesticData] = useState([]);
  // Start

  const [newinterData, setNewInterData] = useState([]);
  let normalArr = [];
  // End
  const isFocused = useIsFocused();

  // console.log("internationalData",internationalData)

  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [userData, setUserData] = useState("")

  useEffect(() => {
    getHomePageData();
  }, [sportName, filterLoading]);

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
            console.log('Notification caused app to open from killed state:', remoteMessage);
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

    // Listen for background state notification clicks
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {

        console.log('Notification caused the app to open from background state:', typeof remoteMessage, remoteMessage);

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

    // Cleanup both listeners
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
      // console.log(response?.data, 'response from user Details');
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

      const mergeDataIcon = normalArr?.map(sport => {
        const foundsportName = iconData?.find(
          item => item?.name?.toLowerCase() === sport?.toLowerCase()
        );
        return foundsportName ? { sport, icon: foundsportName.icon } : sport;
      });

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
    getMaster();
    getUserDetails()
  }, []);
  const getMaster = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://prod.indiasportshub.com/master',
      });
      await AsyncStorage.setItem('masterData', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <FlatList
    //   data={[1]}
    //   nestedScrollEnabled
    //   renderItem={() => 
    <View>
      <Header />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}
      // style={{minHeight: '80%'}}
      >
        {/* <RefreshControl
            onRefresh={() => {
              getHomePageData();
            }}
            refreshing={isLoading}> */}
        <View style={{ flexDirection: 'row' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 6,
              paddingVertical: 10,
              // backgroundColor: "red"
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
        <LatestInterNation
          internationalData={internationalData}
          isLoading={isLoading}
          setInternationalData={setInternationalData}
          userData={userData}
        />
        <LatestDomestic
          internationalData={domesticData}
          isLoading={isLoading}
          setInternationalData={setDomesticData}
          userData={userData}
        />
        {/* </RefreshControl> */}
        <LatestNews showTitle={true} limit />
        <View style={{ height: dynamicSize(100) }} />
      </ScrollView>
      <UpdateApp />
    </View>
    // }

    // />

    // </FlatList>
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
// inside map
// array.push(item.sport)
// out map
// setState(arr)
