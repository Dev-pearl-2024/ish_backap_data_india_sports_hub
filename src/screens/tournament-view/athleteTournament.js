import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAtheleteDataRequest } from '../../redux/actions/atheleteActions';

export default function AthleteTournament({tournamentDetail}) {
  const [athleteDetail, setAthleteDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAthleteDetail();
  }, []);
  const getAthleteDetail = async () => {
    try {
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/tournaments/all/athletes/by/tournamentId/${tournamentDetail?._id}`,
      });
      setAthleteDetail(res.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setAthleteDetail([]);
    }
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAtheleteProfileData = (userId) => {
    dispatch(getAtheleteDataRequest({ params: userId }));
   navigation.navigate('athelete-profile');
  }
  return (
    <View style={{backgroundColor: COLORS.white}}>
      {athleteDetail.length > 0 && (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{width: '40%'}}></Text>
        <Text style={{color: '#56BCBE'}}>Event-Discipline</Text>
        <Text style={{color: '#56BCBE'}}>Qualified On</Text>
      </View>)}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={athleteDetail}
          keyExtractor={item => item._id}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{color: COLORS.black}}>No Data Found</Text>
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                padding: 10,
              }}
              onPress={()=>{
                handleAtheleteProfileData(item?._id)
              }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  width: '40%',
                }}>
                <Image
                  source={
                    item?.icon
                      ? {uri: item?.icon}
                      : require('../../assets/images/user.png')
                  }
                  style={{borderRadius: 50, width: 25, height: 25}}
                  width={25}
                  height={25}
                />
                <Text style={{color: COLORS.black}}>{item?.fullName}</Text>
              </View>
              <Text style={{color: COLORS.black, textAlign: 'center'}}>
                {item?.category}
              </Text>
              <Text style={{color: COLORS.black, textAlign: 'center'}}>
                {moment(item?.createdAt).format('DD-MM-YYYY')}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
