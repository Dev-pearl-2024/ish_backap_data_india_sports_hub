import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import AthleteProfileCard from '../../components/CommonCards/atheleteProfileCard';
import TripleDetailCard from '../../components/CommonCards/tripleCenterDetailCard';
import AboutAchievement from '../../components/AthleteProfileComponents/aboutAchievement';
import BestPerformance from '../../components/AthleteProfileComponents/bestPerformance';
import LatestNews from '../../components/HomeComponents/LatestNews';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
import BackHeader from '../../components/Header/BackHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../components/loader/fullLoader';
import moment from 'moment';
import AllCards from '../../components/allsportsComponents/score/All';
import RecordTable from '../../components/allsportsComponents/records/recordsTable';
import RankingTable from '../allRanking/rankingTable';
import HeadToHead from './headTohead';
import dynamicSize from '../../utils/DynamicSize';
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import RecentArchives from '../../components/AthleteProfileComponents/recentArchives';

const menu = [
  'About & Achievement',
  'Upcoming Event',
  'Archives',
  'Head to Head',
  'News & Media'
];

const archiveSubMenu = [
  {
    id: 0,
    lable: 'Recent',
  },
  {
    id: 1,
    lable: 'Top 10',
  },
  // {
  //   id: 2,
  //   lable: 'Year wise',
  // },
];
export default function AthleteProfile({ route, params }) {
  const { athleteId, athleteData } = route.params;
  const [activeTab, setActiveTab] = useState(0);
  const [athProfileData, setAthProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [recordData, setRecordData] = useState([]);
  const [tournamentData, setTournamentData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [activeArchiveTab, setActiveArchiveTab] = useState(0);
  const [isPremiumUser, setIsPremiumUser] = useState("")

  useEffect(() => {
    const getUserDetails = async () => {
      const userID = await AsyncStorage.getItem('userId');
      try {
        const response = await axios({
          method: 'GET',
          url: `https://prod.indiasportshub.com/users/${userID}`,
        });
        if (response?.data?.message === 'User found successfully') {
          setIsPremiumUser(response.data.existing.isPremiumUser)
        }
        return response.data;
      } catch (error) {
        throw new Error('Failed get User Details', error);
      }
    };

    getUserDetails()
  }, [])

  const getAthleteProfileData = async () => {
    try {
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/players/${athleteId}`,
      });
      setLoading(false);
      setAthProfileData(res?.data?.existing);
    } catch (e) {
      setLoading(false);
      setAthProfileData([]);
    }
  };
  useEffect(() => {
    getAthleteProfileData();
    getUpcomingData();
  }, []);
  const getUpcomingData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/events/upcoming-events/${athleteId}`,
        // params: {
        //   userId: userId,
        //   page: 0,
        //   limit: 20,
        //   startDate: moment().format('YYYY-MM-DD'),
        // },
      });
      setTournamentData(res?.data?.data);
    } catch (e) {
      console.log('error', e);
      setTournamentData([]);
    }
  };
  const getBestPerformanceData = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/players/best-performance/${athleteId}`,
      });
      setPerformanceData(res.data.data);
      if (res?.data?.data?.length == 0) {
        setPerformanceData([]);
      }
    } catch (e) {
      console.log(e);
      setPerformanceData([]);
    }
  };
  const getRecordData = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/records/athleteId/${athleteId}?page=0&limit=20`,
      });
      setRecordData(res?.data?.data);
    } catch (e) {
      console.log(e, 'error in get record');
    }
  };
  useEffect(() => {
    getRecordData();
    getRankingData();
    getBestPerformanceData();
  }, [athleteId]);
  const getRankingData = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/rankings/athleteId/${athleteId}?page=0&limit=10`,
      });
      setRankingData(res?.data?.data);
    } catch (e) {
      console.log(e, 'error in getting ranking');
    }
  };
  const renderComponent = <ScrollView>
    {loading && <PreLoader />}
    <Text style={styles.titleText}>Athlete Profile</Text>
    <AthleteProfileCard athProfileData={athProfileData} />
    <TripleDetailCard athProfileData={athProfileData} />
    {/* <View
    style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 12,
      backgroundColor: COLORS.white,
      marginTop: 16,
    }}>
    <View
      style={{
        gap: 3,
        justifyContent: 'center',
        width: athProfileData?.category?.length > 0 ? '40%' : '100%',
      }}>
      <Text
        style={{
          color: COLORS.medium_gray,
          fontSize: 12,
          fontWeight: '500',
        }}>
        Name of events
      </Text>
      <ScrollView
        style={{maxHeight: dynamicSize(150)}}
        showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {athProfileData?.eventCategory?.map((item, id, arr) => {
            return `${item}${id !== arr.length - 1 ? ', ' : ''} `;
          })}
        </Text>
      </ScrollView>
    </View>
    {athProfileData?.category?.length > 0 && (
      <View
        style={{
          gap: 3,
          justifyContent: 'center',
          width: athProfileData?.category?.length > 0 ? '40%' : 0,
        }}>
        <Text
          style={{
            color: COLORS.medium_gray,
            fontSize: 12,
            fontWeight: '500',
          }}>
          Categories
        </Text>
        <ScrollView
          style={{maxHeight: dynamicSize(150)}}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 14,
              fontWeight: '400',
            }}>
            {athProfileData?.category?.map((item, id, arr) => {
              return `${item}${id !== arr.length - 1 ? ', ' : ''} `;
            })}
          </Text>
        </ScrollView>
      </View>
    )}
  </View> */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, gap: 6 }}>
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

    {activeTab === 0 &&
      (athProfileData?.achivements ? (
        <AboutAchievement data={athProfileData?.achivements} />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text>No Achievement data available</Text>
        </View>
      ))}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, gap: 6 }}>
      {activeTab === 2 &&
        archiveSubMenu.map(item => {
          return (
            <TouchableOpacity
              style={
                activeArchiveTab === item?.id
                  ? styles.categoryButton
                  : styles.categoryButtonInactive
              }
              key={`menu-item-${item.id}`}
              onPress={() => setActiveArchiveTab(item.id)}>
              <Text
                style={
                  activeArchiveTab === item?.id
                    ? styles.activeText
                    : styles.inactiveText
                }>
                {item.lable}
              </Text>
            </TouchableOpacity>
          );
        })
      }
    </ScrollView>
    {(activeTab === 2 && activeArchiveTab === 0) && <RecentArchives athleteId={athProfileData?._id} />}
    {(activeTab === 2 && activeArchiveTab === 1) && <BestPerformance athleteId={athProfileData?._id} />}
    {activeTab === 1 && <AllCards data={tournamentData} />}
    {activeTab === 3 && (
      <HeadToHead
        eventCategory={athProfileData?.eventCategory}
        athleteId={athleteId}
        athleteData={athProfileData}
      />
    )}
    {activeTab === 4 && <LatestNews showTitle={false} />}
  </ScrollView>

  return (
    <>
      <BackHeader />
      {isPremiumUser ? renderComponent : <PremiumFeature child={renderComponent} top={"10%"} />}
    </>
  );
}
const styles = StyleSheet.create({
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
});
