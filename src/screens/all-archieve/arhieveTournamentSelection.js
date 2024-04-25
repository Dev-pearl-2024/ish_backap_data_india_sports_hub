import {StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import TournamentSelection from '../../components/allsportsComponents/tournamentSelection';

export default function AllArchieveTournament() {
  return (
    <View>
      <BackHeader />
      <Text style={styles.sportsTitle}>All Archieve</Text>
      <TournamentSelection />

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