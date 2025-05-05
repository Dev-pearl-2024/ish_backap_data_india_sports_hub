import { ScrollView, Text, View } from 'react-native';
import COLORS from '../../../constants/Colors';
import { sportRules } from '../../../constants/sportsRules';
import RenderHtml from 'react-native-render-html';

export default function IndividualTrackRules({ sport }) {

  return (
    <ScrollView style={{ padding: 16, backgroundColor: COLORS.white }}>
      <RenderHtml source={{ html: `<div style="color: black;">${sport}</div>` }} />
    </ScrollView>
  );
}
