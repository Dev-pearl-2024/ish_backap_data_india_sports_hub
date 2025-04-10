import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import Athletics from '../../assets/icons/sportIcons/Athletics.svg';
import Zomato from '../../assets/icons/zomato.svg';
import COLORS from '../../constants/Colors';
import CalendarScore from '../../assets/icons/calendarScore.svg';
import MessageScore from '../../assets/icons/messageScore.svg';
import { useEffect, useState } from 'react';
import HighJump from './highJumpTable';
import Decathlon from './decathlon';
import IndivudualTrack from './indivudualTrack';
import TeamTrack from './teamTrack';
import IndividualField from './individualField';
import { useNavigation } from '@react-navigation/native';
import SwimmingIndividual from './swimmingIndividual';
import SwimmingTeamRelay from './swimmingTeamRelay';
import SailingIndividual from './sailingIndividual';
import SailingMultiple from './sailingMultiple';
import TableTennisSingle from './tableTennisSingle';
import TableTennisDouble from './tableTennisDouble';
import TableTennisTeam from './tableTennisTeam';
import TakewondoSingle from './takewondoSingle';
import TakewondoMixed from './takewondoMixed';
import TennisSingle from './tennisSingles';
import TennisDouble from './tennisDouble';
import TennisTeam from './tennisTeam';
import Volleyball from './volleyballTable';
import Wrestling from './wrestlingScore';
import WeightLifting from './weightLiftingTable';
import ArcheryTable from './archeryTable';
import WeightLiftingTable from './archeryRecurveTeam';
import ArcheryRecurveTeam from './archeryRecurveTeam';
import BadmintonSingle from './badmintonSingle';
import BadmintonTeam from './badmintonTeam';
import BoxingScore from './boxingScore';
import moment from 'moment';
import LiveUpcomingCards from '../../components/FavoriteComponents/liveUpcomingCards';
import LatestNews from '../../components/HomeComponents/LatestNews';
import IndividualTrackPlayerSquad from './player-squad/individualTrackPlayerSquad';
import IndividualTrack from './head2head/individualTrackHead';
import IndividualTrackRules from './rules/individualTrackRules';
import IndividualTrackHead from './head2head/individualTrackHead';
import iconData from '../../data/sportsDataSmall';
import Standings from './standings';
import ScoreCard from '../../components/ScoreCardComponents/ScoreCardFootBall';
import dynamicSize from '../../utils/DynamicSize';
import InvertedPyramidDraws from '../../components/Common/InvertedPyramidDraws';
import RoundRobinDraws from '../../components/Common/RoundRobin';
import PyramidAndRoundRobinDiff from '../../components/Common/PyramidAndRoundRobinDiff';
import ScoreWebView from './scoreWebview/ScoreWebView';
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DrawsWebView from './drawsWebView/DrawsWebView';
import { isLessThan24Hours } from '../../utils/checkDate24LessThan';

const headMenu = [
  {
    title: 'Score',
  },
  {
    title: 'Player/Squad',
  },
  {
    title: 'Standing/Medals',
  },
  { title: 'Draws' },
  {
    title: 'Rules and Updates',
  },

  {
    title: 'Head to Head',
  },
  {
    title: 'News & Media',
  },




];
export default function AthleticScore({ route, params }) {
  const [activeTab, setActiveTab] = useState(0);
  const { sportData } = route.params;
  const navigation = useNavigation();
  const [isPremiumUser, setIsPremiumUser] = useState("")
  const [isChatAvailable, setIsChatAvailable] = useState(false)
  const [accessToken, setAccessToken] = useState(null)

  const getStoreData = async () => {
    let userDataStore = await AsyncStorage.getItem('userData');
    const { accessToken } = JSON.parse(userDataStore)
    setAccessToken(accessToken)
  }

  useEffect(() => {
    const getUserDetails = async () => {
      const userID = await AsyncStorage.getItem('userId');

      try {
        const response = await axios({
          method: 'GET',
          url: `https://prod.indiasportshub.com/users/${userID}`,
        });
        if (response?.data?.message === 'User found successfully') {
          const userData = response?.data?.existing
          setIsPremiumUser(userData.isPremiumUser)
          if (userData?.age) {
            const birthDate = moment(userData?.age, 'DD-MM-YYYY');
            const age = moment().diff(birthDate, 'years')
            if (age < 18) {
              setIsChatAvailable(false)
            } else {
              setIsChatAvailable(true)
            }
          } else {
            setIsChatAvailable(false)
          }
        }

        return response.data;
      } catch (error) {
        throw new Error('Failed get User Details', error);
      }
    };
    getUserDetails()
  }, [activeTab])

  useEffect(() => {
    getStoreData()
  }, [])

  const categoryComponentMap = {
    // 'HOCKEY': IndivudualTrack,
    '60m': IndivudualTrack,
    '100m Hurdles': IndivudualTrack,
    '100m': IndivudualTrack,
    '5000m': IndivudualTrack,
    '4x100m Relay': TeamTrack,
    '4 x 200m Freestyle relay': TeamTrack,
    'Long Jump': IndividualField,
    "109kg - Men's": WeightLifting,
    'High Jump': HighJump,
    'Hammer Throw': HighJump,
    Decathlon: Decathlon,
    Heptathlon: Decathlon,
    Pentathlon: Decathlon,
    "97kg - Men's Freestyle": Wrestling,
    "74kg - Men's Freestyle": Wrestling,
    'Canoe Slalom: KX-1': Wrestling,
    '200m Backstroke': Wrestling,
    Basketball: Wrestling,
    '3x3 Basketball': Wrestling,
    GOLF: Wrestling,
    'Compound Individual': Wrestling,
    'Recurve Individual': Wrestling,
    'Compound Singles': Wrestling,
    "59kg - Women's Freestyle": Wrestling,
    'Canoe Sprint: K-4 500m': Wrestling,
    'Canoe Sprint: K-2 500m': Wrestling,
    'Track - Indvidual Sprint': Wrestling,
    VOLLEYBALL: Wrestling,
    '68kg - Mens Featherweight': Wrestling,
    "70kg - Women's Middleweight": Wrestling,
    '3000m': Wrestling,
    '20000m Race Walking': Wrestling,
    'Compound Team': ArcheryRecurveTeam,
    'Recurve Team': ArcheryRecurveTeam,
    'Mixed Doubles': ArcheryRecurveTeam,
    'Recurve Single': Wrestling,
    'Recurve Mixed': ArcheryRecurveTeam,
    'Compound Mixed': ArcheryRecurveTeam,
    'Compund Mixed': ArcheryRecurveTeam,
    'Men 45kg Lightweight': Wrestling,
    "63kg - Men's Greco-Roman": Wrestling,
    Singles: Wrestling,
    Doubles: Wrestling,
    "51kg - Men's Flyweight": Wrestling,
    "57kg - Men's Freestyle": Wrestling,
    "61kg - Men's Freestyle": Wrestling,
    "65kg - Men's Freestyle": Wrestling,
    "70kg - Men's Freestyle": Wrestling,
    "79kg - Men's Freestyle": Wrestling,
    "86kg - Men's Freestyle": Wrestling,
    "92kg - Men's Freestyle": Wrestling,
    "97kg - Men's Freestyle": Wrestling,
    "125kg - Men's Freestyle": Wrestling,
    "5kg - Men's Greco-Roman": Wrestling,
    "60kg - Men's Greco-Roman": Wrestling,
    "63kg - Men's Greco-Roman": Wrestling,
    "67kg - Men's Greco-Roman": Wrestling,
    "72kg - Men's Greco-Roman": Wrestling,
    "77kg - Men's Greco-Roman": Wrestling,
    "82kg - Men's Greco-Roman": Wrestling,
    "87kg - Men's Greco-Roman": Wrestling,
    "97kg - Men's Greco-Roman": Wrestling,
    "130kg - Men's Greco-Roman": Wrestling,
    "50kg - Women's Freestyle": Wrestling,
    "53kg - Women's Freestyle": Wrestling,
    "55kg - Women's Freestyle": Wrestling,
    "57kg - Women's Freestyle": Wrestling,
    "59kg - Women's Freestyle": Wrestling,
    "62kg - Women's Freestyle": Wrestling,
    "65kg - Women's Freestyle": Wrestling,
    "68kg - Women's Freestyle": Wrestling,
    "72kg - Women's Freestyle": Wrestling,
    "76kg - Women's Freestyle": Wrestling,
    "48kg - Women's Extra Lightweight": Wrestling,
    "52kg - Women's Half Lightweight": Wrestling,
    "57kg - Women's Half Lightweight": Wrestling,
    "60kg - Men's Extra Lightweight": Wrestling,
    "63kg - Women's Half Middleweight": Wrestling,
    "66kg - Men's Half Lightweight": Wrestling,
    "70kg - Women's Middleweight": Wrestling,
    "73kg - Men's Lightweight": Wrestling,
    "78kg - Women's Half Heavyweight": Wrestling,
    "78kg+ - Women's Heavyweight": Wrestling,
    "81kg - Men's Half Middleweight": Wrestling,
    "90kg - Men's Middleweight": Wrestling,
    '100kg - Half Heavyweight': Wrestling,
    '100kg+ - Heavyweight': Wrestling,
    '50m Freestyle': Wrestling,
    '100m Freestyle': Wrestling,
    '200m Freestyle': Wrestling,
    '400m Freestyle': Wrestling,
    '800m Freestyle': Wrestling,
    '1500m Freestyle': Wrestling,
    '100m Backstroke': Wrestling,
    '200m Backstroke': Wrestling,
    '100m Breaststroke': Wrestling,
    '200m Breaststroke': Wrestling,
    '100m Butterfly': Wrestling,
    '200m Butterfly': Wrestling,
    '200m Individual medley': Wrestling,
    '400m Individual medley': Wrestling,
    '60m': IndivudualTrack,
    '100m': IndivudualTrack,
    '200m': IndivudualTrack,
    '400m': IndivudualTrack,
    '800m': IndivudualTrack,
    '1500m': IndivudualTrack,
    '1 Mile': IndivudualTrack,
    '3000m': IndivudualTrack,
    '10000m': IndivudualTrack,
    '60m Hurdles': IndivudualTrack,
    '100m Hurdles': IndivudualTrack,
    '110m Hurdles': IndivudualTrack,
    '3000m Steeplechase': IndivudualTrack,
    "Men's Single-handed Dinghy - ILCA 7": Wrestling,
    "Men's Dinghy - ILCA4": Wrestling,
    "Women's Single-handed Dinghy - ILCA 6": Wrestling,
    "Men's Skiff - 49er": Wrestling,
    "Women's Skiff - 49erFX": Wrestling,
    "Men's Windsurfer -IQFoil": Wrestling,
    "Men's Windsurfer - RS:X": Wrestling,
    "Women's Windsurfer - IQFoil": Wrestling,
    "Men's Kiteboarding - The Formula Kite": Wrestling,
    "Women's Kiteboarding -The Formula Kite": Wrestling,
    'Mixed Double-handed Dinghy - 470': Wrestling,
    'Mixed Foiling Catamaran - Nacra 17': Wrestling,
    "45kg to 48kg - Women's Minimumweight": Wrestling,
    "46kg to 48kg - Men's Minimumweight": Wrestling,
    "50kg - Women's Light Flyweight": Wrestling,
    "51kg - Men's Flyweight": Wrestling,
    "52kg - Women's Flyweight": Wrestling,
    "54kg - Women's Bantamweight": Wrestling,
    "54kg - Men's Bantamweight": Wrestling,
    "57kg - Men's Featherweight": Wrestling,
    "57kg - Women's Featherweight": Wrestling,
    "60kg - Men's Lightweight": Wrestling,
    "60kg - Women's Lightweight": Wrestling,
    "63kg - Women's Light Welterweight": Wrestling,
    "63.5kg - Men's Light Welterweight": Wrestling,
    "66kg - Women's Welterweight": Wrestling,
    "67kg - Men's Welterweight": Wrestling,
    "70kg - Women's Light Middleweight": Wrestling,
    "71kg - Men's Light Middleweight": Wrestling,
    "75kg - Men's Middleweight": Wrestling,
    "75kg - Women's Middleweight": Wrestling,
    "80kg - Men's Light Heavyweight": Wrestling,
    "81kg - Women's Light Heavyweight": Wrestling,
    "81kg+ - Women's Heavyweight": Wrestling,
    "86kg - Men's Cruiserweight": Wrestling,
    "92kg - Men's Heavyweight": Wrestling,
    "92kg+ - Men's Super Heavyweight": Wrestling,
    'Long Jump': IndivudualTrack,
    'Triple Jump': IndivudualTrack,
    'High Jump': IndivudualTrack,
    'Pole Vault': IndivudualTrack,
    'Shot Put': IndivudualTrack,
    'Discus Throw': IndivudualTrack,
    'Hammer Throw': IndivudualTrack,
    'Javelin Throw': IndivudualTrack,
    'Full Marathon': IndivudualTrack,
    'Half Marathon': IndivudualTrack,
    '10km Marathon': IndivudualTrack,
    '5km Marathon': IndivudualTrack,
    '10km Race Walkin': IndivudualTrack,
    '20km Race Walking': IndivudualTrack,
    '35km Race Walking': IndivudualTrack,
    '50km Race Walking': IndivudualTrack,
    '10000m Race Walking': IndivudualTrack,
    '20000m Race Walking': IndivudualTrack,
    'Canoe Slalom: C-1': Wrestling,
    'Canoe Slalom: K-1': Wrestling,
    'Canoe Slalom: KX-1': Wrestling,
    'Canoe Sprint: C-1 200m ': Wrestling,
    'Canoe Sprint: C-1 1000m': Wrestling,
    'Canoe Sprint: K-1 500m': Wrestling,
    'Canoe Sprint: K-1 1000m': Wrestling,
    'Rowing Sculling: Single Sculls': Wrestling,
    'Road Individual Time Trials': Wrestling,
    'Road racing': Wrestling,
    'Track - Indvidual Sprint ': Wrestling,
    'Track - Keirin': Wrestling,
    'Track - Omnium': Wrestling,
    'Mountain Biking - Cross Country': Wrestling,
    'BMX Racing': Wrestling,
    'BMX Freestyle': Wrestling,
    Cyclocross: Wrestling,
    FOIL: Wrestling,
    EPEE: Wrestling,
    SABRE: Wrestling,
    'ARTISITIC Individual': Wrestling,
    "RHYTHMIC Women's Individual All Around": Wrestling,
    TRAMPOLINE: Wrestling,
    '10m Air Pistol': Wrestling,
    '25m Standard Pistol': Wrestling,
    '25m Center Fire Pistol': Wrestling,
    '25m Rapid Fire Pistol': Wrestling,
    '50m Pistol': Wrestling,
    '10m Air Rifle': Wrestling,
    '50m Rifle': Wrestling,
    '50m Rifle Prone': Wrestling,
    '50m Rifle 3 Position': Wrestling,
    '300m Rifle': Wrestling,
    '300m Rifle Prone': Wrestling,
    '300m Rifle 3 Position': Wrestling,
    'Shotgun Trap': Wrestling,
    'Shotgun Double Trap': Wrestling,
    'Shotgun Skeet': Wrestling,
    'Target Sprint': Wrestling,
    '10m Running Target': Wrestling,
    '54kg - Mens Finweight': Wrestling,
    '58kg - Mens Flyweight': Wrestling,
    '63kg - Mens Bantamweight': Wrestling,
    '68kg - Mens Featherweight': Wrestling,
    '74kg - Mens Lightweight': Wrestling,
    '80kg - Mens Welterweight': Wrestling,
    '87kg - Mens Middleweight': Wrestling,
    '87kg+ - Mens Heavyweight': Wrestling,
    '46kg - Womens Finweight': Wrestling,
    '49kg - Womens Flyweight': Wrestling,
    '53kg - Womens Bantamweight': Wrestling,
    '57kg - Womens Featherwight': Wrestling,
    '62kg - Womens Lightweight': Wrestling,
    '67kg - Womens Welterweight': Wrestling,
    "67kg+ - Women's Heavyweight": Wrestling,
    '73kg - Womens Middleweight': Wrestling,
    '73kg+ - Womens Heavyweight': Wrestling,
    "61kg - Men's": Wrestling,
    "67kg - Men's": Wrestling,
    "73kg - Men's": Wrestling,
    "81kg - Men's": Wrestling,
    "96kg - Men's": Wrestling,
    "109kg - Men's": Wrestling,
    "109kg+ - Men's": Wrestling,
    "49kg - Women's": Wrestling,
    "55kg - Women's": Wrestling,
    "59kg - Women's": Wrestling,
    "64kg - Women's": Wrestling,
    "76kg - Women's": Wrestling,
    "87kg- Women's": Wrestling,
    "87kg+ - Women's": Wrestling,
    'Canoe Sprint: C-2 500m': Wrestling,
    'Canoe Sprint: K-2 500m': Wrestling,
    'Canoe Sprint: K-4 500m': Wrestling,
    'Rowing Sweep: Coxless Pair': Wrestling,
    'Rowing Sweep: Coxless Four': Wrestling,
    'Rowing Sweep: Coxless Eight': Wrestling,
    'Rowing Sculling: Double Sculls': Wrestling,
    'Rowing Sculling: Quadraple Sculls': Wrestling,
    'Rowing Lightweight Sculling: Double Sculls': Wrestling,
  };
  const getComponentForCategory = category => {
    return categoryComponentMap[category] || null;
  };

  const RenderComponent = ({ sportData, activeTab }) => {
    const Component = getComponentForCategory(sportData?.category);
    if (!Component) return null;

    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingVertical: 20,
          marginVertical: 10,
          // backgroundColor:"red"
        }}>
        <Component sportData={sportData} activeTab={activeTab} />
      </View>
    );
  };

  const dataWithIcon = iconData?.find(
    icon => icon.name?.toLowerCase() === sportData.sport?.toLowerCase(),
  );

  return (
    <>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {dataWithIcon?.icon}
            <Text style={styles.sportsTitle}>{sportData?.sport}</Text>
          </View>
          <Image
            style={{
              height: dynamicSize(25),
              width: dynamicSize(50),
              borderRadius: dynamicSize(10),
              objectFit: "contain"
            }}
            source={{
              uri: sportData?.sponsorsDetails?.sponsorLogo,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 16,
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,

            }}>
            <View style={{ flexDirection: 'row', gap: 5, width: "70%", alignItems: "center" }}>
              <Image
                source={
                  sportData?.tournamentsDetails?.icon ||
                    sportData?.tournamentsDetails?.coverImage
                    ? {
                      uri:
                        sportData?.tournamentsDetails?.icon ||
                        sportData?.tournamentsDetails?.coverImage,
                    }
                    : require('../../assets/images/user.png')
                }
                style={{
                  width: dynamicSize(50),
                  height: dynamicSize(50),
                  borderRadius: 50,
                }}
              />
              <View>
                <Text
                  style={{ fontWeight: 600, fontSize: dynamicSize(16), color: COLORS.black }}>
                  {sportData?.tournamentName}
                </Text>
                <Text style={{ color: COLORS.dark_gray, fontSize: 14 }}>
                  {sportData?.category}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  !accessToken && navigation.navigate('Login')
                  accessToken && isChatAvailable && navigation.navigate('chat-room', {
                    sportName: sportData,
                    isPremiumUser: isPremiumUser
                  })
                  !isChatAvailable && Alert.alert('⚠️ Age Restriction',
                    'Chat functionality will not be enabled for you as you are under 18 years of age.',
                    [{ text: 'OK' }])
                }}>
                <MessageScore />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('tournament-view', { tournamentDetail: sportData?.tournamentsDetails, sportNameData: sportData?.sport })}
              // onPress={() => {
              //   navigation.navigate('calendar', {
              //     sportName: sportData,
              //     isPremiumUser:isPremiumUser,
              //     sportDate: moment(sportData?.startDate).format(
              //       'YYYY-MM-DD',
              //     ),
              //   });
              // }}
              >
                <CalendarScore />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
              width: "100%"

            }}>
            <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 5, width: "50%" }}>
              <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                Event :
              </Text>
              <Text style={{ color: COLORS.black, fontSize: 12 }}>
                {sportData?.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, flexWrap: "wrap", width: "40%" }}>
              <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                Stage :
              </Text>
              <Text style={{ color: COLORS.black, fontSize: 12 }}>
                {sportData?.eventStage}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{ flexDirection: 'row', flexWrap: "wrap", gap: 5, width: "50%" }}>
              <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                Venue :
              </Text>
              <Text style={{ color: COLORS.black, fontSize: 12 }}>
                {sportData?.eventVenue}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, flexWrap: "wrap", width: "40%" }}>
              <Text style={{ color: COLORS.dark_gray, fontSize: 12 }}>
                {moment(sportData?.startDate).format('DD/MM/YYYY')} {sportData?.startTime}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: dynamicSize(8) }}>

          <ScoreCard item={sportData} />

        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 6,
            paddingVertical: 10,
          }}>
          {headMenu.map((data, id) => {
            if (data.title === 'Head to Head' && sportData.participation === 'Group') {
              return null;
            }
            return (
              <TouchableOpacity
                style={
                  activeTab === id
                    ? styles.categoryButton
                    : styles.categoryButtonInactive
                }
                key={id}
                onPress={() => setActiveTab(id)}>
                <Text
                  style={
                    activeTab === id ? styles.activeText : styles.inactiveText
                  }>
                  {data.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {(activeTab === 6 || activeTab === 7) && (
          <LatestNews showTitle={false} />
        )}
        {activeTab === 0 && (
          (true || isPremiumUser || !isLessThan24Hours(sportData?.startDate) || Platform.OS == 'ios') ? <ScoreWebView sportData={sportData} /> : <PremiumFeature child={<ScoreWebView renderForPremium={true} sportData={sportData} />} />
        )}

        {activeTab === 3 && (
          // sportData.participation === 'Group' ?<RoundRobinDraws sportData={sportData} activeTab={activeTab} /> : <PyramidAndRoundRobinDiff sportData={sportData} activeTab={activeTab} />
          <DrawsWebView eventId={sportData?.drawsId} />
        )}

        {activeTab === 1 && (
          <IndividualTrackPlayerSquad sportData={sportData} activeTab={activeTab} />
        )}
        {activeTab === 5 && sportData.participation !== "Group" && (
          <IndividualTrackHead sportData={sportData} eventCategory={sportData.category} activeTab={activeTab} />
        )}
        {activeTab === 4 && <IndividualTrackRules sport={sportData?.eventRule} />}

        {activeTab === 2 && (true || isPremiumUser || !isLessThan24Hours(sportData?.startDate) || Platform.OS == 'ios' ? <Standings sportData={sportData} /> : <PremiumFeature child={<Standings sportData={sportData} />} top={"80%"} />)}

        {/* <Text>High jump & Pole vault</Text>
        {activeTab === 0 && (
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              marginVertical: 10,
            }}>
            <HighJump />
          </View>
        )}
        <Text>Decathlon / Hepathlon</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <Decathlon />
        </View>
        <Text>Indivudual Track</Text>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <IndivudualTrack />
        </View>
        <Text>Team Track</Text>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TeamTrack />
        </View>
        <Text>Individual Field</Text>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <IndividualField />
        </View>
        <Text>Swimming Individual</Text>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <SwimmingIndividual />
        </View>

        <Text>Swimming Relay </Text>

        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <SwimmingTeamRelay />
        </View>
        <Text>Sailing Individual</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <SailingIndividual />
        </View>
        <Text>Sailing Multiple</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <SailingMultiple />
        </View>
        <Text>Table Tennis Single</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TableTennisSingle />
        </View>
        <Text>Table Tennis Double</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TableTennisDouble />
        </View>
        <Text>Table Tennis Team</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TableTennisTeam />
        </View>
        <Text>Takewondo Single</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TakewondoSingle />
        </View>
        <Text>Takewondo Mixed</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TakewondoMixed />
        </View>
        <Text>Tennis Single</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TennisSingle />
        </View>
        <Text>Tennis Double</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TennisDouble />
        </View>
        <Text>Tennis Team</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <TennisTeam />
        </View>
        <Text>Volleyball</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <Volleyball />
        </View>
        <Text>WeightLifting</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <WeightLifting />
        </View>
        <Text>Wrestling</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <Wrestling />
        </View>
        <Text>Archery</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <ArcheryTable />
        </View>
        <Text>Archery Recurve Team</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <ArcheryRecurveTeam />
        </View>
        <Text>Badminton Single Double</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <BadmintonSingle />
        </View>
        <Text>Badminton Team</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <BadmintonTeam />
        </View>
        <Text>Boxing</Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <BoxingScore />
        </View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },

  sportsTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
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

  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
});
