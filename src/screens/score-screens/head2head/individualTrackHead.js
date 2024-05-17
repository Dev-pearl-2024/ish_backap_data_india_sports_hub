import {View} from 'react-native';
import LiveCard from '../../../components/CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const allData = [
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
  {
    title: 'Archery World Cup',
    date: '24/Jan/2024 | 04:00pm',
    category: "Women's / Final",
    score: '82/85',
    country1: 'India - 4',
    country2: 'USA - 4',
    status: 'Live',
  },
];
export default function IndividualTrackHead({sportData}) {
  console.log(sportData, 'sport data');
  const [values, setValues] = useState([]);
  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userId');
      let res = await axios({
        url: `http://15.206.246.81:3000/events/head-to-head/BASKETBALL?userId=${user}`,
        method: 'GET',
      });
      console.log(res?.data?.data, 'red from indi ');
      setValues(res?.data?.data);
    } catch (e) {
      console.log(e, 'error in get');
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{padding: 16, backgroundColor: COLORS.white}}>
      {allData.map((item, id) => {
        return (
          <LiveCard
            title={item.title}
            date={item.date}
            category={item.category}
            score={item.score}
            country1={item.country1}
            country2={item.country2}
            status={item.status}
            key={`live-item-${id}`}
          />
        );
      })}
    </View>
  );
}
