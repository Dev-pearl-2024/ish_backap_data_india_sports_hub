import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function IndivudualTrack({ sportData, activeTab }) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      // setLoading(true);
      let res = await axios({
        url: 'https://prod.indiasportshub.com/score/format-data',
        method: 'POST',
        data: {
          sportName: sportData?.sport,
          sportCategory: sportData?.category,
          eventId: sportData?._id,
          tournamentId: sportData?.tournamentId,
        },
      });
      setLoading(false);
      setValues(res?.data?.data?.score);
    } catch (e) {
      setLoading(false);
      console.log(e, 'errror in data table');
    }
  };
console.log("kkkkkkkkkkkkkkkkk",values);

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (sportData?.eventStatus !== 'completed') {
      const interval = setInterval(() => {
        getData();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                {values[0] ? (
                  <>
                    {values[0]?.map((item, index) => {
                      return (
                        <Text
                          key={index}
                          style={{
                            color: '#56BCBE',
                            fontSize: 12,
                            fontWeight: 500,
                            width: 100,
                            textAlign: 'start',
                            paddingVertical: 5,
                          }}>
                          {item}
                        </Text>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  backgroundColor: COLORS.table_gray,
                }}>
                {values[1]?.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                {values[2]?.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  backgroundColor: COLORS.table_gray,
                }}>
                {values[2]?.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                {values[3]?.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  );
                })}
              </View> */}

              {values.slice(1).map((valueArray, arrayIndex) => (
                <View
                  key={arrayIndex}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    backgroundColor: arrayIndex % 2 === 0 ? COLORS.table_gray : COLORS.white,
                  }}>
                  {valueArray?.map((item, index) => (
                    <Text
                      key={index}
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}



