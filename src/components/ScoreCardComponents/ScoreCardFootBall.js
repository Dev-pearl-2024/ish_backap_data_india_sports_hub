import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';
import COLORS from '../../constants/Colors';

const ScoreCard = ({item}) => {
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);

// console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",item)

  const teamDetails1 = {
    name: item && item.team && item.team[0] &&item?.team?.[0]?.name,
    score: item && item.scoreData && item?.scoreData?.homeScore,
    teamIcon: [
      item && item.team && item.team[0] && item?.team?.[0].icon
      //   'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
    ],
  };

  const teamDetails2 = {
    name: item && item.team && item.team[1] &&item?.team?.[1]?.name,
    // score: item?.scoreData?.awayScore,
    score: item && item.scoreData && item?.scoreData?.awayScore,
    teamIcon: [
      // item?.team?.[1].icon
      item && item.team && item.team[1] && item?.team?.[1].icon
      //   'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
    ],
  };

  const groupEventData = {
    name: item?.name,
    iconData: item?.team?.map(entry => entry?.coverImage),
  }

  const TeamCard = ({details, index}) => {
    return (
      <View style={[styles.teamContainer]}>
        <Text style={styles.teamName}>{details.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:"yellow",
            width:"100%"
          }}>
          {details?.teamIcon.map(url => {
            return (
              <Image
                style={{
                  height: dynamicSize(30),
                  width: dynamicSize(30),
                  borderRadius: dynamicSize(15),
                }}
                source={{uri: url}}
              />
            );
          })}
        </View>
      </View>
    );
  };
  const GroupEvent = ({details, index}) => {
    return (
      <View style={[styles.teamContainer]}>
        <Text style={styles.teamName}>{details.name}</Text>
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
                  height: dynamicSize(30),
                  width: dynamicSize(30),
                  borderRadius: dynamicSize(15),
                  marginHorizontal: dynamicSize(5)
                }}
                source={{uri: url}}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        {item?.participation === 'A Vs B' ? (
          <>
            <TeamCard details={teamDetails1} index={0} />
             <View style={{flex:1,justifyContent:'center',alignItems:"center",maxWidth:"25%"}}>
              <Text style={styles.score}>
                {teamDetails1.score} {' - '} {teamDetails2.score}
              </Text>
              </View>
            <TeamCard details={teamDetails2} index={1} />
          </>
        ) : (
          <GroupEvent details={groupEventData}/>
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
    borderRadius:5,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    paddingVertical: dynamicSize(10),
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: dynamicSize(2),
    // backgroundColor:"green",
  },
  teamName: {
    fontSize: dynamicSize(12),
    fontWeight: 'bold',
    marginBottom: dynamicSize(5),
    textAlign: 'center',
    color:COLORS.black
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    // marginHorizontal: dynamicSize(15),
    // marginTop : '10%'
    color:COLORS.black

  },
});

export default ScoreCard;
