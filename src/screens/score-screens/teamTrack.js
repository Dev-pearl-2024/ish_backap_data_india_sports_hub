import {ScrollView, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function TeamTrack({sportData}) {
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
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            {values[0]?.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: '#56BCBE',
                    fontSize: 12,
                    fontWeight: 500,
                    width: index === 0 ? 60 : index === 4 ? 50 : 100,
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
              borderBottomColor: COLORS.black,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 60,
                textAlign: 'start',
                paddingVertical: 5,
              }}>
              {values[1]?.[0]}
            </Text>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[1]?.[0]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                   {values[1]?.[2]?.[0]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                   {values[1]?.[3]?.[0]}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[1]?.[1]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[2]?.[1]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[3]?.[1]}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                 {values[1]?.[1]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                 {values[1]?.[2]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[3]?.[2]}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                   {values[1]?.[1]?.[3]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[2]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[1]?.[3]?.[2]}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 50,
                textAlign: 'center',
                paddingVertical: 5,
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
              }}>
              {values[1]?.[4]}
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
              }}>
              {values[1]?.[5]}
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
              }}>
              {values[1]?.[6]}
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
                width: 60,
                textAlign: 'start',
                paddingVertical: 5,
                backgroundColor:COLORS.white
              }}>
              {values[2]?.[0]}
            </Text>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[1]?.[0]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                   {values[2]?.[2]?.[0]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                   {values[2]?.[3]?.[0]}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[1]?.[1]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[2]?.[1]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[3]?.[1]}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                 {values[2]?.[1]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                 {values[2]?.[2]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[3]?.[2]}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'start',
                    paddingVertical: 5,
                  }}>
                   {values[2]?.[1]?.[3]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[2]?.[2]}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 12,
                    width: 100,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  {values[2]?.[3]?.[2]}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 12,
                width: 50,
                textAlign: 'center',
                paddingVertical: 5,
                borderLeftWidth: 1,
                borderLeftColor: COLORS.black,
              }}>
              {values[2]?.[4]}
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
              }}>
              {values[2]?.[5]}
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
              }}>
              {values[2]?.[6]}
            </Text>
          </View>
       
        </View>
      </ScrollView>
    </View>
  );
}
