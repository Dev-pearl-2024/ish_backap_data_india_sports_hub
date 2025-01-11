import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAtheleteDataRequest} from '../../redux/actions/atheleteActions';

const width = Dimensions.get('window').width;

export default function RankingTable({data,atheleteData}) {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile',{athleteId: userId});
  };
  return (
    <ScrollView horizontal style={{backgroundColor: COLORS.white}}>
    <View style={{backgroundColor: COLORS.white}}>
      {data.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            width:width+width/3
          }}>
            <Text style={{color: '#56BCBE', width: '15%', textAlign: 'center'}}>
            Ranking
          </Text>
          <Text style={{width: '25%', color: '#56BCBE'}}>Athlete</Text>
          <Text style={{color: '#56BCBE', width: '15%', textAlign: 'center'}}>
            Point
          </Text>
          <Text style={{color: '#56BCBE', width: '10%', textAlign: 'center'}}>
            Age
          </Text>
          <Text style={{color: '#56BCBE', width: '15%', textAlign: 'center'}}>
            Country
          </Text>
          
        </View>
      )}
      <FlatList
        data={data}
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
            onPress={() => {
              handleAtheleteProfileData(item?.playerId);
            }}>
              <Text
              style={{color: COLORS.black, textAlign: 'center', width: '10%'}}>
              {index+1}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                width: '30%',
              }}>
              <Image
                source={
                  item?.playerDetails[0]?.icon
                    ? {uri: item?.playerDetails[0]?.icon}
                    : require('../../assets/images/user.png')
                }
                style={{borderRadius: 50, width: 25, height: 25}}
                width={25}
                height={25}
              />

              <Text style={{color: COLORS.black}} numberOfLines={1}>
                {item?.playerDetails[0]?.fullName}
              </Text>
            </View>
            <Text
              style={{color: COLORS.black, textAlign: 'center', width: '15%'}}>
              {item?.points}{" "}{item?.achivements ? `/ ${item?.achivements}` : ''}
            </Text>
            <Text
              style={{color: COLORS.black, textAlign: 'center', width: '10%'}}>
              {item?.playerDetails[0]?.age}
            </Text>
            <Text
              style={{color: COLORS.black, textAlign: 'center', width: '15%'}}>
              {item?.country}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </ScrollView>
  );
}
