import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList,StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dynamicSize from '../../utils/DynamicSize';
import axios, { Axios } from 'axios';
import MatchCard from '../../components/ScoreCardComponents/MatchCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const athletes = [
  {id: 1, name: 'Athlete 1'},
  {id: 2, name: 'Athlete 2'},
  {id: 3, name: 'Athlete 3'},
  {id: 4, name: 'Athlete 4'},
];


const matches = [
  {
    match_Id: 1,
    athlete1: 'Athlete 1',
    athlete2: 'Athlete 2',
    athelete1_details: {
      "athlete_name": 'Athlete 1',
      "profile_pic": "https://",
      "athlete_score": 2
    },
    athelete2_details: {
      "athlete_name": 'Athlete 2',
      "profile_pic": "https://",
      "athlete_score": 1
    },
    result: 'Athlete 1 won',
    date: '2023-09-01',
  },
  {
    match_Id: 2,
    athlete1: 'Athlete 1',
    athlete2: 'Athlete 3',
    result: 'Athlete 3 won',
    date: '2023-08-15',
  },
  {
    match_Id: 3,
    athlete1: 'Athlete 2',
    athlete2: 'Athlete 3',
    result: 'Athlete 2 won',
    date: '2023-08-20',
  },
  {
    match_Id: 4,
    athlete1: 'Athlete 4',
    athlete2: 'Athlete 1',
    result: 'Athlete 4 won',
    date: '2023-07-30',
  },
  // Add more match data as needed
];



const HeadToHead = ({athleteData}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opponentList, setOpponenetList] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('Select Athlete');
  const [headToHeadData, setHeadToHeadData] = useState([]);
  const {sports} = athleteData

  const fetchOpponentList = async() =>{
    const userID = await AsyncStorage.getItem('userId');
    try{
      const createdURL = `http://15.206.246.81:3000/players/by/sportName/${sports}?userId=${userID}`
      const response = await axios.get(createdURL);
      if(response.status === 200){
        setOpponenetList(response.data?.data)
      }
    }catch (error){
      console.error('Error fetching >>>>>>>:', error)
    }
  }

  useEffect(() => {
    fetchOpponentList()
  }, [])

  const fetchHeadToHeadData = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `http://15.206.246.81:3000/events/head-to-head2/${sports}`, 
        {
          params: {
            userId: userID,
            athlete1: athleteData?.fullName,
            athlete2: 'vishal 3',
            // eventCategory: eventCategory
          }
        }
      );  
      // Check if the response was successful
      if (response.status === 200) {
        setHeadToHeadData(response.data?.data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching head-to-head data:', error);
    }
  };

  useEffect(() => {
    if (selectedOpponent) {
      fetchHeadToHeadData();
      // filterMatches()
    }
  }, [selectedOpponent]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Picker
          selectedValue={athleteData?.fullName}
          enabled={false}
          style={styles.picker}>
         
            <Picker.Item
              key={'0'}
              label={athleteData?.fullName}
              value={athleteData?.fullName}
            />
            </Picker>

        <Picker
          selectedValue={selectedOpponent}
          onValueChange={itemValue => setSelectedOpponent(itemValue)}
          style={styles.picker}>
          {opponentList.map(athlete => (
            <Picker.Item
              key={athlete._id}
              label={athlete.fullName}
              value={athlete.fullName}
            />
          ))}
        </Picker>
      </View>

      {/* <FlatList
        data={[
          {
              "match_Id": "6698f2bbaeffa09ad32a7bd4",
              "athelete1_details": {
                  "athlete_name": "vishal 2",
                  "profile_pic": null,
                  "athlete_score": 9
              },
              "athelete2_details": {
                  "athlete_name": "vishal 3",
                  "profile_pic": null,
                  "athlete_score": 12
              },
              "result": "vishal 3 is won",
              "date": "2024-07-18T00:00:00.000Z"
          },
      ]}
        keyExtractor={item => item.match_Id.toString()}
        renderItem={({ item }) => ( */}
          <MatchCard data={headToHeadData}/>
        {/* )} */}
      {/* /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    marginVertical: 10,
    width: '45%',
    // borderRadius: 25,
    backgroundColor: '#cacccf',
    marginHorizontal: dynamicSize(5)
  },
  match: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HeadToHead;
