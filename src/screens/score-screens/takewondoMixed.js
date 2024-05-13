import {Dimensions, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
const WIDTH = Dimensions.get('window').width;
export default function TakewondoMixed() {
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
              }}>Country - 1</Text>

            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Score 0-2
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
              Country - 2
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
              Remark
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
              1 Athlete Name
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
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              
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
             2 Athlete Name
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
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
