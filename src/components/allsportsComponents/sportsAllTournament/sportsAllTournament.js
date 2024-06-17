import {
  ActivityIndicator,
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

const menu = [
  'All',
  'Individual Sporting',
  'Multi-Sport',
  'International',
  'Domestic',
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
      const res = await axios({
        method: 'GET',
        url: `http://15.206.246.81:3000/tournaments/filter/data`,
        params: {
          userId: userId,
          sportName: sportName,
          sportType:
            activeTab === 1
              ? 'Individual Sporting'
              : activeTab === 2
              ? 'Multi-Sport'
              : '',
          domesticAndInternational:
            activeTab === 3
              ? 'International'
              : activeTab === 4
              ? 'Domestic'
              : '',
          page: 1,
        },
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

  return (
    <>
      <BackHeader />
      <ScrollView>
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
          <TournamentEventCards data={data} setData={setData}/>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
