import {
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

const menu = [
  'All',
  'Live & Upcoming',
  'Sports',
  'Atheles',
  'Tournament & Events',
];
const Favorite = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const favoriteData = useSelector(state => state?.favorite?.data?.data);
  const [data, setData] = useState([
    {
      tournamentData: [],
      sportsData: [],
      athleteData: [],
      eventData: [],
    },
  ]);
  useEffect(() => {
    dispatch(getFavoriteDataRequest());
  }, [dispatch]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {activeTab === 0 && (
          <>
            <LiveUpcomingCards eventData={data.eventData} />
            <SportsCards route={'individual-sport'} />
          </>
        )}
        {activeTab === 1 && <LiveUpcomingCards eventData={data.eventData} />}
        {activeTab === 2 && <SportSelection route={'individual-sport'} filter={'favorite'} />}
        {activeTab === 3 && <AtheleteTable atheleteData={data.athleteData} type={'atheleteType'}/>}
        {activeTab === 4 && <TournamentEventCards data={data.tournamentData} />}
      </ScrollView>
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
