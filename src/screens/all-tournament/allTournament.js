import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import { useState } from 'react';
import TournamentEventCards from '../../components/FavoriteComponents/tournamentEventCards';
import SportsCards from '../../components/FavoriteComponents/sportsCards';
import TournamentSelection from '../../components/allsportsComponents/tournamentSelection';
const menu = ['Multi Sports Event', 'Filter Sports Event'];
export default function AllTournament() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ScrollView>
      <BackHeader />
      <Text style={styles.titleFont}>TOURNAMENTS</Text>
     <TournamentSelection />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleFont: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
  },

  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
});
