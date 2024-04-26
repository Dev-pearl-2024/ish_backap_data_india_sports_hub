import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
export const SLIDER_WIDTH = Dimensions.get('window').width + 10;
export const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;

export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
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
              Olympic 2024
            </Text>
            <Text style={{color: COLORS.black}}>Women's / 200 m / Final</Text>
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
        24/Jan/2024 | 04:00pm
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
    padding: 10,
    width: '95%',
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

export default CarouselCardItem;
