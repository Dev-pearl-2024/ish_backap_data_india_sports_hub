import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TennisIcon from '../../assets/icons/sportIcons/tennis.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import COLORS from '../../constants/Colors';
export default function SingleSportCard({name, icon, status}) {
  return (
    <View style={styles.cardBox}>
      <TennisIcon />

      <Text style={styles.textColor} numberOfLines={1}>
        {name}
      </Text>

      {status && (
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
    // minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 5,
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 4,
    width: '23%',
  },
  textColor: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteBox: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});
