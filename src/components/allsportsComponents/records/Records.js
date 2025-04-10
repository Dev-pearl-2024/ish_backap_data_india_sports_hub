import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import LogoIcon from '../../../assets/icons/logo.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../../assets/icons/backArrow.svg';
import FootballIcon from '../../../assets/icons/football.svg';
import RightArrow from '../../../assets/icons/rightArrow.svg';
import COLORS from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AtheleteTable from '../../FavoriteComponents/atheleteTable';
import Dropdown from '../../dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecordRequest } from '../../../redux/actions/sportsActions';
import BackHeader from '../../Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RecordTable from './recordsTable';
import iconData from '../../../data/sportsData';
import ApiCall from '../../../utils/ApiCall';
import PremiumFeature from '../../PremiumFeature/PremiumFeature';

const menu = ['Indian', 'Asian', 'World', 'Olympic'];

const Records = ({ route, params }) => {
  const navigation = useNavigation();
  const { sportName } = route.params;
  const [activeTab, setActiveTab] = useState(0);
  const [recordData, setRecordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedValue, setSelectedValue] = useState('Male');
  const [eventCategory, setEventCategory] = useState([]);
  const [playerCategory, setPlayerCategory] = useState([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false)

  const getMaster = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://prod.indiasportshub.com/master',
      });
      await AsyncStorage.setItem('masterData', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRecords = async () => {
    try {
      setLoading(true);
      let userId = await AsyncStorage.getItem('userId');

      const response = await ApiCall({
        method: 'GET',
        endpoint: `records/by/sportName/${sportName}`,
        // url: `https://prod.indiasportshub.com/records/by/sportName/${sportName}`,
        params: {
          page: 0,
          limit: 500,
          gender: selectedValue === 'All' ? '' : selectedValue,
          athleteCategory: selectedPlayer ? selectedPlayer : '',
          eventCategory: selectedEvent ? selectedEvent : '',
          recordLevel:
            activeTab === 0
              ? 'Indian'
              : activeTab === 1
                ? 'Asian'
                : activeTab === 2
                  ? 'World'
                  : 'Olympics'
        },
      });

      setLoading(false);
      setRecordData(response?.data[0]?.data);
    } catch (error) {
      setLoading(false);
      setRecordData([]);
    }
  };

  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem('masterData');
      let user = await AsyncStorage.getItem("userData")

      user = user && JSON.parse(user)
      res = JSON.parse(res);

      setIsPremiumUser(user?.isPremiumUser)
      setEventCategory(res?.eventCategory?.[sportName]);
      setPlayerCategory([res?.playerCategory[0]]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    getMasterFields();
  }, [sportName]);

  useEffect(() => {
    getAllRecords();
  }, [selectedEvent, selectedPlayer, selectedValue, activeTab]);

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  const renderComponent = <>
    <View style={styles.sectionView}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6 }}>
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
      <View
        style={{
          width: '100%',
          backgroundColor: '#56BCBE',
          height: 1,
          marginTop: 10,
        }}
      />
      <View
        style={{
          // borderWidth: 1,
          width: '90%',
          borderColor: COLORS.gray,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Dropdown
          placeholder={selectedEvent || 'Event Categories '}
          data={eventCategory}
          getValue={value => setSelectedEvent(value)}
        />
      </View>
      <View
        style={{
          // borderWidth: 1,
          width: '90%',
          borderColor: COLORS.gray,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Dropdown
          placeholder={selectedPlayer || 'Player Categories '}
          data={playerCategory}
          getValue={value => setSelectedPlayer(value)}
        />
      </View>

      <View style={{ margin: 16 }}>
        <Text style={{ color: COLORS.black }}>Choose Player Type</Text>
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
              <RadioButton value="Male" color={COLORS.primary} />
              <Text style={{ color: COLORS.black }}>Male</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton value="Female" color={COLORS.primary} />
              <Text style={{ color: COLORS.black }}>Female</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="All" color={COLORS.primary} />
              <Text style={{ color: COLORS.black }}>All</Text>
            </View>
          </View>

        </RadioButton.Group>
      </View>
    </View>
    {loading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : (
      <View style={styles.sectionView}>
        <RecordTable data={recordData} type="recordType" />
      </View>
    )}
  </>

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
            RECORDS
          </Text>
        </View>
        {(isPremiumUser || Platform.OS == 'ios') ? renderComponent : <PremiumFeature child={renderComponent} />}
      </ScrollView>
    </>
  );
};

export default Records;

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
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
    height: 'auto',
    borderRadius: 15,
  },
});
