import {
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
const height = Dimensions.get('window').height;
export default function TournamentEventCards({data}) {
  const navigation = useNavigation();
  const [multidata, setMultiData] = useState([]);
  const getMultSportsData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/tournaments/filter/data?userId=${userId}&page=0&limit=20`,
      });
      setMultiData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMultSportsData();
  }, []);

  return (
    <View
      style={{
        // backgroundColor: COLORS.white,
        // padding: 16,
        height: height - 200,
        // flexDirection: 'row',
        // gap: 16,
        // flexWrap: 'wrap',
        // justifyContent:
        //   (data || multidata)?.length < 2 ? 'flex-start' : 'space-between',
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginVertical: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
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
                  width: 100,
                  height: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 10,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => {
                  navigation.navigate('tournament-view', {
                    tournamentDetail: item,
                  });
                }}>
                <Image
                  source={
                    (item?.icon || item?.coverImage)
                      ? {uri:item?.icon || item?.coverImage}
                      : require('../../assets/images/olympic.png')
                  }
                  style={{
                    width: 80,
                    height: 50,
                    objectFit: 'contain',
                    borderRadius: 10,
                  }}
                />
                <Text numberOfLines={2} ellipsizeMode="tail" style={{color: COLORS.black, textAlign: 'center'}}>
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
              marginTop: 50,
            }}>
            <Text style={{color: COLORS.black}}>No Tournaments Found</Text>
          </View>
        }
      />
    </View>
  );
}
