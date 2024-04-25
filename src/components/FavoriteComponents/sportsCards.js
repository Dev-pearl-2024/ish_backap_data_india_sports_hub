import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SingleSportCard from '../CommonCards/singleSportCard';
import COLORS from '../../constants/Colors';
import axios from 'axios';
import {useEffect} from 'react';
import sportsData from '../../data/sportsData';
import {useNavigation} from '@react-navigation/native';
import RedHeart from '../../assets/icons/redHeart.svg';

const SportsCards = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Archery')}>
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

export default SportsCards;

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
    lineHeight: 24,
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
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
  sportsContainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
});
