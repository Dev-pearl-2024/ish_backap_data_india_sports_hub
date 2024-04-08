import {StyleSheet, View} from 'react-native';
import SingleSportCard from '../CommonCards/singleSportCard';
const data = [
  {
    name: 'Tennis',
    icon: 'TennisIcon',
    status: 'inactive',
  },
  {
    name: 'Wrestling',
    icon: 'TennisIcon',
    status: 'active',
  },
  {
    name: 'Sailing',
    icon: 'TennisIcon',
    status: 'active',
  },
  {
    name: 'Swimming',
    icon: 'TennisIcon',
    status: 'inactive',
  },
  {
    name: 'Judo',
    icon: 'TennisIcon',
    status: 'inactive',
  },
];
export default function SportsCards() {
  return (
    <View style={styles.sportsContainer}>
      {data.map((item, id) => {
        return (
          <SingleSportCard
            key={`sport-card-${id}`}
            name={item.name}
            icon={item.icon}
            status={item.status}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    sportsContainer:{
        marginTop: 5,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    }
})