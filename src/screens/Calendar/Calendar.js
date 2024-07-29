import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)} from 'react-native-calendars';
import React, {useEffect, useState} from 'react';
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

const CalendarComponent = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(moment().valueOf());

  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const getId = async () => {
    const res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };
  useEffect(() => {
    getId();
  }, []);

  const getData = async () => {
    try {
      if (!userId) {
        return;
      }
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `http://15.206.246.81:3000/events/calender/data?userId=${userId}&page=0&limit=50&startDate=${selectedDate}&endDate=${selectedDate}`,
      });
      setLoading(false);

      console.log(JSON.stringify(response.data.data.data), 'responsee');
      setData(response.data.data.data);
    } catch (err) {
      console.log(err, 'ERROR IN CALENDAR');
      setData([]);
    }
  };
  useEffect(() => {
    getData();
  }, [userId, selectedDate]);
  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `http://15.206.246.81:3000/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setData(
        data?.map(item =>
          item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log(selectedDate, 'setSelectedDate');
  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.sportsTitle}>Calendar</Text>
        </View>
        {/* <Calendar
          onDayPress={day => {
            console.log('selected day', day);
          }}
        /> */}
        <CalendarProvider date={today}>
          <ExpandableCalendar
            firstDay={1}
            disablePan={false} //we need this
            disableWeekScroll={false}
            collapsable={true}
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate?.split('T')[0]]: {selected: true},
            }}
          />
        </CalendarProvider>

        <View
          style={{
            padding: 16,
            backgroundColor: COLORS.white,
            marginTop: 10,
          }}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View
              style={{
                paddingHorizontal: 16,
                backgroundColor: COLORS.white,
              }}>
              {data?.length === 0 && (
                <Text
                  style={{
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  No Data Found
                </Text>
              )}
            </View>
          )}
          {data &&
            data.length > 0 &&
            data?.map((item, id) => {
              return (
                <LiveCard
                  title={item?.tournamentName}
                  date={item?.startDate}
                  time={item?.startTime}
                  category={item?.category}
                  score={item?.score}
                  country1={item?.teamAName}
                  country2={item?.teamBName}
                  status={item?.status}
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
            })}
        </View>
      </ScrollView>
    </>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  heading: {
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
