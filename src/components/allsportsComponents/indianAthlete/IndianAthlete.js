import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import LogoIcon from '../../../assets/icons/logo.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../../assets/icons/backArrow.svg';
import FootballIcon from '../../../assets/icons/football.svg';
import RightArrow from '../../../assets/icons/rightArrow.svg';
import COLORS from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import AtheleteTable from '../../FavoriteComponents/atheleteTable';
import {useDispatch, useSelector} from 'react-redux';
import {fetchIndianAtheleteRequest} from '../../../redux/actions/sportsActions';
import BackHeader from '../../Header/BackHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IndianAthleteTable from './IndianAtheleteTable';
import iconData from '../../../data/sportsData';
import ApiCall from '../../../utils/ApiCall';
import dynamicSize from '../../../utils/DynamicSize';
import GoogleAd from '../../GoogleAds';

const IndianAthlete = ({route, params}) => {
  const [selectedValue, setSelectedValue] = useState('All');
  const [loading, setLoading] = useState(false);
  const {sportName} = route.params;
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
        endpoint: `players/by/sportName/${sportName}`,
        // url: `https://prod.indiasportshub.com/players/by/sportName/${sportName}`,
        params: {
          gender: selectedValue === 'All' ? '' : selectedValue,
          userId: userId,
          country: 'India',
          sortBy: 'fullName',
        },
      });
      setAtheleteData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e, 'error geting indian');
      setLoading(false);
      setAtheleteData([]);
    }
  };

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
    // You can add your custom logic here based on the selected value
    switch (value) {
      case 'All':
        // Execute actions for Option 1
        console.log('Option 1 selected');
        break;
      case 'Male':
        // Execute actions for Option 2
        console.log('Option 2 selected');
        break;

      default:
        break;
    }
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
          item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            INDIAN ATHLETE
          </Text>
        </View>

        <View style={styles.sectionView}>
          {/* <View>
            <Text style={{color: COLORS.black}}>Choose your Category</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option1" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>All</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Senior</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Junior</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Para</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View> */}

          <View style={{marginTop: 10, padding: 10}}>
            <Text style={{color: COLORS.black}}>Choose your Events</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '70%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="All" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>All</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="Male" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Male</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="Female" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Female</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.sectionView}>
            <IndianAthleteTable data={atheleteData} handleFav={handleFav} />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          padding: dynamicSize(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text>Google Ads</Text> */}
        <GoogleAd />
      </View>
    </>
  );
};

export default IndianAthlete;

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
