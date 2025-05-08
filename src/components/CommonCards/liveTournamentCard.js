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
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import CarouselCards from '../HomeComponents/CarouselCards';
import EventCard from '../ScoreCardComponents/EventCard';
// import iconData from '../../data/sportsData';
import iconData from "../../data/sportsDataSmall"
import dynamicSize from '../../utils/DynamicSize';

export default function LiveCard(props) {
  // console.log("XXXXXXXXXXXXX",props.teams)
  const navigation = useNavigation();
  const [expand, setExpand] = useState(false)
  const sportsData = iconData?.filter(
    icon => icon.name?.toLowerCase() === props.sport?.toLowerCase()
  )?.[0]
  function getNestedProperty(obj, path) {
    return path.reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
      obj,
    );
  }

  const handleExpand = (id) => {
    if (id === props?.data?._id) {
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
          navigation.navigate('score-view-new', { sportData: props?.data });
        }}>
        <View style={styles.flexRowAwayCenter}>
          <View style={styles.flexCenterGap}>
            <View  style={styles.dpImage} >{sportsData?.icon}</View>
            <View style={{ flex: 1, alignItems: "left", flexWrap: "wrap", maxWidth: "80%" }}>
              <Text style={styles.titleText} numberOfLines={2}>{props?.title}</Text>
              <Text
                style={{ color: COLORS.black, width: '90%',fontSize:dynamicSize(12) }}
                numberOfLines={1}>
                {props?.eventGenders}/  
                {props?.category}
              </Text>
            </View>
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.detailText}>
              {moment(props?.startDate)?.format('DD/MMM/YYYY')} | {props?.startTime}
            </Text>
          </View>
        </View>
        <View style={styles.viewContent}>
          <View style={{ flexDirection: 'row',width:"100%",justifyContent:"space-between" }}>
            <Text style={styles.detailText}>
              Venue: {props?.data?.eventVenue }
            </Text> 
            <Text style={styles.detailText}>
              Stage: { props?.data?.eventStage}
            </Text>
          </View>
        </View>
        {<View style={{ alignContent: 'center', justifyContent: 'center',width:"100%"}}>
        <View style={{pointerEvents:"none"}}>
          {/* <EventCard eventData={props?.data} notShowTitle={true} /> */}
        </View>
        {/* <CarouselCards  props?.data?.eventVenue   props?.data?.eventStage
            carouselData={[props?.data?.tournamentsDetails]}
            setInternationalData={() =>{}}
          /> */}
          {/* <View style={{width:"100%",height:100,flex:1,justifyContent:"center",alignItems:"center"}}>
          <View style={{flex:1,justifyContent:"space-between",width:"80%",backgroundColor:"yellow"}}>
          </View>
          </View> */}
      </View>}
        
        {props?.data?.sponsorsDetails?.sponsorLogo && <View style={{ flexDirection: 'row',alignItems:"center" }}>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{ fontWeight: '400', color: 'black',fontSize:dynamicSize(12) }}>Powered by : </Text>
          </View>
          <Image
            source={{ uri: props?.data?.sponsorsDetails?.sponsorLogo }}
            style={{
              height: dynamicSize(25),
              width: dynamicSize(50),
              borderRadius: dynamicSize(10),
              objectFit:"contain"
            }}
          />
        </View>}
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
      {/* <View style={{alignSelf: 'flex-end',}}>
      <TouchableOpacity
            onPress={() => handleExpand(props?.data?._id)
            }>
              
            <DownArrow style={{ transform: [{ rotate: expand ? '180deg':'0deg' }]}}/>
          </TouchableOpacity>
      </View> */}
     
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
    width:dynamicSize(280),
    color: COLORS.black,
    width:"90%"
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
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
