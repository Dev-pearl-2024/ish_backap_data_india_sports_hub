import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import dynamicSize from '../../utils/DynamicSize';

const MatchCard = ({data}) => {
  // const dummyData = [
  //   {
  //     match_Id: '6698f2bbaeffa09ad32a7bd4',
  //     athelete1_details: {
  //       athlete_name: 'vishal 2',
  //       profile_pic:
  //         'https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg',
  //       athlete_score: 9,
  //     },
  //     athelete2_details: {
  //       athlete_name: 'vishal 3',
  //       profile_pic:
  //         'https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg',
  //       athlete_score: 12,
  //     },
  //     result: 'vishal 3 is won',
  //     date: '2024-07-18T00:00:00.000Z',
  //   },
  // ];

  const renderCards = ({item, index}) => {
    const {athelete1_details, athelete2_details} = item;
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('score-view', {sportData: eventData})}
        style={styles.container}>
        <View style={styles.scoreContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.teamContainer]}>
              <Text style={styles.teamName}>
                {athelete1_details?.athlete_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '50%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {athelete1_details?.profile_pic && (
                  <Image
                    style={{
                      height: dynamicSize(30),
                      width: dynamicSize(30),
                      borderRadius: dynamicSize(15),
                      marginRight: dynamicSize(15),
                    }}
                    source={{uri: athelete1_details?.profile_pic}}
                  />
                )}
                <Text style={{alignSelf: 'center', color: '#000'}}>
                  {athelete1_details?.athlete_score}
                </Text>
              </View>
              {/* 2nd opponent */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{alignSelf: 'center', color: '#000'}}>
                  {athelete2_details?.athlete_score}
                </Text>
                {athelete2_details?.profile_pic && (
                  <Image
                    style={{
                      height: dynamicSize(30),
                      width: dynamicSize(30),
                      borderRadius: dynamicSize(15),
                      marginLeft: dynamicSize(15),
                    }}
                    source={{uri: athelete2_details?.profile_pic}}
                  />
                )}
              </View>
            </View>
            <View style={[styles.teamContainer]}>
              <Text style={styles.teamName}>
                {athelete2_details?.athlete_name}
              </Text>
            </View>
          </View>

          <Text style={{alignSelf: 'center', color: '#000'}}>
            {item?.result}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderCards}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: dynamicSize(8),
    padding: dynamicSize(15),
    marginVertical: dynamicSize(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  title: {
    fontSize: dynamicSize(18),
    fontWeight: 'bold',
    marginBottom: dynamicSize(8),
  },
  result: {
    fontSize: dynamicSize(16),
    color: '#6c757d',
  },
  date: {
    fontSize: dynamicSize(14),
    color: '#adb5bd',
    marginTop: dynamicSize(4),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    aligneventDatas: 'center',
    backgroundColor: '#f8f8f8',
    height: dynamicSize(70),
    margin: dynamicSize(5),
    padding: dynamicSize(5),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: dynamicSize(20),
  },
  scoreContainer: {
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: dynamicSize(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center',
    textAlignVertical: 'center',
    padding: dynamicSize(5),
  },
  teamContainer: {
    flex: 1,
    aligneventDatas: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: dynamicSize(8),
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  teamName: {
    fontSize: dynamicSize(12),
    fontWeight: 'bold',
    marginBottom: dynamicSize(10),
    textAlign: 'center',
    marginTop: dynamicSize(10),
    color: 'black',
  },
  score: {
    fontSize: dynamicSize(16),
    fontWeight: 'bold',
    marginHorizontal: dynamicSize(15),
    marginTop: '10%',
  },
  eventdetails: {
    fontSize: dynamicSize(10),
    fontWeight: 'bold',
    marginBottom: dynamicSize(5),
    textAlign: 'center',
    // marginTop: dynamicSize(5)
  },
});

export default MatchCard;
