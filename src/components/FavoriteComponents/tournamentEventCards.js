import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import dynamicSize from '../../utils/DynamicSize';
import ExpandableCard from '../../screens/Calendar/expandCard';

const height = Dimensions.get('window').height;

export default function TournamentEventCards({ data, setData, source, sportName }) {
  const navigation = useNavigation();
  const [multidata, setMultiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null)
  const [isListView, setIsListView] = useState(true)
  const [isGrid, setIsGrid] = useState(true);

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }

  const getMultSportsData = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setLoading(true);
      let res = await axios({
        method: 'get',
        url: `https://prod.indiasportshub.com/tournaments/filter/data?userId=${userId}&page=0&sportType=Multi-Sporting`,
      });
      setMultiData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMultSportsData();
  }, []);

  useEffect(() => {
    getStoreData()
  }, [])

  const addFavorite = async (id, status) => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      const response = await axios({
        method: 'POST',
        url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/tournament`,
        data: { favoriteItemId: id, isAdd: status },
      });
    } catch (e) {
      console.log(e);
    }
    setData(
      data?.map(item =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
  };
  const renderItem = (item, index, length) => {
    return isListView ? <View style={index == length ? { marginBottom: "20%" } : { marginBottom: "2%" }}>
      <ExpandableCard
        customStyle={{ borderWidth: 2, borderColor: COLORS.gray, borderRadius: 10, padding: 0 }}
        navigate={() => {
          navigation.navigate('tournament-view', {
            tournamentDetail: item,
            source: source,
            sportNameData: sportName
          });
        }} isExpandable={false} tournament={item} />
    </View> : <View style={{ padding: 10 }} key={index}>
      <TouchableOpacity
        key={index}
        style={{
          borderWidth: 1,
          borderColor: COLORS.light_gray,
          width: dynamicSize(100),
          height: dynamicSize(110),
          alignItems: 'center',
          justifyContent: 'center',
          gap: dynamicSize(8),
          borderRadius: dynamicSize(10),
          backgroundColor: COLORS.white,
          paddingTop: dynamicSize(10),
        }}
        onPress={() => {
          navigation.navigate('tournament-view', {
            tournamentDetail: item,
            source: source,
            sportNameData: sportName
          });
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: 6,
            position: 'absolute',
            top: 3,
            right: 2,
            zIndex: 999,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 50,
          }}
          onPress={() => {
            accessToken ? addFavorite(item?._id, !item?.isFavorite) : navigation.navigate("Login")
          }}>
          {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
        </TouchableOpacity>
        <Image
          source={
            item?.icon || item?.coverImage
              ? { uri: item?.icon || item?.coverImage }
              : require('../../assets/images/olympic.png')
          }
          style={{
            width: dynamicSize(80),
            height: dynamicSize(50),
            objectFit: 'contain',
            borderRadius: dynamicSize(10),
          }}
        />
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: COLORS.black, textAlign: 'center' }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    </View>
  }

  return (
    <View
      style={{
        height: height - dynamicSize(200),
        flexDirection: 'column',
        paddingHorizontal: dynamicSize(10),
        paddingVertical: dynamicSize(16),
        backgroundColor: COLORS.white,
        borderRadius: dynamicSize(15),
        marginVertical: dynamicSize(10),
      }}>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !isListView ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setIsListView(false)}
          >
            <Text style={[styles.buttonText, !isListView ? styles.activeText : styles.inactiveText]}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isListView ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setIsListView(true)}
          >
            <Text style={[styles.buttonText, isListView ? styles.activeText : styles.inactiveText]}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        isListView ? <FlatList
          // style={{marginBottom:dynamicSize(40)}}
          data={data || multidata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return renderItem(item, index, data?.length - 1 || multidata?.length - 1)
          }}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: dynamicSize(50),
              }}>
              <Text style={{ color: COLORS.black }}>No Tournaments Found</Text>
            </View>
          }
        /> : <View>
          <FlatList
            // style={{marginBottom:dynamicSize(40)}}
            data={data || multidata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return renderItem(item, index, data?.length - 1 || multidata?.length - 1)
            }}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: dynamicSize(50),
                }}>
                <Text style={{ color: COLORS.black }}>No Tournaments Found</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  buttonContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 16 },
  button: { justifyContent: 'center', padding: 5, borderRadius: 6, marginHorizontal: 5 },
  activeButton: { backgroundColor: COLORS.primary },
  inactiveButton: { borderWidth: 1, borderColor: "gray", backgroundColor: "transparent" },
  buttonText: { fontSize: 14 },
  activeText: { color: "white" },
  inactiveText: { color: "gray" },
  gridItem: { flex: 1, padding: 20, margin: 5, backgroundColor: "#ddd", alignItems: "center" },
  listItem: { padding: 20, marginVertical: 5, backgroundColor: "#ddd", alignItems: "center" },
});