import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import sportsData from '../../../data/sportsData';
import COLORS from '../../../constants/Colors';
import RedHeart from '../../../assets/icons/redHeart.svg';
import GrayHeart from '../../../assets/icons/grayHeart.svg';
import axios from 'axios';
import {useEffect, useState} from 'react';
export default function SportSelection({route}) {
  const navigation = useNavigation();
  const [data,setData] = useState([])
  const getAllSports = async () => {
    try {
      const response = await axios.get(
        'http://15.206.246.81:3000/all/sports/662b81ac8b2dd3f7b7d24391',
      );
      console.log(response.data.sports, '------- all spors');
      setData(response.data.sports)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllSports();
  }, []);
  const addFavorite = async (name,status) => {
    try {
      const body = {
        sportName:name,
        isAdd:status
      }
      const response = await axios(
        {method:"POST",
        data:body,
        url:"http://15.206.246.81:3000/users/myfavorite/662b81ac8b2dd3f7b7d24391/category/sport"
        }
      )
      console.log(response.data,"------ add favorite")
      setData(data.map(item => 
        item.name === name ? {...item, isFavorite: !item.isFavorite} : item
      ));
    }
    catch(e){
      console.log(e)
    }
  }
  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}} key={index}>
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
          <View style={styles.sports}>
            <TouchableOpacity style={{alignSelf: 'flex-end', paddingHorizontal: 6}}
            onPress={()=>{addFavorite(item?.name,!item?.isFavorite)}}
            >
            {item?.isFavorite ?
              <RedHeart /> : <GrayHeart/>}
            </TouchableOpacity>

            {/* {item?.icon} */}
            <Text style={styles.sportsName}>{item?.name}</Text>
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
        data={data}
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
