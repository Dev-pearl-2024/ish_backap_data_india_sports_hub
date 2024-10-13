import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../../constants/Colors';
import FootballIcon from '../../../assets/icons/football.svg';
import DatePicker from 'react-native-date-picker';
import BackHeader from '../../Header/BackHeader';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import LiveCard from '../../CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import iconData from '../../../data/sportsData';
const height = Dimensions.get('window').height;
const menu = ['Calendar View', 'List View'];

const ScheduleCalendar = ({sportName}) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(moment().valueOf());
  const [selectedDate, setSelectedDate] = useState();
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
      console.log('selectedDate', date, selectedDate);
      const response = await axios({
        method: 'GET',
        url: `http://15.206.246.81:3000/events/calender/data`,
        params: {
          userId: userId,
          page: 0,
          limit: 20,
          startDate: activeTab === 0 ? selectedDate : date,
          sportName: sportName,
        },
      });
      setLoading(false);
      setData(response.data.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userId, selectedDate, date]);
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

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  return (
    <>
      <BackHeader />

      <ScrollView>
        <View style={[styles.heading, {marginBottom: 3}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {sportsData.icon}
            <Text style={styles.sportsTitle}>{sportName}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 23,
              color: COLORS.medium_gray,
            }}>
            SCHEDULE
          </Text>
        </View>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 10, gap: 6}}>
          {menu.map((item, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={`menu-item-${id}`}
                onPress={() => {
                  setActiveTab(id);
                  getData(1, '', 'tabChange', id);
                }}>
                <Text
                  style={
                    activeTab === id ? styles.activeText : styles.inactiveText
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
        {activeTab === 0 && (
          <CalendarProvider date={today}>
            <ExpandableCalendar
              firstDay={1}
              disablePan={false}
              disableWeekScroll={false}
              collapsable={true}
              markedDates={{
                [selectedDate?.split('T')[0]]: {selected: true},
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString + 'T01:13:00.000Z');
              }}
            />
          </CalendarProvider>
        )}
        {activeTab === 1 && (
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              height: 130,
              position: 'relative',
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                top: -55,
                left: -30,
              }}>
              <DatePicker
                date={date}
                onDateChange={date => {
                  console.log('date changed', date);
                }}
                mode="date"
                dividerColor={COLORS.primary}
              />
            </View>
          </View>
        )}
        <View
          style={{
            paddingVertical: 16,
            backgroundColor: COLORS.white,
            marginTop: 10,
            minHeight: height - 100,
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
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
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
  heading: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
});
