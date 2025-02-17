import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';
import { useSelector } from 'react-redux';
import moment from 'moment';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import { Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import iconData from '../../data/sportsDataSmall';
import BannerAdComponent from '../Ads/BannerAdsComponent';
import NativeAdComponent from '../Ads/NativeAdsComponent';
import ScoreCard from '../ScoreCardComponents/ScoreCardFootBall';
import dynamicSize from '../../utils/DynamicSize';
const SLIDER_WIDTH = Dimensions.get('window').width - 20;
const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCards = ({ carouselData, authState, setInternationalData}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState(null)
  const [isPremium,setIsPremium] = useState("")

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }
  
   useEffect(() => {
    getStoreData()
  }, [])

   useEffect(() => {
    const getUserDetails = async () => {
      const userID = await AsyncStorage.getItem('userId');
        try {
          const response = await axios({
            method: 'GET',
            url: `https://prod.indiasportshub.com/users/${userID}`,
          });
          if (response?.data?.message === 'User found successfully') {
            setIsPremium(response.data.existing.isPremiumUser)
          }
          return response.data;
        } catch (error) {
          throw new Error('Failed get User Details', error);
        }
      };
      getUserDetails()
   
  }, [])
  

  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });

      setInternationalData(
        [carouselData?.[0]?.map(item => 
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item
        )]
      );
    } catch (e) {
      console.log(e);
    }
  };

  const renderVs = item => {
    return <ScoreCard item={item} />;
  };

  const renderCarouselItem = ({ item, index }) => {
    const sportsData = iconData?.find(
      icon => icon.name?.toLowerCase() === item.sport?.toLowerCase(),
    );

    return item?.type === 'GOOGLE_AD' ? (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('score-view', { sportData: item,isPremiumUser:isPremium });
        }}
        style={[styles.container]}
        key={index}>
        <Text style={{ color: COLORS.black }}>Google Ads</Text>
        <BannerAdComponent />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('score-view', { sportData: item,isPremiumUser:isPremium });
        }}
        style={[styles.container]}
        key={index}
        activeOpacity={0.9}
      >
        <View style={{flexDirection: 'row',justifyContent: 'flex-start',width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'flex-start',
            }}>
            {sportsData?.icon}

            <View style={{ marginHorizontal: 10, width: '70%' }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: dynamicSize(12), fontWeight: '700', color: COLORS.black }}>
                {item?.name}
              </Text>
              <Text
                style={{  fontSize: dynamicSize(10),color: COLORS.black, width: '100%' }}
                numberOfLines={1}>
                {item?.eventGender} / {item?.tournamentName}
              </Text>
            </View>
          </View>

            <View style={{flex:1,justifyContent:"center",alignItems:"center",position:"absolute",right:0,top:5}}>
            <View
              style={{
                padding: 5,
                borderRadius: 5,
                width:"100%",
                borderWidth: 1,
                borderColor: item?.eventStatus.toLowerCase() === "completed"
                  ? 'green'
                  : item?.eventStatus.toLowerCase() === "upcoming"
                    ? 'blue'
                    : item?.eventStatus.toLowerCase() === "live"
                      ? 'red'
                      : 'gray'
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: dynamicSize(8),
                  textTransform: "capitalize",
                  fontWeight: '500',
                  color: item?.eventStatus.toLowerCase() === "completed"
                    ? 'green'
                    : item?.eventStatus.toLowerCase() === "upcoming"
                      ? 'blue'
                      : item?.eventStatus.toLowerCase() === "live"
                        ? 'red'
                        : 'gray', // default text color if none of the conditions match
                }}
              >
                {item?.eventStatus.toLowerCase()}
              </Text>
            </View>
            </View>
          <LiveText props={item} />
        </View>

        <View style={{ alignContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginVertical: dynamicSize(5),
              padding: dynamicSize(2),
            }}>
            {renderVs(item)}
          </View>
          {/* <View style={styles.line} /> */}

          <Text style={{ textAlign: 'center', fontSize: dynamicSize(10), color: COLORS.black }}>
            {moment(item?.startDate).format('DD/MM/YYYY')} | {item?.startTime}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: dynamicSize(2),alignItems:"center" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item?.sponsorsDetails?.sponsorLogo && <Text
              style={{
                fontSize: dynamicSize(10),
                fontWeight: '500',
                color: COLORS.black,
              }}>
              Powered by :{' '}
            </Text>}
           <TouchableOpacity onPress={() => Linking.openURL(item?.sponsorsDetails?.sponsorLink)}>
             <Image
              style={{
                height: dynamicSize(25),
                width: dynamicSize(50),
                borderRadius: dynamicSize(10),
                objectFit:"contain"
              }}
              source={{ uri: item?.sponsorsDetails?.sponsorLogo }}
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              accessToken ? handleFav(item._id, item.isFavorite) : navigation.navigate("Login")
            }}
          >
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
        data={carouselData[0]}
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
        dotsLength={carouselData[0].length}
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
    marginVertical: dynamicSize(2),
    paddingHorizontal: dynamicSize(7),
    width: '95%',
    borderRadius: dynamicSize(5),
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: dynamicSize(0),
      height: dynamicSize(1),
    },
    // paddingTop: dynamicSize(5),
    shadowOpacity: 0.25,
    shadowRadius: dynamicSize(2),
    elevation: 5,
    position: 'relative',
  },
  skeletonContainer: {
    width: '95%',
    borderRadius: dynamicSize(4),
  },
  redDot: {
    width: dynamicSize(10),
    height: dynamicSize(10),
    borderRadius: dynamicSize(50),
    backgroundColor: COLORS.red,
    marginHorizontal: dynamicSize(5),
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
    height: dynamicSize(2),
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: dynamicSize(10),
  },

  containerVs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  team: {},
  vsIcon: {
    width: dynamicSize(10), // Adjust the width as needed
    height: dynamicSize(50), // Adjust the height as needed
  },
});
