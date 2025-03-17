import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TournamentEventCards from '../../FavoriteComponents/tournamentEventCards';
import SportsCards from '../../FavoriteComponents/sportsCards';
import { useState } from 'react';
import COLORS from '../../../constants/Colors';
import SportSelection from '../sportsSelection';
const menu = ['Individual Sports Event', 'Multi Sports Event'];

export default function TournamentSelection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 6 }}>
        {menu.map((item, id) => {
          return (
            <TouchableOpacity
              style={
                activeTab === id
                  ? styles.categoryButton
                  : styles.categoryButtonInactive
              }
              key={`menu-item-${id}`}
              onPress={() => setActiveTab(id)}>
              <Text
                style={
                  activeTab === id ? styles.activeText : styles.inactiveText
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {activeTab === 0 && <SportSelection route={'sports-tournament'} />}
      {activeTab === 1 && <TournamentEventCards source={'multi-sports'} />}
    </View>
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
