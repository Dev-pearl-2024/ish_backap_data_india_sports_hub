
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScoreCard from './ScoreCardFootBall';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';
import iconData from '../../data/sportsDataSmall';
import BannerAdComponent from '../Ads/BannerAdsComponent';
import moment from 'moment';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import VsIcon from '../../assets/icons/Vs.svg'



const renderVs = item => {
  return <ScoreCard item={item} />;
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

const NewSportCard = ({ item, index, isPremiumUser, margin, changeTitle = false, favoriteIconShow = true }) => {
  const [data, setData] = useState(item)
  const navigation = useNavigation()
  const [accessToken, setAccessToken] = useState(null)

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }

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

      setData({ ...item, isFavorite: !fav })

    } catch (e) {
      console.log(e);
    }
  };

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === item.sport?.toLowerCase(),
  );

  useEffect(() => {
    getStoreData()
  }, [])

  return item?.type === 'GOOGLE_AD' ? (
    <TouchableOpacity
      style={[styles.container, { marginVertical: margin ? dynamicSize(margin) : dynamicSize(2) }]}
      key={index}>
      <Text style={{ color: COLORS.black }}>Google Ads</Text>
      <BannerAdComponent />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('score-view', { sportData: item, isPremiumUser: isPremiumUser });
      }}
      style={[styles.container, { marginVertical: margin ? dynamicSize(margin) : dynamicSize(2) }]}
      key={index}
      activeOpacity={0.9}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'flex-start',
          }}>
          {sportsData?.icon}

          <View style={{ marginHorizontal: 10, width: '75%' }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: dynamicSize(12), fontWeight: '700', color: COLORS.black }}>
              {changeTitle ? item?.tournamentName : item?.name}
            </Text>
            <Text
              style={{ fontSize: dynamicSize(10), color: COLORS.black, width: '100%' }}
              numberOfLines={1}>
              {changeTitle ? item?.eventCategory || item?.category : item?.eventGender} / {changeTitle ? item?.eventGender : item?.tournamentName}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: 5 }}>
          {item?.eventStatus && <View
            style={{
              padding: 5,
              borderRadius: 5,
              width: "100%",
              borderWidth: 1,
              borderColor: item?.eventStatus?.toLowerCase() === "completed"
                ? 'green'
                : item?.eventStatus?.toLowerCase() === "upcoming"
                  ? 'blue'
                  : item?.eventStatus?.toLowerCase() === "live"
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
                color: item?.eventStatus?.toLowerCase() === "completed"
                  ? 'green'
                  : item?.eventStatus?.toLowerCase() === "upcoming"
                    ? 'blue'
                    : item?.eventStatus?.toLowerCase() === "live"
                      ? 'red'
                      : 'gray', // default text color if none of the conditions match
              }}
            >
              {item?.eventStatus?.toLowerCase()}
            </Text>
          </View>}
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
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View >
            <Text style={{ textAlign: 'left', position: "absolute", fontSize: dynamicSize(10), color: COLORS.black }}>
              Stage : {item?.eventStage}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: dynamicSize(10), color: COLORS.black }}>
              {moment(item?.startDate).format('DD/MM/YYYY')} | {item?.startTime}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: dynamicSize(2), alignItems: "center" }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item?.sponsorsDetails?.sponsorLogo && <Text
            style={{
              fontSize: dynamicSize(10),
              fontWeight: '500',
              color: COLORS.black,
            }}>
            Powered by :{' '}
          </Text>}
          <Image
            style={{
              height: dynamicSize(25),
              width: dynamicSize(50),
              borderRadius: dynamicSize(10),
              objectFit: "contain"
            }}
            source={{ uri: item?.sponsorsDetails?.sponsorLogo }}
          />
        </View>
        {favoriteIconShow && <TouchableOpacity
          onPress={() => {
            accessToken ? handleFav(item._id, data.isFavorite) : navigation.navigate("Login")
          }}
        >
          {data?.isFavorite ? <RedHeart /> : <GrayHeart />}
        </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
};

export default NewSportCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: dynamicSize(2),
    paddingHorizontal: dynamicSize(10),
    width: '95%',
    borderRadius: dynamicSize(5),
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: dynamicSize(0),
      height: dynamicSize(1),
    },
    padding: dynamicSize(5),
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
