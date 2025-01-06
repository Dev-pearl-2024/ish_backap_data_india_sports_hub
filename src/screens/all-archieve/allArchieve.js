import {StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import SportSelection from '../../components/allsportsComponents/sportsSelection';
import COLORS from '../../constants/Colors';

export default function AllArchieve() {
  return (
    <View>
      <BackHeader />
      <Text style={styles.sportsTitle}>All Archives</Text>
      <SportSelection route={'archieve-tournament'} />

    </View>
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
})