import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import iconData from '../../../data/sportsData';
import COLORS from '../../../constants/Colors';
import RedHeart from '../../../assets/icons/redHeart.svg';
import GrayHeart from '../../../assets/icons/grayHeart.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSportsDataRequest,
  addFavoutiteRequest,
  selectSport,
} from '../../../redux/actions/sportsActions';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SportSelection({ route, filter }) {
  const navigation = useNavigation();
  const [sportsData, setSportsData] = useState([]);
  // const isLoading = useSelector(state => state.sport.isLoading);
  const [data, setData] = useState([]);
  // const [sportsData, setSportsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null)

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }

  const getAllSports = async () => {
    try {
      setIsLoading(true);
      let userId = await AsyncStorage.getItem('userId');

      const response = await axios({
        method: 'GET',
        url: `https://prod.indiasportshub.com/all/sports/${userId}`,
      });
      if (filter === 'favorite') {
        const favoriteData = response.data.sports.filter(item => item.isFavorite);
        setSportsData(favoriteData?.sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setSportsData(response?.data?.sports?.sort((a, b) => a.name.localeCompare(b.name)));
      }
      // setSportsData(response.data.sports);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'Error:');
    }
  };

  useEffect(() => {
    getStoreData()
  }, [])

  useEffect(() => {
    getAllSports();
  }, []);

  useEffect(() => {
    const mergeData = sportsData?.map(sport => {
      const foundSport = iconData.find(
        item => item?.name?.toLowerCase() === sport?.name?.toLowerCase(),
      );
      return foundSport ? { ...sport, icon: foundSport.icon } : sport;
    });
    setData(mergeData);
  }, [iconData, sportsData]);

  const addFavorite = async (name, status) => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const response = await axios({
        method: 'POST',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/sport`,
        data: { sportName: name, isAdd: status },
      });
    } catch (e) {
      console.log(e);
    }
    setData(
      data?.map(item =>
        item.name === name ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
  };

  const handleSportName = sportName => {
    dispatch(selectSport(sportName));
    navigation.navigate(route, { sportName: sportName });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 10 }} key={index}>
        <TouchableOpacity onPress={() => handleSportName(item?.name)}>
          <ShimmerPlaceholder
            stopAutoRun
            duration={1500}
            visible={!isLoading}
            style={styles.skeletonContainer}>
            <View style={styles.sports}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', paddingHorizontal: 6 }}
                onPress={() => {
                  accessToken ? addFavorite(item?.name, !item?.isFavorite) : navigation.navigate("Login")
                }}>
                {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
              </TouchableOpacity>
              {item?.icon}
              <Text style={styles.sportsName}>{item?.name}</Text>
            </View>
          </ShimmerPlaceholder>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.sportsContainer}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 220 }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{ color: COLORS.black }}>No Sports Found</Text>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sportsContainer: {
    flexDirection: 'column',
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  sports: {
    width: '100%',
    height: '100%',
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportsName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.black,
  },
  skeletonContainer: {
    width: 100,
    height: 100,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 4,
  },
});
