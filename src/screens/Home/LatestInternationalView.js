import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import BackHeader from '../../components/Header/BackHeader';
import RedHeart from '../../assets/icons/redHeart.svg';
import BlueHockey from '../../assets/icons/sportIcons/BlueHockey.js';
import BlueBasketball from '../../assets/icons/sportIcons/BlueBasketball.js';
import BlueBaseball from '../../assets/icons/sportIcons/BlueBaseball.js';
import BlueFootball from '../../assets/icons/sportIcons/BlueFootball.js';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import iconData from '../../data/sportsDataSmall.js';
import NoData from '../../components/NodataComponent/NoData.js';
import dynamicSize from '../../utils/DynamicSize.js';

export const SLIDER_WIDTH = Dimensions.get('window').width + 10;
export const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function LatestInterNationalView({route}) {
  const {internationalData, isDomestic} = route.params;
  const navigation = useNavigation();

  const [newInternationalData, setNewInternationalData] = useState([]);
  const [filterInternationalData, setFilterInternationalData] =
    useState(internationalData);
  const internationalArr = [];

  useEffect(() => {
    if (internationalData) {
      internationalData.map(data => {
        if (internationalArr.includes(data.sport)) {
          return;
        } else {
          internationalArr.push(data.sport);
        }
      });
      const mergeDataIcon = internationalArr?.map(sport => {
        const foundsportName = iconData?.find(
          item => item.name?.toLowerCase() === sport?.toLowerCase(),
        );
        return foundsportName ? {sport, icon: foundsportName.icon} : sport;
      });
      setNewInternationalData(mergeDataIcon);
    }
  }, [internationalData]);

  const internationFilter = data => {
    let x = internationalData?.slice(0, 3)?.filter(item => {
      item?.sport?.toLowerCase() === data?.sport?.toLowerCase();
    });

    setFilterInternationalData(x);
  };

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
      <Text style={styles.sportsTitle}>
        Latest {isDomestic ? 'Domestic' : 'International'}
      </Text>
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
              setFilterInternationalData(internationalData), setActiveTab(0);
            }}>
            <Text
              style={activeTab === 0 ? styles.activeText : styles.inactiveText}>
              View All
            </Text>
          </TouchableOpacity>
          {newInternationalData?.map((data, id) => {
            return (
              <TouchableOpacity
                style={
                  activeTab === id + 1
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={id}
                onPress={() => {
                  setActiveTab(id + 1), internationFilter(data);
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
      {/* <ScrollView> */}
      {/* {internationalData.map((item, index) => (
          <CarouselCardItem key={index} item={item} navigation={navigation} />
        ))} */}

      <FlatList
        data={filterInternationalData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CarouselCardItem
            item={item}
            index={index}
            navigation={navigation}
            setFilterInternationalData={setFilterInternationalData}
            filterInternationalData={filterInternationalData}
          />
        )}
        ListEmptyComponent={<NoData />}
      />

      {/* </ScrollView> */}
    </>
  );
}

const CarouselCardItem = ({
  item,
  index,
  navigation,
  setFilterInternationalData,
  filterInternationalData,
}) => {
  const handleFav = async (id, fav) => {
    console.log(id, fav);
    let userId = await AsyncStorage.getItem('userId');
    try {
      let res = await axios({
        method: 'post',
        url: `http://15.206.246.81:3000/users/myfavorite/${userId}/category/event`,
        data: {
          favoriteItemId: id,
          isAdd: !fav,
        },
      });
      setFilterInternationalData(
        filterInternationalData?.map(item =>
          item._id === id ? {...item, isFavorite: !item.isFavorite} : item,
        ),
      );
      console.log(filterInternationalData, 'rrrrrrrr');
    } catch (e) {
      console.log(e);
    }
  };

  const sportsData = iconData?.find(
    icon => icon.name?.toLowerCase() === item.sport?.toLowerCase(),
  );

  const renderVs = item => {
    if (item?.participation === 'A Vs B') {
      return (
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
              width: 70,
            }}>
            <Image
              source={
                item.team[0]?.icon
                  ? {uri: item.team[0]?.icon}
                  : require('../../assets/images/user.png')
              }
              style={{width: 25, height: 25, borderRadius: 22}}
            />
            <Text
              style={{color: COLORS.black, width: 60, textAlign: 'center'}}
              numberOfLines={1}>
              {item.team[0]?.name}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
            }}>
            <View style={styles.containerVs}>
              <Text style={styles.team}>31</Text>
              <Image
                source={require('../../assets/images/vs.png')}
                style={styles.vsIcon}
              />
              <Text style={styles.team}>22</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: SLIDER_HEIGHT / 15,
              paddingHorizontal: 24,
              width: 70,
            }}>
            <Image
              source={
                item.team[1]?.icon
                  ? {uri: item.team[1]?.icon}
                  : require('../../assets/images/user.png')
              }
              style={{width: 25, height: 25, borderRadius: 22}}
            />
            <Text
              style={{color: COLORS.black, width: 60, textAlign: 'center'}}
              numberOfLines={1}>
              {item.team[1]?.name}
            </Text>
          </View>
        </View>
      );
    } else {
      return item?.team?.slice(0, 3).map((subitem, subindex) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: dynamicSize(SLIDER_HEIGHT / 15),
            paddingHorizontal:dynamicSize(24),
            width: dynamicSize(70),
          }}>
          <Image
            source={
              subitem?.icon
                ? {uri: subitem?.icon}
                : require('../../assets/images/user.png')
            }
            style={{width: dynamicSize(50), height: dynamicSize(25), borderRadius: dynamicSize(22)}}
          />
          <Text
            style={{color: COLORS.black, width: dynamicSize(60), textAlign: 'center'}}
            numberOfLines={1}>
            {subitem?.name}
          </Text>
          {/* <Text style={{ color: COLORS.black }}>82</Text> */}
        </View>
      ));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('score-view', {sportData: item});
      }}
      style={styles.container}
      key={index}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {sportsData.icon}
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>
              {item?.name}
            </Text>
            <Text style={{color: COLORS.black}}>
              {item?.eventGender} / {item?.category}
            </Text>
          </View>
        </View>
        <LiveText props={item} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        {/* {renderVs(item)} */}
      </View>
      <View style={styles.line} />
      <Text style={{textAlign: 'center', color: COLORS.black}}>
        {moment(item?.startDate).format('DD/MM/YYYY')} | {item?.startTime}
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
          <Image
            style={{height: 20, width: 40, borderRadius: 10}}
            source={{uri: item.sponsorsDetails.sponsorLogo}}
          />
        </View>
        <TouchableOpacity onPress={() => handleFav(item._id, item.isFavorite)}>
          {item?.isFavorite ? <RedHeart /> : <GrayHeart />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const LiveText = props => {
  if (
    moment().isBetween(props?.startDate, props?.endDate) &&
    moment().isBetween(props?.startTime, props?.endTime)
  ) {
    return (
      <View style={styles.liveView}>
        <View style={styles.redDot} />
        <Text style={styles.liveText}>Live</Text>
      </View>
    );
  }
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
    position: 'relative',
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
    position: 'absolute',
    top: 5,
    right: 5,
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
  containerVs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  team: {},
  vsIcon: {
    width: 10, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
});
