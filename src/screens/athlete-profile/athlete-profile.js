import {useState, useEffect} from 'react';
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

const menu = [
  'About & Achievement',
  'Best Performances',
  'News & Media',
  'Upcoming Event',
  'Photo & Video',
  'Record',
  'Ranking',
  'Head to Head',
];
export default function AthleteProfile({route, params}) {
  const {athleteId} = route.params;
  const [activeTab, setActiveTab] = useState(0);
  const [athProfileData, setAthProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [tournamentData, setTournamentData] = useState([]);
  const getAthleteProfileData = async () => {
    try {
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/players/${athleteId}`,
      });
      console.log('res.data.data', res.data);
      setLoading(false);
      setAthProfileData(res.data.existing);
    } catch (e) {
      setLoading(false);
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
        url: `http://15.206.246.81:3000/events/upcoming-events/${athleteId}?`,
        params: {
          userId: userId,
          page: 0,
          limit: 20,
          startDate: moment().format('YYYY-MM-DD'),
        },
      });
      console.log('res.data.data');
      setTournamentData(res.data.data);
    } catch (e) {
      console.log('error', e);
      setTournamentData([]);
    }

  };
  return (
    <>
      <BackHeader />
      <ScrollView>
        {loading && <PreLoader />}
        <Text style={styles.titleText}>Athlete Profile</Text>
        <AthleteProfileCard athProfileData={athProfileData} />
        <TripleDetailCard athProfileData={athProfileData} />
        <View
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
            <Text
              style={{
                color: COLORS.black,
                fontSize: 14,
                fontWeight: '400',
              }}>
              {athProfileData?.eventCategory?.map((item, id) => {
                return `${item} , `;
              })}
            </Text>
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
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {athProfileData?.category?.map((item, id) => {
                  return `${item} , `;
                })}
              </Text>
            </View>
          )}
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
        {activeTab === 0 && (
          <AboutAchievement data={athProfileData?.achivements} />
        )}
        {activeTab === 1 && <BestPerformance />}
        {activeTab === 2 && <LatestNews showTitle={false} />}
        {activeTab === 3 && <AllCards data={tournamentData} />}
        {activeTab === 5 && <AtheleteTable />}
        {activeTab === 6 && <AtheleteTable />}
      </ScrollView>
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
