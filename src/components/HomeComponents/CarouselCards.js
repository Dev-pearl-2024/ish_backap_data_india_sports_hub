import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';
import {useSelector} from 'react-redux';
import moment from 'moment';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import {Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iconData from '../../data/sportsData';
const SLIDER_WIDTH = Dimensions.get('window').width - 20;
const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCards = ({carouselData, authState, setInternationalData}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();

  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `http://15.206.246.81:3000/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });

      setInternationalData(
        carouselData?.map(item =>
          item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const renderVs = item => {
    if (item?.participation === 'A Vs B') {
      return (
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
              width: 70,
            }}>
            <Image
              source={
                item.team[0]?.icon
                  ? {uri: item.team[0]?.icon}
                  : require('../../assets/images/user.png')
              }
              style={{width: 25, height: 25, borderRadius: 22}}
            />
            <Text
              style={{color: COLORS.black, width: 60, textAlign: 'center'}}
              numberOfLines={1}>
              {item.team[0]?.name}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
            }}>
            <View style={styles.containerVs}>
              <Text style={styles.team}>31</Text>
              <Image
                source={require('../../assets/images/vs.png')}
                style={styles.vsIcon}
              />
              <Text style={styles.team}>22</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
              width: 70,
            }}>
            <Image
              source={
                item.team[1]?.icon
                  ? {uri: item.team[1]?.icon}
                  : require('../../assets/images/user.png')
              }
              style={{width: 25, height: 25, borderRadius: 22}}
            />
            <Text
              style={{color: COLORS.black, width: 60, textAlign: 'center'}}
              numberOfLines={1}>
              {item.team[1]?.name}
            </Text>
          </View>
        </View>
      );
    } else {
      return item?.team?.slice(0, 4).map((subitem, subindex) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: SLIDER_HEIGHT / 15,
            paddingHorizontal: 24,
            width: 70,
          }}>
          <Image
            source={
              subitem?.icon
                ? {uri: subitem?.icon}
                : require('../../assets/images/user.png')
            }
            style={{width: 25, height: 25, borderRadius: 22}}
          />
          <Text
            style={{color: COLORS.black, width: 60, textAlign: 'center'}}
            numberOfLines={1}>
            {subitem?.name}
          </Text>
          {/* <Text style={{ color: COLORS.black }}>82</Text> */}
        </View>
      ));
    }
  };

  const renderCarouselItem = ({item, index}) => {
    const sportsData = iconData?.find(
      icon => icon.name?.toLowerCase() === item.sport?.toLowerCase(),
    );
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('score-view', {sportData: item});
        }}
        style={[styles.container]}
        key={index}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'flex-start',
            }}>
            {sportsData?.icon}

            <View style={{marginHorizontal: 10}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
                {item?.name}
              </Text>
              <Text
                style={{color: COLORS.black, width: '90%'}}
                numberOfLines={1}>
                {item?.eventGender} / {item?.category}
              </Text>
            </View>
            <View style={{backgroundColor: 'grey', padding: 5, borderRadius: 5}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
                {item?.eventType || 'Live'}
              </Text>
            </View>
          </View>

          <LiveText props={item} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          {renderVs(item)}
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
            <Text
              style={{fontSize: 12, fontWeight: '500', color: COLORS.black}}>
              Powered by :{' '}
            </Text>
            <Image
              style={{height: 20, width: 40, borderRadius: 10}}
              source={{uri: item?.sponsorsDetails?.sponsorLogo}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleFav(item._id, item.isFavorite);
            }}>
            {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const LiveText = props => {
    if (
      moment().isBetween(props?.startDate, props?.endDate) &&
      moment().isBetween(props?.startTime, props?.endTime)
    ) {
      return (
        <View style={styles.liveView}>
          <View style={styles.redDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Carousel
        layout="default"
        // layoutCardOffset={0} // Adjust gap between cards
        ref={isCarousel}
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        loop={true}
        activeSlideAlignment="center" // Align active slide to the start
        inactiveSlideScale={1} // Prevent scaling of inactive slides
        inactiveSlideOpacity={1} // Prevent opacity change of inactive slides
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: '#0166C2', // Change active dot color to blue
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}
        containerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          paddingVertical: 10,
          paddingHorizontal: 0,
          marginTop: 4,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        marginHorizontal={0}
        marginVertical={0}
        paddingVertical={0}
      />
    </View>
  );
};

export default CarouselCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
    paddingHorizontal: 10,
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
    paddingTop: 10,
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
  },
  skeletonContainer: {
    width: '95%',
    borderRadius: 4,
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

  containerVs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  team: {},
  vsIcon: {
    width: 10, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
});
