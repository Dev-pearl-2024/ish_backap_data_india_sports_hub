import { useEffect, useState } from 'react';
import {Dimensions, FlatList, ScrollView, Text, View} from 'react-native';
import LiveCard from '../../CommonCards/liveTournamentCard';
import COLORS from '../../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import EventCard from '../../ScoreCardComponents/EventCard';
import dynamicSize from '../../../utils/DynamicSize';
import NewSportCard from '../../ScoreCardComponents/NewSportCard';

const height = Dimensions.get('window').height;


export default function ScoreCard({data, setTournamentData}) {

  const [isPremiumUser,setIsPremiumUser] = useState("")
  useEffect(() => {
    const getUserDetails = async () => {
      const userID = await AsyncStorage.getItem('userId');
        try {
          const response = await axios({
            method: 'GET',
            url: `https://prod.indiasportshub.com/users/${userID}`,
          });
          if (response?.data?.message === 'User found successfully') {
            setIsPremiumUser(response.data.existing.isPremiumUser)
          }
          return response.data;
        } catch (error) {
          throw new Error('Failed get User Details', error);
        }
      };
      getUserDetails()
   
  }, [])

  return (
    <View
      style={{
        padding: dynamicSize(10),
        backgroundColor: COLORS.white,
        minHeight: height,
      }}>
      {data?.length === 0 && (
        <Text
          style={{
            color: COLORS.black,
            textAlign: 'center',
          }}>
          No Data Found
        </Text>
      )}

      {data?.map?.((item, id) => {
        return (
          <View style={{alignContent: 'center', justifyContent: 'center', marginVertical: dynamicSize(5)}}>
            <View style={{marginVertical: 10,width:"100%",alignItems:"center",justifyContent:"center"}}>
              {/* <EventCard eventData={item} /> */}
              <NewSportCard item={item} isPremiumUser={isPremiumUser}/> 
            </View>
          </View>
        );
      })}
    </View>
  );
}
