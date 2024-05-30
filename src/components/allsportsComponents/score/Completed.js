import {ScrollView, Text} from 'react-native';
import LiveCard from '../../CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';

const completedData = [
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

export default function CompletedCards({data}) {
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
      }}>
        {data?.length === 0 && <Text style={{
        color:COLORS.black,
        textAlign:'center',
      }}>No Data Found</Text>}
      {(data || completedData)?.map((item, id) => {
        return (
          <LiveCard
            title={item?.tournamentName}
            date={item?.startDate}
            time={item?.startTime}
            category={item?.category}
            score={item?.score}
            country1={item?.teamAName}
            country2={item?.teamBName}
            status={item?.status}
            startDate={item?.startDate}
            endDate={item?.endDate}
            startTime={item?.startTime}
            endTime={item?.endTime}
            key={`live-item-${id}`}
          />
        );
      })}
    </ScrollView>
  );
}
