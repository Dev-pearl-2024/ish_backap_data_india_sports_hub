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
import COLORS from '../../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAtheleteDataRequest} from '../../../redux/actions/atheleteActions';
import dynamicSize from '../../../utils/DynamicSize';

const width = Dimensions.get('window').width;

export default function RecordTable({data}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

    const handleAtheleteProfileData = userId => {
      dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile',{athleteId: userId});
    };

  return (
    <ScrollView horizontal alwaysBounceVertical style={{backgroundColor: COLORS.white}}>
      <View>
        {data.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              width: width*2.7,
            }}>
            <Text style={{width: '15%', color: '#56BCBE',textAlign: 'left'}}>Name</Text>
            <Text style={{color: '#56BCBE', width: '10%', textAlign: 'left'}}>Record</Text>
            <Text style={{color: '#56BCBE', width: '5%', textAlign: 'left'}}> Age</Text>
            <Text style={{color: '#56BCBE', width: '10%', textAlign: 'left'}}>Category</Text>
            <Text style={{color: '#56BCBE', width: '10%', textAlign: 'left'}}>Country</Text>
            <Text style={{color: '#56BCBE', width: '15%', textAlign: 'left'}}>Date of achievement</Text>
            <Text style={{color: '#56BCBE', width: '20%', textAlign: 'left'}}>Performance Info</Text>
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
                width: width*2.7,
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
                }}
              >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  width: '15%',
                  justifyContent:"left"
                }}>
                  <Image style={{height:dynamicSize(30),width:dynamicSize(30),borderRadius:50}} source={{uri:item.image}}/>
                <Text style={{color: COLORS.black,marginLeft:dynamicSize(5)}} numberOfLines={1}>
                  {item?.name}
                </Text>
                
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  width: '20%',
                  justifyContent:"center"
                }}>
                
              </View> */}
               <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '10%',
                }}>
                {item?.record
                  ? `${item?.record?.value} ${item?.record?.unit.toLowerCase()}`
                  : item?.performanceInfo}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '5%',
                }}>
                {item?.age}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '10%',
                }}>
                {item?.eventCategory}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '10%',
                }}>
                {item?.country}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '15%',
                }}>
                {item?.achivementDate}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'left',
                  width: '20%',
                }}>
                {item?.performanceInfo}
              </Text>
             
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

