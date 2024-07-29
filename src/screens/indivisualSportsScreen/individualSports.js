import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import FootballIcon from '../../assets/icons/football.svg';
import RightArrow from '../../assets/icons/rightArrow.svg';
import {useSelector} from 'react-redux';
import BackHeader from '../../components/Header/BackHeader';
import iconData from '../../data/sportsData';

const IndividualSport = ({route, params}) => {
  const navigation = useNavigation();
  const selectedSport = useSelector(state => state.sport.selectedSport);

  console.log(selectedSport, 'selectedSport');

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === selectedSport?.toLowerCase(),
  );

  return (
    <SafeAreaView>
      <BackHeader />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: COLORS.white,
          alignItems: 'center',
          padding: 10,
          borderRadius: 15,
        }}>
        {sportsData.icon}
        <Text style={styles.sportsTitle}>{selectedSport}</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('Score', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Score</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('sports-tournament', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Tournament</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('IndianAthlete', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Indian Athlete</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('News', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>News & Media</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('Schedule', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Schedule</Text>
          <RightArrow />
        </TouchableOpacity>
        {/*  <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('Rules')}>
          <Text style={styles.navigationItemText}>Rules</Text>
          <RightArrow />
      </TouchableOpacity>*/}
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('AllRanking', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Ranking</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() =>
            navigation.navigate('Records', {sportName: selectedSport})
          }>
          <Text style={styles.navigationItemText}>Records</Text>
          <RightArrow />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IndividualSport;

const styles = StyleSheet.create({
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
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
  navigationContainer: {
    marginTop: 10,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  navigationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
