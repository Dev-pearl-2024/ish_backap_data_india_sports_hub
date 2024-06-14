import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackHeader from '../../components/Header/BackHeader';
import Athletics from '../../assets/icons/sportIcons/Athletics.svg';
import Zomato from '../../assets/icons/zomato.svg';
import COLORS from '../../constants/Colors';
import CalendarScore from '../../assets/icons/calendarScore.svg';
import MessageScore from '../../assets/icons/messageScore.svg';
import {useState} from 'react';
import HighJump from './highJumpTable';
import Decathlon from './decathlon';
import IndivudualTrack from './indivudualTrack';
import TeamTrack from './teamTrack';
import IndividualField from './individualField';
import {useNavigation} from '@react-navigation/native';
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

const headMenu = [
  {title: 'Update'},
  {
    title: 'Score',
  },
  {
    title: 'Player/Squad',
  },

  {
    title: 'News & Media',
  },
  {
    title: 'Head to Head',
  },
  {
    title: 'Rules',
  },
];
export default function AthleticScore({route, params}) {
  const [activeTab, setActiveTab] = useState(0);
  const {sportData} = route.params;
  const navigation = useNavigation();
  console.log(sportData,'sport data =====')
  return (
    <>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Athletics />
            <Text style={styles.sportsTitle}>{sportData?.sport}</Text>
          </View>
          <Zomato />
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
            <View style={{flexDirection: 'row', gap: 5}}>
              <Image
                source={
                  (sportData?.tournamentsDetails?.icon || sportData?.tournamentsDetails?.coverImage) ?
                  {uri: (sportData?.tournamentsDetails?.icon || sportData?.tournamentsDetails?.coverImage)} :
                  require('../../assets/images/user.png')}

                  style={{  
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
              />
              <View>
                <Text
                  style={{fontWeight: 600, fontSize: 16, color: COLORS.black}}>
                  {sportData?.tournamentName}
                </Text>
                <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                  {sportData?.category}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('chat-room', {
                    sportName: sportData,
                  })
                }>
                <MessageScore />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('calendar', {
                    sportName: sportData,
                    sportDate: moment(sportData?.startDate).format('YYYY-MM-DD'),
                  })
                }>
                <CalendarScore />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                Event :
              </Text>
              <Text style={{color: COLORS.black, fontSize: 12}}>
                {sportData?.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                Stage :
              </Text>
              <Text style={{color: COLORS.black, fontSize: 12}}>
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
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                Venue :
              </Text>
              <Text style={{color: COLORS.black, fontSize: 12}}>
                {sportData?.eventVenue}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                {moment(sportData?.startDate).format('DD/MM/YYYY | hh:mm A')}
              </Text>
            </View>
          </View>
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
        {(activeTab === 0 || activeTab === 3) && (
          <LatestNews showTitle={false} />
        )}
        {activeTab === 1 && (
          <>
            {(sportData?.category === '60m' ||
              sportData?.category === '100m Hurdles' ||
              sportData?.category === '100m') && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <IndivudualTrack sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {(sportData?.category === '4x100m Relay' ||
              sportData?.category === '4 x 200m Freestyle relay') && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <TeamTrack sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {sportData?.category === 'Long Jump' && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <IndividualField sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {sportData?.category === "109kg - Men's" && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <WeightLifting sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {(sportData?.category === 'High Jump' ||
              sportData?.category === 'Hammer Throw') && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <HighJump sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {(sportData?.category === 'Heptathlon' ||
              sportData?.category === 'Pentathlon') && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <Decathlon sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {(sportData?.category === "97kg - Men's Freestyle" ||
              sportData?.category === "74kg - Men's Freestyle" ||
              sportData?.category === 'Canoe Slalom: KX-1' ||
              sportData?.category === '200m Backstroke' ||
              sportData?.category === 'Basketball' ||
              sportData?.category === 'Compound Individual' ||
              sportData?.category === 'Recurve Individual' ||
              sportData?.category === "59kg - Women's Freestyle" ||
              sportData?.category === 'Canoe Sprint: K-4 500m' ||
              sportData?.category === 'Canoe Sprint: K-2 500m' ||
              sportData?.category === 'Track - Indvidual Sprint' ||
              sportData?.category === 'VOLLEYBALL' ||
              sportData?.category === '68kg - Mens Featherweight' ||
              sportData?.category === "70kg - Women's Middleweight" || sportData?.category === "3000m" || sportData?.category ==="20000m Race Walking") && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <Wrestling sportData={sportData} activeTab={activeTab} />
              </View>
            )}
            {sportData?.category === 'Compound Team' && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <ArcheryRecurveTeam
                  sportData={sportData}
                  activeTab={activeTab}
                />
              </View>
            )}
          </>
        )}
        {activeTab === 2 && (
          <IndividualTrackPlayerSquad
            sportData={sportData}
            activeTab={activeTab}
          />
        )}
        {activeTab === 4 && (
          <IndividualTrackHead sportData={sportData} activeTab={activeTab} />
        )}
        {activeTab === 5 && <IndividualTrackRules sport={sportData?.sport} />}

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
