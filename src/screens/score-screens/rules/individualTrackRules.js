import {Text, View} from 'react-native';
import COLORS from '../../../constants/Colors';

export default function IndividualTrackRules() {
  return (
    <View style={{padding: 16, backgroundColor: COLORS.white}}>
      <Text style={{color: COLORS.black, fontSize: 14, fontWeight: 500}}>
        Rules for the Game.
      </Text>
    </View>
  );
}
