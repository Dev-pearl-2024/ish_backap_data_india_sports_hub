import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import BackHeader from '../../components/Header/BackHeader';
import {TextInput} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width + 10;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.86);

const Plans = () => {
  const navigation = useNavigation();
  const isCarousel = React.useRef(null);

  const listItems = [
    'Detailed Live Scores & commentary',
    'Live Chatting for Users',
    'Event Calendar of all Sports',
    'Special Olympic Coverage',
    'Athlete Profiles & Bio',
    'Tournament Details',
    'Past Archive Scores & Results',
    'Records',
    'Rankings',
    'Statistics',
    'News and Blogs',
    'Interviews',
    'Highlight reels',
    'Live commentary by experts',
  ];

  const renderCarouselItem = ({item, index}) => {
    return (
      <View
        style={{
          margin: 10,
        }}>
        <View
          style={{
            // paddingBottom: 15,
            // paddingTop: 15,
            // paddingLeft: 10,
            // paddingRight: 10,
            padding: 20,
            backgroundColor: COLORS.white,
            borderRadius: 15,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Image source={require('../../assets/icons/premium-icon.png')} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.black,
                marginLeft: 5,
              }}>
              Premium Member
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 15,
              borderWidth: 1,
              borderRadius: 15,
              padding: 10,
              borderColor: COLORS.primary,
              width: '30%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                {rupeeSymbol}
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                99
              </Text>
            </View>
            <Text style={{color: COLORS.light_gray}}>Per Month</Text>
          </View>
          <View>
            {listItems.map(data => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/checkmark.png')}
                    style={{
                      color: COLORS.white,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.light_gray,
                      fontSize: 16,
                      marginBottom: 5,
                    }}>
                    {data}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={() => navigation.navigate('settings')}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.referText}>Subscribe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const rupeeSymbol = '\u20B9';

  return (
    <SafeAreaView>
      <BackHeader />
      <View>
        <Text
          style={{
            borderRadius: 12,
            backgroundColor: COLORS.white,
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.black,
            padding: 20,
          }}>
          Plans & Subscriptions
        </Text>
      </View>
      <Carousel
        layout="default"
        // layoutCardOffset={0} // Adjust gap between cards
        ref={isCarousel}
        data={[1, 2, 3]}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        loop={false}
        activeSlideAlignment="center" // Align active slide to the start
        inactiveSlideScale={1} // Prevent scaling of inactive slides
        inactiveSlideOpacity={1} // Prevent opacity change of inactive slides
      />
    </SafeAreaView>
  );
};

export default Plans;

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
  profileContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  checkmarkIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
  },
  emailAddress: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.light_gray,
  },
  premiumContainer: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 50,
    padding: 15,
    borderColor: COLORS.primary,
  },
  premiumSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    width: 22,
    height: 22,
  },
  premiumText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  navigationContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 10,
  },
  navigationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    flexDirection: 'row',
  },
  navigationItemText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  settingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  referText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    alignItems: 'center',
  },
});
