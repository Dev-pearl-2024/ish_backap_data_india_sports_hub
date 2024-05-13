import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import { Image } from 'react-native';

export default function ArcheryTable() {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <View style={{width: 100, flexDirection: 'row',gap:10}}>
              <Image
                source={require('../../assets/images/india.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  color: '#56BCBE',
                  fontSize: 12,
                  fontWeight: 500,

                  textAlign: 'start',
                  paddingVertical: 5,
                }}>
                United States
              </Text>
            </View>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              1
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              3
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Total
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
              Set Points
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Set - 1
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Set - 2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 70,
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
