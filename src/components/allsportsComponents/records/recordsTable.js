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
const width = Dimensions.get('window').width;
export default function RecordTable({data}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const handleAtheleteProfileData = userId => {
  //     dispatch(getAtheleteDataRequest({params: userId}));
  //     navigation.navigate('athelete-profile');
  //   };
  return (
    <ScrollView horizontal style={{backgroundColor: COLORS.white}}>
      <View>
        {data.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              width: width + 50,
            }}>
            <Text style={{width: '30%', color: '#56BCBE'}}></Text>
            <Text style={{color: '#56BCBE', width: '20%', textAlign: 'center'}}>
              Category
            </Text>
            <Text style={{color: '#56BCBE', width: '20%', textAlign: 'center'}}>
              Record Type
            </Text>
            <Text style={{color: '#56BCBE', width: '30%', textAlign: 'center'}}>
              Record
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
                width: width,
              }}>
              <Text style={{color: COLORS.black}}>No Data Found</Text>
            </View>
          )}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                padding: 10,
              }}
              //   onPress={() => {
              //     handleAtheleteProfileData(item?._id);
              //   }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  width: '30%',
                }}>
                <Text style={{color: COLORS.black}} numberOfLines={1}>
                  {item?.tournamentName}
                </Text>
              </View>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'center',
                  width: '20%',
                }}>
                {item?.eventCategory}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'center',
                  width: '20%',
                }}>
                {item?.recordType}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'end',
                  width: '30%',
                }}>
                {item?.record
                  ? `${item?.record?.value} ${item?.record?.unit}`
                  : item?.performanceInfo}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

