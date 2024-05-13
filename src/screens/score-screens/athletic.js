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
const data = {
  message: 'Score format data get successfully!',
  data: {
    _id: '662c96be8b10b06eb7e74d3b',
    eventId: '6627978dfb3adc624c603aea',
    sportName: 'ATHLETICS',
    sportCategory: 'High Jump',
    tournamentId: null,
    score: [
      [
        'Position',
        'Name',
        'BIB No',
        'Country/State',
        'Attempts',
        'Wind (m/s)',
        'Best of All Attempts',
        'Result/status',
      ],
      [
        null,
        null,
        null,
        null,
        1.82,
        1.85,
        1.9,
        1.94,
        1.97,
        1.99,
        2.01,
        2.07,
        2.09,
        2.11,
        2.13,
        null,
        null,
        null,
      ],
      [
        1,
        'asdsdsa2',
        null,
        'Albania',
        null,
        null,
        'o',
        'xo',
        'o',
        'o',
        'xo',
        'xxx',
        null,
        null,
        null,
        null,
        2.01,
        null,
      ],
      [
        2,
        'hkgjhjdasd',
        null,
        'Albania',
        null,
        '',
        'o',
        'xo',
        'o',
        'xo',
        'xxx',
        null,
        null,
        null,
        null,
        null,
        1.99,
        null,
      ],
      [
        3,
        'demo player',
        null,
        'India',
        null,
        'o',
        'o',
        'o',
        'xxo',
        'o',
        'xxx',
        null,
        null,
        null,
        null,
        null,
        1.99,
        null,
      ],
      [
        4,
        'vishal vishal ',
        null,
        'Zambia',
        null,
        'o',
        'o',
        'xxo',
        'xxo',
        'xx',
        'x',
        null,
        null,
        null,
        null,
        null,
        1.97,
        null,
      ],
      [
        5,
        'hello',
        null,
        'India',
        null,
        'o',
        'o',
        'o',
        'xxx',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1.94,
        null,
      ],
      [
        '--',
        'vishal',
        null,
        'Turkmenistan',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
      ],
      [
        '--',
        'hello',
        null,
        'India',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
      ],
      [
        '--',
        'girls',
        null,
        'India',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
      ],
      [
        '--',
        '10 players',
        null,
        'Venezuela',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
      ],
      [
        '--',
        'hdhhs',
        null,
        'Turkmenistan',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
      ],
    ],
    isActive: true,
    isDeleted: false,
    metaData: null,
    tags: [],
    createdAt: '2024-04-27T06:10:06.868Z',
    updatedAt: '2024-04-27T06:44:59.546Z',
    __v: 6,
  },
};

const headMenu = [
  //   {title: 'Update'},
  {
    title: 'Score',
  },
  //   {
  //     title: 'Player/Squad}',
  //   },
  //   {
  //     title: 'Draw/Bracket',
  //   },
  //   {
  //     title: 'Standing/Ranking',
  //   },
  //   {
  //     title: 'News & Media',
  //   },
  //   {
  //     title: 'Head to Head',
  //   },
  //   {
  //     title: 'Rules',
  //   },
];
export default function AthleticScore({route, params}) {
  const [activeTab, setActiveTab] = useState(0);
  const {sportData} = route.params;
  console.log(sportData, 'index of the sports');
  return (
    <>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Athletics />
            <Text style={styles.sportsTitle}>ATHLETICS</Text>
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
                source={require('../../assets/images/archeryWorldCup.png')}
              />
              <View>
                <Text
                  style={{fontWeight: 600, fontSize: 16, color: COLORS.black}}>
                  Tournament Name
                </Text>
                <Text style={{color: COLORS.dark_gray, fontSize: 14}}>
                  High Jump
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <MessageScore />
              <CalendarScore />
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
                Event Name
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                Stage :
              </Text>
              <Text style={{color: COLORS.black, fontSize: 12}}>Fina</Text>
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
                India, Delhi
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={{color: COLORS.dark_gray, fontSize: 12}}>
                24/Jan/2024 | 04:00 PM
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
        <Text>High jump & Pole vault</Text>
        {activeTab === 0 && (
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              marginVertical: 10,
            }}>
            <HighJump data={data} />
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
        </View>
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
