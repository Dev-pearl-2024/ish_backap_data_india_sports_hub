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

import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AboutAchievement from '../../components/AthleteProfileComponents/aboutAchievement';
import BestPerformance from '../../components/AthleteProfileComponents/bestPerformance';
import LatestNews from '../../components/HomeComponents/LatestNews';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
import BackHeader from '../../components/Header/BackHeader';
const achievements = [
  'Gold in olympic',
  'Gold in olympic',
  'Gold in olympic',
  'Gold in olympic',
  'Gold in olympic',
];
const name = 'PLAYER NAME';
const profileImage =
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
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
export default function AthleteProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const navigation = useNavigation();
  return (
    <>
     <BackHeader />
      <ScrollView>
        <Text style={styles.titleText}>Athlete Profile</Text>
        <AthleteProfileCard
          achievements={achievements}
          name={name}
          profileImage={profileImage}
        />
        <TripleDetailCard
          firstTitle="Sports"
          firstContent="Athletic"
          secondTitle="DOB"
          secondContent="DD/MM/YY"
          thirdTitle="AGE"
          thirdContent="7"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              Event-1 , Event-2 , Event-3
            </Text>
          </View>

          <View
            style={{
              gap: 3,
              justifyContent: 'center',
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
              Event-1 , Event-2
            </Text>
          </View>
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
        {activeTab === 0 && <AboutAchievement />}
        {activeTab === 1 && <BestPerformance />}
        {activeTab === 2 && <LatestNews showTitle={false}/>}
        {activeTab === 3 && <BestPerformance />}
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
