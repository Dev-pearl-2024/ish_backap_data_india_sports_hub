import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import Dropdown from '../../components/dropdown/Dropdown';
import BackIconSmall from '../../assets/icons/backIconSmall.svg';
import BackHeader from '../../components/Header/BackHeader';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import LiveCard from '../../components/CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

const CalendarStackNav = ({route, params}) => {
  console.log('navigated received');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(moment().valueOf());

  const getId = async () => {
    const res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };
  const {sportName, sportDate} = route.params;

  const [selectedDate, setSelectedDate] = useState(sportDate);

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
        url: `http://15.206.246.81:3000/events/calender/data`,
        params: {
          userId: userId,
          page: 0,
          limit: 20,
          startDate: selectedDate,
          endDate: selectedDate,
        },
      });
      setLoading(false);
      setData(response.data.data.data);
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };
  useEffect(() => {
    getData();
  }, [userId, selectedDate]);
  useEffect(() => {
    getMasterFields();
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
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollToDate(sportDate);
    }
  }, [sportDate]);
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

  console.log(selectedDate, 'selectedDate');

  return (
    <View>
      <BackHeader />
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.sportsTitle}>Calendar</Text>
        </View>
        <View style={styles.dropbox}>
          <Dropdown
            placeholder="All "
            data={eventCategory}
            getValue={value => console.log(value)}
          />
        </View>

        <CalendarProvider date={selectedDate}>
          <ExpandableCalendar
            disableWeekScroll={false}
            collapsable={true}
            onDayPress={day => {
              console.log('dat', day);
              setSelectedDate(day.dateString);
            }}
            selectedDate={selectedDate}
            current={selectedDate}
            markedDates={{
              [selectedDate]: {selected: true},
            }}
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
        )}
      </ScrollView>
      {/* 
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
    </View>
  );
};

export default CalendarStackNav;

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
