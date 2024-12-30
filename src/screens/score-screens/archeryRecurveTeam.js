import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function ArcheryRecurveTeam({sportData}) {
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
            <View style={{flexDirection:"column"}} >
            <View style={{marginRight:10}}>
              {values?.score1?.map((row, id) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      backgroundColor:
                        id % 2 ? COLORS.table_gray : COLORS.white,
                    }}>
                    {row?.map((data, index) => {
                      return (
                        <>
                          {Array.isArray(data) ? (
                            <>
                              {data?.map((data1, index1) => {
                                return (
                                  <Text
                                    style={{
                                      color: COLORS.black,
                                      fontSize: 12,
                                      fontWeight: 'normal',
                                      width: 50,
                                      textAlign: 'center',
                                      paddingVertical: 5,
                                      borderRightWidth: 0.2,
                                      borderRightColor: COLORS.light_gray,
                                      borderLeftWidth: 0.2,
                                      borderLeftColor: COLORS.light_gray,
                                    }}>
                                    {data1}
                                  </Text>
                                );
                              })}
                            </>
                          ) : (
                            <Text
                              style={{
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                fontSize: 12,
                                fontWeight: id === 0 ? 500 : 'normal',
                                width: 100,
                                textAlign: 'center',
                                paddingVertical: 5,
                                borderRightWidth: index === row.length-1 ? 0 : 0.2,
                                borderRightColor: COLORS.light_gray,
                                borderLeftWidth: index === 0 ? 0 : 0.2,
                                borderLeftColor:
                                  index === 0 ? null : COLORS.light_gray,
                              }}>
                              {data}
                            </Text>
                          )}
                        </>
                      );
                    })}
                  </View>
                );
              })}
             
            </View>
            <View>
              {values?.score2?.map((row, id) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      backgroundColor:
                        id % 2 ? COLORS.table_gray : COLORS.white,
                    }}>
                    {row?.map((data, index) => {
                      return (
                        <>
                          {Array.isArray(data) ? (
                            <>
                              {data?.map((data1, index1) => {
                                return (
                                  <Text
                                    style={{
                                      color: COLORS.black,
                                      fontSize: 12,
                                      fontWeight: 'normal',
                                      width: 50,
                                      textAlign: 'center',
                                      paddingVertical: 5,
                                      borderRightWidth: 0.2,
                                      borderRightColor: COLORS.light_gray,
                                      borderLeftWidth: 0.2,
                                      borderLeftColor: COLORS.light_gray,
                                    }}>
                                    {data1}
                                  </Text>
                                );
                              })}
                            </>
                          ) : (
                            <Text
                              style={{
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                fontSize: 12,
                                fontWeight: id === 0 ? 500 : 'normal',
                                width: 100,
                                textAlign: 'center',
                                paddingVertical: 5,
                                borderRightWidth: index === row.length-1 ? 0 : 0.2,
                                borderRightColor: COLORS.light_gray,
                                borderLeftWidth: index === 0 ? 0 : 0.2,
                                borderLeftColor:
                                  index === 0 ? null : COLORS.light_gray,
                              }}>
                              {data}
                            </Text>
                          )}
                        </>
                      );
                    })}
                  </View>
                );
              })}
        </View>
        </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
