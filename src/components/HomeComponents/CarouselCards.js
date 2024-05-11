import React, { useState } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem from './CarouselCardItem';
import {useSelector} from 'react-redux';
import moment from 'moment';
import FootballIcon from '../../assets/icons/football.svg';
import Zomato from '../../assets/icons/zomato.svg';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import RedHeart from '../../assets/icons/redHeart.svg';

import { Image } from 'react-native';
const SLIDER_WIDTH = Dimensions.get('window').width + 10;
const SLIDER_HEIGHT = Dimensions.get('window').height / 3.9;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCards = ({carouselData}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.eventReducer.isLoading);

  const data = [
    {
      title: 'Aenean leo',
      body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      imgUrl: 'https://picsum.photos/id/11/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
  ];


  const renderCarouselItem = ({ item, index }) => {
    return (
      <TouchableOpacity
      onPress={()=>{navigation.navigate('score-view')}} 
      style={styles.container} key={index}>
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
               {item?.sport} 2024
             </Text>
             <Text style={{color: COLORS.black}}>{item?.eventGender} / 200 m / Final</Text>
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
         {moment(item?.startDate).format("DD/MM/YYYY")} | {item?.startTime}
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
         <RedHeart />
       </View>
     </TouchableOpacity>
    );
  };


  return (
    <View
      style={{
        height: '80%',
      }}>
      <Carousel
        layout="default"
        // layoutCardOffset={0} // Adjust gap between cards
        ref={isCarousel}
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        loop={true}
        activeSlideAlignment="center" // Align active slide to the start
        inactiveSlideScale={1} // Prevent scaling of inactive slides
        inactiveSlideOpacity={1} // Prevent opacity change of inactive slides
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          marginVertical: 0,
          backgroundColor: '#0166C2', // Change active dot color to blue
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}
        containerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginTop:4
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        marginHorizontal={0}
        marginVertical={0}
        paddingVertical={0}
      />
    </View>
  );
};

export default CarouselCards;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
    padding: 10,
    width: '95%',
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
  skeletonContainer:{
    width: '95%',
    borderRadius: 4,
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
});

