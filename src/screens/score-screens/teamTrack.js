import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function TeamTrack({sportData}) {
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
            <View style={{backgroundColor: COLORS.table_gray}}>
              {values?.map((row1, indexmain) => {
                return (
                  <>
                    {Array.isArray(row1) ? (
                      <View
                        style={{flexDirection: 'row', paddingHorizontal: 10}}>
                        {row1?.map((item, indexrow) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'column',
                                borderBottomWidth: indexmain === 0 ? 0 : 1,
                              }}>
                              {Array.isArray(item) ? (
                                <>
                                  {item?.map((item2, indexlast) => {
                                    return (
                                      <Text
                                        style={{
                                          color:
                                            indexmain === 0
                                              ? '#56BCBE'
                                              : COLORS.black,
                                          fontSize: 12,
                                          fontWeight:
                                            indexmain === 0 ? 500 : 400,
                                          width:
                                            indexrow === 0
                                              ? 60
                                              : indexrow === 4
                                              ? 50
                                              : 100,
                                          textAlign: 'center',
                                          paddingVertical: 5,
                                          backgroundColor:
                                            indexlast % 2 !== 0
                                              ? COLORS.white
                                              : COLORS.table_gray,
                                          borderRightWidth:
                                            indexrow === 3 ? 1 : 0,
                                        }}>
                                        {item2}
                                      </Text>
                                    );
                                  })}
                                </>
                              ) : (
                                <Text
                                  key={indexrow}
                                  style={{
                                    color:
                                      indexmain === 0
                                        ? '#56BCBE'
                                        : COLORS.black,
                                    fontSize: 12,
                                    fontWeight: indexmain === 0 ? 500 : 400,
                                    width:
                                      indexrow === 0
                                        ? 60
                                        : indexrow === 4
                                        ? 50
                                        : 100,
                                    textAlign:
                                      indexrow === 0 ? 'start' : 'center',
                                    paddingVertical: 5,
                                    backgroundColor:
                                      indexmain === 0
                                        ? COLORS.white
                                        : COLORS.table_gray,
                                  }}>
                                  {item}
                                </Text>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
