import {Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function TripleDetailCard(props) {
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
          {props.firstTitle}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {props.firstContent}
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
          {props.secondTitle}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {props.secondContent}
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
          {props.thirdTitle}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 14,
            fontWeight: '400',
          }}>
          {props.thirdContent}
        </Text>
      </View>
    </View>
  );
}
