import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import LiveCard from '../../../components/CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../../components/loader/fullLoader';
import NewSportCard from '../../../components/ScoreCardComponents/NewSportCard';

export default function IndividualTrackHead({ sportData }) {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userId');
      setLoading(true);
      let res = await axios({
        url: `https://prod.indiasportshub.com/events/head-to-head/${sportData.sport}?eventId=${sportData._id}&tournamentId=${sportData.tournamentId}&userId=${user}&page=1&limit=20`,
        // url: `https://prod.indiasportshub.com/events/head-to-head/${sportData.sport}?&limit=100&userId=${user}&eventCategory=${sportData.category}&eventGender=Individual Men's`,
        method: 'GET',
      });
      setLoading(false);
      setValues(res?.data?.data);
    } catch (e) {
      setLoading(false);
      console.log(e, 'error in get');
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
      setValues(
        values?.map(item =>
          item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) : (
        <View style={{ padding: 16, backgroundColor: COLORS.white }}>
          {values.length === 0 && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: COLORS.black }}>No data available</Text>
          </View>}
          {/* {values?.map((item, id) => {
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
                eventGenders={item?.eventGender}
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
          })} */}
          <FlatList
            data={values}
            renderItem={({ item }) => <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <NewSportCard item={item} margin={10} />
            </View>}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
}
