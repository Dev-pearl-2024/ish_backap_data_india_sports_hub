import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function WeightLifting() {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
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
              Country
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
              Body Weight
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 200,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Snatch (kg)
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 200,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Clean & Jerk (kg)
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
              Total
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
              Remark
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10,backgroundColor:COLORS.table_gray}}>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>
               <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>
               <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>
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
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  1
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
                    color: '#56BCBE',
                    fontSize: 12,
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
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  3
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
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  Beat
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
                    borderLeftWidth: 1,
                    borderRightColor: COLORS.light_gray,
                    borderRightWidth: 0.2,
                    paddingVertical: 5,
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  1
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
                    color: '#56BCBE',
                    fontSize: 12,
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
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  3
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
                    color: '#56BCBE',
                    fontSize: 12,
                  }}>
                  Beat
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>
                <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}></Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
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
              Country
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              65kg
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    borderLeftWidth: 1,
                    borderRightColor: COLORS.light_gray,
                    borderRightWidth: 0.2,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                textAlign: 'center',
                paddingVertical: 5,
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
          <View
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
              Country
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              65kg
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    borderLeftWidth: 1,
                    borderRightColor: COLORS.light_gray,
                    borderRightWidth: 0.2,
                    paddingVertical: 5,
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                    color: COLORS.black,
                    fontSize: 12,
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
                textAlign: 'center',
                paddingVertical: 5,
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
