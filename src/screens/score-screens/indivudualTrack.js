import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function IndivudualTrack() {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Rank
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              BIB No
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Contry / State
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Time
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Wind (m/s)
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Result/Status
            </Text>
          </View>
           
          <View style={{flexDirection: 'row', paddingHorizontal: 10,backgroundColor:COLORS.table_gray}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              1 Athlete Name
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              30
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              2 Athlete Name
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              30
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}
