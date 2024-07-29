import {
    StyleSheet,
    Text,
  } from 'react-native';
  // import {[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)} from 'react-native-calendars';
  import React, {useEffect, useState} from 'react';
  import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';
import SportSelection from '../../components/allsportsComponents/sportsSelection';
   
  const CalendarIndexComponent = () => {
   
    return (
      <>
        <BackHeader />
        <Text style={styles.sportsTitle}>Calendar</Text>
        <SportSelection route={'calendar'} />

      </>
    );
  };
  
  export default CalendarIndexComponent;
  
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
        padding: 16,
        backgroundColor: COLORS.white,
        borderRadius: 15,
    },
    dropbox: {
      backgroundColor: COLORS.white,
      height: 100,
      marginTop: 10,
      padding: 16,
    },
  });
  