import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;

export default function Wrestling({sportData}) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      // setLoading(true);
      let res = await axios({
        url: 'http://15.206.246.81:3000/score/format-data',
        method: 'POST',
        data: {
          sportName: sportData?.sport,
          sportCategory: sportData?.category,
          eventId: sportData?._id,
          tournamentId: sportData?.tournamentId,
        },
      });
      console.log(res?.data?.data?.score, 'data table response ');
      setValues(res?.data?.data?.score);
      setLoading(false);
    } catch (e) {
      console.log(e, 'errror in data table');
      setLoading(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              {values?.map((data, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      minWidth: WIDTH,
                      backgroundColor:
                        index % 2 ? COLORS.table_gray : COLORS.white,
                    }}>
                    {data?.map((items, id) => {
                      return (
                        <Text
                          style={{
                            color: index === 0 ? '#56BCBE' : COLORS.black,
                            fontSize: 12,
                            width: 100,
                            textAlign: 'start',
                            paddingVertical: 5,
                          }}>
                          {Array.isArray(items) ? items[1] : items}
                        </Text>
                      );
                    })}
                  </View>
                );
              })}

              {/* <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
              width: WIDTH,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Round 1
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              width: WIDTH,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Round 2
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              10
            </Text>
          </View> */}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
