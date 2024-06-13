// import React, {useEffect}  from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {useSelector, useDispatch} from 'react-redux';
import {getAtheleteDataRequest} from '../../redux/actions/atheleteActions';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const width = Dimensions.get('window').width;

export default function UpadtedAtheleteTable({
  atheleteData,
  recordData,
  type,
  data,
  setData,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.sport.isLoading);

  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile', {athleteId: userId});
    console.log(userId, 'userid----------');
  };

  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `http://15.206.246.81:3000/users/myfavorite/${userId}/category/athlete`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      let events = data?.atheleteData?.map(item =>
        item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
      );

      setData({...data, atheleteData: events});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView horizontal style={{backgroundColor: COLORS.white}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 10,
            width: width + 50,
          }}>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 12,
              fontWeight: '500',
              width: '20%',
              textAlign: 'center',
            }}>
            Athlete
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 12,
              fontWeight: '500',
              width: '20%',
              textAlign: 'center',
            }}>
            {type === 'atheleteType'
              ? 'Age'
              : type === 'recordType'
              ? 'Category'
              : null}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 12,
              fontWeight: '500',
              width: '20%',
              textAlign: 'center',
            }}>
            {type === 'atheleteType'
              ? 'Event'
              : type === 'recordType'
              ? 'Distance'
              : null}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 12,
              width: '20%',
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {type === 'atheleteType'
              ? 'Sports'
              : type === 'recordType'
              ? 'Score'
              : null}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 12,
              width: '10%',
              fontWeight: '500',
              textAlign: 'center',
            }}></Text>
        </View>
        {atheleteData &&
          atheleteData?.map((item, id) => {
            console.log(atheleteData, '888888');
            return (
              <ShimmerPlaceholder
                stopAutoRun
                duration={1500}
                visible={!isLoading}
                style={styles.skeletonContainer}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    backgroundColor: id % 2 === 0 ? COLORS.gray : COLORS.white,
                    paddingHorizontal: 10,
                  }}
                  onPress={() => {
                    handleAtheleteProfileData(item?._id);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      paddingVertical: 8,
                      width: '20%',
                    }}>
                    <Image
                      source={
                        item?.icon
                          ? {uri: item?.icon}
                          : require('../../assets/images/user.png')
                      }
                      style={{
                        borderRadius: 15,
                        width: 25,
                        height: 25,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: COLORS.black,
                      }}>
                      {item?.fullName}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.black,
                      width: '20%',
                      textAlign: 'center',
                    }}>
                    {item?.age}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.black,
                      width: '20%',
                      textAlign: 'center',
                    }}>
                    {item?.eventCategory[0]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.black,
                      width: '20%',
                      textAlign: 'center',
                    }}>
                    {item?.sports}
                  </Text>
                  <View
                    style={{
                      width: '10%',
                      textAlign: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleFav(item?._id, item?.isFavorite)}>
                      {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </ShimmerPlaceholder>
            );
          })}
        {recordData &&
          recordData?.map((item, id) => {
            return (
              <ShimmerPlaceholder
                stopAutoRun
                duration={1500}
                visible={!isLoading}
                style={styles.skeletonContainer}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: id % 2 === 0 ? COLORS.gray : COLORS.white,
                    paddingHorizontal: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('athelete-profile');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                      paddingVertical: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: COLORS.black,
                      }}>
                      {item?.eventInfo.slice(0, 10) + '...'}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.black,
                    }}>
                    {item?.category}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: COLORS.black,
                    }}>
                    {item?.record}
                  </Text>
                </TouchableOpacity>
              </ShimmerPlaceholder>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
  },
});
