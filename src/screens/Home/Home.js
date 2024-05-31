import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LatestNews from '../../components/HomeComponents/LatestNews';
import LatestInterNation from '../../components/HomeComponents/LatestInterNation';
import LatestDomestic from '../../components/HomeComponents/LatestDomestic';
import BlueHockey from '../../assets/icons/sportIcons/BlueHockey.js';
import BlueBasketball from '../../assets/icons/sportIcons/BlueBasketball.js';
import BlueBaseball from '../../assets/icons/sportIcons/BlueBaseball.js';
import BlueFootball from '../../assets/icons/sportIcons/BlueFootball.js';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHomePageEventRequest} from '../../redux/actions/eventActions.js';
import PreLoader from '../../components/loader/fullLoader.js';
import {useIsFocused} from '@react-navigation/native';
import iconData from '../../data/sportsDataSmall.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [internationalData, setInternationalData] = useState([]);
  const [domesticData, setDomesticData] = useState([]);
  // Start
  const [newinterData, setNewInterData] = useState([]);
  let normalArr = [];
  // End
  const isFocused = useIsFocused();

  const eventData = useSelector(
    state => state?.eventReducer?.homePageEventData?.data,
  );
  const isLoading = useSelector(state => state?.eventReducer?.isLoading);
  useEffect(() => {
    dispatch(fetchHomePageEventRequest());
  }, [dispatch]);

  useEffect(() => {
    if (eventData) {
      const interEventData = eventData?.internationalEvents[0]?.data;
      const domesticEventData = eventData?.domasticEvents[0]?.data;
      setInternationalData(interEventData);
      setDomesticData(domesticEventData);
      internationalData?.map(data => {
        if (normalArr.includes(data.sport)) {
          return;
        } else {
          normalArr.push(data.sport);
        }
      });
      const mergeDataIcon = normalArr?.map(sport => {
        const foundsportName = iconData?.find(
          item => item?.name?.toLowerCase() === sport?.toLowerCase(),
        );
        return foundsportName ? {sport, icon: foundsportName.icon} : sport;
      });
      setNewInterData(mergeDataIcon);
    }
  }, [internationalData, domesticData, eventData]);

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
  }, []);
  const getMaster = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://15.206.246.81:3000/master',
      });
      await AsyncStorage.setItem('masterData', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                gap: 6,
                paddingVertical: 10,
              }}>
              <TouchableOpacity style={styles.categoryButtonInactive}>
                <Text style={styles.inactiveText}>View All</Text>
              </TouchableOpacity>
              {newinterData?.map((data, id) => {
                return (
                  <TouchableOpacity
                    style={
                      activeTab === id + 1
                        ? styles.categoryButton
                        : styles.categoryButtonInactive
                    }
                    key={id}
                    onPress={() => setActiveTab(id + 1)}>
                    {/* <View style={{height: 10, width: 10, objectFit: 'contain'}}> */}
                    {data?.icon}
                    {/* </View> */}
                    {/* <Text
                      style={
                        activeTab === id + 1
                          ? styles.activeText
                          : styles.inactiveText
                      }>
                      {data?.sport}
                    </Text> */}
                  </TouchableOpacity>
                );
              })}
              {/* {newinterData.map(item => {
                return (
                  <View>
                    <Text>{item?.sport}</Text>
                    <View>{item?.icon}</View>
                  </View>
                );
              })} */}
            </ScrollView>
          </View>
          {/* <PreLoader /> */}
          <LatestInterNation
            internationalData={internationalData}
            isLoading={isLoading}
          />
          <LatestDomestic domesticData={domesticData} />
          <LatestNews showTitle={true} />
        </View>
      </ScrollView>
    </>
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

let res = [
  {
    __v: 0,
    _id: '664c73507b7c8c76fd0573b4',
    category: 'Mixed Doubles',
    createdAt: '2024-05-21T10:11:28.627Z',
    endDate: '2024-05-22T00:00:00.000Z',
    endTime: '17:40',
    eventGender: "Individual Men's",
    eventStage: 'asdasds',
    eventVenue: 'ajkadf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test team table tennis',
    participation: 'A Vs B',
    sport: 'TABLETENNIS',
    startDate: '2024-05-21T00:00:00.000Z',
    startTime: '16:40',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['660fdd9be8947a4f286366fc', '660fd5a8058d62ffa0a2b3d9'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-21T10:11:28.627Z',
  },
  {
    __v: 0,
    _id: '664c50727b7c8c76fd0572ce',
    category: 'Mixed Team',
    createdAt: '2024-05-21T07:42:42.535Z',
    endDate: '2024-05-22T00:00:00.000Z',
    endTime: '15:12',
    eventGender: "Individual Men's",
    eventStage: 'bjjhjhj',
    eventVenue: 'jfjdsfdjf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test judo mixed team',
    participation: 'A Vs B',
    sport: 'JUDO',
    startDate: '2024-05-21T00:00:00.000Z',
    startTime: '14:12',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['660fd8f6058d62ffa0a2b427', '65fbc0ef222e4cca251e9b4b'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-21T07:42:42.535Z',
  },
  {
    __v: 0,
    _id: '664b4cde4fc59d4570a9b266',
    category: 'Road racing',
    createdAt: '2024-05-20T13:15:10.683Z',
    endDate: '2024-05-27T00:00:00.000Z',
    endTime: '20:45',
    eventGender: "Individual Men's",
    eventStage: 'asdasds',
    eventVenue: 'ajkadf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'vishal',
    participation: 'A Vs B',
    sport: 'CYCLING',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '19:44',
    subtournamentId: null,
    subtournamentName: '----',
    tags: [],
    teamAName: '---',
    teamBName: '---',
    teams: ['660fd5a8058d62ffa0a2b3d9'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T13:19:00.401Z',
  },
  {
    __v: 0,
    _id: '664b49734fc59d4570a9b1c9',
    category: 'Road racing',
    createdAt: '2024-05-20T13:00:35.954Z',
    endDate: '2024-05-21T00:00:00.000Z',
    endTime: '20:30',
    eventGender: "Individual Men's",
    eventStage: 'asdasds',
    eventVenue: 'ajkadf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test  cycling',
    participation: 'Group',
    sport: 'CYCLING',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '19:30',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['660fd5a8058d62ffa0a2b3d9', '660fdd9be8947a4f286366fc'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T13:00:35.954Z',
  },
  {
    __v: 0,
    _id: '664b15c54d6b02c2d13d3398',
    category: 'Mixed Team',
    createdAt: '2024-05-20T09:20:05.486Z',
    endDate: '2024-05-21T00:00:00.000Z',
    endTime: '15:49',
    eventGender: "Individual Men's",
    eventStage: 'bjjhjhj',
    eventVenue: 'jghghj',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test judo',
    participation: 'Group',
    sport: 'JUDO',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '14:49',
    subtournamentId: null,
    subtournamentName: '----',
    tags: [],
    teamAName: '---',
    teamBName: '---',
    teams: ['65fbc0ef222e4cca251e9b4b', '660fd8f6058d62ffa0a2b427'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T09:26:41.774Z',
  },
  {
    __v: 0,
    _id: '664aff52e7b26be5b5e330f1',
    category: 'Canoe Sprint: C-1 200m',
    createdAt: '2024-05-20T07:44:18.218Z',
    endDate: '2024-05-20T00:00:00.000Z',
    endTime: '14:14',
    eventGender: "Individual Men's",
    eventStage: 'asdasds',
    eventVenue: 'jfjdsfdjf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test 2 canoeing',
    participation: 'Group',
    sport: 'CANOEING',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '13:14',
    subtournamentId: null,
    subtournamentName: '----',
    tags: [],
    teamAName: '---',
    teamBName: '---',
    teams: ['660bea942b376b85b1dbd7d2', '660fd8f6058d62ffa0a2b427'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T11:28:32.641Z',
  },
  {
    __v: 0,
    _id: '664afc58e7b26be5b5e33093',
    category: 'Canoe Sprint: K-2 500m',
    createdAt: '2024-05-20T07:31:36.417Z',
    endDate: '2024-05-21T00:00:00.000Z',
    endTime: '14:01',
    eventGender: "Individual Men's",
    eventStage: 'asdasds',
    eventVenue: 'jfjdsfdjf',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test canoeing',
    participation: 'Group',
    sport: 'CANOEING',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '13:01',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['660bea942b376b85b1dbd7d2', '65fae021222e4cca251e970d'],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T07:31:36.417Z',
  },
  {
    __v: 0,
    _id: '664ad8322392326b62887a51',
    category: '4 x 100m Freestyle relay',
    createdAt: '2024-05-20T04:57:22.534Z',
    endDate: '2024-05-21T00:00:00.000Z',
    endTime: '02:26',
    eventGender: "Individual Men's",
    eventStage: 'bjjhjhj',
    eventVenue: 'dasdsa',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'test swimming',
    participation: 'Group',
    sport: 'SWIMMING',
    startDate: '2024-05-20T00:00:00.000Z',
    startTime: '11:26',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: [
      '660fd8f6058d62ffa0a2b427',
      '65fbc0ef222e4cca251e9b4b',
      '660fdd9be8947a4f286366fc',
      '663c9e818320864dc94a80dd',
    ],
    tournamentId: '661512c38754442220b1dea6',
    tournamentName: 'sinfle game',
    updatedAt: '2024-05-20T04:57:22.534Z',
  },
  {
    __v: 0,
    _id: '6649f53aeaa896ccd427eafc',
    category: 'Team Event',
    createdAt: '2024-05-19T12:48:58.520Z',
    endDate: '2024-05-19T00:00:00.000Z',
    endTime: '18:18',
    eventGender: "Individual Men's",
    eventStage: 'Final',
    eventVenue: 'China',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'Teams Tennis',
    participation: 'Group',
    sport: 'TENNIS',
    startDate: '2024-05-19T00:00:00.000Z',
    startTime: '18:18',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['65fadea17a865301ef60b305', '65fadfd6222e4cca251e96f9'],
    tournamentId: '66424ecd5e05d1ce01df4f40',
    tournamentName: 'Archery Team',
    updatedAt: '2024-05-19T12:48:58.520Z',
  },
  {
    __v: 0,
    _id: '6649f49ceaa896ccd427eadf',
    category: 'Doubles',
    createdAt: '2024-05-19T12:46:20.879Z',
    endDate: '2024-05-19T00:00:00.000Z',
    endTime: '18:16',
    eventGender: "Individual Men's",
    eventStage: 'Final',
    eventVenue: 'China',
    isActive: true,
    isDeleted: false,
    isFavorite: false,
    metaData: '',
    name: 'Doubles Tennis',
    participation: 'Group',
    sport: 'TENNIS',
    startDate: '2024-05-19T00:00:00.000Z',
    startTime: '18:16',
    subtournamentId: null,
    subtournamentName: '',
    tags: [''],
    teamAName: '',
    teamBName: '',
    teams: ['65fae021222e4cca251e970d', '65fadff9222e4cca251e9703'],
    tournamentId: '66424ecd5e05d1ce01df4f40',
    tournamentName: 'Archery Team',
    updatedAt: '2024-05-19T12:46:20.879Z',
  },
];
