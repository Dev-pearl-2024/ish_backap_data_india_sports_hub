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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getAthleteDetail();
  }, [selectedEvent, selectedSport]);
  
  const getAthleteDetail = async () => {
    try {
      setLoading(true);

      const sportsCategory =
        selectedSport && selectedSport !== 'All'
          ? `sport=${selectedSport}`
          : '';

      const eventCategory =
        selectedEvent && selectedEvent !== 'All'
          ? `&eventCategory=${selectedEvent}`
          : '';

      const createdURL = `https://prod.indiasportshub.com/tournaments/all/athletes/by/tournamentId/${tournamentDetail?._id}?sport=${sportsCategory}&eventCategory=${eventCategory}`;

      let res = await axios({
        method: 'get',
        url: createdURL,
      });

      console.log("ATH",res.data.data,createdURL)
      setAthleteDetail(res.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setAthleteDetail([]);
    }
  };
 

  const handleAtheleteProfileData = userId => {
    dispatch(getAtheleteDataRequest({params: userId}));
    navigation.navigate('athelete-profile', {athleteId: userId});
  };

  return (
    <View style={{backgroundColor: COLORS.white}}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <AthleteListing athleteDetail={athleteDetail} />
      )}
    </View>
  );
}
