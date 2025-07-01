import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import BackHeader from '../../Header/BackHeader';
import COLORS from '../../../constants/Colors';
import FootballIcon from '../../../assets/icons/football.svg';
import TournamentEventCards from '../../FavoriteComponents/tournamentEventCards';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iconData from '../../../data/sportsData';
import moment from 'moment';
import dynamicSize from '../../../utils/DynamicSize';
import GoogleAd from '../../GoogleAds';

const menu = [
  'All',
  'Ongoing',
  'International',
  'Domestic',
  'Individual Sporting',
  'Multi-Sporting',
];

export default function SportsAllTournament({route, params}) {
  const [activeTab, setActiveTab] = useState(0);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {sportName} = route.params;
  const getUser = async () => {
    let a = await AsyncStorage.getItem('userId');
    setUserId(a);
  };
  useEffect(() => {
    getUser();
  }, []);

  const getData = async () => {
    try {
      if (!userId) {
        return;
      }
      setLoading(true);

      const params = {
        userId: userId,
        sportName: sportName,
        sportType:
          activeTab === 4
            ? 'Individual Sporting'
            : activeTab === 5
            ? 'Multi-Sporting'
            : '',
        domesticAndInternational:
          activeTab === 2 ? 'International' : activeTab === 3 ? 'Domestic' : '',
        page: 0,
        // limit:20
      };

      if (activeTab === 1) {
        params.startDate = moment().format('YYYY-MM-DD');
      }
      const res = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/tournaments/filter/data`,
        params: params,
      });
      const data = res.data;
      setData(data?.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, [userId, activeTab]);

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <View>
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
            TOURNAMENT
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
          <TournamentEventCards data={data} setData={setData} />
        )}
      </View>
      <View
        style={{
          padding: dynamicSize(5),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor:"white"
        }}>
        {/* <Text>Google Ads</Text> */}
        <GoogleAd />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  titleFont: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
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
});
