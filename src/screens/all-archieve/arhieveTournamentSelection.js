import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import TournamentEventCards from '../../components/FavoriteComponents/tournamentEventCards';
import iconData from '../../data/sportsData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

const menu = ['All', 'Multi-Sport', 'International', 'Domestic'];

export default function AllArchieveTournament({ route, params }) {
  const [activeTab, setActiveTab] = useState(0);
  const { sportName } = route.params;
  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  const [sportType, setSportType] = useState("All")
  const [multidata, setMultiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMultSportsData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const params = {
        userId: userId,
        sportName: sportName,
        page: 0,
        // limit:20
      }
      if (sportType == 'Multi-Sport') {
        params.sportType = 'Multi-Sporting';
      }
      if (sportType == 'International' || sportType == 'Domestic') {
        params.domesticAndInternational = sportType;
      }
      if (sportType == 'Ongoing') {
        params.startDate = moment().format('YYYY-MM-DD');
      }
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/tournaments/filter/data`,
        params,
      });
      setMultiData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMultSportsData();
  }, [sportType]);

  return (
    <>
      <BackHeader />
      <ScrollView>
        <View style={styles.heading}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            ARCHIVE
          </Text>
        </View>
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
                onPress={() => {
                  setActiveTab(id)
                  setSportType(item)
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
       {loading ?  <ActivityIndicator size="large" color={COLORS.primary} />: <TournamentEventCards data={multidata} sportName={sportName} />}
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
