import {Image, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
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

export default function AtheleteTable() {
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
      {atheleteData.map((item, id) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: id % 2 === 0 ? COLORS.gray : COLORS.white,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}>
              <Image
                source={require('../../assets/images/athelete.png')}
                style={{
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
                Olivia Brown
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: COLORS.black,
              }}>
              24
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
          </View>
        );
      })}
    </View>
  );
}
