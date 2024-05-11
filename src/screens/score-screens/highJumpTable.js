import {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getScoreFormat} from '../../redux/actions/scoreAction';
import axios from 'axios';
import COLORS from '../../constants/Colors';
import {Table, Row, Rows} from 'react-native-table-component';

export default function HighJump({data}) {
  //   const dispatch = useDispatch();
  //   const data = useSelector(state => state);
  //   console.log(data, 'data from score page comp -----------------------');
  //   const dataToSend ={
  //     sportName: 'ATHLETICS',
  //     sportCategory: 'High Jump',
  //     eventId: '6627978dfb3adc624c603aea',
  //     tournamentId: '6627978dfb3adc624c603aea',
  //   }
  //   useEffect(() => {
  //     dispatch(
  //       getScoreFormat(dataToSend)
  //     );

  //   }, [dispatch]);
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
  useEffect(() => {
    getScoreData();
  }, []);
  const tableHead = [
    'Position',
    'Name',
    'BIB No',
    'Country/State',
    'Attempts',
    'Wind (m/s)',
    'Best of All Attempts',
    'Result/status',
  ];
  const tableData = [
    data?.data?.score[2],
    data?.data?.score[3],
    data?.data?.score[4],
    data?.data?.score[5],
  ];
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row', gap: 10}}>
            {data?.data?.score[0]?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{alignItems: 'center', justifyContent: 'center',width:item === 'Attempts' ? 600: 50}}>
                  <Text style={{color: '#56BCBE', marginBottom: 10}}>
                    {item}
                  </Text>
                  {item === 'Attempts' && (
                    <View style={{flexDirection: 'row'}}>
                      {data?.data?.score[1]?.map((item, index) => {
                        return (
                          <Text
                            key={index}
                            style={{
                              color: COLORS.dark_gray,
                              borderLeftColor: item
                                ? COLORS.gray
                                : 'transparent',
                              borderRightColor: item
                                ? COLORS.gray
                                : 'transparent',
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              paddingHorizontal: 5,
                              width:50
                            }}>
                            {item}
                          </Text>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Rows data={tableData} textStyle={{color:COLORS.black,width:50,borderColor:COLORS.lighter_gray}}/>
        </Table>
        </View>
      </ScrollView>
    </View>
  );
}
