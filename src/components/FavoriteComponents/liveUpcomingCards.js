import { ScrollView, Text } from 'react-native';
import LiveCard from '../CommonCards/liveTournamentCard';
import COLORS from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const livedata = [
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
export default function LiveUpcomingCards({ eventData, data, setData }) {
  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });

      let events = data?.eventData?.map(item =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,)

      setData({ ...data, eventData: events });

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
      }}>

        {eventData?.length===0 && <Text style={{color:COLORS.black,textAlign:"center"}}>No data available</Text>}
      {eventData && eventData?.map((item, id) => {
        return (
          <LiveCard
            title={item?.name}
            date={item?.startDate}
            time={item?.startTime}
            category={item?.category}
            score={item?.score}
            country1={item?.teamAName}
            country2={item?.teamBName}
            status={item?.status}
            sport={item?.sport}
            eventGenders={item?.tournamentName}
            startDate={item?.startDate}
            endDate={item?.endDate}
            startTime={item?.startTime}
            endTime={item?.endTime}
            key={`live-item-${id}`}
            data={item}
            teams={item?.teams}
            isFavorite={item?.isFavorite}
            handleFav={handleFav}
          />
        );
      })}
    </ScrollView>
  );
}
