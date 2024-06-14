import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../assets/icons/backArrow.svg';
import FootballIcon from '../../assets/icons/football.svg';
import RightArrow from '../../assets/icons/rightArrow.svg';
import COLORS from '../../constants/Colors';
import LiveCards from '../../components/allsportsComponents/score/Live';
import UpcomingCards from '../../components/allsportsComponents/score/Upcoming';
import AllCards from '../../components/allsportsComponents/score/All';
import CompletedCards from '../../components/allsportsComponents/score/Completed';

import {useNavigation} from '@react-navigation/native';
import Dropdown from '../../components/dropdown/Dropdown';
import BackHeader from '../../components/Header/BackHeader';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LatestNews from '../../components/HomeComponents/LatestNews';
import {calculateRemainingTime} from '../../constants/commonFunctions';
import {
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import AthleteTournament from './athleteTournament';
const menu1 = ['Latest Update', 'Scores', 'Schedule', 'Athlete','News & Media'];

const menu2 = ['All', 'Live', 'Upcoming', 'Completed'];

const TournamentView = ({route, params}) => {
  const navigation = useNavigation();
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const {tournamentDetail} = route.params;
  const [eventCategory, setEventCategory] = useState([]);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [scheduleData, setscheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
  );
  const [selectedEvent, setSelectedEvent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tournamentData, setTournamentData] = useState([]);
  const [moreLoad, setMoreLoad] = useState(false);
  const [selectedYear,setSelectedYear] = useState('')

  const [metaData, setMetaData] = useState({
    total_page: 0,
    current_page: 1,
    total: 0,
  });
  const [pages, setPages] = useState({
    page: 1,
    limit: 2,
  });
  let raw = [];
  const handleRadioButtonPress = value => {
    setSelectedValue(value);
    // You can add your custom logic here based on the selected value
    switch (value) {
      case 'option1':
        // Execute actions for Option 1

        break;
      case 'option2':
        // Execute actions for Option 2

        break;

      default:
        break;
    }
  };
  useEffect(() => {
    getMasterFields();
  }, [tournamentDetail]);
  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem('masterData');
      res = JSON.parse(res);

      setEventCategory(res?.eventCategory?.[tournamentDetail?.sports[0]]);
    } catch (e) {}
  };
  const getScheduleEventsByTournament = async () => {
    try {
      if (!tournamentDetail?._id) return;
      let userId = await AsyncStorage.getItem('userId');
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/events/calender/data`,
        params: {
          userId: userId,
          page: 0,
          limit: 20,
          tournamentId: tournamentDetail?._id,
          startDate: selectedDate,
        },
      });
      setscheduleData(res.data.data);
      setLoading(false);
      raw = res.data.data;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getScheduleEventsByTournament();
  }, [tournamentDetail, selectedDate]);

  useEffect(() => {
    getData();
  }, [selectedEvent,activeTab1]);
  const getData = async (pageVal, addition, tabChange, activeId) => {
    try {
      if (addition !== 'addition') {
        setLoading(true);
      } else {
        setMoreLoad(true);
      }

      let userId = await AsyncStorage.getItem('userId');
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/events/homepage/data`,
        params: {
          sportName: tournamentDetail?.sport || tournamentDetail?.sports[0],
          userId: userId || '661128d8ee8b461b00d95edd',
          startDate: '1999-05-01',
          tournamentId: tournamentDetail?._id,
          status:
            activeId === 0
              ? 'all'
              : activeId === 1
              ? 'live'
              : activeId === 2
              ? 'upcoming'
              : activeId === 3
              ? 'completed'
              : activeTab === 0
              ? 'all'
              : activeTab === 1
              ? 'live'
              : activeTab === 2
              ? 'upcoming'
              : 'completed',
          page: pageVal || 1,
          limit: pages.limit,
          category:selectedEvent
        },
      });
      if (tabChange === 'tabChange') {
        setTournamentData([
          ...res.data.data.domasticEvents[0]?.data,
          ...res.data.data.internationalEvents[0]?.data,
        ]);
      } else {
        setTournamentData([
          ...tournamentData,
          ...res.data.data.domasticEvents[0]?.data,
          ...res.data.data.internationalEvents[0]?.data,
        ]);
      }

      setMetaData(res.data.data.internationalEvents[0]?.metadata[0]);
      setLoading(false);
      setMoreLoad(false);
      if(!res.data.data?.internationalEvents[0]?.data && !res.data.data?.domasticEvents[0]?.data ){
        setTournamentData([])
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setTournamentData([])
      
    }
  };

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      if (pages.page < metaData?.total_page) {
        // setPages({
        //   ...pages,
        //   page: pages.page + 1,
        // });
        getData(metaData.current_page + 1, 'addition');
      }
    }
  };
  let currentDate = moment();

  return (
    <>
      <BackHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootballIcon />
            <Text style={styles.sportsTitle}>{tournamentDetail?.sport ||  tournamentDetail?.sports[0]}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: 10,
            borderRadius: 15,
          }}>
          <View style={styles.heading}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={
                  tournamentDetail?.icon || tournamentDetail?.coverImage
                    ? {
                        uri:
                          tournamentDetail?.icon ||
                          tournamentDetail?.coverImage,
                      }
                    : require('../../assets/images/archeryWorldCup.png')
                }
                width={50}
                height={50}
                style={{borderRadius: 100}}
              />
              <Text
                style={[styles.sportsTitle, {fontSize: 22, fontWeight: '500'}]}>
                {tournamentDetail?.name}
              </Text>
            </View>
          </View>

          <View
            style={{marginTop: 20, paddingBottom: 20, paddingHorizontal: 10}}>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 100,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option1" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>{moment().year()}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Previous Editions</Text>
                </View>
              </View>
            </RadioButton.Group>
            <View
              style={{
                width: '100%',
                backgroundColor: '#56BCBE',
                height: 1,
              }}
            />

            <View style={styles.timerContainer}>
              <Text style={{color: COLORS.dark_gray}}>
                {moment(tournamentDetail?.startDate).format('DD/MMM/YYYY')} To{' '}
                {moment(tournamentDetail?.endDate).format('DD/MMM/YYYY')}
              </Text>
              {moment().isBefore(moment(tournamentDetail?.startDate)) && (
                <GetDateDiff data={tournamentDetail?.startDate} />
              )}
            </View>
            {selectedValue === 'option2' && (
              <View style={{padding: 16}}>
                <Dropdown
                  placeholder={'Select edition and year'}
                  data={['2024', '2023', '2022', '2021']}
                  getValue={value => setSelectedYear(value)}
                />
              </View>
            )}
            <View style={{padding: 16}}>
              <Dropdown
                placeholder={'Event Categories'}
                data={eventCategory}
                getValue={value => setSelectedEvent(value)}
              />
            </View>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 16,
              gap: 6,
            }}>
            {menu1.map((item, id) => {
              return (
                <TouchableOpacity
                  style={
                    activeTab1 === id
                      ? styles.categoryButton
                      : styles.categoryButtonInactive
                  }
                  key={`menu-item-${id}`}
                  onPress={() => setActiveTab1(id)}>
                  <Text
                    style={
                      activeTab1 === id
                        ? styles.activeText
                        : styles.inactiveText
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {activeTab1 === 0 && <LatestNews showTitle={false} />}
          {activeTab1 === 1 && (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 16,
                  gap: 6,
                  backgroundColor: COLORS.white,
                  width: '100%',
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}>
                {menu2.map((item, id) => {
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
                          activeTab === id
                            ? styles.activeText
                            : styles.inactiveText
                        }>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View
                style={{
                  width: '100%',
                  backgroundColor: COLORS.white,
                  borderBottomColor: '#56BCBE',
                  borderBottomWidth: 1,
                  height: 1,
                }}
              />
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <>
                  {console.log(tournamentData,'------')}
                  {activeTab === 0 && <AllCards data={tournamentData} setTournamentData={setTournamentData}/>}
                  {activeTab === 1 && <AllCards data={tournamentData} setTournamentData={setTournamentData}/>}
                  {activeTab === 2 && <AllCards data={tournamentData} setTournamentData={setTournamentData}/>}
                  {activeTab === 3 && <AllCards data={tournamentData} setTournamentData={setTournamentData}/>}
                </>
              )}
              <View>
                {moreLoad && (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                )}
              </View>
            </>
          )}
          {activeTab1 === 2 && (
            <View>
              <CalendarProvider date={Date.now()}>
                <ExpandableCalendar
                  firstDay={1}
                  disablePan={true}
                  disableWeekScroll={false}
                  collapsable={true}
                  onDayPress={day => {
                    setSelectedDate(day.dateString + 'T00:00:00.000Z');
                  }}
                  markedDates={{
                    [selectedDate?.split('T')[0]]: {selected: true},
                  }}
                />
              </CalendarProvider>
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <AllCards data={scheduleData} />
              )}
            </View>
          )}
          {activeTab1 === 3 && (
            <AthleteTournament tournamentDetail={tournamentDetail} />
          )}
          {activeTab1 === 4 && <LatestNews showTitle={false} />}
        </View>
      </ScrollView>
    </>
  );
};

export default TournamentView;
const GetDateDiff = ({data}) => {
  let res = calculateRemainingTime(data);

  return (
    <View style={styles.timer}>
      <Text style={{color: COLORS.black}}>
        {res?.months} : {res?.days}
      </Text>
      <Text style={{
        color:COLORS.black,
        fontSize:10
      }}>
        DD : MM
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
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
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timer: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    alignItems: 'center',
  },
});
