import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LiveUpcomingCards from '../../components/FavoriteComponents/liveUpcomingCards';
import SportsCards from '../../components/FavoriteComponents/sportsCards';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
const menu = [
  'All',
  'Live & Upcoming',
  'Sports',
  'Atheles',
  'Tournament & Events',
];
const Favorite = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <View>
      <Header />
      <Text style={{
        fontSize:16,
        fontWeight:800,
        color:COLORS.black,
        padding:16,
        backgroundColor:COLORS.white,
      }}>My Favorites</Text>
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
      {activeTab === 1 && <LiveUpcomingCards />}
      {activeTab === 2 && <SportsCards />}
      {activeTab === 3 && <AtheleteTable />}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
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
