import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dynamicSize from '../../utils/DynamicSize';
import axios from 'axios';
import MatchCard from '../../components/ScoreCardComponents/MatchCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native';

const HeadToHead = ({ athleteData, isTeam = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opponentList, setOpponenetList] = useState([]);
  const [selectedOpponentID, setSelectedOpponentID] = useState('');
  const [headToHeadData, setHeadToHeadData] = useState([]);
  const { sports, eventCategory } = athleteData;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const fetchOpponentList = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const createdURL = `https://prod.indiasportshub.com/players/by/sportName/${sports}?userId=${userID}&gender=${athleteData?.gender}`;
      const response = await axios.get(createdURL);
      if (response.status === 200) {
        setOpponenetList(response.data?.data?.filter((it) => it?._id != athleteData?._id));
      }
    } catch (error) {
      console.error('Error fetching', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOpponentTeamList = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const createdURL = `https://prod.indiasportshub.com/teams?sport=${sports}&userId=${userID}&eventGenderCategory=${athleteData?.category}`;
      const response = await axios.get(createdURL);
      if (response.status === 200) {
        setOpponenetList(response.data?.teamData?.filter((it) => it?._id != athleteData?._id && it?.players?.length != 1));
      }
    } catch (error) {
      console.error('Error fetching', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isTeam == false && fetchOpponentList();
    isTeam == true && fetchOpponentTeamList()
  }, []);

  const fetchHeadToHeadData = async (id) => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `https://prod.indiasportshub.com/events/head-to-head2/${sports}?userId=${userID}&athlete1Id=${athleteData?._id}&athlete2Id=${id}&page=1&limit=20&forTeam=${isTeam ? 1 : 0}`
      );

      if (response.status === 200) {
        setHeadToHeadData(response.data.data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching head-to-head data:', error);
    }
  };

  useEffect(() => {
    if (opponentList?.length) {
      const dropdownItems = opponentList.map((athlete) => ({
        label: athlete.fullName || athlete.name,
        value: athlete._id,
        icon: () => (
          <Image
            source={{ uri: athlete.icon }}
            style={styles.avatar}
          />
        ),
      }));
      setItems(dropdownItems);
    }
  }, [opponentList]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: '5%'
            }}
          >
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: athleteData?.icon }} // Make sure `imageUrl` is part of your opponentList data
                style={styles.avatar}
              />
              <Text
                style={{
                  color: COLORS.black, fontWeight: 'bold', fontSize: 20
                }}
              >
                {athleteData?.fullName || athleteData?.name}
              </Text>
            </View>
            <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
              Vs
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Opposition"
              searchable={true}
              searchPlaceholder="Type to search..."
              searchTextInputStyle={{
                height: 50,        
                fontSize: 18,       
                paddingHorizontal: 15,
              }}
              onChangeValue={(val) => {
                setSelectedOpponentID(val)
                fetchHeadToHeadData(val)
              }}
              zIndex={3000}
              style={{ marginTop: '2.5%' }}
              zIndexInverse={1000}
              listMode="MODAL"
              renderListItem={({ label, value, icon }) => {
                const athlete = opponentList.find((item) => item._id === value);
                return (
                  <TouchableOpacity onPress={() => {
                    setValue(value)
                    setOpen(false)
                  }}>
                    <View style={styles.itemContainer}>
                      <Image
                        source={{ uri: athlete?.icon }} // Make sure `imageUrl` is part of your opponentList data
                        style={styles.avatar}
                      />
                      <Text style={styles.label}>{label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <MatchCard data={headToHeadData} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    objectFit: 'cover',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#222',
  },
  picker: {
    height: dynamicSize(50),
    marginVertical: dynamicSize(10),
    width: '45%',
    backgroundColor: '#cacccf',
    marginHorizontal: dynamicSize(5),
  },
  match: {
    padding: dynamicSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HeadToHead;
