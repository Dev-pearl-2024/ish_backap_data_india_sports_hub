import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Decathlon({sportData}) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
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
      setLoading(false);
      setValues(res?.data?.data?.score);
    } catch (e) {
      setLoading(false);
      console.log(e, 'errror in data table');
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
              {values?.map((row, id) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      backgroundColor:
                        id % 2 !== 0 ? COLORS.table_gray : COLORS.white,
                    }}>
                    {row?.map((row2, index) => {
                      return (
                        <>
                          {Array?.isArray(row2) ? (
                            <View style={{flexDirection: 'row'}}>
                              {row2?.map((last, indexLast) => {
                                return (
                                  <Text
                                    style={{
                                      color: COLORS.black,
                                      fontSize: 12,
                                      width: 100,
                                      textAlign: 'center',
                                      paddingVertical: 5,
                                      overflow: 'hidden',
                                      borderLeftColor: COLORS.backgroundColor,
                                      borderLeftWidth: 0.5,
                                      borderRightColor: COLORS.black,
                                      borderRightWidth: 0.5,
                                    }}>
                                    {last}
                                  </Text>
                                );
                              })}
                            </View>
                          ) : (
                            <Text
                              style={{
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                fontSize: 12,
                                fontWeight: id === 0 ? 500 : 'normal',
                                width:
                                  id === 1 && row2 !== null
                                    ? 100
                                    : index === 0
                                    ? 10
                                    : id === 0 &&
                                      row2.slice(0, row2.length - 1) === 'Event'
                                    ? 200
                                    : 100,
                                textAlign: index === 0 ? 'start' : 'center',

                                borderRightColor:
                                  index === 0 || id === 0 ? null : COLORS.black,
                                borderRightWidth:
                                  index === 0 || id === 0 ? null : 0.5,
                                paddingVertical: 5,
                              }}>
                              {row2 === 'Rank' ? '' : row2}
                            </Text>
                          )}
                        </>
                      );
                    })}
                  </View>
                );
              })}
            </View>
            {/* <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Position
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Country/State
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Event-1
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Event-2
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Event-3
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Event-4
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              Total Points
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Result/Status
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.table_gray,
              paddingHorizontal: 10,
            }}>
            <Text style={{width: 100}}></Text>
            <Text style={{width: 100}}></Text>
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Result
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Score
                </Text>
              </View>
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Result
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Score
                </Text>
              </View>
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Result
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Score
                </Text>
              </View>
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Result
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
                    fontSize:10,
                    color:COLORS.dark_gray
                  }}>
                  Score
                </Text>
              </View>
             
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              1 Athlete Name
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              30
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10,backgroundColor:COLORS.table_gray}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              2 Athlete Name
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              30
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
                    color:COLORS.black,
                    fontSize:12
                  }}>
                  2
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
              2
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              2
            </Text>
          </View>
        </View> */}
          </ScrollView>
        </View>
      )}
    </>
  );
}
