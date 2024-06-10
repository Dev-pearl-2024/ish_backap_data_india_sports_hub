import {Text, View} from 'react-native';
import COLORS from '../../../constants/Colors';
import { useState } from 'react';

export default function IndividualTrackRules({sportData}) {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  // const getData = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('userId');
  //     setLoading(true);
  //     let res = await axios({
  //       url: `http://15.206.246.81:3000/events/head-to-head/${sportData.sport}?userId=${user}`,
  //       method: 'GET',
  //     });
  //     setLoading(false);
  //     setValues(res?.data?.data);
  //   } catch (e) {
  //     setLoading(false);
  //     console.log(e, 'error in get');
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  console.log('sportData from rules', sportData);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" style={{marginVertical: 20}} />
      ) : (
        <View style={{padding: 16, backgroundColor: COLORS.white}}>
          {/* <Text style={{color: COLORS.black, fontSize: 14, fontWeight: 500}}>
            Rules for the Game.
          </Text> */}
        </View>
      )}
    </>
  );
}
