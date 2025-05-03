import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Dropdown from '../../../components/dropdown/Dropdown';
import COLORS from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAtheleteDataRequest } from '../../../redux/actions/atheleteActions';

export default function IndividualTrackPlayerSquad({ sportData }) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [substitutesPlayer, setSubstitutesPlayer] = useState([])

  const getData = async () => {
    try {
      setLoading(true);
      const isEventPlayedTeam = sportData?.eventPlayedTeams && sportData?.eventPlayedTeams?.length > 0 ? true : false
      const url = isEventPlayedTeam ?
        `https://prod.indiasportshub.com/event-played-teams/teams/event/${sportData?._id}` :
        `https://prod.indiasportshub.com/events/teamswithplayers/${sportData?._id}`

      let res = await axios({
        method: 'GET',
        url: url
      });

      setLoading(false);
      setValues(isEventPlayedTeam ? res?.data?.data : res?.data?.existingTeam);
      let arr = [];
      let substitutes = []

      if (isEventPlayedTeam) {
        res?.data?.data?.teams?.map(item => {
          arr.push(item?.players);
          substitutes.push(item?.substitutesPlayer)
        });
      } else {
        res?.data?.existingTeam?.teams?.map(item => {
          arr.push(item?.players);
        });
      }
      arr = arr.flat();
      substitutes = substitutes.flat()
      setSubstitutesPlayer(substitutes)
      setFilterData(arr);
    } catch (e) {
      setLoading(false);
      console.log(e, 'error in get Data');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getValue = value => {
    setSelectedValue(value);
  };

  const getFilterData = () => {
    const fd = values?.teams?.filter(item => item?.name === selectedValue);
    if (selectedValue === 'All') {
      let arr = [];
      let substitutes = []

      values?.teams?.map(item => {
        arr.push(item?.players);
        substitutes.push(item?.substitutesPlayer)
      });

      arr = arr.flat();
      setFilterData(arr);
      substitutes = substitutes.flat()
      setSubstitutesPlayer(substitutes)
      return;
    }
    if (fd) {
      setFilterData(fd[0]?.players);
      setSubstitutesPlayer(fd[0]?.substitutesPlayer || [])
    }
  };
  useEffect(() => {
    getFilterData();
  }, [selectedValue]);

  const navigation = useNavigation();
  const handleAtheleteProfileData = userId => {
    navigation.navigate('athelete-profile', { athleteId: userId });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <View style={{ backgroundColor: COLORS.white, paddingTop: 16 }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Dropdown
                placeholder={selectedValue || 'All Teams'}
                data={values?.teams}
                getValue={getValue}
              />
            </View>
            {filterData &&
              filterData?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{ padding: 16, marginTop: 10 }}
                    onPress={() => {
                      handleAtheleteProfileData(item?._id);
                    }}
                    key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={
                            item?.icon
                              ? {
                                uri: item?.icon,
                              }
                              : require('../../../assets/images/user.png')
                          }
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                          }}
                        />

                        <Text style={{ color: COLORS.black, fontSize: 14 }}>
                          {item?.fullName}
                        </Text>
                      </View>
                      <Text style={{ color: COLORS.black, fontSize: 14 }}>
                        {item?.country}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            {filterData?.length == 0 && <Text style={{ textAlign: "center", margin: "10%" }}>Players not found!</Text>}

            {substitutesPlayer && substitutesPlayer?.length > 0 && <View style={{ width: '100%', height: '5%' }}>
              <View style={{
                backgroundColor: COLORS.primary,
                textAlign: 'center',
              }}
              >
                <Text style={{ textAlign: 'center', color: COLORS.white, fontWeight: '500' }}>Substitutes</Text>
              </View>
            </View>}

            {substitutesPlayer &&
              substitutesPlayer?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{ padding: 16 }}
                    onPress={() => {
                      handleAtheleteProfileData(item?._id);
                    }}
                    key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={
                            item?.icon
                              ? {
                                uri: item?.icon,
                              }
                              : require('../../../assets/images/user.png')
                          }
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                          }}
                        />

                        <Text style={{ color: COLORS.black, fontSize: 14 }}>
                          {item?.fullName}
                        </Text>
                      </View>
                      <Text style={{ color: COLORS.black, fontSize: 14 }}>
                        {item?.country}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </>
      )}
    </>
  );
}

let d = {
  __v: 0,
  _id: '66278f42fb3adc624c6039ee',
  category: 'Decathlon',
  createdAt: '2024-04-23T10:36:50.908Z',
  endDate: '2024-04-23T00:00:00.000Z',
  endTime: '20:06',
  eventGender: "Individual Men's",
  eventStage: 'dasdsa',
  eventVenue: 'sdsadad',
  isActive: true,
  isDeleted: false,
  metaData: '',
  name: 'test event Decathlon',
  participation: 'Group',
  sport: 'ATHLETICS',
  startDate: '2024-04-23T00:00:00.000Z',
  startTime: '17:06',
  subtournamentId: null,
  subtournamentName: '',
  tags: [''],
  teamAName: '',
  teamBName: '',
  teams: [
    {
      __v: 0,
      _id: '65fae021222e4cca251e970d',
      category: "Women's",
      country: 'india',
      coverImage:
        'https://sunday-venture.s3.ap-south-1.amazonaws.com/profile/Screenshot%202024-03-19%20100401.png',
      createdAt: '2024-03-20T13:09:53.703Z',
      eventCategory: [Array],
      icon: 'https://sunday-venture.s3.ap-south-1.amazonaws.com/profile/Screenshot%202024-03-19%20100401.png',
      isActive: true,
      isDeleted: false,
      name: 'hkbkhhk 324234',
      players: [Array],
      sports: 'CANOEING',
      tags: [Array],
      updatedAt: '2024-03-20T13:09:53.703Z',
    },
    {
      __v: 0,
      _id: '65fadea17a865301ef60b305',
      category: "Men's",
      country: 'india',
      coverImage:
        'https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg',
      createdAt: '2024-03-20T13:03:29.901Z',
      eventCategory: [Array],
      icon: 'https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg',
      isActive: true,
      isDeleted: false,
      name: 'asdsdsa2',
      players: [Array],
      sports: 'BOXING',
      tags: [Array],
      updatedAt: '2024-03-20T13:03:29.901Z',
    },
  ],
  tournamentId: '6613c2cb08b66c339e7cdf24',
  tournamentName: 'multi',
  updatedAt: '2024-04-23T10:36:50.908Z',
};
