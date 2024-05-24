import {ActivityIndicator, Image, Text, View} from 'react-native';
import Dropdown from '../../../components/dropdown/Dropdown';
import COLORS from '../../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function IndividualTrackPlayerSquad({sportData}) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios({
        url: `http://15.206.246.81:3000/events/teamswithplayers/${sportData?._id}`,
        method: 'GET',
      });
      setLoading(false);
      setValues(res?.data?.existingTeam);
    } catch (e) {
      setLoading(false);
      console.log(e, 'error in get Data');
    }
  };
  useEffect(() => {
    console.log('in use effect');
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={{backgroundColor: COLORS.white, paddingTop: 16}}>
          <View style={{paddingHorizontal: 16}}>
            <Dropdown placeholder="All Teams" data={values?.teams} />
          </View>
          <View style={{padding: 16, marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image
                  source={require('../../../assets/images/profileImg.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                  }}
                />
                <Text style={{color: COLORS.black, fontSize: 14}}>
                  Player Name
                </Text>
              </View>
              <Text style={{color: COLORS.black, fontSize: 14}}>Country</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
