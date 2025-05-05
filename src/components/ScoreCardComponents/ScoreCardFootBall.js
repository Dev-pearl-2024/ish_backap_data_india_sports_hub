import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';
import VsIcon from '../../assets/icons/Vs.svg'
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ScoreCard = ({ item, showHeart = null }) => {
  const navigation = useNavigation()
  const [markFavourite, setMarkFavourite] = useState({})
  const team1Players = item?.team && item?.team[0]?.players
  const team2Players = item?.team && item?.team[0]?.players
  const team1Url = team1Players?.length == 1 ? "athelete-profile" : "team-profile"
  const team2Url = team2Players?.length == 1 ? "athelete-profile" : "team-profile"

  const teamDetails1 = {
    name: item && item.team && item.team[0] && item?.team?.[0]?.name,
    score: item && item.scoreData && item?.scoreData?.homeScore,
    teamIcon: [
      item && item.team && item.team[0] && item?.team?.[0].icon
    ],
    _id: item && item.team && item.team[0] && item?.team?.[0]?._id
  };

  const teamDetails2 = {
    name: item && item.team && item.team[1] && item?.team?.[1]?.name,
    score: item && item.scoreData && item?.scoreData?.awayScore,
    teamIcon: [
      item && item.team && item.team[1] && item?.team?.[1].icon
    ],
    _id: item && item.team && item.team[1] && item?.team?.[1]?._id
  };

  const groupEventData = {
    name: item?.name,
    iconData: item?.team?.map(entry => entry?.coverImage),
  }

  const getUserData = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      const res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/users/${userId}`,
      });
      if (res?.data?.existing) {
        const userData = res?.data?.existing
        const favData = {}
        userData?.favoriteTeams && userData?.favoriteTeams?.map((it) => {
          favData[it] = true
        })
        setMarkFavourite(favData)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const TeamCard = ({ details, navigateUrl = null, playerId = null, index, direction = null }) => {
    const handelFav = (id) => {
      setMarkFavourite({
        ...markFavourite, [id]: !markFavourite[id]
      })
      addFavorite(id, markFavourite[id])
    }

    const addFavorite = async (id, fav) => {
      let userId = await AsyncStorage.getItem('userId');
      try {
        await axios({
          method: 'post',
          url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/team`,
          data: {
            favoriteItemId: id,
            isAdd: !fav,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <View style={[styles.teamContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%"
          }}>

          {showHeart && direction && direction == 'left' && <TouchableOpacity onPress={() => handelFav(details?._id)} style={{ marginRight: "8%" }}>
            {markFavourite[details?._id] ? <RedHeart /> : <GrayHeart />}
          </TouchableOpacity >}

          {details?.teamIcon.map(url => {
            return (
              <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => showHeart && (navigateUrl == 'team-profile' && navigation.navigate('team-profile', { teamId: details?._id }) || navigateUrl == 'athelete-profile' && navigation.navigate('athelete-profile', { athleteId: playerId, athleteData: {} }))}>
                <Image
                  style={{
                    height: dynamicSize(55),
                    width: dynamicSize(55),
                    borderRadius: dynamicSize(50),
                    marginBottom: "1.5%",
                  }}
                  source={{ uri: url }}
                />
                {/* <View style={{ width: '90%' }}> */}
                <Text numberOfLines={3} style={styles.teamName}>{details.name}</Text>
                {/* </View> */}
              </TouchableOpacity>
            );
          })}
          {showHeart && direction && direction == 'right' && <TouchableOpacity onPress={() => showHeart && handelFav(details?._id)} style={{ marginLeft: '8%', marginRight: "25%" }} >
            {markFavourite[details?._id] ? <RedHeart /> : <GrayHeart />}
          </TouchableOpacity >}
        </View>
      </View >
    );
  };
  const GroupEvent = ({ details, index }) => {
    return (
      <View style={[styles.teamContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {details?.iconData?.splice(0, 3).map(url => {
            return (
              <Image
                style={{
                  height: dynamicSize(55),
                  width: dynamicSize(55),
                  borderRadius: dynamicSize(50),
                  marginHorizontal: dynamicSize(5),
                  marginBottom: "1.5%"
                }}
                source={{ uri: url }}
              />
            );
          })}
        </View>
        <Text style={styles.teamName}>{details.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    showHeart && getUserData()
  }, [showHeart])

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        {item?.participation === 'A Vs B' ? (
          <>
            <TeamCard details={teamDetails1} navigateUrl={team1Url} playerId={team1Players} index={0} direction={'left'} />
            <View style={typeof teamDetails1?.score == 'string' ? { flex: 1, justifyContent: 'center', alignItems: "center", minWidth: "20%" } : { flex: 1, justifyContent: 'center', alignItems: "center", maxWidth: "25%" }}>
              {item?.eventStatus != 'upcoming' ? <Text style={styles.score}>
                {teamDetails1?.score}{' - '}{teamDetails2.score}
              </Text> : <VsIcon />}
            </View>
            <TeamCard details={teamDetails2} navigateUrl={team2Url} playerId={team2Players} index={1} direction={'right'} />
          </>
        ) : (
          <GroupEvent details={groupEventData} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f8f8f8',
    borderRadius: 5,
    // height: dynamicSize(100),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    paddingVertical: dynamicSize(5),
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: dynamicSize(2),
    // backgroundColor:"green",
  },
  teamName: {
    fontSize: dynamicSize(9),
    fontWeight: 'bold',
    marginBottom: dynamicSize(5),
    textAlign: 'center',
    color: COLORS.black
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    // marginHorizontal: dynamicSize(15),
    color: COLORS.black
  },
});

export default ScoreCard;
