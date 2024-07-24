import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import BackHeader from '../../components/Header/BackHeader';
import BlueHockey from '../../assets/icons/sportIcons/BlueHockey.js';
import BlueBasketball from '../../assets/icons/sportIcons/BlueBasketball.js';
import BlueBaseball from '../../assets/icons/sportIcons/BlueBaseball.js';
import BlueFootball from '../../assets/icons/sportIcons/BlueFootball.js';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import iconData from '../../data/sportsDataSmall.js';
import NoData from '../../components/NodataComponent/NoData.js';

export const SLIDER_WIDTH = Dimensions.get('window').width + 10;
export const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LatestDomesticView({route}) {
  const {domesticData} = route.params;

  const [newDomesticData, setNewDomesticData] = useState([]);
  const domesticArr = [];
  const [filterDomesticData, setFilterDomesticData] = useState(domesticData);

  useEffect(() => {
    if (domesticData) {
      domesticData.map(data => {
        if (domesticArr.includes(data.sport)) {
          return;
        } else {
          domesticArr.push(data.sport);
        }
      });
      const mergeDataIcon = domesticArr?.map(sport => {
        const foundsportName = iconData?.find(
          item => item.name?.toLowerCase() === sport?.toLowerCase(),
        );
        return foundsportName ? {sport, icon: foundsportName.icon} : sport;
      });
      setNewDomesticData(mergeDataIcon);
    }
  }, [domesticData]);

  const FilterDomasticData = data => {
    let y = domesticData?.filter(
      item => item?.sport?.toLowerCase() === data.sport?.toLowerCase(),
    );
    setFilterDomesticData(y);
  };

  console.log(filterDomesticData, 'filterDomesticData');
  // const headMenu = [
  //   {title: 'View All', icon: ''},
  //   {
  //     title: 'Field Hockey',
  //     icon: <BlueHockey color={activeTab === 1 ? 'white' : '#0166C2'} />,
  //   },
  //   {
  //     title: 'Basketball',
  //     icon: <BlueBasketball color={activeTab === 2 ? 'white' : '#0166C2'} />,
  //   },
  //   {
  //     title: 'Baseball',
  //     icon: <BlueBaseball color={activeTab === 3 ? 'white' : '#0166C2'} />,
  //   },
  //   {
  //     title: 'Football',
  //     icon: <BlueFootball color={activeTab === 4 ? 'white' : '#0166C2'} />,
  //   },
  // ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <BackHeader />

      <Text style={styles.sportsTitle}>Latest Domestic</Text>
      <View style={{flexDirection: 'row'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 6,
            paddingVertical: 10,
          }}>
          {/* {headMenu.map((data, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={`card-${id}`}
                onPress={() => setActiveTab(id)}>
                {data.icon}
                <Text
                  style={
                    activeTab === id ? styles.activeText : styles.inactiveText
                  }>
                  {data.title}
                </Text>
              </TouchableOpacity>
            );
          })} */}
          <TouchableOpacity
            style={
              activeTab === 0
                ? styles.categoryButton
                : styles.categoryButtonInactive
            }
            onPress={() => {
              setFilterDomesticData(domesticData), setActiveTab(0);
            }}>
            <Text
              style={activeTab === 0 ? styles.activeText : styles.inactiveText}>
              View All
            </Text>
          </TouchableOpacity>
          {newDomesticData?.map((data, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id + 1
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={id}
                onPress={() => {
                  setActiveTab(id + 1), FilterDomasticData(data);
                }}>
                {/* <View style={{height: 10, width: 10, objectFit: 'contain'}}> */}
                {data?.icon}
                {/* </View> */}
                {/* <Text
                  style={
                    activeTab === id + 1
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  {data?.sport}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* <ScrollView>
        {data.map((item, index) => (
          <CarouselCardItem item={item} key={index} />
        ))}
      </ScrollView> */}
      <FlatList
        data={filterDomesticData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CarouselCardItem item={item} index={index} />
        )}
        ListEmptyComponent={<NoData />}
      />
    </>
  );
}

const CarouselCardItem = ({item, index}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      key={index}
      onPress={() => {
        navigation.navigate('score-view');
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <FootballIcon />
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
              {item?.name}
            </Text>
            <Text style={{color: COLORS.black}}>
              {item?.gender} / {item?.category}
            </Text>
          </View>
        </View>

        <View style={styles.liveView}>
          <View style={styles.redDot} />
          <Text style={{color: COLORS.medium_gray}}>Live</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        {[1, 2, 3, 4].map((item, index) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
            }}>
            <Image
              source={require('../../assets/images/india.png')}
              style={{width: 22, height: 22}}
            />
            <Text style={{color: COLORS.black}}>India</Text>
            <Text style={{color: COLORS.black}}>82</Text>
          </View>
        ))}
      </View>
      <View style={styles.line} />
      <Text style={{textAlign: 'center', color: COLORS.black}}>
        10/05/2024 | 10:45 AM
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, fontWeight: '500', color: COLORS.black}}>
            Powered by :{' '}
          </Text>
          <Zomato />
        </View>
        {/* <GrayHeart /> */}
        <TouchableOpacity>
          {item?.isFavourite ? <RedHeart /> : <GrayHeart />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  container: {
    // flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    // width: '95%',
    // height:'100%',
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: COLORS.red,
    marginHorizontal: 5,
  },
  liveView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  line: {
    width: '50%',
    height: 2,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
  carouselHeadingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: 16,
  },
  carouselTitle: {
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
    flexDirection: 'row',
    gap: 5,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
  },
});
