import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList,StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dynamicSize from '../../utils/DynamicSize';
import axios, { Axios } from 'axios';
import MatchCard from '../../components/ScoreCardComponents/MatchCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';



const HeadToHead = ({athleteData}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opponentList, setOpponenetList] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('Select Athlete');
  const [headToHeadData, setHeadToHeadData] = useState([]);
  const {sports,eventCategory} = athleteData

  const fetchOpponentList = async() =>{
    const userID = await AsyncStorage.getItem('userId');
    try{
      const createdURL = `https://prod.indiasportshub.com/players/by/sportName/${sports}?userId=${userID}`
      const response = await axios.get(createdURL);
      if(response.status === 200){
        setOpponenetList(response.data?.data)
      }
    }catch (error){
      console.error('Error fetching >>>>>>>:', error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOpponentList()
  }, [])

  const fetchHeadToHeadData = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `https://prod.indiasportshub.com/events/head-to-head2/${sports}?userId=${userID}&athlete1=${athleteData?.fullName}&athlete2=${selectedOpponent}&eventCategory=${eventCategory}`
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
    }
  }, [selectedOpponent]);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size={'large'} color={COLORS.primary}/> :
      <FlatList 
        data={[0]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <><View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
              key={athlete?._id}
              label={athlete?.fullName}
              value={athlete?.fullName}
            />
          ))}
        </Picker>
      </View>
          <MatchCard data={headToHeadData}/>
          </>}
      />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: dynamicSize(50),
    marginVertical: dynamicSize(10),
    width: '45%',
    backgroundColor: '#cacccf',
    marginHorizontal: dynamicSize(5)
  },
  match: {
    padding: dynamicSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HeadToHead;
