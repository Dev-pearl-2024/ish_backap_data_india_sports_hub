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
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LiveCard(props) {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      style={styles.mainCard}
      onPress={() => {
        navigation.navigate('score-view', {sportData: props?.data});
      }}>
      <View style={styles.flexRowAwayCenter}>
        <View style={styles.flexCenterGap}>
          <Image
            source={require('../../assets/images/img1.png')}
            style={styles.dpImage}
          />
          <Text style={styles.titleText}>{props?.title}</Text>
        </View>

        <LiveText props={props} />
      </View>
      <View style={styles.viewContent}>
        <View>
          <Text style={styles.detailText}>
            {moment(props?.date)?.format('DD/MMM/YYYY')} | {props?.time}
          </Text>
          <Text style={styles.detailText}>{props?.category}</Text>
        </View>
        <TouchableOpacity onPress={() => props?.handleFav(props?.data?._id,props?.isFavorite)}>
          {props?.isFavorite ? <RedHeart /> : <GrayHeart />}
        </TouchableOpacity>
      </View>
      <View style={styles.viewContent}>
        <View style={styles.flexCenterGap}>
          <Image
            source={props?.data?.team[0]?.coverImage ? {uri:props?.data?.team[0]?.coverImage} : require('../../assets/images/user.png')}
            style={styles.scoreImage}
          />
          <Text style={styles.scoreCountryText}>{props?.data?.team[0]?.name}</Text>
        </View>
        <View style={styles.flexCenterGap}>
          <Text style={styles.scoreText}>{props?.score}</Text>
        </View>
        <View style={styles.flexCenterGap}>
          <Image
            source={require('../../assets/images/india.png')}
            style={styles.scoreImage}
          />
          <Text style={styles.scoreCountryText}>{props?.data?.team[1]?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const LiveText = props => {
  if (moment()?.isBetween(props?.props?.startDate, props?.props?.endDate)) {
    return (
      <View style={styles.flexCenterGap}>
        <View style={styles.liveDot}></View>
        <Text style={styles.liveText}>Live</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 8,
    padding: 10,
    borderColor: COLORS.lighter_gray,
    borderWidth: 2,
    shadowColor: COLORS.lighter_gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: COLORS.white,
    marginVertical: 5,
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
    color: COLORS.light_gray,
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
    objectFit: 'cover',
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
    color: COLORS.light_gray,
    fontSize: 10,
    fontWeight: '500',
  },
});
