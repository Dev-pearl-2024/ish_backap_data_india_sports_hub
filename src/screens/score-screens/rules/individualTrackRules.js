import {Text, View} from 'react-native';
import COLORS from '../../../constants/Colors';
import { sportRules } from '../../../constants/sportsRules';

export default function IndividualTrackRules({sport}) {
   
  return (
    <View style={{padding: 16, backgroundColor: COLORS.white}}>
      <Text style={{color: COLORS.black, fontSize: 14, fontWeight: 400}}>
        {sport}
      </Text>
    </View>
  );
}
