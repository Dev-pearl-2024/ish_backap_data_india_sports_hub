import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import COLORS from '../../constants/Colors';
import Dropdown from '../../components/dropdown/Dropdown';
import AtheleteTable from '../../components/FavoriteComponents/atheleteTable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndianRanking = ({sportName}) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
    // You can add your custom logic here based on the selected value
    switch (value) {
      case 'option1':
        // Execute actions for Option 1
        console.log('Option 1 selected');
        break;
      case 'option2':
        // Execute actions for Option 2
        console.log('Option 2 selected');
        break;
      case 'option3':
        // Execute actions for Option 3
        console.log('Option 3 selected');
        break;
      default:
        break;
    }
  };
  const [eventCategory, setEventCategory] = useState([]);
  const [playerCategory, setPlayerCategory] = useState([]);
  const getMasterFields = async () => {
    try {
      let res = await AsyncStorage.getItem('masterData');
      res = JSON.parse(res);

      setEventCategory(res?.eventCategory?.[sportName]);
      setPlayerCategory(res?.playerCategory);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMasterFields();
  }, [sportName]);
  return (
    <ScrollView>
      <View style={styles.Container}>
        <View style={styles.dropdownSection}>
          <Dropdown
            placeholder="Event Categories "
            data={eventCategory}
            getValue={value => console.log(value)}
          />
        </View>
        <View style={styles.dropdownSection}>
          <Dropdown
            placeholder="Player Categories "
            data={playerCategory}
            getValue={value => console.log(value)}
          />
        </View>
        <View style={{...styles.radioSection, marginTop: 10}}>
          <Text style={styles.radioLabel}>Choose Your Event</Text>
          <RadioButton.Group
            onValueChange={value => handleRadioButtonPress(value)}
            value={selectedValue}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="option1" color={COLORS.primary} />
                <Text style={{color: COLORS.black}}>All</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <RadioButton value="option2" color={COLORS.primary} />
                <Text style={{color: COLORS.black}}>Male</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <RadioButton value="option3" color={COLORS.primary} />
                <Text style={{color: COLORS.black}}>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <AtheleteTable />
      </View>
    </ScrollView>
  );
};

export default IndianRanking;

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  dropdownSection: {paddingVertical: 20},
  radioLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.light_gray,
  },
  rankingTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
  rankingCateg: {
    marginTop: 10,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
});
