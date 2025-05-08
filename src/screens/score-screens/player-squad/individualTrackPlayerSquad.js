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
      console.log(isEventPlayedTeam, sportData?.eventPlayedTeams, sportData?._id)
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

            {substitutesPlayer && substitutesPlayer?.length > 0 && <TouchableOpacity
              style={{ padding: 5, marginTop: 10, backgroundColor: COLORS.primary }}
            >
              <View>
                <View
                  style={{
                    textAlign: 'center'
                  }}>

                  <Text style={{ color: COLORS.white, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
                    Substitutes
                  </Text>
                </View>
              </View>
            </TouchableOpacity>}

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
