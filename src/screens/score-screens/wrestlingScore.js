import {Dimensions, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
const WIDTH = Dimensions.get('window').width;

export default function Wrestling() {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{width: '100%'}}>
          <View
            style={{flexDirection: 'row', paddingHorizontal: 10, width: WIDTH}}>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>

            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Athlete - 1
            </Text>

            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Athlete - 2
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
              width: WIDTH,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Round 1
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              width: WIDTH,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Round 2
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
