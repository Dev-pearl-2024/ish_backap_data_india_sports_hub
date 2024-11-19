import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function IndividualField({sportData}) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
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
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                {values[0]?.map((item, index) => {
                  return (
                    <Text
                      style={{
                        color: '#56BCBE',
                        fontSize: 12,
                        fontWeight: 500,
                        width: index === 4 ? 300 : 100,
                        textAlign: index === 4 ? 'center' : 'start',
                        paddingVertical: 5,
                      }}>
                      {item}
                    </Text>
                  );
                })}
              </View>

              {values?.map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      backgroundColor: index % 2 == 0 && COLORS.table_gray,
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[0]}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'start',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[1]}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'center',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[2]}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'center',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[3]}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderLeftWidth: 1,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 0.2,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[4]}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderLeftWidth: 0.2,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 1,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[5]}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 0.2,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[6]}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderLeftWidth: 0.2,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 1,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[7]}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 0.2,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[8]}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 50,
                            borderLeftColor: COLORS.light_gray,
                            borderLeftWidth: 0.2,
                            borderRightColor: COLORS.light_gray,
                            borderRightWidth: 1,
                            paddingVertical: 5,
                            color: COLORS.black,
                            fontSize: 12,
                          }}>
                          {values[index + 2]?.[9]}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        paddingVertical: 5,
                        textAlign: 'center',
                      }}>
                      {values[index + 2]?.[10]}
                    </Text>

                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'center',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[11]}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                        width: 100,
                        textAlign: 'center',
                        paddingVertical: 5,
                      }}>
                      {values[index + 2]?.[12]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
