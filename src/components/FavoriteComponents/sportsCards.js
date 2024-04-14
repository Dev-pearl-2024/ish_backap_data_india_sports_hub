import {ScrollView, StyleSheet, View} from 'react-native';
import SingleSportCard from '../CommonCards/singleSportCard';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import {useEffect} from 'react';
const data = [
  {isFavorite: true, name: 'ARCHERY'},
  {isFavorite: true, name: 'ATHLETICS'},
  {isFavorite: false, name: 'BADMINTON'},
  {isFavorite: false, name: 'TABLETENNIS'},
  {isFavorite: false, name: 'TENNIS'},
  {isFavorite: false, name: 'BASKETBALL'},
  {isFavorite: false, name: 'BOXING'},
  {isFavorite: false, name: 'CANOEING'},
  {isFavorite: false, name: 'ROWING'},
  {isFavorite: false, name: 'KAYAKING'},
  {isFavorite: false, name: 'CYCLING'},
  {isFavorite: false, name: 'EQUESTRIAN'},
  {isFavorite: false, name: 'FENCING'},
  {isFavorite: false, name: 'FOOTBALL'},
  {isFavorite: false, name: 'HANDBALL'},
  {isFavorite: false, name: 'HOCKEY'},
  {isFavorite: false, name: 'VOLLEYBALL'},
  {isFavorite: false, name: 'GOLF'},
  {isFavorite: false, name: 'GYMNASTICS'},
  {isFavorite: false, name: 'JUDO'},
  {isFavorite: false, name: 'SHOOTING'},
  {isFavorite: false, name: 'SWIMMING'},
  {isFavorite: false, name: 'SAILING'},
  {isFavorite: false, name: 'TAEKWONDO'},
  {isFavorite: false, name: 'WEIGHTLIFTING'},
  {isFavorite: false, name: 'WRESTLING'},
];
export default function SportsCards() {
  const getSports = async () => {
    try {
      const res = await axios.get(
        'http://15.206.246.81:3000/all/sports/661128d8ee8b461b00d95edd',
      );
    } catch (err) {
      console.log(err, 'error from axios');
    }
  };
  useEffect(() => {
    getSports();
  }, []);
  return (
    <View style={styles.sportsContainer}>
      {data.map((item, id) => {
        return (
          <SingleSportCard
            key={`sport-card-${id}`}
            name={item.name}
            icon={item.icon}
            status={item.isFavorite}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sportsContainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: COLORS.white,
    marginBottom:20
  },
});
