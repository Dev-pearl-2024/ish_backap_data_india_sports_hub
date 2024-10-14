import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import moment from 'moment';
import DownArrow from '../../assets/icons/downArrow.svg'
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import CarouselCards from '../HomeComponents/CarouselCards';

export default function LiveCard(props) {
  const navigation = useNavigation();
  const [expand, setExpand] = useState(false)

  function getNestedProperty(obj, path) {
    return path.reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj,
    );
  }
  
  const handleExpand = (id) =>{
    if(id === props?.data?._id){
      setExpand(!expand)
    }
  }

  // Usage
  const coverImage = props?.teams
    ? getNestedProperty(props, ['data', 'teams', '0', 'coverImage'])
    : getNestedProperty(props, ['data', 'team', '0', 'coverImage']);
  const teamMemberName = props?.teams
    ? getNestedProperty(props, ['data', 'teams', '0', 'name'])
    : getNestedProperty(props, ['data', 'team', '0', 'name']);

  const teamMemberName2 = props?.teams
    ? getNestedProperty(props, ['data', 'teams', '1', 'name'])
    : getNestedProperty(props, ['data', 'team', '1', 'name']);

  const teamMemberImage2 = props?.teams
    ? getNestedProperty(props, ['data', 'teams', '1', 'icon'])
    : getNestedProperty(props, ['data', 'team', '1', 'icon']);

  const teamMemberImage = props?.teams
    ? getNestedProperty(props, ['data', 'teams', '0', 'icon'])
    : getNestedProperty(props, ['data', 'team', '0', 'icon']);
  
  return (
    <View style={styles.mainCard}>
      <TouchableOpacity
        
        onPress={() => {
          navigation.navigate('score-view', {sportData: props?.data});
        }}>
        <View style={styles.flexRowAwayCenter}>
          <View style={styles.flexCenterGap}>
            <Image
              source={
                props?.data?.tournamentsDetails?.icon ||
                props?.data?.tournamentsDetails?.coverImage
                  ? {
                      uri:
                        props?.data?.tournamentsDetails?.icon ||
                        props?.data?.tournamentsDetails?.coverImage,
                    }
                  : require('../../assets/images/user.png')
              }
              style={styles.dpImage}
            />
            <Text style={styles.titleText}>{props?.title}</Text>
          </View>

          <LiveText props={props} />
          <TouchableOpacity
            onPress={() =>
              props?.handleFav(props?.data?._id, props?.isFavorite)
            }>
            {props?.isFavorite ? <RedHeart /> : <GrayHeart />}
          </TouchableOpacity>
        </View>
        <View style={styles.viewContent}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailText}>
              {moment(props?.startDate)?.format('DD/MMM/YYYY')} | {props?.startTime} 
            </Text>
            <Text style={[styles.detailText,{fontWeight: '700'}]}>
            {"  To  "}
            </Text>
          {/* </View> */}
          {/* <View> */}
            <Text style={styles.detailText}>
              {moment(props?.endDate)?.format('DD/MMM/YYYY')} | {props?.endTime}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <Text style={{fontWeight: '400', color: 'black'}}>Powered by : </Text>
          </View>
          <Image
            source={{uri: props?.data?.sponsorsDetails?.sponsorLogo}}
            style={{height: 20, width: 60}}
          />
        </View>
        {/* {teamMemberName &&
          teamMemberName2 &&
          teamMemberImage &&
          teamMemberImage2 && (
            <View style={styles.viewContent}>
              <View style={styles.flexCenterGap}>
                <Image
                  source={
                    teamMemberImage
                      ? {uri: teamMemberImage}
                      : require('../../assets/images/user.png')
                  }
                  style={styles.scoreImage}
                />
                <Text style={styles.scoreCountryText}>{teamMemberName}</Text>
              </View>
              <View style={styles.flexCenterGap}>
                <Text style={styles.scoreText}>{props?.score}</Text>
              </View>
              <View style={styles.flexCenterGap}>
                <Image
                  source={
                    teamMemberImage2
                      ? {uri: teamMemberImage2}
                      : require('../../assets/images/user.png')
                  }
                  style={styles.scoreImage}
                />
                <Text style={styles.scoreCountryText}>{teamMemberName2}</Text>
              </View>
            </View>
          )} */}
      </TouchableOpacity>
      <View style={{alignSelf: 'flex-end',}}>
      <TouchableOpacity
            onPress={() => handleExpand(props?.data?._id)
            }>
              
            <DownArrow style={{ transform: [{ rotate: expand ? '180deg':'0deg' }]}}/>
          </TouchableOpacity>
      </View>
      {expand && <View style={{alignContent: 'center', justifyContent: 'center'}}>
          <View style={{marginVertical: 10}}>
            <Text >Event</Text>
          </View>
          <View>
          <Text >Event Stage : {props?.data?.eventStage}</Text>
          </View>
          {/* <CarouselCards 
            carouselData={[props?.data?.tournamentsDetails]}
            setInternationalData={() =>{}}
          /> */}
        </View>}
    </View>
  );
}

const LiveText = props => {
  if (moment()?.isBetween(props?.props?.startDate, props?.props?.endDate)) {
    return (
      <View style={styles.flexCenterGap}>
        <View style={styles.liveDot}></View>
        <Text style={styles.liveText}>Live</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 8,
    padding: 10,
    borderColor: COLORS.lighter_gray,
    borderWidth: 2,
    shadowColor: COLORS.lighter_gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: COLORS.white,
    marginVertical: 5,
  },
  flexRowAwayCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCenterGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dpImage: {
    width: 22,
    height: 22,
    borderRadius: 50,
    objectFit: 'cover',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: COLORS.red,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.light_gray,
  },
  viewContent: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreImage: {
    width: 22,
    height: 22,
    borderRadius: 50,
    objectFit: 'cover',
  },
  scoreCountryText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.black,
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
  },
  detailText: {
    color: COLORS.light_gray,
    fontSize: 10,
    fontWeight: '500',
  },
});
