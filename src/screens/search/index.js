import React, {useEffect, useState} from 'react';
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
import {ActivityIndicator} from 'react-native-paper';
import {getAtheleteDataRequest} from '../../redux/actions/atheleteActions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SearchPage = () => {
  const [searchCriteria, setSearchCriteria] = useState('athlete');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isApiCallSuccess, setIsApiCallSuccess] = useState(false);

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
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('score-view', {sportData: item});
            // }}
            style={{
              backgroundColor: COLORS.white,
              padding: 16,
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Image
                  source={{uri: item.icon}}
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
                  <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                    {item.sportType}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile', {athleteId: userId});
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
            marginTop: searchCriteria === 'athlete' ? 0 : 20,
          }}>
          <Text style={{color: COLORS.black}}>No Data Found</Text>
        </View>
      );
    }
  };

  const renderAthlete = athletes => {
    return (
      <View style={{backgroundColor: COLORS.white, marginTop: 20}}>
        {athletes.length > 0 && (
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
        )}

        <FlatList
          data={athletes}
          keyExtractor={item => item._id}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                padding: 10,
              }}
              onPress={() => {
                handleAtheleteProfileData(item?._id);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  width: '40%',
                }}>
                <Image
                  source={
                    item?.icon
                      ? {uri: item?.icon}
                      : require('../../assets/images/user.png')
                  }
                  style={{borderRadius: 50, width: 25, height: 25}}
                  width={25}
                  height={25}
                />
                <Text style={{color: COLORS.black}}>{item?.fullName}</Text>
              </View>
              <Text style={{color: COLORS.black, textAlign: 'center'}}>
                {item?.category}
              </Text>
              <Text style={{color: COLORS.black, textAlign: 'center'}}>
                {moment(item?.createdAt).format('DD-MM-YYYY')}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderEvents = events => {
    return (
      <View>
        {events.length === 0 && renderEmptyComponent()}
        {events.map(item => (
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 16,
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <View>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: COLORS.black,
                    }}>
                    {item.name}
                  </Text>
                  <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                    {item.category}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                  Stage :
                </Text>
                <Text style={{color: COLORS.black, fontSize: 12}}>
                  {item.eventStage}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                  Venue :
                </Text>
                <Text style={{color: COLORS.black, fontSize: 12}}>
                  {item.eventVenue}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                  {moment(item?.startDate).format('DD/MM/YYYY | hh:mm A')}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderResults = () => {
    if (searchCriteria === 'athlete') {
      return renderAthlete(searchList);
    } else if (searchCriteria === 'tournament') {
      return renderTournaments(searchList);
    } else if (searchCriteria === 'event') {
      return renderEvents(searchList);
    }
  };

  const handleSearch = async () => {
    const url = `http://15.206.246.81:3000/events/search?criteria=${searchCriteria}&searchValue=${searchInput}`;

    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url,
      });

      console.log(response?.data, 'abc');
      setLoading(false);
      let searchData = [];
      if (searchCriteria === 'athlete') {
        searchData = response?.data?.data?.athletes || [];
      } else if (searchCriteria === 'tournament') {
        searchData = response?.data?.data?.tournaments || [];
      } else if (searchCriteria === 'event') {
        searchData = response?.data?.data?.events?.data || [];
      }

      setSearchList(searchData);
      setIsApiCallSuccess(true);
    } catch (error) {
      setLoading(false);
      setIsApiCallSuccess(true);

      throw new Error('Failed to search');
    }
  };

  console.log(searchList, 'searchList');
  return (
    <View>
      <BackHeader />
      <Text style={styles.titleText}>Search</Text>
      <View style={styles.container}>
        {/* Label and TextInput in the same row */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your search here..."
            value={searchInput}
            onChangeText={setSearchInput}
          />
        </View>

        {/* Pill buttons for criteria */}
        <View style={styles.pillsContainer}>
          {['athlete', 'tournament', 'event'].map(criteria => (
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
          <Text style={{color: 'white', fontWeight: 400, textAlign: 'center'}}>
            SEARCH
          </Text>
        </TouchableOpacity>
        <ScrollView>
          {loading ? (
            <View style={{paddingTop: 20}}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            renderResults()
          )}
        </ScrollView>
      </View>
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
