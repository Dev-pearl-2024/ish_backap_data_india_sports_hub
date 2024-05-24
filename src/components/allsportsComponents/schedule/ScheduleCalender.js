import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../../constants/Colors';
// import Dropdown from '../../components/dropdown/Dropdown';
import Dropdown from '../../dropdown/Dropdown';
// import BackIconSmall from '../../assets/icons/backIconSmall.svg';
import BackIconSmall from '../../../assets/icons/backIconSmall.svg';
import BackHeader from '../../Header/BackHeader';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import LiveCard from '../../CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
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
const ScheduleCalendar = () => {
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
      <BackHeader />
      <View style={styles.dropbox}>
        <Dropdown placeholder={'All'} />
      </View>
      <ScrollView>
      {/* <Calendar
  onDayPress={day => {
    console.log('selected day', day);
  }}
/>
 */}
  <CalendarProvider date={Date.now()}>
          <ExpandableCalendar
            firstDay={1}
            disablePan={false} //we need this
            disableWeekScroll={false}
            collapsable={true}
            markedDates={{'2024-05-05': 'red'}}
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
    </View>
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
