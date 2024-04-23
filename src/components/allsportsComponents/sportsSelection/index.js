import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import sportsData from '../../../data/sportsData';
import COLORS from '../../../constants/Colors';
import RedHeart from '../../../assets/icons/redHeart.svg';
export default function SportSelection({route}) {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
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
  );
}

const styles = StyleSheet.create({
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
});
