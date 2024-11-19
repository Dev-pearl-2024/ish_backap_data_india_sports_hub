import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import InvertedPyramidDraws from './InvertedPyramidDraws';



// Upcoming Matches Component
const UpcomingMatches = ({tournamentDetail}) => {
  console.log(JSON.stringify(tournamentDetail), 'from draws')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchData = async () =>{
    // https://prod.indiasportshub.com/draws/66a0b7f3fe4c937f5bc723e6
    try {
      // const response = await axios.get(`https://prod.indiasportshub.com/draws/${tournamentID}`); 
      // setData(response.data)
   } catch (err) {
      console.log(err, 'error from Draws')
   }
   finally{
    setIsLoading(false);
   }
  }

  useEffect(() =>{
    fetchData()
  }, [])
  return (
    <InvertedPyramidDraws />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f8',
  },
  matchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  participantsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default UpcomingMatches;
