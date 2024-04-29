import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {useSelector} from 'react-redux';

const atheleteData = [
  {
    name: 'Olivia Brown',
    age: 24,
    eventName: 'Event Name +3',
    sport: 'Football',
  },
  {
    name: 'Olivia Brown',
    age: 24,
    eventName: 'Event Name +3',
    sport: 'Football',
  },
  {
    name: 'Olivia Brown',
    age: 24,
    eventName: 'Event Name +3',
    sport: 'Football',
  },
  {
    name: 'Olivia Brown',
    age: 24,
    eventName: 'Event Name +3',
    sport: 'Football',
  },
];

export default function AtheleteTable(atheleteData) {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.sport.isLoading);
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
          }}></Text>
        <Text
          style={{color: COLORS.secondary, fontSize: 12, fontWeight: '500'}}>
          Age
        </Text>
        <Text
          style={{color: COLORS.secondary, fontSize: 12, fontWeight: '500'}}>
          Event
        </Text>
        <Text
          style={{color: COLORS.secondary, fontSize: 12, fontWeight: '500'}}>
          Sports
        </Text>
      </View>
      {atheleteData && atheleteData?.atheleteData?.map((item, id) => {
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
            }}
            >
         
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingVertical: 8,
              }}>
              <Image
              source={{ uri: item?.icon }} 
                style={{
                  borderRadius:15,
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
              }}>
              {item?.age}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              Event Name +3
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              Football
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
width: '100%'
  },
});
