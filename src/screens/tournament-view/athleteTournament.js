import {
  ActivityIndicator,
  FlatList,
  Image,
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
import AthleteListing from '../../components/Common/AthleteListing';

export default function AthleteTournament({tournamentDetail, selectedEvent, selectedSport}) {
  const [athleteDetail, setAthleteDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAthleteDetail();
  }, [selectedEvent, selectedSport]);

  const Dummy_Athlete_Data =  [
    {
      id: '1',
      name: 'John Doe',
      profile_pic: 'https://example.com/profile1.jpg',
      country: 'USA',
      sport: 'tennis',
      event_category: ['mens singles', 'mixed doubles']
    },
    {
      id: '2',
      name: 'Emma Li',
      profile_pic: 'https://example.com/profile2.jpg',
      country: 'China',
      sport: 'table tennis',
      event_category: ['womens singles', 'womens doubles']
    },
    {
      id: '3',
      name: 'Carlos Mendez',
      profile_pic: 'https://example.com/profile3.jpg',
      country: 'Spain',
      sport: 'tennis',
      event_category: ['mens singles']
    },
    {
      id: '4',
      name: 'Ava Kumar',
      profile_pic: 'https://example.com/profile4.jpg',
      country: 'India',
      sport: 'badminton',
      event_category: ['mixed doubles', 'womens singles']
    },
    {
      id: '5',
      name: 'Liam Smith',
      profile_pic: 'https://example.com/profile5.jpg',
      country: 'Australia',
      sport: 'swimming',
      event_category: ['mens 100m freestyle']
    },
    {
      id: '6',
      name: 'Yuki Tanaka',
      profile_pic: 'https://example.com/profile6.jpg',
      country: 'Japan',
      sport: 'judo',
      event_category: ['mens lightweight']
    },
    {
      id: '7',
      name: 'Olivia Brown',
      profile_pic: 'https://example.com/profile7.jpg',
      country: 'Canada',
      sport: 'athletics',
      event_category: ['womens 100m hurdles']
    },
    {
      id: '8',
      name: 'Nikolai Petrov',
      profile_pic: 'https://example.com/profile8.jpg',
      country: 'Russia',
      sport: 'gymnastics',
      event_category: ['mens individual all-around']
    },
    {
      id: '9',
      name: 'Sofia Martinez',
      profile_pic: 'https://example.com/profile9.jpg',
      country: 'Argentina',
      sport: 'soccer',
      event_category: ['womens team']
    },
    {
      id: '10',
      name: 'Leo Andersen',
      profile_pic: 'https://example.com/profile10.jpg',
      country: 'Denmark',
      sport: 'cycling',
      event_category: ['mens road race']
    }
  ];
  
  const getAthleteDetail = async () => {
    try {
      setLoading(true);
      
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/tournaments/all/athletes/by/tournamentId/${tournamentDetail?._id}?sport=${selectedSport}&eventCategory=${selectedEvent}`,
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
  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile', {athleteId: userId});
  };
  return (
    <View style={{backgroundColor: COLORS.white}}>
      {/* {athleteDetail.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{width: '40%'}}></Text>
          <Text style={{color: '#56BCBE'}}>Event-Discipline</Text>
          <Text style={{color: '#56BCBE'}}>Qualified On</Text>
        </View>
      )} */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        // <FlatList
        //   data={[]}
        //   keyExtractor={item => item._id}
        //   ListEmptyComponent={() => (
        //     <View
        //       style={{
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         padding: 10,
        //       }}>
        //       <Text style={{color: COLORS.black}}>No Data Found</Text>
        //     </View>
        //   )}
        //   renderItem={({item, index}) => (
        //     <TouchableOpacity
        //       style={{
        //         flexDirection: 'row',
        //         justifyContent: 'space-between',

        //         backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
        //         padding: 10,
        //       }}
        //       onPress={() => {
        //         handleAtheleteProfileData(item?._id);
        //       }}>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           gap: 10,
        //           width: '40%',
        //         }}>
        //         <Image
        //           source={
        //             item?.icon
        //               ? {uri: item?.icon}
        //               : require('../../assets/images/user.png')
        //           }
        //           style={{borderRadius: 50, width: 25, height: 25}}
        //           width={25}
        //           height={25}
        //         />
        //         <Text style={{color: COLORS.black}}>{item?.fullName}</Text>
        //       </View>
        //       <Text style={{color: COLORS.black, textAlign: 'center'}}>
        //         {item?.category}
        //       </Text>
        //       <Text style={{color: COLORS.black, textAlign: 'center'}}>
        //         {moment(item?.createdAt).format('DD-MM-YYYY')}
        //       </Text>
        //     </TouchableOpacity>
        //   )}
        // />
        <AthleteListing />
      )}
    </View>
  );
}
