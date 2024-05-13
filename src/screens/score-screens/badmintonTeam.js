import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function BadmintonTeam() {
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
              }}></Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Country - 1
            </Text>
            <Text
              style={{
                color: '#56BCBE',
                fontSize: 12,
                fontWeight: 500,
                width: 150,
                textAlign: 'center',
                paddingVertical: 5,
              }}>
              Score
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
              Country - 1
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
              borderBottomColor: COLORS.black,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Game 1 Single
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
                borderRightWidth: 1,
                borderRightColor: COLORS.black,
              }}>
              Player - 1
            </Text>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
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
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
              }}>
              Player - 1
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderBottomColor: COLORS.black,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              Game 2 Single
            </Text>

            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 100,
                textAlign: 'center',
                paddingVertical: 5,
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
                borderRightWidth: 1,
                borderRightColor: COLORS.black,

                backgroundColor: COLORS.table_gray,
              }}>
              Player - 1
            </Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.table_gray,
                }}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.table_gray,
                }}>
                <Text
                  style={{
                    color: COLORS.dark_gray,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  Game 1
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderRightColor: COLORS.dark_gray,
                  }}>
                  21-16
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 50,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  21-16
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
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
                backgroundColor: COLORS.table_gray,
              }}>
              Player - 1
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
