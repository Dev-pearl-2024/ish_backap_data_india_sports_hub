import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function WeightLifting({sportData}) {
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
          {values?.map((data, id) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  backgroundColor:
                    id % 2  ? COLORS.table_gray : COLORS.white,
                }}>
                {data?.map((item, index) => {
                  return (
                    <>
                      {index === 1 ? (
                        <>
                          {Array.isArray(item) ? (
                            <Text
                              style={{
                                width: 160,
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                paddingVertical: 3,
                                textAlign: 'center',
                              }}>
                              {item[1]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                width: 160,
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                paddingVertical: 3,
                                textAlign: 'center',
                              }}>
                              {item}
                            </Text>
                          )}
                        </>
                      ) : (
                        <>
                          {Array.isArray(item) ? (
                            item?.map((subx, subin) => {
                              return (
                                <Text
                                  style={{
                                    color: COLORS.black,
                                    width: 40,
                                    textAlign: 'center',
                                    borderLeftColor: COLORS.light_gray,
                                    borderLeftWidth: 1,
                                    borderRightColor: COLORS.light_gray,
                                    borderRightWidth: 1,
                                    paddingVertical: 3,
                                  }}>
                                  {subx}
                                </Text>
                              );
                            })
                          ) : (
                            <Text
                              style={{
                                width: index === 0 ? 20 : 160,
                                paddingVertical: 3,
                                color: id === 0 ? '#56BCBE' : COLORS.black,
                                textAlign: 'center',
                                borderLeftColor:
                                  index === 4 || index === 5
                                    ? COLORS.light_gray
                                    : null,
                                borderLeftWidth:
                                  index === 4 || index === 5 ? 1 : null,
                                borderRightColor:
                                  index === 4 || index === 5
                                    ? COLORS.light_gray
                                    : null,
                                borderRightWidth:
                                  index === 4 || index === 5 ? 1 : null,
                              }}>
                              {item === 'Rank' ? '' : item}
                            </Text>
                          )}
                        </>
                      )}
                    </>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
