import { ScrollView, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../constants/Colors';
import RenderHtml from 'react-native-render-html';

export default function AboutAchievement({ data }) {
  return (
    <ScrollView style={styles.container}>
      <RenderHtml source={{
        html: `<div style="color: black;">
          ${data}
        </div>` }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: COLORS.black,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },
  contentText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical: 5,
  },
});
