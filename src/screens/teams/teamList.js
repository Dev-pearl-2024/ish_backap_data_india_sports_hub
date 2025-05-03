import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iconData from '../../data/sportsData';
import TeamTable from './teamTable';
import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';
import ApiCall from '../../utils/ApiCall';

const TeamList = ({ route, params }) => {
  const [selectedValue, setSelectedValue] = useState('All');
  const [loading, setLoading] = useState(false);
  const { sportName } = route.params;
  const [atheleteData, setAtheleteData] = useState([]);

  useEffect(() => {
    getAthleteBySport();
  }, [selectedValue]);

  const getAthleteBySport = async () => {
    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem('userId');
      const res = await ApiCall({
        method: 'get',
        endpoint: `teams?page=1&limit=10`,
        params: {
          eventGenderCategory: selectedValue === 'All' ? '' : selectedValue,
          userId: userId,
          sport: sportName
          // sortBy:"fullName"
        },
      });
      setAtheleteData(res?.teamData);
      setLoading(false);
    } catch (e) {
      console.log(e, 'error geting indian');
      setLoading(false);
      setAtheleteData([]);
    }
  };

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
  };

  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      await ApiCall({
        method: 'post',
        endpoint: `users/myfavorite/${userId}/category/athlete`,
        // url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/athlete`,
        payload: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setAtheleteData(
        atheleteData?.map(item =>
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );
  return (
    <>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
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
            TEAMS
          </Text>
        </View>

        <View style={styles.sectionView}>
          <View style={{ marginTop: 10, padding: 10 }}>
            <Text style={{ color: COLORS.black }}>Choose Team Category</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '70%',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="All" color={COLORS.primary} />
                  <Text style={{ color: COLORS.black }}>All</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="Men's" color={COLORS.primary} />
                  <Text style={{ color: COLORS.black }}>Men's</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="Women's" color={COLORS.primary} />
                  <Text style={{ color: COLORS.black }}>Women's</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.sectionView}>
            <TeamTable data={atheleteData} handleFav={handleFav} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default TeamList;

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
  sectionView: {
    // padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
    height: 'auto',
    borderRadius: 15,
  },
});
