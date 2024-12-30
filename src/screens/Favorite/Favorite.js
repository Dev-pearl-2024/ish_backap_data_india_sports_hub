import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LiveUpcomingCards from '../../components/FavoriteComponents/liveUpcomingCards';
import SportsCards from '../../components/FavoriteComponents/sportsCards';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
import TournamentEventCards from '../../components/FavoriteComponents/tournamentEventCards';
import SportSelection from '../../components/allsportsComponents/sportsSelection';
import {useDispatch, useSelector} from 'react-redux';
import {getFavoriteDataRequest} from '../../redux/actions/favoriteAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import UpadtedAtheleteTable from '../../components/FavoriteComponents/updatedAthleteTable';

const menu = [
  'All',
  'Live & Upcoming',
  'Sports',
  'Athletes',
  'Tournaments',
];
const Favorite = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [favoriteData, setFavoriteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const [data, setData] = useState([
    {
      tournamentData: [],
      sportsData: [],
      athleteData: [],
      eventData: [],
    },
  ]);
  useEffect(() => {
    getAllFavorite();
  }, [isFocused]);
  const getAllFavorite = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      setLoading(true);
      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/users/myfavorite/data/${userId}`,
      });
      setLoading(false);
      setFavoriteData(response?.data?.data);
    } catch (error) {
      setLoading(false);
      throw new Error('Failed to get favorite data');
    }
  };

  useEffect(() => {
    setData({
      tournamentData: favoriteData?.tournamentData || [],
      sportsData: favoriteData?.sportsData || [],
      athleteData: favoriteData?.athleteData || [],
      eventData: favoriteData?.eventData || [],
    });
  }, [favoriteData]);
  return (
    <>
      <Header />
      {/* <RefreshControl refreshing={loading} onRefresh={getAllFavorite}> */}
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <Text style={styles.titleText}>My Favorites</Text>
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
              {activeTab === 0 && (
                <>
                  <LiveUpcomingCards
                    eventData={data.eventData}
                    setData={setData}
                    data={data}
                  />
                  <SportSelection
                    route={'individual-sport'}
                    filter={'favorite'}
                  />
                </>
              )}
              {activeTab === 1 && (
                <LiveUpcomingCards
                  eventData={data.eventData}
                  setData={setData}
                  data={data}
                />
              )}
              {activeTab === 2 && (
                <SportSelection
                  route={'individual-sport'}
                  filter={'favorite'}
                />
              )}
              {activeTab === 3 && (
                <UpadtedAtheleteTable
                atheleteData={data.athleteData}
                  type={'atheleteType'}
                  setData={setData}
                  data={data}
                />
              )}
              {activeTab === 4 && (
                <TournamentEventCards data={data.tournamentData || data.eventData} />
              )}
            </>
          )}
        </ScrollView>
      {/* </RefreshControl> */}
    </>
  );
};

export default Favorite;

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
});
