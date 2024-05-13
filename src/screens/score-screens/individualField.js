import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';

export default function IndividualField() {
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
                  BIB No
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
                    width: 300,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  Attempts
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
                  Wind (m/s)
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
              
              <View style={{flexDirection: 'row', paddingHorizontal: 10,backgroundColor:COLORS.table_gray}}>
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
                  10
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
                  10
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
