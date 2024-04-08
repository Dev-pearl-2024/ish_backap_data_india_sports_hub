import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';

export default function LiveCard(props) {
  return (
    <View style={styles.mainCard}>
      <View style={styles.flexRowAwayCenter}>
        <View style={styles.flexCenterGap}>
          <Image
            source={require('../../assets/images/img1.png')}
            style={styles.dpImage}
          />
          <Text style={styles.titleText}>{props?.title}</Text>
        </View>
        <View style={styles.flexCenterGap}>
          <View style={styles.liveDot}></View>
          <Text style={styles.liveText}>{props?.status}</Text>
        </View>
      </View>
      <View style={styles.viewContent}>
        <View>
          <Text style={styles.detailText}>{props?.date}</Text>
          <Text style={styles.detailText}>{props?.category}</Text>
        </View>
        <TouchableOpacity>
          <RedHeart />
        </TouchableOpacity>
      </View>
      <View style={styles.viewContent}>
        <View style={styles.flexCenterGap}>
          <Image
            source={require('../../assets/images/india.png')}
            style={styles.scoreImage}
          />
          <Text style={styles.scoreCountryText}>{props?.country1}</Text>
        </View>
        <View style={styles.flexCenterGap}>
          <Text style={styles.scoreText}>{props?.score}</Text>
        </View>
        <View style={styles.flexCenterGap}>
          <Image
            source={require('../../assets/images/india.png')}
            style={styles.scoreImage}
          />
          <Text style={styles.scoreCountryText}>{props?.country2}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 8,
    padding: 10,
    borderColor: COLORS.light_gray,
    borderWidth: 2,
    shadowColor: COLORS.light_gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: COLORS.white,
    marginVertical:5,
  },
  flexRowAwayCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCenterGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dpImage: {
    width: 22,
    height: 22,
    borderRadius: 50,
    objectFit: 'cover',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: COLORS.red,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.medium_gray,
  },
  viewContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreImage: {
    width: 22,
    height: 22,
    borderRadius: 50,
    objectFit: 'contain',
  },
  scoreCountryText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.black,
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
  },
  detailText: {
    color: COLORS.medium_gray,
    fontSize: 10,
    fontWeight: '500',
  },
});
