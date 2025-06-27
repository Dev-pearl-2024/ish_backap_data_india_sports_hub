import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const sampleData = [
  {
    id: 1,
    name: 'Athlete A',
    country: 'IND',
    totalPoints: 5601,
    hurdles60m: 8.25,
    hurdlesPoints: 1013,
    highJump: 1.85,
    highJumpPoints: 1038,
    shotPut: 15.12,
    shotPutPoints: 834,
    longJump: 6.2,
    longJumpPoints: 934,
    run800m: '2:12.45',
    runPoints: 967,
  },
  {
    id: 2,
    name: 'Athlete B',
    country: 'USA',
    totalPoints: 5550,
    hurdles60m: 8.3,
    hurdlesPoints: 1005,
    highJump: 1.8,
    highJumpPoints: 978,
    shotPut: 14.95,
    shotPutPoints: 820,
    longJump: 6.15,
    longJumpPoints: 920,
    run800m: '2:13.10',
    runPoints: 950,
  },
  {
    id: 3,
    name: 'Athlete C',
    country: 'GBR',
    totalPoints: 5700,
    hurdles60m: 8.15,
    hurdlesPoints: 1123,
    highJump: 1.9,
    highJumpPoints: 1098,
    shotPut: 15.3,
    shotPutPoints: 850,
    longJump: 6.25,
    longJumpPoints: 940,
    run800m: '2:11.90',
    runPoints: 980,
  },
  {
    id: 4,
    name: 'Athlete D',
    country: 'CAN',
    totalPoints: 5500,
    hurdles60m: 8.35,
    hurdlesPoints: 998,
    highJump: 1.78,
    highJumpPoints: 950,
    shotPut: 14.8,
    shotPutPoints: 810,
    longJump: 6.1,
    longJumpPoints: 910,
    run800m: '2:14.00',
    runPoints: 935,
  },
  {
    id: 5,
    name: 'Athlete E',
    country: 'AUS',
    totalPoints: 5650,
    hurdles60m: 8.2,
    hurdlesPoints: 1018,
    highJump: 1.88,
    highJumpPoints: 1070,
    shotPut: 15.2,
    shotPutPoints: 840,
    longJump: 6.22,
    longJumpPoints: 930,
    run800m: '2:12.00',
    runPoints: 975,
  },
  {
    id: 6,
    name: 'Athlete F',
    country: 'FRA',
    totalPoints: 5580,
    hurdles60m: 8.28,
    hurdlesPoints: 1010,
    highJump: 1.82,
    highJumpPoints: 998,
    shotPut: 15.0,
    shotPutPoints: 825,
    longJump: 6.18,
    longJumpPoints: 925,
    run800m: '2:13.50',
    runPoints: 945,
  },
];

const CountryFlag = ({country}) => (
  <View style={styles.flagContainer}>
    <View style={[styles.flagStripe, {backgroundColor: '#FF6B35'}]} />
    <View style={[styles.flagStripe, {backgroundColor: '#FFFFFF'}]} />
    <View style={[styles.flagStripe, {backgroundColor: '#4CAF50'}]} />
  </View>
);

const PentathlonLeaderboard = () => {
  // Calculate maximum points for each event
  const maxHurdlesPoints = Math.max(...sampleData.map(a => a.hurdlesPoints));
  const maxHighJumpPoints = Math.max(...sampleData.map(a => a.highJumpPoints));
  const maxShotPutPoints = Math.max(...sampleData.map(a => a.shotPutPoints));
  const maxLongJumpPoints = Math.max(...sampleData.map(a => a.longJumpPoints));
  const maxRunPoints = Math.max(...sampleData.map(a => a.runPoints));

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      {/* Day Headers */}
      <View style={styles.dayHeadersContainer}>
        <View style={styles.dayHeaderSpacer} />
        <View style={styles.dayHeader}>
          <Text style={styles.dayText}>DAY -1</Text>
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
          <Text style={styles.headerText}>60M</Text>
          <Text style={styles.headerText}>HURDLES</Text>
          <Text style={styles.subHeaderText}>(MM:SS.ms)</Text>
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
          <Text style={styles.headerText}>LONG</Text>
          <Text style={styles.headerText}>JUMP</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>800M</Text>
          <Text style={styles.headerText}>RUN</Text>
          <Text style={styles.subHeaderText}>(MM:SS.ms)</Text>
        </View>
      </View>
    </View>
  );

  const renderAthleteRow = (athlete, index) => (
    <View
      key={athlete.id}
      style={[
        styles.tableRow,
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
      ]}>
      <View style={styles.rankCell}>
        <Text style={styles.rankText}>{index + 1}</Text>
      </View>
      <View style={styles.athleteCell}>
        <CountryFlag country={athlete.country} />
        <View style={styles.athleteInfo}>
          <Text style={styles.athleteName}>
            {athlete.name} ({athlete.country})
          </Text>
        </View>
      </View>
      <View style={styles.totalPointsCell}>
        <Text style={styles.totalPointsText}>{athlete.totalPoints}</Text>
        <Text style={styles.pointsArrow}>points →</Text>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.hurdles60m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.hurdlesPoints === maxHurdlesPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.hurdlesPoints === maxHurdlesPoints
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
                athlete.highJumpPoints === maxHighJumpPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.highJumpPoints === maxHighJumpPoints
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
                athlete.shotPutPoints === maxShotPutPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.shotPutPoints === maxShotPutPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.shotPutPoints}
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
                athlete.longJumpPoints === maxLongJumpPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.longJumpPoints === maxLongJumpPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.longJumpPoints}
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
                athlete.runPoints === maxRunPoints ? '#0166C2' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color: athlete.runPoints === maxRunPoints ? '#FFFFFF' : '#333',
              },
            ]}>
            {athlete.runPoints}
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
            {sampleData.map((athlete, index) =>
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
    minWidth: 648, // Total width: 60 + 170 + 80 + 5 * 68
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
    width: 310, // Width of rank + athlete + total points columns
  },
  dayHeader: {
    width: 340, // Width to span 5 event columns (5 * 68)
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
    width: 68,
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
    width: 68,
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
    color: '#333',
    fontWeight: '500',
  },
});

export default PentathlonLeaderboard;