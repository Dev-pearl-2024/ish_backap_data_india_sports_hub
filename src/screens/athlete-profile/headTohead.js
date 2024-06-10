import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/Colors';
import Dropdown from '../../components/dropdown/Dropdown';
import AllCards from '../../components/allsportsComponents/score/All';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HeadToHead({ athleteId}) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventCategory,setEventCategory] = useState([])
  const [tournamentData, setTournamentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTournamentData = async () => {
    console.log(selectedEvent,eventCategory,'----')
    try {
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `http://15.206.246.81:3000/events/head-to-head/${selectedEvent}?userId=${athleteId}`,
      });
      setTournamentData(res.data.data);
      setLoading(false);
      console.log(res.data)
    } catch (e) {
      setLoading(false);
      console.log(e, 'eror');
      setTournamentData([])
    }
  };
  useEffect(() => {
    getTournamentData();
  }, [athleteId, selectedEvent,eventCategory]);
  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem('masterData');
      res = JSON.parse(res);
      setSelectedEvent(res?.sports[0]);
      setEventCategory(res?.sports)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMasterFields();
  }, []);
  return (
    <View style={{backgroundColor: COLORS.white, padding: 10}}>
      <View style={styles.dropdownSection}>
        <Dropdown
          placeholder="Event Categories"
          data={eventCategory}
          getValue={value => setSelectedEvent(value)}
        />
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <AllCards
            data={tournamentData}
            setTournamentData={setTournamentData}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownSection: {paddingVertical: 10},
  radioLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.light_gray,
  },
});
