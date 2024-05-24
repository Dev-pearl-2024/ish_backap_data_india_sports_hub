import {ActivityIndicator, View} from 'react-native';
import LiveCard from '../../../components/CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../../components/loader/fullLoader';

export default function IndividualTrackHead({sportData}) {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState([]);
  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('userId');
      setLoading(true);
      let res = await axios({
        url: `http://15.206.246.81:3000/events/head-to-head/${sportData.sport}?userId=${user}`,
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
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" style={{marginVertical: 20}} />
      ) : (
        <View style={{padding: 16, backgroundColor: COLORS.white}}>
          {values?.map((item, id) => {
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
        </View>
      )}
    </>
  );
}
