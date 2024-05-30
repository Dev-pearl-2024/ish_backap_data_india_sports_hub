import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
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

const menu1 = ['Latest Update', 'Scores', 'Schedule', 'Athlete'];

const menu2 = ['All', 'Live', 'Upcoming', 'Completed'];

const TournamentView = ({route, params}) => {
  const navigation = useNavigation();
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const {tournamentDetail} = route.params;
  const [eventCategory, setEventCategory] = useState([]);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [tournamentData, setTournamentData] = useState([]);
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
      console.log(
        'masterData',
        tournamentDetail?.name,
        res?.eventCategory?.[tournamentDetail?.sport],
      );
      setEventCategory(res?.eventCategory?.[tournamentDetail?.sport]);
    } catch (e) {
      console.log(e);
    }
  };
  const getEventsByTournament = async () => {
    try {
      if (!tournamentDetail?._id) return console.log('Tournament Id not found');

      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/events/calender/data?userId=661128d8ee8b461b00d95edd&page=0&limit=20&tournamentId=${tournamentDetail?._id}`,
      });
      setTournamentData(res.data.data);
      raw = res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getEventsByTournament();
  }, [tournamentDetail]);

  let currentDate = moment();
  // const filerData = tab => {
  //   console.log('tab', tab);
  //   let data = tournamentData;
  //   if (tab === 1) {
  //     data = data.filter(item => {
  //       const startDate = moment(item.startDate);
  //       const endDate = moment(item.endDate);
  //       const startTime = moment(item.startTime, 'HH:mm');
  //       const endTime = moment(item.endTime, 'HH:mm');
  //       return (
  //         currentDate.isBetween(startDate, endDate) &&
  //         currentDate.isBetween(startTime, endTime)
  //       );
  //     });
  //     setTournamentData(data);
  //   } else if (tab === 2) {
  //     data = data.filter(item => {
  //       const startDate = moment(item.startDate);
  //       return startDate.isAfter(currentDate);
  //     });
  //     setTournamentData(data);
  //   } else if (tab === 3) {
  //     console.log('tab222', tab);

  //     data = data.filter(item => {
  //       const endDate = moment(item.endDate);
  //       return endDate.isBefore(currentDate);
  //     });
  //     setTournamentData(data);
  //   } else if (tab === 0) {
  //     setTournamentData(raw);
  //   }
  // };

  return (
    <>
      <BackHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootballIcon />
            <Text style={styles.sportsTitle}>{tournamentDetail?.sport}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: 10,
            borderRadius: 15,
          }}>
          <View style={styles.heading}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  tournamentDetail?.icon
                    ? {uri: tournamentDetail?.icon}
                    : require('../../assets/images/archeryWorldCup.png')
                }
              />
              <Text
                style={[styles.sportsTitle, {fontSize: 22, fontWeight: '500'}]}>
                {tournamentDetail?.name}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 20, paddingBottom: 20}}>
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
                  <Text style={{color: COLORS.black}}>2024</Text>
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
              <View style={styles.timer}>
                <Text style={{color: COLORS.black}}>-------</Text>
              </View>
            </View>
            <View style={{padding: 16}}>
              <Dropdown
                placeholder={'Event Categories'}
                data={eventCategory}
                getValue={value => console.log(value)}
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
              width: '100%',
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              gap: 6,
              backgroundColor: COLORS.white,
              width: '100%',
              paddingBottom: 10,
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
          {activeTab === 0 && <AllCards data={tournamentData} />}
          {activeTab === 1 && (
            <LiveCards
              data={tournamentData.filter(item => {
                const startDate = moment(item.startDate);
                const endDate = moment(item.endDate);
                const startTime = moment(item.startTime, 'HH:mm');
                const endTime = moment(item.endTime, 'HH:mm');
                return (
                  currentDate.isBetween(startDate, endDate) &&
                  currentDate.isBetween(startTime, endTime)
                );
              })}
            />
          )}
          {activeTab === 2 && (
            <UpcomingCards
              data={tournamentData?.filter(item => {
                const startDate = moment(item.startDate);
                return startDate.isAfter(currentDate);
              })}
            />
          )}
          {activeTab === 3 && (
            <CompletedCards
              data={tournamentData?.filter(item => {
                const endDate = moment(item.endDate);
                return endDate.isBefore(currentDate);
              })}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default TournamentView;

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
  },
});
