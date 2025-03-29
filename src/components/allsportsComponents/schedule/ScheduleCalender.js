import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../../constants/Colors';
import FootballIcon from '../../../assets/icons/football.svg';
import DatePicker from 'react-native-date-picker';
import BackHeader from '../../Header/BackHeader';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import LiveCard from '../../CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import iconData from '../../../data/sportsData';
import ApiCall from '../../../utils/ApiCall';
import NewSportCard from '../../ScoreCardComponents/NewSportCard';
import ExpandableCard from '../../../screens/Calendar/expandCard';
import { API_URL } from '../../../constants/apiConfig';
import PremiumFeature from '../../PremiumFeature/PremiumFeature';
import { isPastAndTodayDate } from '../../../utils/isPastOrCurrentDate';
const height = Dimensions.get('window').height;
const menu = ['Calendar View', 'List View'];

const ScheduleCalendar = ({ sportName }) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(moment().valueOf());
  const [selectedDate, setSelectedDate] = useState();
  const [domesticStartDate, setdomesticStartDate] = useState("")
  const [internationalStartDate, setinternationalStartDate] = useState("")
  const [isPremiumUser, setIsPremiumUser] = useState("")
  const [tournamentData, setTournamentData] = useState([])
  const [eventLoading, setEventLoading] = useState(false)
  const [expandTournamentId, setExpandTournamentId] = useState(null)

  const getId = async () => {
    const res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };

  const handleExpandTournamentId = (tournamentId) => {
    setExpandTournamentId(tournamentId)
  }

  const getUserDetails = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/users/${userID}`,
      });
      if (response?.data?.message === 'User found successfully') {
        setIsPremiumUser(response.data.existing.isPremiumUser)
      }
      return response.data;
    } catch (error) {
      throw new Error('Failed get User Details', error);
    }
  };

  useEffect(() => {
    getUserDetails()
    getId();
  }, []);

  const getTournamentData = async () => {
    try {
      if (!userId) {
        return;
      }
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `${API_URL}tournaments/calendar/data?userId=${userId}&page=0&limit=50&startDate=${moment(selectedDate).format('YYYY-MM-DD')}&endDate=${moment(selectedDate).format('YYYY-MM-DD')}&sportName=${sportName}`,
      });
      setLoading(false);
      setTournamentData(response.data?.data);
    } catch (err) {
      setLoading(false)
      setTournamentData([]);
    }
  };
  const getData = async (tournamentId) => {
    try {
      setData([])
      if (!userId) {
        return;
      }
      setEventLoading(tournamentId);
      const response = await ApiCall({
        method: 'GET',
        endpoint: `events/calender/data`,
        params: {
          userId: userId,
          page: 0,
          limit: 10,
          startDate: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : moment(domesticStartDate).format("YYYY-MM-DD"),
          endDate: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : moment(domesticStartDate).format("YYYY-MM-DD"),
          tournamentId: tournamentId,
          sportName: sportName,
        },
      });
      setEventLoading(false);
      setData(response?.data?.data);
    } catch (err) {
      setEventLoading(false)
      setData([]);
      console.log(err);
    }
  };

  useEffect(() => {
    getTournamentData()
  }, [userId, selectedDate, date, domesticStartDate]);

  useEffect(() => {
    getMasterFields();
    getCalenderDate()
  }, []);

  const [eventCategory, setEventCategory] = useState([]);

  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem('masterData');
      res = JSON.parse(res);

      setEventCategory(res?.sports);
    } catch (e) {
      console.log(e);
    }
  };
  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        endpoint: `users/myfavorite/${userId}/category/event`,
        // url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setData(
        data?.map(item =>
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getCalenderDate = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');

    try {
      let res = await axios.get(`https://prod.indiasportshub.com/events/homepage/data?userId=${userId}&startDate=1999-05-01&sportName=${sportName}&status=live%2Cupcoming&page=1&limit=10'`, {
        // params: {
        //   userId: userId,
        //   startDate: '1999-05-01',
        //   sportName: sportName,
        //   status: 'live,upcoming',
        //   page: 1,
        //   limit: 10,
        // },
      });
      setinternationalStartDate(moment(res?.data?.data?.internationalEvents?.[0]?.data?.[0]?.startDate).format("YYYY-MM-DD"))
      setdomesticStartDate(moment(res?.data?.data?.domasticEvents?.[0]?.data?.[0]?.startDate).format("YYYY-MM-DD"))
    } catch (e) {
      console.log(e);
    }
  };


  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  const renderComponent = <View
    style={{
      paddingVertical: 16,
      marginTop: 10,
      marginBottom: "25%",
      minHeight: height - 100,
    }}>
    {loading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : (
      <View>
        {tournamentData?.length === 0 && (
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
            }}>
            No Data Found
          </Text>
        )}
        {
          tournamentData?.map((item) => {
            return <ExpandableCard tournament={item} getEventData={() => getData(item?._id)} eventLoading={eventLoading} eventData={data} handleExpandTournamentId={handleExpandTournamentId} expandTournamentId={expandTournamentId} />
          })
        }
      </View>
    )}
  </View>

  return (
    <>
      <BackHeader />

      <ScrollView>
        <View style={[styles.heading, { marginBottom: 3 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {sportsData.icon}
            <Text style={styles.sportsTitle}>{sportName}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 23,
              color: COLORS.medium_gray,
            }}>
            SCHEDULE
          </Text>
        </View>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 10, gap: 6}}>
          {menu.map((item, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={`menu-item-${id}`}
                onPress={() => {
                  setActiveTab(id);
                  getData(1, '', 'tabChange', id);
                }}>
                <Text
                  style={
                    activeTab === id ? styles.activeText : styles.inactiveText
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
        {activeTab === 0 && (
          (domesticStartDate) ? (
            <CalendarProvider date={domesticStartDate}>
              <ExpandableCalendar
                firstDay={1}
                disablePan={false}
                disableWeekScroll={false}
                collapsable={true}
                markedDates={{
                  [selectedDate?.split('T')[0]]: { selected: true },
                }}
                onDayPress={day => {
                  setSelectedDate(day.dateString + 'T01:13:00.000Z');
                }}
              />
            </CalendarProvider>
          ) : (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )
        )}
        {activeTab === 1 && (
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              height: 130,
              position: 'relative',
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                top: -55,
                left: -30,
              }}>
              <DatePicker
                date={date}
                onDateChange={date => {
                  console.log('date changed', date);
                }}
                mode="date"
                dividerColor={COLORS.primary}
              />
            </View>
          </View>
        )}
        {
          (isPremiumUser || isPastAndTodayDate(moment(selectedDate).format('YYYY-MM-DD')) || Platform.OS == 'ios') ? renderComponent :
            <View style={{ marginTop: "25%" }}>
              <PremiumFeature child={renderComponent} top={"-70%"} />
            </View>
        }
      </ScrollView>
    </>
  );
};

export default ScheduleCalendar;

const styles = StyleSheet.create({
  heading: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
  dropbox: {
    backgroundColor: COLORS.white,
    height: 100,
    marginTop: 10,
    padding: 16,
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
});
