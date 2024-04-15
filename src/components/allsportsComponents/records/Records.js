import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import LogoIcon from '../../../assets/icons/logo.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../../assets/icons/backArrow.svg';
import FootballIcon from '../../../assets/icons/football.svg';
import RightArrow from '../../../assets/icons/rightArrow.svg';
import COLORS from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import AtheleteTable from '../../FavoriteComponents/atheleteTable';
import Dropdown from '../../dropdown/Dropdown';

const menu = ['Indian ', 'Asian', 'World', 'Olympic', 'Tournament'];

const Records = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(1);
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

      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{width: '33%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '33%',
            alignItems: 'center',
          }}>
          <LogoIcon />
        </View>

        <View style={styles.noticification}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchIcon style={{marginRight: 24}} />
            <NoticificationIcon />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootballIcon />
            <Text style={styles.sportsTitle}>ARCHERY</Text>
          </View>
          <Text style={{fontSize: 16, fontWeight: '700', lineHeight: 23}}>
            RECORDS
          </Text>
        </View>

        <View style={styles.sectionView}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 6}}>
            {menu.map((item, id) => {
              return (
                <TouchableOpacity
                  style={
                    activeTab === id
                      ? styles.categoryButton
                      : styles.categoryButtonInactive
                  }
                  key={`menu-item-${id}`}
                  onPress={() => setActiveTab(id)}>
                  <Text
                    style={
                      activeTab === id ? styles.activeText : styles.inactiveText
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View
            style={{
              width: '100%',
              backgroundColor: '#56BCBE',
              height: 1,
              marginTop: 10,
            }}
          />
          <View
            style={{
              borderWidth: 1,
              width: '90%',
              borderColor: COLORS.gray,
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Dropdown />
          </View>

          <View style={{margin: 16}}>
            <Text>Choose your Category</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option1" color={COLORS.primary} />
                  <Text>All</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text>Senior</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text>Junior</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text>Para</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={{margin: 16}}>
            <Text>Choose your Events</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '70%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option1" color={COLORS.primary} />
                  <Text>All</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text>Male</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text>Female</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View style={styles.sectionView}>
          <AtheleteTable />
        </View>
      </ScrollView>
    </>
  );
};

export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
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
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 60,
  },
  noticification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%',
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },

  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
  },
  sectionView: {
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
    height: 'auto',
    borderRadius: 15,
  },
});
