import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import dynamicSize from '../../utils/DynamicSize';

const height = Dimensions.get('window').height;

export default function TournamentEventCards({data, setData, source}) {
  const navigation = useNavigation();
  const [multidata, setMultiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMultSportsData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/tournaments/filter/data?userId=${userId}&page=0&limit=20`,
      });
      setMultiData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMultSportsData();
  }, []);

  const addFavorite = async (id, status) => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const response = await axios({
        method: 'POST',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/tournament`,
        data: {favoriteItemId: id, isAdd: status},
      });
    } catch (e) {
      console.log(e);
    }
    setData(
      data?.map(item =>
        item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  };
  return (
    <View
      style={{
        height: height - dynamicSize(200),
        flexDirection: 'column',
        paddingHorizontal: dynamicSize(10),
        paddingVertical: dynamicSize(16),
        backgroundColor: COLORS.white,
        borderRadius: dynamicSize(15),
        marginVertical: dynamicSize(10),
      }}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={data || multidata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={{padding: 10}} key={index}>
                <TouchableOpacity
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.light_gray,
                    width: dynamicSize(100),
                    height: dynamicSize(110),
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: dynamicSize(8),
                    borderRadius: dynamicSize(10),
                    backgroundColor: COLORS.white,
                    paddingTop: dynamicSize(10),
                  }}
                  onPress={() => {
                    navigation.navigate('tournament-view', {
                      tournamentDetail: item,
                      source: source
                    });
                  }}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      paddingHorizontal: 6,
                      position: 'absolute',
                      top: 3,
                      right: 2,
                      zIndex: 999,
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      borderRadius: 50,
                    }}
                    onPress={() => {
                      addFavorite(item?._id, !item?.isFavorite);
                    }}>
                    {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
                  </TouchableOpacity>
                  <Image
                    source={
                      item?.icon || item?.coverImage
                        ? {uri: item?.icon || item?.coverImage}
                        : require('../../assets/images/olympic.png')
                    }
                    style={{
                      width: dynamicSize(80),
                      height: dynamicSize(50),
                      objectFit: 'contain',
                      borderRadius: dynamicSize(10),
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{color: COLORS.black, textAlign: 'center'}}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: dynamicSize(50),
              }}>
              <Text style={{color: COLORS.black}}>No Tournaments Found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
