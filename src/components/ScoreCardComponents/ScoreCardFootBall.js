import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const ScoreCard = ({item}) => {
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);

  const teamDetails1 = {
    name: item?.team?.[0]?.name,
    score: 2,
    teamIcon: [
      'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
    ],
  };

  const teamDetails2 = {
    name: item?.team?.[1]?.name,
    score: 2,
    teamIcon: [
      'https://picsum.photos/200/300',
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
            justifyContent: 'space-between',
            alignItems: 'center',
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
              <Text style={styles.score}>
                {teamDetails1.score} {' - '} {teamDetails2.score}
              </Text>
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
    backgroundColor: '#f8f8f8',
    // height: dynamicSize(150),
    // backgroundColor:'red'
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
    paddingVertical:dynamicSize(8)
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: dynamicSize(8),
    height:dynamicSize(100)
  },
  teamName: {
    fontSize: dynamicSize(12),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
    textAlign: 'center',
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    marginHorizontal: dynamicSize(15),
    marginTop : '10%'
  },
});

export default ScoreCard;
