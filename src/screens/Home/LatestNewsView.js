import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LatestNews from '../../components/HomeComponents/LatestNews';
import COLORS from '../../constants/Colors';
import BackHeader from '../../components/Header/BackHeader';

export default function LatestNewsView() {
  return (
    <>
      <BackHeader />
      <Text style={styles.sportsTitle}>Latest News</Text>
      <View style={{ marginBottom: "40%" }}>
        <LatestNews showTitle={false} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
});
