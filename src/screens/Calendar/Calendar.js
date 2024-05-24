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
const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
];
const allData = [
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
];
const CalendarComponent = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
        url: `http://15.206.246.81:3000/events/calender/data?userId=661128d8ee8b461b00d95edd&page=0&limit=20&startDate=2024-04-01&endDate=2024-04-30`,
      });
      setLoading(false);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userId]);
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
        <CalendarProvider date={Date.now()}>
          <ExpandableCalendar
            firstDay={1}
            disablePan={false} //we need this
            disableWeekScroll={false}
            collapsable={true}
            markedDates={{'2024-05-05': 'red'}}
          />
        </CalendarProvider>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View
            style={{
              padding: 16,
              backgroundColor: COLORS.white,
              marginTop: 10,
            }}>
            {data?.map((item, id) => {
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
                />
              );
            })}
          </View>
        )}
        {/* <View style={styles.dropbox}>
        <Dropdown placeholder={'All'} />
      </View>
      <View
        style={{
          padding: 16,
          backgroundColor: COLORS.white,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              borderColor: COLORS.light_gray,
              borderRadius: 5,
              padding: 8,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <BackIconSmall />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.black, fontSize: 16, fontWeight: '500'}}>
              February
            </Text>
            <Text
              style={{
                color: COLORS.medium_gray,
                fontSize: 12,
                fontWeight: '400',
              }}>
              2023
            </Text>
          </View>
          <View
            style={{
              borderColor: COLORS.light_gray,
              borderRadius: 5,
              padding: 8,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              transform: 'rotate(180deg)',
            }}>
            <BackIconSmall />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            padding: 10,
          }}>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Mon
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Tue
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Wed
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Thu
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Fri
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Sat
          </Text>
          <Text
            style={{color: COLORS.dark_gray, fontSize: 12, fontWeight: 400}}>
            Sun
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {dates.map((date, id) => {
            return (
              <Text
                style={{
                  width: '10%',
                  padding: 10,
                  margin: 5,
                  backgroundColor: id === 4 ? COLORS.primary : COLORS.white,
                  color: id === 4 ? COLORS.white : COLORS.black,
                  borderRadius: 5,
                  borderColor: id === 4 ? COLORS.primary : COLORS.light_gray,
                  textAlign: 'center',
                }}>
                {date}
              </Text>
            );
          })}
        </View>
      </View> */}
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
