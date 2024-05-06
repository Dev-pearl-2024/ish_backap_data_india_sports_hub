import {Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function TripleDetailCard({athProfileData}) {
  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        marginTop: 16,
      }}>
      <View
        style={{
          gap: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.medium_gray,
            fontSize: 12,
            fontWeight: '500',
          }}>
          Sports
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {athProfileData?.sports}
        </Text>
      </View>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: COLORS.medium_gray,
          width: 1,
          height: '70%',
        }}></View>
      <View
        style={{
          gap: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.medium_gray,
            fontSize: 12,
            fontWeight: '500',
          }}>
          DOB
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {athProfileData?.dob}
        </Text>
      </View>
      <View
        style={{
          borderRightWidth: 1,
          borderRightColor: COLORS.medium_gray,
          width: 1,
          height: '70%',
        }}></View>
      <View
        style={{
          gap: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: COLORS.medium_gray,
            fontSize: 12,
            fontWeight: '500',
          }}>
         Age
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {athProfileData?.age}
        </Text>
      </View>
    </View>
  );
}
