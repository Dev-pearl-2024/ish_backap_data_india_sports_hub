import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../../constants/Colors';
// import Dropdown from '../../components/dropdown/Dropdown';
import Dropdown from '../../dropdown/Dropdown';
// import BackIconSmall from '../../assets/icons/backIconSmall.svg';
import BackIconSmall from '../../../assets/icons/backIconSmall.svg';
import BackHeader from '../../Header/BackHeader';
import { Calendar } from 'react-native-calendars';
import LiveCard from '../../CommonCards/liveTournamentCard';

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
  return (
    <>
      <BackHeader />
      <View style={styles.dropbox}>
        <Dropdown placeholder={'All'} />
      </View>
      <ScrollView>
      <Calendar
  onDayPress={day => {
    console.log('selected day', day);
  }}
/>
      <View
        style={{
          padding: 16,
          backgroundColor: COLORS.white,
          marginTop: 10,
        }}>
    
      {allData.map((item, id) => {
        return (
          <LiveCard
            title={item.title}
            date={item.date}
            category={item.category}
            score={item.score}
            country1={item.country1}
            country2={item.country2}
            status={item.status}
            key={`live-item-${id}`}
          />
        );
      })}
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
