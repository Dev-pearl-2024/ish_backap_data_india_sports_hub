import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScheduleCalendar from './ScheduleCalender';
const Schedule = ({route,params}) => {
  const {sportName} = route.params;
  return (
    <View>
      <ScheduleCalendar sportName={sportName}/>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
