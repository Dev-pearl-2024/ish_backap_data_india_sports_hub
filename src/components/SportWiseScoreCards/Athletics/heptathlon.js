import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConvertHeptathlon } from '../../../utils/sportFormatMaker/athletics/heptathlon';

const { width: screenWidth } = Dimensions.get('window')

const CountryFlag = ({ country }) => (
  <View style={styles.flagContainer}>
    <View style={[styles.flagStripe, { backgroundColor: '#FF6B35' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#4CAF50' }]} />
  </View>
);

const HeptathlonLeaderboard = ({ score }) => {
  const athleteData = ConvertHeptathlon(score);
  const maxHurdlesPoints = Math.max(...athleteData.map(a => a.hurdlesPoints));
  const maxHighJumpPoints = Math.max(...athleteData.map(a => a.highJumpPoints));
  const maxShotPutPoints = Math.max(...athleteData.map(a => a.shotPutPoints));
  const maxRun200mPoints = Math.max(...athleteData.map(a => a.run200mPoints));
  const maxLongJumpPoints = Math.max(...athleteData.map(a => a.longJumpPoints));
  const maxJavelinPoints = Math.max(...athleteData.map(a => a.javelinPoints));
  const maxRun800mPoints = Math.max(...athleteData.map(a => a.run800mPoints));

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      {/* Day Headers */}
      <View style={styles.dayHeadersContainer}>
        <View style={styles.dayHeaderSpacer} />
        <View style={styles.dayHeader}>
          <Text style={styles.dayText}>DAY -1</Text>
        </View>
        <View style={styles.dayHeader}>
          <Text style={styles.dayText}>DAY -2</Text>
        </View>
      </View>

      {/* Column Headers */}
      <View style={styles.columnHeaders}>
        <View style={styles.rankHeader}>
          <Text style={styles.headerText}>RANK</Text>
        </View>
        <View style={styles.athleteHeader}>
          <Text style={styles.headerText}>ATHLETE</Text>
        </View>
        <View style={styles.totalPointsHeader}>
          <Text style={styles.headerText}>TOTAL</Text>
          <Text style={styles.headerText}>POINTS</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>100M</Text>
          <Text style={styles.headerText}>HURDLES</Text>
          <Text style={styles.subHeaderText}>(HH:MM:SS.ms)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>HIGH</Text>
          <Text style={styles.headerText}>JUMP</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>SHOT</Text>
          <Text style={styles.headerText}>PUT</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>200M</Text>
          <Text style={styles.headerText}>RUN</Text>
          <Text style={styles.subHeaderText}>(HH:MM:SS.ms)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>LONG</Text>
          <Text style={styles.headerText}>JUMP</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>JAVELIN</Text>
          <Text style={styles.headerText}>THROW</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>800M</Text>
          <Text style={styles.headerText}>RUN</Text>
          <Text style={styles.subHeaderText}>(HH:MM:SS.ms)</Text>
        </View>
      </View>
    </View>
  );

  const renderAthleteRow = (athlete, index) => (
    <View
      key={index}
      style={[
        styles.tableRow,
        index % 2 == 0 ? styles.evenRow : styles.oddRow,
      ]}>
      <View style={styles.rankCell}>
        <Text style={styles.rankText}>{athlete.rank}</Text>
      </View>
      <View style={styles.athleteCell}>
        {/* <CountryFlag country={athlete.country} /> */}
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>
            {athlete.name}
          </Text>
        </View>
      </View>
      <View style={styles.totalPointsCell}>
        <Text style={styles.totalPointsText}>{athlete.totalPoints}</Text>
        <Text style={styles.pointsArrow}>points →</Text>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.hurdles100m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.hurdlesPoints == maxHurdlesPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.hurdlesPoints == maxHurdlesPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.hurdlesPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.highJump}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.highJumpPoints == maxHighJumpPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.highJumpPoints == maxHighJumpPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.highJumpPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.shotPut}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.shotPutPoints == maxShotPutPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.shotPutPoints == maxShotPutPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.shotPutPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.run200m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.run200mPoints == maxRun200mPoints
                  ? '#0166C2'
                  : 'transparent',
              color:
                athlete.run200mPoints == maxRun200mPoints
                  ? '#FFFFFF'
                  : '#333',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.run200mPoints == maxRun200mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.run200mPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.longJump}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.longJumpPoints == maxLongJumpPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.longJumpPoints == maxLongJumpPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.longJumpPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.javelinThrow}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.javelinPoints == maxJavelinPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.javelinPoints == maxJavelinPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.javelinPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.run800m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.run800mPoints == maxRun800mPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.run800mPoints == maxRun800mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.run800mPoints}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <ScrollView
            style={styles.tableBody}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            {athleteData.map((athlete, index) =>
              renderAthleteRow(athlete, index),
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    minWidth: screenWidth,
  },
  tableContainer: {
    minWidth: 1000, // Total width to accommodate all columns
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    backgroundColor: '#E5EDFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#A3BFFF',
  },
  dayHeadersContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5EDFF',
  },
  dayHeaderSpacer: {
    width: 357, // Width of rank + athlete + total points columns
  },
  dayHeader: {
    width: 345, // Width to span multiple event columns
    paddingVertical: 8,
    backgroundColor: '#E5EDFF',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#A3BFFF',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  columnHeaders: {
    flexDirection: 'row',
    backgroundColor: '#E5EDFF',
    minHeight: 60,
  },
  rankHeader: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 10,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  athleteHeader: {
    width: 170,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  totalPointsHeader: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  eventHeader: {
    width: 98,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    marginTop: 2,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: '#A3BFFF',
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#E5EDFF',
  },
  rankCell: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  athleteCell: {
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  flagContainer: {
    width: 24,
    height: 18,
    flexDirection: 'column',
    marginRight: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  flagStripe: {
    flex: 1,
    width: '100%',
  },
  athleteInfo: {
    flex: 1,
  },
  windInfo: {
    backgroundColor: 'white',
    paddingVertical: '3%',
    paddingHorizontal: '2.5%',
    alignItems: 'flex-start',
    padding: "30%",
    flexDirection: 'row',
  },
  windText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  windValueText: {
    fontSize: 14,
    width: "90%",
    color: '#000',
    // fontWeight: 'bold',
    fontStyle: 'italic'
  },
  athleteName: {
    fontSize: 14,
    color: '#000',
  },
  totalPointsCell: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  totalPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsArrow: {
    fontSize: 12,
    color: '#000',
  },
  eventCell: {
    width: 98,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  eventValue: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  pointsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  pointsText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
});

export default HeptathlonLeaderboard;