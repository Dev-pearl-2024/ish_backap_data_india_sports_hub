import {ScrollView, Text} from 'react-native';
import LiveCard from '../../CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';

 
export default function LiveUpcomingCards({data}) {
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
      }}>
      {data?.length === 0 && (
        <Text
          style={{
            color: COLORS.black,
            textAlign: 'center',
          }}>
          No Data Found
        </Text>
      )}
      {(data)?.map((item, id) => {
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
