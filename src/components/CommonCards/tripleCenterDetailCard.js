import { Text, View } from 'react-native';
import COLORS from '../../constants/Colors';

export default function TripleDetailCard({ athProfileData, isTeam = false }) {

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
          alignItems: isTeam ? 'left' : 'center',
        }}>
        <Text
          style={{
            color: COLORS.medium_gray,
            fontSize: 12,
            fontWeight: '500',
          }}>
          {isTeam ? "Governing Body" : "DOB"}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'left'
          }}>
          {isTeam ? `Global : ${athProfileData?.governingBody?.global == undefined ? '' : athProfileData?.governingBody?.global}` : athProfileData?.dob}
        </Text>
        {isTeam && <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'left'
          }}>
          India :{isTeam && athProfileData?.governingBody?.india}
        </Text>}
      </View>
      {<View
        style={{
          borderRightWidth: 1,
          borderRightColor: COLORS.medium_gray,
          width: 1,
          height: '70%',
        }}></View>}
      {!isTeam ? <View
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
      </View> : <View
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
          World Ranking
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {athProfileData?.age}
        </Text>
      </View>}
    </View>
  );
}
