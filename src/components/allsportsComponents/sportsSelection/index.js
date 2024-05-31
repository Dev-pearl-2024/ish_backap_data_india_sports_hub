import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  getSportsDataRequest,
  addFavoutiteRequest,
  selectSport,
} from '../../../redux/actions/sportsActions';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export default function SportSelection({route, filter}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sportsData = useSelector(state => state.sport.data);
  // const isLoading = useSelector(state => state.sport.isLoading);
  const [data, setData] = useState([]);
  // const [sportsData, setSportsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSportsDataRequest());
  }, [dispatch]);

  useEffect(() => {
    const mergeData = sportsData?.map(sport => {
      const foundSport = iconData.find(
        item => item?.name?.toLowerCase() === sport?.name?.toLowerCase(),
      );
      return foundSport ? {...sport, icon: foundSport.icon} : sport;
    });
    setData(mergeData);
  }, [iconData]);

  useEffect(()=>{
    if(sportsData?.length > 0){
      setIsLoading(false);
    }
  },[sportsData])

  const addFavorite = async (name, status) => {
    dispatch(addFavoutiteRequest(name, status));
    setData(
      data?.map(item =>
        item.name === name ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  };

  const handleSportName = sportName => {
    dispatch(selectSport(sportName));
    navigation.navigate(route, {sportName: sportName});
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}} key={index}>
        <TouchableOpacity onPress={() => handleSportName(item?.name)}>
          <ShimmerPlaceholder
            stopAutoRun
            duration={1500}
            visible={!isLoading}
            style={styles.skeletonContainer}>
            <View style={styles.sports}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', paddingHorizontal: 6}}
                onPress={() => {
                  addFavorite(item?.name, !item?.isFavorite);
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
        <ActivityIndicator size="large" style={{marginVertical: 20}} />
      ) : (
        <View style={styles.sportsContainer}>
          <FlatList
            contentContainerStyle={{paddingBottom: 220}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sportsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
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
