import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dynamicSize from '../../utils/DynamicSize';

const EventCard = ({eventData}) => {
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const navigation = useNavigation();


  const teamDetails1 = {
    name: eventData?.team?.[0]?.name,
    score: 2,
    teamIcon: [
      'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
    ],
  };

  const teamDetails2 = {
    name: eventData?.team?.[1]?.name,
    score: 2,
    teamIcon: [
      'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
      //   'https://picsum.photos/200/300',
    ],
  };

  const groupEventData = {
    name: eventData?.name,
    iconData: eventData?.team?.map(entry => entry?.coverImage),
  }

  const GroupEvent = ({details, index}) => {
    return (
      <View style={[styles.teamContainer]}>
        <Text style={styles.teamName}>{details.name}</Text>
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {details?.iconData?.map(url => {
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
        <View style={{marginBottom: dynamicSize(5), padding: dynamicSize(5)}}>
        <Text style={styles.eventdetails}>
          Event Venue: - {eventData.eventVenue}
        </Text>
        <Text style={styles.eventdetails}>
          Event stage: - {eventData.eventStage}
        </Text>
        </View>
      </View>
    );
  };

  const TeamCard = ({details, index}) => {
    return (
      <View style={[styles.teamContainer]}>
        <Text style={styles.teamName}>{details?.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            aligneventDatas: 'center',
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

  console.log(JSON.stringify(eventData), 'from event card')
  return (
    <TouchableOpacity onPress={() => navigation.navigate('score-view', {sportData: eventData})} style={styles.container}>
      <View style={styles.scoreContainer}>
      {eventData?.participation === 'A Vs B' ? (
          <>
            <TeamCard details={teamDetails1} index={0} />
              <Text style={styles.score}>
                Event Venue: - {eventData.eventVenue} 
              </Text>
              <Text style={styles.score}>
                Event Stage: - {eventData.eventStage} 
              </Text>
            <TeamCard details={teamDetails2} index={1} />
          </>
        ) : (
          <GroupEvent details={groupEventData}/>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    aligneventDatas: 'center',
    backgroundColor: '#f8f8f8',
    height: dynamicSize(70),
    margin:dynamicSize(5),
    padding: dynamicSize(5)
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
  },
  teamContainer: {
    flex: 1,
    aligneventDatas: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: dynamicSize(8),
  },
  teamName: {
    fontSize: dynamicSize(12),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
    textAlign: 'center',
    marginTop: dynamicSize(10)
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    marginHorizontal: dynamicSize(15),
    marginTop : '10%'
  },
  eventdetails: {
    fontSize: dynamicSize(10),
    fontWeight: 'bold',
    marginBottom: dynamicSize(5),
    textAlign: 'center',
    // marginTop: dynamicSize(5)
  }
});

export default EventCard;
