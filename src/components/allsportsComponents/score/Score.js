import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LogoIcon from '../../../assets/icons/logo.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../../assets/icons/backArrow.svg';
import FootballIcon from '../../../assets/icons/football.svg';
import RightArrow from '../../../assets/icons/rightArrow.svg';
import COLORS from '../../../constants/Colors';
import LiveCards from './Live';
import UpcomingCards from './Upcoming';
import AllCards from './All';
import CompletedCards from './Completed';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../Header/BackHeader';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menu = ['All', 'Live', 'Upcoming', 'Completed'];

const Score = ({route, params}) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const {sportName} = route.params;
  const [tournamentData, setTournamentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    getData();
  }, [activeTab]);
  const getData = async () => {
    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem('userId');
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/events/homepage/data?userId=661128d8ee8b461b00d95edd&startDate=1999-05-01&sportName=${sportName}`,
        params: {
          sportName: sportName,
          userId: userId || '661128d8ee8b461b00d95edd',
          startDate: '1999-05-01',
          status:
            activeTab === 0
              ? 'all'
              : activeTab === 1
              ? 'live'
              : activeTab === 2
              ? 'upcoming'
              : 'completed',
          page: pages.page,
          limit: pages.limit,
        },
      });

      setTournamentData([
        ...res.data.data.domasticEvents[0]?.data,
        ...res.data.data.internationalEvents[0]?.data,
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  let currentDate = moment();

  return (
    <>
      <BackHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootballIcon />
            <Text style={styles.sportsTitle}>{sportName}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 23,
              color: COLORS.medium_gray,
            }}>
            SCORE
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 16, gap: 6}}>
          {menu.map((item, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={`menu-item-${id}`}
                onPress={() => setActiveTab(id)}>
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
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            {activeTab === 0 && <AllCards data={tournamentData} />}
            {activeTab === 1 && <AllCards data={tournamentData} />}
            {activeTab === 2 && <AllCards data={tournamentData} />}
            {activeTab === 3 && <AllCards data={tournamentData} />}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Score;

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
});
