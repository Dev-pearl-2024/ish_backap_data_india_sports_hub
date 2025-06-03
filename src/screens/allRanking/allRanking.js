import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import Dropdown from '../../components/dropdown/Dropdown';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
import { RadioButton } from 'react-native-paper';
import RankingTable from './rankingTable';
import iconData from '../../data/sportsData';
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import IndividualRanking from './individualRanking';

const menu = ['Indian', 'Asian', 'World'];

const AllRanking = ({ route, params }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const { sportName } = route.params;
  const [selectedValue, setSelectedValue] = useState('Male');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [data, setData] = useState([]);
  const [eventCategory, setEventCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerCategory, setPlayerCategory] = useState([]);
  const [atheleteData, setAtheleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    const data = await AsyncStorage.getItem('userData')
    const jsonData = JSON.parse(data || '{}')
    setUserData(jsonData)
    try {
      setIsLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/users/${userId}`,
      });
      setUserData(res?.data?.existing);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  const getRankingData = async (reset = true) => {
    setLoading(true);
    if (reset) {
      setLoading(true);
    }

    const params = {
      rankingLevel: activeTab == 0 ? 'Indian' : activeTab == 1 ? 'Asian' : 'World',
      eventGender: selectedValue === 'Male' ? "Men's" : selectedValue === 'Female' ? "Women's" : 'Other',
      sports: sportName,
      eventCategory: selectedEvent,
      limit: 150,
      page: 1,
    };

    try {
      const res = await axios.get(`https://prod.indiasportshub.com/rankings/data`, { params });
      const newPlayers = res?.data?.data || [];
      if (reset) {
        setData(newPlayers);
      } else {
        setData(prev => [...prev, ...newPlayers]);
      }

      setLoading(false)
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
  };

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

  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem("masterData");
      res = JSON.parse(res);
      const [PlayerCategorySenior] = res?.playerCategory
      setEventCategory(res?.eventCategory?.[sportName]);
      setPlayerCategory([PlayerCategorySenior]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMaster()
    getUserData()
  }, [])

  useEffect(() => {
    getRankingData();
  }, [selectedEvent, selectedPlayer, selectedValue, activeTab]);

  useEffect(() => {
    getMasterFields();
  }, [sportName]);

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === sportName?.toLowerCase(),
  );

  const renderComponent = <>
    <View style={styles.rankingCateg}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 6 }}>
        {menu?.map((item, id) => {
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
      <View style={styles.separator} />
    </View>
    <ScrollView>
      <View style={styles.Container}>
        <View style={styles.dropdownSection}>
          <Dropdown
            placeholder="Event Categories"
            data={eventCategory}
            getValue={value => setSelectedEvent(value)}
          />
        </View>
        {/* <View style={styles.dropdownSection}>
          <Dropdown
            placeholder="Player Categories"
            data={playerCategory}
            getValue={value => setSelectedPlayer(value)}
          />
        </View> */}
        <View style={{ ...styles.radioSection, marginTop: 10 }}>
          <Text style={styles.radioLabel}>Choose Gender</Text>
          <RadioButton.Group
            onValueChange={value => handleRadioButtonPress(value)}
            value={selectedValue}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <RadioButton value="Male" color={COLORS.primary} />
                <Text style={{ color: COLORS.black }}>Male</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <RadioButton value="Female" color={COLORS.primary} />
                <Text style={{ color: COLORS.black }}>Female</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="Others" color={COLORS.primary} />
                <Text style={{ color: COLORS.black }}>Others</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </ScrollView>
    <IndividualRanking
      sportName={sportName}
      sportIcon={sportsData}
      eventCategory={selectedEvent}
      loading={loading}
      data={data}
      selectedCategory={activeTab == 0 ? 'Indian' : activeTab == 1 ? 'Asian' : 'World'}
    />
  </>

  return (
    <SafeAreaView>
      <ScrollView>
        <BackHeader />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            alignItems: 'center',
            padding: 10,
            borderRadius: 15,
          }}>
          <Text style={styles.rankingTitle}>ALL RANKINGS</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {sportsData.icon}
            <Text style={styles.sportsTitle}>{sportName}</Text>
          </View>
        </View>
        {userData?.isPremiumUser || Platform.OS == 'ios' ? renderComponent : <PremiumFeature child={renderComponent} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRanking;

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
  Container: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  dropdownSection: { paddingVertical: 10 },
  radioLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.light_gray,
  },
  rankingTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
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
  rankingCateg: {
    marginTop: 10,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
});
