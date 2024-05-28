import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';
import Dropdown from '../../../components/dropdown/Dropdown';
import COLORS from '../../../constants/Colors';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAtheleteDataRequest } from '../../../redux/actions/atheleteActions';

export default function IndividualTrackPlayerSquad({sportData}) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [filterData, setFilterData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios({
        url: `http://15.206.246.81:3000/events/teamswithplayers/${sportData?._id}`,
        method: 'GET',
      });
      setLoading(false);
      setValues(res?.data?.existingTeam);
      selectedValue(res?.data?.existingTeam[0]?.name);
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
    if (fd) {
      setFilterData(fd[0]?.players);
    }
  };
  useEffect(() => {
    getFilterData();
  }, [selectedValue]);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleAtheleteProfileData = (userId) => {
    dispatch(getAtheleteDataRequest({ params: userId }));
   navigation.navigate('athelete-profile');
  }
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={{backgroundColor: COLORS.white, paddingTop: 16}}>
          <View style={{paddingHorizontal: 16}}>
            <Dropdown
              placeholder={selectedValue || "All Teams"}
              data={values?.teams}
              getValue={getValue}
            />
          </View>
          {filterData &&
            filterData?.map((item, index) => {
              return (
                <TouchableOpacity style={{padding: 16, marginTop: 10}}
                onPress={() => {
                  handleAtheleteProfileData(item?._id)
                }}
                key={index}
                >
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
                        source={{
                          uri: item?.icon,
                        }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                        }}
                      />

                      <Text style={{color: COLORS.black, fontSize: 14}}>
                        {item?.fullName}
                      </Text>
                    </View>
                    <Text style={{color: COLORS.black, fontSize: 14}}>
                      {item?.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      )}
    </>
  );
}
