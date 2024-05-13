import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function BoxingScore() {
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
              Rank
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
              Round-1
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
              Round-2
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
              Round-3
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
              Total
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.table_gray,
              paddingHorizontal: 10,
            }}>
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Red
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Blue
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Red
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Blue
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Red
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Blue
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Red
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
                  fontSize: 10,
                  color: COLORS.dark_gray,
                }}>
                Blue
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
              Judge 1
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
                  10
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
                  10
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
                  10
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
                  10
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
                  10
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
                  10
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
              Judge 1
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
                  10
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
                  10
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
                  10
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
                  10
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
                  10
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
                  10
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
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}
