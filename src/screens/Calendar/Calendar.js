import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
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
import { API_URL } from '../../constants/apiConfig';
import { isPastAndTodayDate } from '../../utils/isPastOrCurrentDate';

const CalendarComponent = (props) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(moment().valueOf());
  const [sportData, setSportsData] = useState([])
  const [selectedValue, setSelectedValue] = useState(props?.sportName || '')
  const [isCalendarView, setIsCalendarView] = useState(true)
  const [isPremiumUser, setIsPremiumUser] = useState("")
  const [tournamentData, setTournamentData] = useState([
  ])
  const [eventLoading, setEventLoading] = useState(false)
  const [expandTournamentId, setExpandTournamentId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(
    moment(props?.selectedDate).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
  );
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleExpandTournamentId = (tournamentId) => {
    setExpandTournamentId(tournamentId)
  }

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
        url: `${API_URL}events/calender/data?userId=${userId}&page=${0}&limit=10${isCalendarView ? '&startDate=' + selectedDate : ""}${isCalendarView ? '&endDate=' + selectedDate : ""}&sportName=${selectedValue === "All" ? "" : selectedValue}&tournamentId=${tournamentId}`,
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
        url: `${API_URL}tournaments/calendar/data?userId=${userId}&page=${page || 0}&limit=70&startDate=${isCalendarView ? selectedDate : moment().format('YYYY-MM-DD')}&endDate=${isCalendarView ? selectedDate : ""}&sportName=${selectedValue === "All" ? "" : selectedValue}&from=${isCalendarView ? "calendarView" : "listView"}`,
      });
      setLoading(false);
      setTournamentData((prev) => [...response.data?.data]);
    } catch (err) {
      setLoadingMore(false)
      setTournamentData([]);
    }
  };

  const getAllSports = async () => {
    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem('userId');

      const response = await axios({
        method: 'GET',
        url: `${API_URL}all/sports/${userId}`,
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
  }, [userId, selectedDate, selectedValue, page, isCalendarView]);

  useEffect(() => {
    getAllSports();
  }, []);

  const renderComponent = <>
    {!loading ? <View>
      {
        tournamentData?.map((item, index) => {
          return <ExpandableCard tournament={item} getEventData={() => getData(item?._id)} eventLoading={eventLoading} eventData={data} handleExpandTournamentId={handleExpandTournamentId} expandTournamentId={expandTournamentId} />
        })
      }
      {tournamentData?.length == 0 && <Text style={{ marginTop: "20%", textAlign: 'center', color: COLORS.black }}>Data not found!</Text>}
    </View> : (
      <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: "20%" }} />
    )}
  </>
  return (
    <>
      <Header />
      <ScrollView nestedScrollEnabled>
        <View style={[styles.heading]}>
          <Text style={styles.sportsTitle}>Calendar</Text>
          <TouchableOpacity onPress={toggleCalendarView} style={{ border: 1, borderRadius: 2 }}>
            {
              !isCalendarView ? <Text
                style={[styles.sportsTitle, { fontSize: 10, borderWidth: 1, borderRadius: 2, paddingRight: 5, borderColor: COLORS.primary, color: COLORS.primary, borderRadius: 10 }]}>Click for calendar view</Text> : <Text
                  style={[styles.sportsTitle, { fontSize: 10, borderWidth: 1, borderRadius: 2, paddingRight: 5, borderColor: COLORS.primary, color: COLORS.primary, borderRadius: 10 }]}>Click to see list view</Text>
            }
          </TouchableOpacity>
        </View>
        <View style={{ margin: 16 }}>
          {/* <Text style={{ color: COLORS.black }}>Select Sport</Text> */}
          <Dropdown
            placeholder={'Select Sport'}
            data={sportData}
            getValue={value => setSelectedValue(value)}
          />
        </View>

        <View>
          {false ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            (isPremiumUser || (isPastAndTodayDate(selectedDate) || isCalendarView == false) || Platform.OS == 'ios') ? <>
            {
              isCalendarView ? <>
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
                {renderComponent}
              </> : <>
                {!loading ? <View>
                  {
                    tournamentData?.map((item) => {
                      return (isPremiumUser || isPastAndTodayDate(item?.startDate) || Platform.OS == 'ios') ? <ExpandableCard
                        tournament={item}
                        getEventData={() => getData(item?._id)}
                        eventLoading={eventLoading}
                        eventData={data}
                        handleExpandTournamentId={handleExpandTournamentId}
                        expandTournamentId={expandTournamentId}
                      /> : <PremiumFeature child={<ExpandableCard
                        tournament={item}
                        getEventData={() => getData(item?._id)}
                        eventLoading={eventLoading}
                        eventData={data}
                        handleExpandTournamentId={handleExpandTournamentId}
                        expandTournamentId={expandTournamentId}
                      />} />
                    })
                  }
                  {/* <FlatList
                      data={tournamentData}
                      keyExtractor={(item) => item._id.toString()} // Ensure unique key
                      renderItem={({ item }) => (
                        <ExpandableCard
                          tournament={item}
                          getEventData={() => getData(item?._id)}
                          eventLoading={eventLoading}
                          eventData={data}
                          expandTournamentId={expandTournamentId}
                          handleExpandTournamentId={handleExpandTournamentId}
                        />
                      )}
                      onTouchEndCapture={() => console.log("touch osnd")}
                      // onTouchStart={() => setPage((prev) => prev + 1)}
                      onEndReached={() => setPage(prev => prev + 1)} // Trigger API call when reaching the end
                      onEndReachedThreshold={0.2} // Call when 50% from the end
                      ListFooterComponent={() =>
                        loadingMore ? <ActivityIndicator size="medium" color="blue" /> : null
                      }
                    /> */}
                  {tournamentData?.length == 0 && <Text style={{ marginTop: "50%", textAlign: 'center', color: COLORS.black }}>Data not found!</Text>}
                </View> : (
                  <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: "50%" }} />
                )}
              </>
            }
          </>
          :
          (<>
            {isCalendarView && <CalendarProvider date={today}>
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
            </CalendarProvider>}
            <PremiumFeature child={renderComponent} top={"60%"} />
          </>)
          )}
        </View>
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
