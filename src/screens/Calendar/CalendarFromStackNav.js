import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import CalendarComponent from './Calendar';

const CalendarStackNav = ({ route, params }) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(moment().valueOf());


  const getId = async () => {
    const res = await AsyncStorage.getItem('userId');
    setUserId(res);
  };
  const { sportName, sportDate, isPremiumUser } = route.params;

  const [selectedDate, setSelectedDate] = useState(sportDate);

  console.log("SPORTDATE::::", selectedDate)

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
        url: `https://prod.indiasportshub.com/events/calender/data`,
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
    }
  };


  return (
    <View>
      <BackHeader />
      <ScrollView>
      <View style={styles.heading}>
        <Text style={styles.sportsTitle}>Calendar</Text>
      </View>
      <View style={styles.dropbox}>
        <Dropdown
          placeholder="All"
          data={eventCategory}
          getValue={value => console.log(value)}
        />
      </View>
  
      <CalendarProvider date={selectedDate}>
        <ExpandableCalendar
          disableWeekScroll={true}
          collapsable={false}
          onDayPress={day => {
            // console.log('dat', day);
            setSelectedDate(day.dateString);
          }}
          selectedDate={selectedDate}
          // current={selectedDate}
          // markedDates={{
          //   [selectedDate]: {selected: true},
          // }}
        />
      </CalendarProvider>
  
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : isPremiumUser ? (
        <View style={{ padding: 16, backgroundColor: COLORS.white, marginTop: 10, marginBottom: 50 }}>
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
                  eventGenders={item?.eventGender}
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
        </View>
      ) : (
        <PremiumFeature child={<View style={{ padding: 16, backgroundColor: COLORS.white, marginTop: 10, marginBottom: 50 }}>
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
                eventGenders={item?.eventGender}
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
      </View>}/>
      )}
    </ScrollView>
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
