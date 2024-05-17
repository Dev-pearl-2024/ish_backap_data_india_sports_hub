import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import BackHeader from '../../components/Header/BackHeader';
import RedHeart from '../../assets/icons/redHeart.svg';

import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 10;
export const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function LatestInterNationalView({route}) {
  const {internationalData} = route.params;
  const navigation = useNavigation();

  return (
    <>
      <BackHeader />
      <Text style={styles.sportsTitle}>Latest International</Text>
      <ScrollView>
        {internationalData.map((item, index) => (
          <CarouselCardItem key={index} item={item} navigation={navigation} />
        ))}
      </ScrollView>
    </>
  );
}

const CarouselCardItem = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('score-view', {sportData: item});
      }}
      style={styles.container}
      key={index}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <FootballIcon />
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
              {item?.name}
            </Text>
            <Text style={{color: COLORS.black}}>
              {item?.eventGender} / {item?.category} / Final
            </Text>
          </View>
        </View>

        <View style={styles.liveView}>
          <View style={styles.redDot} />
          <Text style={{color: COLORS.medium_gray}}>Live</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        {[1, 2, 3, 4].map((item, index) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
            }}>
            <Image
              source={require('../../assets/images/india.png')}
              style={{width: 22, height: 22}}
            />
            <Text style={{color: COLORS.black}}>India</Text>
            <Text style={{color: COLORS.black}}>82</Text>
          </View>
        ))}
      </View>
      <View style={styles.line} />
      <Text style={{textAlign: 'center', color: COLORS.black}}>
        {moment(item?.startDate).format('DD/MM/YYYY')} | {item?.startTime}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, fontWeight: '500', color: COLORS.black}}>
            Powered by :{' '}
          </Text>
          <Zomato />
        </View>
        <RedHeart />
      </View>
    </TouchableOpacity>
  );
};

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
  container: {
    // flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    // width: '95%',
    // height:'100%',
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: COLORS.red,
    marginHorizontal: 5,
  },
  liveView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  line: {
    width: '50%',
    height: 2,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
