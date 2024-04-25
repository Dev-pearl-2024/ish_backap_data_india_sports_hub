import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import React, {useState} from 'react';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackArrow from '../../assets/icons/backArrow.svg';
import FootballIcon from '../../assets/icons/football.svg';
import RightArrow from '../../assets/icons/rightArrow.svg';
import COLORS from '../../constants/Colors';
import LiveCards from '../../components/allsportsComponents/score/Live';
import UpcomingCards from '../../components/allsportsComponents/score/Upcoming';
import AllCards from '../../components/allsportsComponents/score/All';
import CompletedCards from '../../components/allsportsComponents/score/Completed';

import {useNavigation} from '@react-navigation/native';
import Dropdown from '../../components/dropdown/Dropdown';

const menu1 = ['Latest Update', 'Scores', 'Schedule', 'Athlete'];

const menu2 = ['All', 'Live', 'Upcoming', 'Completed'];

const TournamentView = () => {
  const navigation = useNavigation();
  const [activeTab1, setActiveTab1] = useState();
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
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: 10,
            borderRadius: 15,
          }}>
          <View style={styles.heading}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/archeryWorldCup.png')}
              />
              <Text
                style={[styles.sportsTitle, {fontSize: 22, fontWeight: '500'}]}>
                ARCHERY WORLD CUP
              </Text>
            </View>
          </View>

          <View style={{marginTop: 20, paddingBottom: 20}}>
            <RadioButton.Group
              onValueChange={value => handleRadioButtonPress(value)}
              value={selectedValue}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 100,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option1" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>2024</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="option2" color={COLORS.primary} />
                  <Text style={{color: COLORS.black}}>Previous Editions</Text>
                </View>
              </View>
            </RadioButton.Group>
            <View
              style={{
                width: '100%',
                backgroundColor: '#56BCBE',
                height: 1,
              }}
            />

            <View style={styles.timerContainer}>
              <Text style={{color: COLORS.dark_gray}}>
                27/Feb/2024 To 10/Mar/2024
              </Text>
              <View style={styles.timer}>
                <Text style={{color: COLORS.black}}>02 : 18 : 38 : 12</Text>
              </View>
            </View>
            <View style={{padding: 16}}>
              <Dropdown placeholder={'All Sports'} />
            </View>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 16,
              gap: 6,
              width: '100%',
            }}>
            {menu1.map((item, id) => {
              return (
                <TouchableOpacity
                  style={
                    activeTab1 === id
                      ? styles.categoryButton
                      : styles.categoryButtonInactive
                  }
                  key={`menu-item-${id}`}
                  onPress={() => setActiveTab1(id)}>
                  <Text
                    style={
                      activeTab1 === id
                        ? styles.activeText
                        : styles.inactiveText
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              gap: 6,
              backgroundColor: COLORS.white,
              width: '100%',
              paddingBottom: 10,
            }}>
            {menu2.map((item, id) => {
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
              backgroundColor: COLORS.white,
              borderBottomColor: '#56BCBE',
              borderBottomWidth: 1,
              height: 1,
            }}
          />
          {activeTab === 0 && <AllCards />}
          {activeTab === 1 && <LiveCards />}
          {activeTab === 2 && <UpcomingCards />}
          {activeTab === 3 && <CompletedCards />}
        </View>
      </ScrollView>
    </>
  );
};

export default TournamentView;

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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timer: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
});
