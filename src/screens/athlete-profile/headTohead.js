import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dynamicSize from '../../utils/DynamicSize';
import axios from 'axios';
import MatchCard from '../../components/ScoreCardComponents/MatchCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import SearchableDropdown from 'react-native-searchable-dropdown';

const HeadToHead = ({ athleteData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opponentList, setOpponenetList] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('Select Athlete');
  const [selectedOpponentID, setSelectedOpponentID] = useState('');
  const [headToHeadData, setHeadToHeadData] = useState([]);
  const { sports, eventCategory } = athleteData;

  const fetchOpponentList = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const createdURL = `https://prod.indiasportshub.com/players/by/sportName/${sports}?userId=${userID}`;
      const response = await axios.get(createdURL);
      if (response.status === 200) {
        setOpponenetList(response.data?.data);
      }
    } catch (error) {
      console.error('Error fetching >>>>>>>:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpponentList();
  }, []);

  const fetchHeadToHeadData = async () => {
    const userID = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(
        `https://prod.indiasportshub.com/events/head-to-head2/${sports}?userId=${userID}&athlete1Id=${athleteData?._id}&athlete2Id=${selectedOpponentID}&page=1&limit=20`
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
    if (selectedOpponent) {
      fetchHeadToHeadData();
    }
  }, [selectedOpponent]);

  var items = opponentList?.map((it) => ({ id: it?._id, name: it?.fullName }))

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      ) : (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Picker
              selectedValue={athleteData?.fullName}
              enabled={false}
              style={styles.picker}>
              <Picker.Item
                key={'0'}
                label={athleteData?.fullName || athleteData?.name}
                value={athleteData?.fullName || athleteData?.name}
              />
            </Picker>

            {/* <Picker
              selectedValue={selectedOpponent}
              onValueChange={(itemValue) => {
                const selectedAthlete = opponentList.find(
                  (athlete) => athlete.fullName === itemValue
                );
                setSelectedOpponent(itemValue);
                setSelectedOpponentID(selectedAthlete?._id);
              }}
              style={styles.picker}>
              {opponentList.map((athlete) => (
                <Picker.Item
                  key={athlete?._id}
                  label={athlete?.fullName}
                  value={athlete?.fullName}
                />
              ))}
            </Picker> */}

            {/* <SearchableDropdown
              selectedItem={items}
              onItemSelect={(item) => {
                setSelectedOpponent(item);
                setSelectedOpponentID(item?.id);
                console.log("selected data", items?.id)
              }}
              containerStyle={{ padding: 5 }}
              onRemoveItem={(item, index) => {
                const it = items.filter((sitem) => sitem._id !== item.id);
                console.log("selected : ", it)
              }}
              defaultIndex={1}
              resetValue={true}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={items}
              textInputProps={
                {
                  placeholder: "Type team/athlete name",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: text => console.log(text)
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            /> */}
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
