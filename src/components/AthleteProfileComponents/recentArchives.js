import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import COLORS from '../../constants/Colors';
import CarouselCardItem from '../HomeComponents/CarouselCardItem';
import LiveCard from '../CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dropdown from '../dropdown/Dropdown';
import NewSportCard from '../ScoreCardComponents/NewSportCard';

const menu = ['Recent', 'Year Wise', 'Tournament'];

export default function RecentArchives({ data, setTournamentData, athleteId }) {
  const [activeTab, setActiveTab] = useState(0);
  const [performance, setPerformance] = useState();
  const [loading, setLoading] = useState(false);
  const [dropOptions, setDropOptions] = useState(['']);
  const [filterValue, setFilterValue] = useState('');
  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setPerformance(
        performance?.map(item =>
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios({
        url: `http://prod.indiasportshub.com/events/recent-events/${athleteId}?page=1&limit=10`,
        method: 'GET',
        params: {
          // filter:
          //   activeTab === 0 ? '' : activeTab === 1 ? 'year' : 'tournament',
          //   filterValue: filterValue,
        },
      });
      setLoading(false);
      if (activeTab === 1) {
        setDropOptions(res?.data?.data[0]?.allYears);
      }
      else if (activeTab === 2) {
        setDropOptions(res?.data?.data[0]?.allTournaments);
      }
      setPerformance(res?.data?.data);

    } catch (e) {
      setLoading(false);
      console.log(e, 'error in get');
      setPerformance([]);
    }
  };
  useEffect(() => {
    getData();
  }, [activeTab, filterValue]);
  return (
    <>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 16, gap: 6}}>
        {menu?.map((item, id) => {
          return (
            <TouchableOpacity
              style={
                activeTab === id
                  ? styles.categoryButton
                  : styles.categoryButtonInactive
              }
              key={`menu-item-${id}`}
              onPress={() => {setActiveTab(id);setFilterValue('');}}>
              <Text
                style={
                  activeTab === id ? styles.activeText : styles.inactiveText
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}

      <View style={styles.center}>

        {loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : <>
          {activeTab !== 0 && performance?.length !== 0 && (

            <Dropdown
              placeholder={filterValue || "All"}
              data={dropOptions}
              getValue={value => setFilterValue(value)}
            />)}
          {performance?.length === 0 && (
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
              }}>
              No Data Found
            </Text>
          )}
          <View style={{ marginBottom: 10 }}></View>

          {performance?.map((item, id) => {
            return (
              <NewSportCard item={item} favoriteIconShow={false} />
            );
          })}
        </>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  center: {
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
  },
});
