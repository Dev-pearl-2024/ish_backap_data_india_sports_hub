import {ScrollView} from 'react-native';
import LiveCard from '../../CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';

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
];
export default function LiveCards() {
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
      }}>
      {livedata.map((item, id) => {
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
    </ScrollView>
  );
}
