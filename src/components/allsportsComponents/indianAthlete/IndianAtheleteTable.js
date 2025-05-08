import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GrayHeart from '../../../assets/icons/grayHeart.svg';
import RedHeart from '../../../assets/icons/redHeart.svg';
import { getAtheleteDataRequest } from '../../../redux/actions/atheleteActions';
import dynamicSize from '../../../utils/DynamicSize';
const width = Dimensions.get('window').width;
export default function IndianAthleteTable({ data, handleFav }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [url, setUrl] = useState('../../../assets/images/user.png')
  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({ params: userId }));
    navigation.navigate('athelete-profile', { athleteId: userId });
  };

  return (
    <ScrollView horizontal style={{ backgroundColor: COLORS.white }}>
      <View>
        {data.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              width: width + 50,
            }}>
            <Text style={{ width: '30%', color: '#56BCBE' }}></Text>
            <Text style={{ color: '#56BCBE', width: '20%', textAlign: 'right' }}>
              Age
            </Text>
            <Text style={{ color: '#56BCBE', width: '20%', textAlign: 'center' }}>
              Event
            </Text>
            <Text
              style={{ color: '#56BCBE', width: '20%', textAlign: 'start' }}></Text>
          </View>)}

        <FlatList
          data={data}
          keyExtractor={item => item._id}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                width: width,
              }}>
              <Text style={{ color: COLORS.black, textAlign: 'center' }}>No Data Found</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                padding: 10,
              }}
              onPress={() => {
                handleAtheleteProfileData(item?._id);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  width: '30%'
                }}>
                <Image
                  source={
                    item?.icon
                      ? { uri: item?.icon }
                      : require('../../../assets/images/user.png')
                  }
                  style={{ borderRadius: 50, width: dynamicSize(60), height: dynamicSize(60), objectFit: 'contain' }}
                />
                <Text style={{ color: COLORS.black }} numberOfLines={1}>
                  {item?.fullName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: dynamicSize("40")
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  {item?.age}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    textAlign: 'center',
                    // width: '20%',
                  }}>
                  {item?.eventCategory[0]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    textAlign: 'end',
                    width: '20%',
                  }}>
                  {item?.record}
                  {/* <TouchableOpacity
                    onPress={() => handleFav(item?._id, item?.isFavorite)}>
                    {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
                  </TouchableOpacity> */}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
