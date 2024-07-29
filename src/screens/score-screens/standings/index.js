import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import COLORS from '../../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../../components/dropdown/Dropdown';

const Standings = ({sportData}) => {
  const width = Dimensions.get('window').width;
  console.log(sportData, 'sportData');
  let {standingForCountry, countryStandingList, standing} =
    sportData?.tournamentsDetails || {};

  const [eventCategories, setEventCategories] = useState([]);
  const [selectedEventCategory, setSelectdEventCategory] = useState('');
  const [regularStandings, setRegularStandings] = useState([]);

  useEffect(async () => {
    let res = await AsyncStorage.getItem('masterData');
    let parsed = JSON.parse(res);

    setEventCategories(parsed.eventCategory[sportData.sport]);
  }, []);

  console.log(regularStandings, 'regularStanding');

  useEffect(() => {
    let {sport} = sportData;

    const getPlayersBySportAndCategory = (sportName, eventCategory) => {
      const standingEntry = sportData.tournamentsDetails.standing.find(
        standing =>
          standing.sport === sportName &&
          standing.eventCategory === eventCategory,
      );

      if (!standingEntry) {
        console.log(
          'No standing entry found for the specified sport and event category.',
        );
        return [];
      } else {
        return standingEntry.players;
      }
    };

    let filteredStandings = getPlayersBySportAndCategory(
      sport,
      selectedEventCategory,
    );
    setRegularStandings(filteredStandings);
  }, [selectedEventCategory, setRegularStandings]);

  return (
    <ScrollView style={{backgroundColor: COLORS.white}}>
      {standingForCountry === 'no' && (
        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
          <Dropdown
            placeholder={'Choose Event Category'}
            data={eventCategories}
            getValue={value => setSelectdEventCategory(value)}
            includeAll={false}
          />
        </View>
      )}

      {standingForCountry == 'no' && (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              width: width,
            }}>
            <Text style={{width: '20%', color: '#56BCBE'}}>Rank</Text>
            <Text style={{color: '#56BCBE', width: '30%'}}>Player Name</Text>
            <Text style={{color: '#56BCBE', width: '30%'}}>Country</Text>
            <Text style={{color: '#56BCBE', width: '20%'}}>Result</Text>
          </View>

          <FlatList
            data={regularStandings}
            //   keyExtractor={item => item._id}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  width: width,
                }}>
                <Text style={{color: COLORS.black, textAlign: 'center'}}>
                  No Data Found
                </Text>
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
                onPress={() => {
                  // handleAtheleteProfileData(item?._id);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    width: '20%',
                  }}>
                  <Text style={{color: COLORS.black}} numberOfLines={1}>
                    {item.rank}
                  </Text>
                  <Image
                    source={require('../../../assets/images/user.png')}
                    style={{
                      borderRadius: 50,
                      marginLeft: 5,
                      width: 25,
                      height: 25,
                    }}
                    width={25}
                    height={25}
                  />
                </View>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '30%',
                  }}>
                  {item.player.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '30%',
                  }}>
                  {item.country}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '20%',
                  }}>
                  {item.result}
                </Text>
              </View>
            )}
          />
        </View>
      )}

      {standingForCountry === 'yes' && (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              width: width,
            }}>
            <Text style={{width: '20%', color: '#56BCBE'}}>Rank</Text>
            <Text style={{color: '#56BCBE', width: '30%'}}>Country/State</Text>
            <Text style={{color: '#56BCBE', width: '18%'}}>Gold</Text>
            <Text style={{color: '#56BCBE', width: '18%'}}>Silver</Text>
            <Text style={{color: '#56BCBE', width: '18%'}}>Bronze</Text>
          </View>

          <FlatList
            data={standingForCountry === 'yes' ? countryStandingList : []}
            //   keyExtractor={item => item._id}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  width: width,
                }}>
                <Text style={{color: COLORS.black, textAlign: 'center'}}>
                  No Data Found
                </Text>
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
                onPress={() => {
                  // handleAtheleteProfileData(item?._id);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    width: '20%',
                  }}>
                  <Text style={{color: COLORS.black}} numberOfLines={1}>
                    {item.rank}
                  </Text>
                  <Image
                    source={require('../../../assets/images/user.png')}
                    style={{
                      borderRadius: 50,
                      marginLeft: 5,
                      width: 25,
                      height: 25,
                    }}
                    width={25}
                    height={25}
                  />
                </View>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '30%',
                  }}>
                  {item.country}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '18%',
                  }}>
                  {item.gold}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '18%',
                  }}>
                  {item.silver}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    width: '18%',
                  }}>
                  {item.bronze}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Standings;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 20,
  },
  pill: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activePill: {
    backgroundColor: '#007bff',
  },
  pillText: {
    color: 'black',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  rowGap: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
  },
  categoryText: {
    color: COLORS.dark_gray,
    fontSize: 14,
  },
  labelText: {
    color: COLORS.dark_gray,
    fontSize: 12,
  },
  valueText: {
    color: COLORS.black,
    fontSize: 12,
  },
  dateText: {
    color: COLORS.dark_gray,
    fontSize: 12,
  },
});
