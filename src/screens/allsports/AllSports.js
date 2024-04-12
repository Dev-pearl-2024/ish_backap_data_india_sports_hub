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
import sportsData from '../../data/sportsData';
import RedHeart from '../../assets/icons/redHeart.svg';

const AllSports = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.sports}>
            <View style={{alignSelf: 'flex-end', paddingHorizontal: 6}}>
              <RedHeart />
            </View>

            {item.icon}
            <Text style={styles.sportsName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
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
          data={sportsData}
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
  sportsName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.black,
  },
});
