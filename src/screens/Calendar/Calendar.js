import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)} from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import Dropdown from '../../components/dropdown/Dropdown';
import BackIconSmall from '../../assets/icons/backIconSmall.svg';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import LiveCard from '../../components/CommonCards/liveTournamentCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import ExpandableCard from './expandCard';
import { TouchableOpacity } from 'react-native';
import CalendarIcon from '../../assets/icons/calender.svg';
import ListView from '../../assets/icons/list.svg';

const CalendarComponent = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(moment().valueOf());
  const [sportData, setSportsData] = useState([])
  const [selectedValue, setSelectedValue] = useState("")
  const [isCalendarView, setIsCalendarView] = useState(true)
  const [isPremiumUser, setIsPremiumUser] = useState("")
  const [tournamentData, setTournamentData] = useState([
  ])
  const [eventLoading, setEventLoading] = useState(false)

  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const toggleCalendarView = () => {
    setIsCalendarView((prev) => !prev)
  }

  useEffect(() => {
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
    getUserDetails()

  }, [])

  const getId = async () => {
    const res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };
  useEffect(() => {
    getId();
  }, []);

  const getData = async (tournamentId) => {
    try {
      setData([]);
      if (!userId) {
        return;
      }
      setEventLoading(tournamentId);
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/events/calender/data?userId=${userId}&page=1&limit=10&startDate=${selectedDate}&endDate=${selectedDate}&sportName=${selectedValue === "All" ? "" : selectedValue}&tournamentId=${tournamentId}`,
      });
      setEventLoading(false);
      setData(response.data.data.data);
    } catch (err) {
      setEventLoading(false);
      setData([])
    }
  };

  const getTournamentData = async () => {
    try {
      if (!userId) {
        return;
      }
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/tournaments/calendar/data?userId=${userId}&page=1&limit=50&startDate=${selectedDate}&endDate=${selectedDate}&sportName=${selectedValue === "All" ? "" : selectedValue}`,
      });
      setLoading(false);
      setTournamentData(response.data?.data);
    } catch (err) {
      setTournamentData([]);
    }
  };


  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/event`,
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


  const getAllSports = async () => {
    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem('userId');

      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/all/sports/${userId}`,
      });
      setSportsData(response.data.sports.map((data) => data.name))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error, 'Error:')
    }
  };

  useEffect(() => {
    getTournamentData()
  }, [userId, selectedDate, selectedValue]);

  useEffect(() => {
    getAllSports();
  }, []);

  return (
    <>
      <Header />
      <ScrollView nestedScrollEnabled>
        <View style={[styles.heading]}>
          <Text style={styles.sportsTitle}>Calendar</Text>
          <TouchableOpacity onPress={toggleCalendarView}>
            {
              !isCalendarView ? <View>
                <CalendarIcon color={COLORS.primary} />
              </View> : <Text style={[styles.sportsTitle, {fontSize:15}]}>List</Text>
            }
        </TouchableOpacity>
      </View>
      {
        isCalendarView ? <>
          <View style={{ margin: 16 }}>
            <Text style={{ color: COLORS.black }}>Select Sport</Text>
            <Dropdown
              placeholder={'Select Sport'}
              data={sportData}
              getValue={value => setSelectedValue(value)}
            />
          </View>
          <CalendarProvider date={today}>
            <ExpandableCalendar
              firstDay={1}
              disablePan={false}
              disableWeekScroll={false}
              collapsable={true}
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate?.split('T')[0]]: { selected: true },
              }}
            />
          </CalendarProvider>
          {!loading ? <View>
            {
              tournamentData?.map((item) => {
                return <ExpandableCard tournament={item} getEventData={() => getData(item?._id)} eventLoading={eventLoading} eventData={data} />
              })
            }
            {tournamentData?.length == 0 && <Text style={{ marginTop: "20%", textAlign: 'center' }}>Data not found!</Text>}
          </View> : (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: "20%" }} />
          )}
        </> : <>
          {!loading ? <View>
            {
              tournamentData?.map((item) => {
                return <ExpandableCard tournament={item} getEventData={() => getData(item?._id)} eventLoading={eventLoading} eventData={data} />
              })
            }
            {tournamentData?.length == 0 && <Text style={{ marginTop: "50%", textAlign: 'center' }}>Data not found!</Text>}
          </View> : (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: "50%" }} />
          )}
        </>
      }
      {/* <View
          style={{
            padding: 16,
            backgroundColor: COLORS.white,
            marginTop: 10,
          }}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            isPremiumUser ? (<View style={{ padding: 16, backgroundColor: COLORS.white, marginTop: 10, marginBottom: 50 }}>
              {data && data.length > 0 ? (
                data.map((item, id) => {
                  let teamVar = item
                  return (
                    <LiveCard
                      title={item?.name}
                      date={item?.startDate}
                      time={item?.startTime}
                      category={item?.category}
                      score={item?.score}
                      country1={item?.teamAName}
                      country2={item?.teamBName}
                      status={item?.status}
                      sport={item?.sport}
                      eventGenders={item?.tournamentName}
                      startDate={item?.startDate}
                      endDate={item?.endDate}
                      startTime={item?.startTime}
                      endTime={item?.endTime}
                      key={`live-item-${id}`}
                      data={item}
                      teams={teamVar}
                      isFavorite={item?.isFavorite}
                      handleFav={handleFav}
                    />
                  );
                })
              ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: COLORS.black }}>No data available</Text>
                </View>
              )}
            </View>)
              :
              (<PremiumFeature child={<View style={{ padding: 16, backgroundColor: COLORS.white, marginTop: 10, marginBottom: 50 }}>
                {data && data.length > 0 ? (
                  data.map((item, id) => {
                    return (
                      <LiveCard
                        title={item?.name}
                        date={item?.startDate}
                        time={item?.startTime}
                        category={item?.category}
                        score={item?.score}
                        country1={item?.teamAName}
                        country2={item?.teamBName}
                        status={item?.status}
                        sport={item?.sport}
                        eventGenders={item?.tournamentName}
                        startDate={item?.startDate}
                        endDate={item?.endDate}
                        startTime={item?.startTime}
                        endTime={item?.endTime}
                        key={`live-item-${id}`}
                        data={item}
                        teams={item?.teams}
                        isFavorite={item?.isFavorite}
                        handleFav={handleFav}
                      />
                    );
                  })
                ) : (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: COLORS.black }}>No data available</Text>
                  </View>
                )}
              </View>} />)
          )}
        </View> */}
    </ScrollView >
    </>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
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
});
