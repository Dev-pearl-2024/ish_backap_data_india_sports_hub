import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function IndivudualTrack({sportData, activeTab}) {
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
      console.log(res?.data?.data?.score,'data table response ');
      setValues(res?.data?.data?.score);
    } catch (e) {
      console.log(e,'errror in data table');
    }
  };
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
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            {values && values[0]?.lenght>0 ? <>{values[0]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: '#56BCBE',
                    fontSize: 12,
                    fontWeight: 500,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {item}
                </Text>
              );
            })}</>:<></>}
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
            }}>
            {values[1]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {item}
                </Text>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            {values[2]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {item}
                </Text>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              backgroundColor: COLORS.table_gray,
            }}>
            {values[2]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {item}
                </Text>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            {values[3]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
