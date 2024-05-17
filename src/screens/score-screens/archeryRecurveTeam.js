import {Image, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function ArcheryRecurveTeam({sportData}) {
  const [values, setValues] = useState([]);
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
    } catch (e) {
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
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          {values?.map((row, id) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  backgroundColor: id % 2 ? COLORS.table_gray : COLORS.white,
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
                            borderRightWidth: 0.2,
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
          {/* <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          <View style={{width: 100, flexDirection: 'row',gap:2}}>
              <Image
                source={require('../../assets/images/india.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  color: '#56BCBE',
                  fontSize: 12,
                  fontWeight: 500,
                  textAlign: 'start',
                  paddingVertical: 5,
                }}>
                United States
              </Text>
            </View>
            
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Player-1
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
              Player-2
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
              Player-3
            </Text>
             
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 80,
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              Total 
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
              Set -1
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
                  10X
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
                  X
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
                  9X
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
                  X
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
                  9X
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
                  X
                </Text>
              </View>
            </View>
          
            

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                paddingVertical: 5,
                textAlign: 'center',
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
              Set -1
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
                  10X
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
                  X
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
                  9X
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
                  X
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
                  9X
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
                  X
                </Text>
              </View>
            </View>
          
            

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 80,
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              2
            </Text>
             
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}
