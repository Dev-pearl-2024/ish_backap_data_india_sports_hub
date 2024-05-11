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
export default function AthleticScore() {
  const [activeTab, setActiveTab] = useState(0);

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
        {activeTab === 0 && (
            <View style={{backgroundColor:COLORS.white,padding:10,marginVertical:10}}>
                <HighJump data={data}/>
            </View>
        )}
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
