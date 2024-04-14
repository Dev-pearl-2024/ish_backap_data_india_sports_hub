import {Image, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

export default function TournamentEventCards() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 16,
      }}>
      <TouchableOpacity
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
        }}
        onPress={() => {
          navigation.navigate('tournament-view');
        }}>
        <Image
          source={require('../../assets/images/olympic.png')}
          style={{width: 80, height: 50, objectFit: 'contain'}}
        />
        <Text style={{}}>Olympic</Text>
      </TouchableOpacity>
    </View>
  );
}
