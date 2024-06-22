// import React, {useEffect}  from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {useSelector, useDispatch} from 'react-redux';
import {getAtheleteDataRequest} from '../../redux/actions/atheleteActions';

export default function AtheleteTable({atheleteData, recordData, type}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.sport.isLoading);

  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile',{athleteId: userId});
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 70,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: 12,
            fontWeight: '500',
            width: '30%',
          }}></Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: 12,
            fontWeight: '500',
            width: '20%',
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
          }}>
          {type === 'atheleteType'
            ? 'Sports'
            : type === 'recordType'
            ? 'Score'
            : null}
        </Text>
      </View>
      {atheleteData &&
        atheleteData?.map((item, id) => {
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
                    width: '30%',
                  }}>
                  <Image
                    source={{uri: item?.icon}}
                    style={{
                      borderRadius: 15,
                      width: 40,
                      height: 40,
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
                  }}>
                  {item?.age}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    width: '20%',
                  }}>
                  Event Name +3
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLORS.black,
                    width: '20%',
                  }}>
                  {item?.sports}
                </Text>
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
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
  },
});
