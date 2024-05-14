import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getScoreFormat} from '../../redux/actions/scoreAction';
import axios from 'axios';
import COLORS from '../../constants/Colors';
import {Table, Row, Rows} from 'react-native-table-component';

export default function HighJump({sportData}) {
  const [values, setValues] = useState([]);
  const [childNumber, setChildNumber] = useState(0);
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
      setValues(res?.data?.data?.score);
      const nonNullElements = res?.data?.data?.score[1].filter(
        element => element !== null,
      );
      setChildNumber(nonNullElements?.length);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
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
                                  width: 50,
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
                              id === 0 && index === 4
                                ? 100 * childNumber
                                : index === 0
                                ? 10
                                : 100,
                            textAlign: index === 0 ? 'start' : 'center',
                            borderLeftColor:
                              id === 1 && row2 !== null
                                ? COLORS.backgroundColor
                                : null,
                            borderLeftWidth:
                              id === 1 && row2 !== null ? 0.5 : null,
                            borderRightColor:
                              id === 1 && row2 !== null
                                ? COLORS.backgroundColor
                                : null,
                            borderRightWidth:
                              id === 1 && row2 !== null ? 0.5 : null,
                            paddingVertical: 5,
                          }}>
                          {row2 === 'Position' ? '' : row2}
                        </Text>
                      )}
                    </>
                  );
                })}
              </View>
            );
          })}

          {/* <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            {values[0]?.map((data, index) => {
              return (
                <Text
                  style={{
                    color: '#56BCBE',
                    fontSize: 12,
                    fontWeight: 500,
                    width: index === 4 ? 600 : 100,
                    textAlign: index === 0 ? 'start' : 'center',
                    paddingVertical: 5,
                  }}>
                  {data}
                </Text>
              );
            })}
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.table_gray,
              paddingHorizontal: 10,
            }}>
            {values[1]?.map((data, index) => {
              return (
                <Text
                  style={
                    data !== null
                      ? {
                          textAlign: 'center',
                          width: 75,
                          borderLeftColor: COLORS.backgroundColor,
                          borderLeftWidth: 0.5,
                          borderRightColor: COLORS.black,
                          borderRightWidth: 0.5,
                          paddingVertical: 5,
                          color: COLORS.black,
                        }
                      : {width: 100}
                  }>
                  {data}
                </Text>
              );
            })}
          </View> */}
          {/* <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
           */}
          {/* <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
            }}>
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              3 Athlete Name
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  X{' '}
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
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 25,
                    borderLeftColor: COLORS.backgroundColor,
                    borderLeftWidth: 0.5,
                    borderRightColor: COLORS.black,
                    borderRightWidth: 0.5,
                    paddingVertical: 5,
                  }}>
                  X{' '}
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
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}
