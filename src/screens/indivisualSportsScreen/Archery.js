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
import Dropdown from '../../components/dropdown/Dropdown';

const Archery = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={{width: '33%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '33%',
            alignItems: 'center',
          }}>
          <LogoIcon />
        </View>

        <View style={styles.noticification}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchIcon style={{marginRight: 24}} />
            <NoticificationIcon />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: COLORS.white,
          alignItems: 'center',
          padding: 10,
          borderRadius: 15,
        }}>
        <FootballIcon />
        <Text style={styles.sportsTitle}>ARCHERY</Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('Score')}>
          <Text style={styles.navigationItemText}>Score</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('all-tournament')}>
          <Text style={styles.navigationItemText}>Tournament</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('IndianAthlete')}>
          <Text style={styles.navigationItemText}>Indian Athlete</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('News')}>
          <Text style={styles.navigationItemText}>News & Media</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('Schedule')}>
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
          onPress={() => navigation.navigate('Ranking')}>
          <Text style={styles.navigationItemText}>Ranking</Text>
          <RightArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationItem}
          onPress={() => navigation.navigate('Records')}>
          <Text style={styles.navigationItemText}>Records</Text>
          <RightArrow />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Archery;

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
