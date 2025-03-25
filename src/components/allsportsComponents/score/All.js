import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import LiveCard from '../../CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiCall from '../../../utils/ApiCall';
import NewSportCard from '../../ScoreCardComponents/NewSportCard';
const height = Dimensions.get('window').height;
export default function LiveUpcomingCards({ data, setTournamentData }) {
  const handleFav = async (id, fav) => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await ApiCall({
        method: 'post',
        endpoint: `users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setTournamentData(
        data?.map(item =>
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
        // minHeight: height,
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
      {data?.map?.((item, id) => {
        return (
          <NewSportCard item={item} />
        );
      })}
    </View>
  );
}
