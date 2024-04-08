import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TennisIcon from '../../assets/icons/sportIcons/tennis.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import COLORS from '../../constants/Colors';
export default function SingleSportCard({name, icon, status}) {
  return (
    <View style={styles.cardBox}>
      <TennisIcon />
      <Text style={styles.textColor}>{name}</Text>
      {status === 'active' && (
        <TouchableOpacity style={styles.favoriteBox}>
          <RedHeart />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_gray,
    borderWidth: 1,
    borderRadius: 8,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 5,
    position: 'relative',
  },
  textColor: {
    color: COLORS.black,
  },
  favoriteBox: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
