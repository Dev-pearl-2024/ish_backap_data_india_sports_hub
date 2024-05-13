import {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getScoreFormat} from '../../redux/actions/scoreAction';
import axios from 'axios';
import COLORS from '../../constants/Colors';
import {Table, Row, Rows} from 'react-native-table-component';

export default function HighJump({data}) {
  const getScoreData = async () => {
    try {
      let res = await axios({
        method: 'GET',
        url: 'http://15.206.246.81:3000/score/format-data',
        data: {
          sportName: 'ATHLETICS',
          sportCategory: 'High Jump',
          eventId: '6627978dfb3adc624c603aea',
          tournamentId: '6627978dfb3adc624c603aea',
        },
      });
      console.log(res, 'res from getScoreData');
    } catch (e) {
      console.log(e, 'error from getScoreData');
    }
  };
  // useEffect(() => {
  //   getScoreData();
  // }, []);
  return (
    <View >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View >
          <View style={{flexDirection: 'row',paddingHorizontal:10}}>
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
                width: 600,
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
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              Best Attempt
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
            style={{flexDirection: 'row', backgroundColor: COLORS.table_gray,paddingHorizontal:10}}>
            <Text style={{width: 100}}></Text>
            <Text style={{width: 100}}></Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
            <Text
              style={{
                textAlign: 'center',
                width: 75,
                borderLeftColor: COLORS.backgroundColor,
                borderLeftWidth: 0.5,
                borderRightColor: COLORS.black,
                borderRightWidth: 0.5,
                paddingVertical: 5,
                color: COLORS.black,
              }}>
              Ht
            </Text>
          </View>
          <View style={{flexDirection: 'row',paddingHorizontal:10}}>
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
          <View style={{flexDirection: 'row',paddingHorizontal:10,backgroundColor:COLORS.table_gray}}>
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
          <View style={{flexDirection: 'row',paddingHorizontal:10}}>
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
                    color:COLORS.black,
                    fontSize:12
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
