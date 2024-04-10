import {Image, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function TournamentEventCards() {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 16,
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.light_gray,
          width: 120,
          height: 120,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={require('../../assets/images/olympic.png')}
          style={{width: 80, height: 50, objectFit: 'contain'}}
        />
        <Text style={{}}>Olympic</Text>
      </View>
    </View>
  );
}
