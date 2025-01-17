import {
  ActivityIndicator,
  Dimensions,
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
import iconData from '../../../data/sportsData';
import ApiCall from '../../../utils/ApiCall';
import NewSportCard from '../../ScoreCardComponents/NewSportCard';

const menu = ['All', 'Live', 'Upcoming', 'Completed'];
const height = Dimensions.get('window').height;
const Score = ({route, params}) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const {sportName} = route.params;
  const [tournamentData, setTournamentData] = useState([]);
  const [moreLoad, setMoreLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState({
    total_page: 0,
    current_page: 1,
    total: 0,
  });
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async (pageVal, addition, tabChange, activeId) => {
    try {
      if (addition !== 'addition') {
        setLoading(true);
      } else {
        setMoreLoad(true);
      }

      let userId = await AsyncStorage.getItem('userId');
      let res = await ApiCall({
        method: 'get',
        endpoint: `events/homepage/data`,
        // url: `https://prod.indiasportshub.com/events/homepage/data`,
        params: {
          sportName: sportName,
          userId: userId || '661128d8ee8b461b00d95edd',
          startDate: '1999-05-01',
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
        },
      });
      if (tabChange === 'tabChange') {
        setTournamentData([
          ...res.data.domasticEvents[0]?.data,
          ...res.data.internationalEvents[0]?.data,
        ]);
      } else {
        setTournamentData([
          ...tournamentData,
          ...res.data.domasticEvents[0]?.data,
          ...res.data.internationalEvents[0]?.data,
        ]);
      }

      setMetaData(res.data.internationalEvents[0]?.metadata[0]);
      setLoading(false);
      setMoreLoad(false);
    } catch (error) {
      console.log('error',error);
      setLoading(false);
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

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  return (
    <>
      <BackHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.heading}>
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
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            {tournamentData.map((item)=> <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <NewSportCard item={item} margin={10} />
              </View>
               )}
          </>
        )}
        <View>
          {moreLoad && (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}
        </View>
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
