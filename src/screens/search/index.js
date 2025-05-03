import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';

import { getAtheleteDataRequest } from '../../redux/actions/atheleteActions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewSportCard from '../../components/ScoreCardComponents/NewSportCard';
import LiveCard from '../../components/CommonCards/liveTournamentCard';

const SearchPage = () => {
  const [searchCriteria, setSearchCriteria] = useState('Athlete');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isApiCallSuccess, setIsApiCallSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState(null)

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }

  useEffect(() => {
    getStoreData()
  }, [])

  useEffect(() => {
    setSearchList([]);
    setSearchInput('');
    setIsApiCallSuccess(false);
  }, [searchCriteria]);

  const renderTournaments = tournaments => {
    return (
      <View>
        {tournaments.length === 0 && renderEmptyComponent()}
        {tournaments.map(item => (
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 16,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', paddingHorizontal: 6 }}
              onPress={() => {
                accessToken ? addFavorite(item?._id, item?.name, !item?.isFavorite, 'tournament') : navigation.navigate("Login")
              }}>
              {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('tournament-view', {
                  tournamentDetail: item,
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Image
                  source={{ uri: item.icon }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: COLORS.black,
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 14 }}>
                    {item.sportType}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const addFavorite = async (id, name, status, category) => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const response = await axios({
        method: 'POST',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/${category}`,
        data: { favoriteItemId: id, isAdd: status },
      });
    } catch (e) {
      console.log(e);
    }
    setSearchList(
      searchList?.map(item =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      )
    );
  };

  const handleAtheleteProfileData = item => {
    const userId = item?._id
    dispatch(getAtheleteDataRequest({ params: userId }));
    navigation.navigate('athelete-profile', { athleteId: userId, athleteData: item });
  };

  const handleTeamProfileData = item => {
    const userId = item?._id
    dispatch(getAtheleteDataRequest({ params: userId }));
    navigation.navigate('team-profile', { teamId: userId, athleteData: item });
  };

  const renderEmptyComponent = () => {
    if (isApiCallSuccess) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: COLORS.white,
            marginTop: searchCriteria === 'Athlete' ? 0 : 20,
          }}>
          <Text style={{ color: COLORS.black }}>No Data Found</Text>
        </View>
      );
    }
  };

  const renderAthlete = athletes => {
    return (
      <View>
        {athletes.length === 0 && renderEmptyComponent()}
        {athletes.map(item => (
          <>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 16,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', paddingHorizontal: 6 }}
                onPress={() => {
                  accessToken ? addFavorite(item?._id, item?.fullName, !item?.isFavorite, 'athlete') : navigation.navigate("Login")
                }}>
                {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleAtheleteProfileData(item);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Image
                    source={{ uri: item.coverImage }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: COLORS.black,
                      }}>
                      {item.fullName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                    Age :
                  </Text>
                  <Text style={{ color: COLORS.black, fontSize: 12 }}>
                    {item.age}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                    Gender :
                  </Text>
                  <Text style={{ color: COLORS.black, fontSize: 12 }}>
                    {item.gender}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ))}
      </View>
    );
  };

  const renderTeam = team => {
    return (
      <View>
        {team.length === 0 && renderEmptyComponent()}
        {team.map(item => (
          <>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 16,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', paddingHorizontal: 6 }}
                onPress={() => {
                  accessToken ? addFavorite(item?._id, item?.name, !item?.isFavorite, 'team') : navigation.navigate("Login")
                }}>
                {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTeamProfileData(item);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Image
                    source={{ uri: item.coverImage }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: COLORS.black,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                    Country :
                  </Text>
                  <Text style={{ color: COLORS.black, fontSize: 12 }}>
                    {item.country}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                    Gender :
                  </Text>
                  <Text style={{ color: COLORS.black, fontSize: 12 }}>
                    {item.category}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                    Sport :
                  </Text>
                  <Text style={{ color: COLORS.black, fontSize: 12 }}>
                    {item.sports}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ))}
      </View>
    );
  };

  const renderEvents = events => {
    return (
      <View>
        {events.length === 0 && renderEmptyComponent()}
        {events.map((item, id) => (

          <>
            <LiveCard
              title={item?.name}
              date={item?.startDate}
              time={item?.startTime}
              category={item?.category}
              score={item?.score}
              country1={item?.teamAName}
              country2={item?.teamBName}
              status={item?.status}
              sport={item?.sport}
              eventGenders={item?.tournamentName}
              startDate={item?.startDate}
              endDate={item?.endDate}
              startTime={item?.startTime}
              endTime={item?.endTime}
              key={`live-item-${id}`}
              data={item}
              teams={item?.teams}
              isFavorite={item?.isFavorite}
              handleFav={() => accessToken ? addFavorite(item?._id, item?.name, !item?.isFavorite, 'event') : navigation.navigate("Login")}
            />
          </>
        ))}
      </View>
    );
  };

  const renderResults = () => {
    if (searchCriteria === 'Athlete') {
      return renderAthlete(searchList);
    } else if (searchCriteria === 'Tournament') {
      return renderTournaments(searchList);
    } else if (searchCriteria === 'Event') {
      return renderEvents(searchList);
    } else if (searchCriteria === 'Team') {
      return renderTeam(searchList);
    }

  };

  const handleSearch = async () => {
    let userId = await AsyncStorage.getItem('userId');
    const url = `https://prod.indiasportshub.com/events/search/${userId}?criteria=${searchCriteria}&searchValue=${searchInput}&page=0&limit50`;
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url,
      });

      setLoading(false);
      let searchData = [];
      if (searchCriteria === 'Athlete') {
        searchData = response?.data?.data?.athletes || [];
      } else if (searchCriteria === 'Tournament') {
        searchData = response?.data?.data?.tournaments || [];
      } else if (searchCriteria === 'Event') {
        searchData = response?.data?.data?.events?.data || [];
      } else if (searchCriteria === 'Team') {
        searchData = response?.data?.data?.teams || [];
      }

      setSearchList(searchData);
      setIsApiCallSuccess(true);
    } catch (error) {
      setLoading(false);
      setIsApiCallSuccess(true);
      throw new Error('Failed to search');
    }
  };

  return (
    <View>
      <ScrollView>
        <BackHeader />
        <Text style={styles.titleText}>Search</Text>
        <View style={styles.container}>
          {/* Label and TextInput in the same row */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={COLORS.black}
              style={styles.input}
              placeholder="Type your search here..."
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>

          {/* Pill buttons for criteria */}
          <View style={styles.pillsContainer}>
            {['Athlete', 'Tournament', 'Event', "Team"].map(criteria => (
              <TouchableOpacity
                style={
                  searchCriteria === criteria
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={criteria}
                onPress={() => setSearchCriteria(criteria)}>
                <Text
                  style={
                    searchCriteria === criteria
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  {criteria}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleSearch}
            style={{
              borderRadius: 5,
              padding: 10,
              backgroundColor: COLORS.primary,
            }}>
            <Text style={{ color: 'white', fontWeight: 400, textAlign: 'center' }}>
              SEARCH
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {loading ? (
              <View style={{ paddingTop: 20 }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              renderResults()
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

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
    color: COLORS.black
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

export default SearchPage;
