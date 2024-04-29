import {Image, Text, TouchableOpacity, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
const data = [
  {
    title: 'This is a dummy noticification.',
    event: 'Event Name.',
  },
  {
    title: 'This is a dummy noticification.',
    event: 'Event Name.',
  },
];
export default function Notification() {
  return (
    <View>
      <BackHeader />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              padding: 16,
              marginVertical: 5,
              backgroundColor: COLORS.white,
            }}>
            <View>
              <Image
                source={require('../../assets/images/india.png')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View>
              <Text
                style={{color: COLORS.black, fontSize: 14, fontWeight: 700}}>
                This is a dummy noticification.
              </Text>
              <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                Event Name.
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
