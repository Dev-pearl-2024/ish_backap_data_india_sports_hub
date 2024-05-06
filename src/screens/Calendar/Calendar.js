import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
// import {[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)} from 'react-native-calendars';
import React from 'react';
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
