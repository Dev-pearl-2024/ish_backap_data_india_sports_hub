import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import TennisIcon from '../../assets/icons/sportIcons/tennis.svg';
import Wrestling from '../../assets/icons/sportIcons/Wrestling.svg';
import Sailing from '../../assets/icons/sportIcons/Sailing.svg';
import Swimming from '../../assets/icons/sportIcons/Swimming.svg';

const AllSports = () => {
  const navigation = useNavigation();
  const data = [
    {
      name: 'Tennis',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Wrestling',
      icon: <Wrestling />,
      status: 'active',
    },
    {
      name: 'Sailing',
      icon: <Sailing />,
      status: 'active',
    },
    {
      name: 'Swimming',
      icon: <Swimming />,
      status: 'inactive',
    },
    {
      name: 'Judo',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Table Tennis',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Shooting',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Golf',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Fencing',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Gymnastic',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Athletics',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Badminton',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Kayak',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Equestrian',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Hocky',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Handball',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Basketball',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Boxing',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Football',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Wallyball',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Archery',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Weightlifting',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Taekwondo',
      icon: <TennisIcon />,
      status: 'inactive',
    },
    {
      name: 'Cycling',
      icon: <TennisIcon />,
      status: 'inactive',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <View style={styles.sports}>
          {item.icon}
          <Text>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
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

      <Text style={styles.sportsTitle}>All Sports</Text>

      <View style={styles.sportsContainer}>
        <FlatList
          contentContainerStyle={{paddingBottom: 220}}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllSports;

const styles = StyleSheet.create({
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
  sportsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  sports: {
    width: 100,
    height: 100,
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
