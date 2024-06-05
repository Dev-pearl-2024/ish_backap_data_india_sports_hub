import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import CarouselCardItem from '../HomeComponents/CarouselCardItem';
import LiveCard from '../CommonCards/liveTournamentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const menu = ['Recent', 'Top 10', 'Year Wise', 'Tournament'];
const item = {
  title: 'Archery World Cup',
  date: '24/Jan/2024 | 04:00pm',
  category: "Women's / Final",
  score: '82/85',
  country1: 'India - 4',
  country2: 'USA - 4',
  status: 'Live',
};
export default function BestPerformance() {
  const [activeTab, setActiveTab] = useState(0);
  const handleFav = async (id,fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `http://15.206.246.81:3000/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
     
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
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
      <View style={styles.center}>
      <LiveCard
            title={item?.name}
            date={item?.startDate}
            time={item?.startTime}
            category={item?.category}
            score={item?.score}
            country1={item?.teamAName}
            country2={item?.teamBName}
            status={item?.status}
            startDate={item?.startDate}
            endDate={item?.endDate}
            startTime={item?.startTime}
            endTime={item?.endTime}
            key={`live-item-${id}`}
            data={item}
            isFavorite={item?.isFavorite}
            handleFav={handleFav}
          />
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
