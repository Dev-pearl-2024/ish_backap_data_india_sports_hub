// import {useEffect, useState} from 'react';
// import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
// import COLORS from '../../constants/Colors';
// import Dropdown from '../../components/dropdown/Dropdown';
// import AllCards from '../../components/allsportsComponents/score/All';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export default function HeadToHead({ athleteId}) {
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [eventCategory,setEventCategory] = useState([])
//   const [tournamentData, setTournamentData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const getTournamentData = async () => {
//     console.log(selectedEvent,eventCategory,'----')
//     try {
//       setLoading(true);
//       let res = await axios({
//         method: 'get',
//         url: `http://15.206.246.81:3000/events/head-to-head/${selectedEvent}?userId=${athleteId}`,
//       });
//       setTournamentData(res.data.data);
//       setLoading(false);
//       console.log(res.data)
//     } catch (e) {
//       setLoading(false);
//       console.log(e, 'eror');
//       setTournamentData([])
//     }
//   };
//   useEffect(() => {
//     getTournamentData();
//   }, [athleteId, selectedEvent,eventCategory]);
//   const getMasterFields = async () => {
//     try {
//       let res = await AsyncStorage.getItem('masterData');
//       res = JSON.parse(res);
//       setSelectedEvent(res?.sports[0]);
//       setEventCategory(res?.sports)
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   useEffect(() => {
//     getMasterFields();
//   }, []);
//   return (
//     <View style={{backgroundColor: COLORS.white, padding: 10}}>
//       <View style={styles.dropdownSection}>
//         <Dropdown
//           placeholder="Event Categories"
//           data={eventCategory}
//           getValue={value => setSelectedEvent(value)}
//         />
//       </View>
//       <View>
//         {loading ? (
//           <ActivityIndicator size="large" color={COLORS.primary} />
//         ) : (
//           <AllCards
//             data={tournamentData}
//             setTournamentData={setTournamentData}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   dropdownSection: {paddingVertical: 10},
//   radioLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     lineHeight: 18,
//     color: COLORS.light_gray,
//   },
// });

import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import dynamicSize from '../../utils/DynamicSize';
import MatchCard from '../../components/ScoreCardComponents/MatchCard';

// Sample athletes and matches data
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

const HeadToHead = () => {
  const [athlete1, setAthlete1] = useState(athletes[0].name);
  const [athlete2, setAthlete2] = useState(athletes[1].name);
  const [filteredMatches, setFilteredMatches] = useState([]);

  const filterMatches = () => {
    const results = matches.filter(
      match =>
        (match.athlete1 === athlete1 && match.athlete2 === athlete2) ||
        (match.athlete1 === athlete2 && match.athlete2 === athlete1),
    );
    setFilteredMatches(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Head to Head</Text>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Picker
          selectedValue={athlete1}
          onValueChange={itemValue => setAthlete1(itemValue)}
          style={styles.picker}>
          {athletes.map(athlete => (
            <Picker.Item
              key={athlete.id}
              label={athlete.name}
              value={athlete.name}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={athlete2}
          onValueChange={itemValue => setAthlete2(itemValue)}
          style={styles.picker}>
          {athletes.map(athlete => (
            <Picker.Item
              key={athlete.id}
              label={athlete.name}
              value={athlete.name}
            />
          ))}
        </Picker>
      </View>

      <Button title="Show Head-to-Head Matches" onPress={filterMatches} />

      <FlatList
        data={filteredMatches}
        keyExtractor={item => item.match_Id.toString()}
        renderItem={({item}) => (
          <MatchCard
            athlete1={item.athlete1} 
            athlete2={item.athlete2} 
            result={item.result} 
            date={item.date} 
          />

        )}
      />
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
