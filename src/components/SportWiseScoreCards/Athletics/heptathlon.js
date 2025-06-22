import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConvertHeptathlon } from '../../../utils/sportFormatMaker/athletics/heptathlon';

const { width: screenWidth } = Dimensions.get('window');

const CountryFlag = ({ country }) => (
  <View style={styles.flagContainer}>
    <View style={[styles.flagStripe, { backgroundColor: '#FF6B35' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#4CAF50' }]} />
  </View>
);

const HeptathlonLeaderboard = ({ score }) => {
  const athleteData = ConvertHeptathlon(score);

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
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
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
                athlete.hurdlesPoints > 1050 ? '#B8B8FF' : '#E8E8FF',
            },
          ]}>
          <Text style={styles.pointsText}>{athlete.hurdlesPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.highJump}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.highJumpPoints > 750 ? '#B8B8FF' : '#E8E8FF',
            },
          ]}>
          <Text style={styles.pointsText}>{athlete.highJumpPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.shotPut}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.shotPutPoints > 1000 ? '#B8B8FF' : '#E8E8FF',
            },
          ]}>
          <Text style={styles.pointsText}>{athlete.shotPutPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.run200m}</Text>
        <View style={[styles.pointsContainer, { backgroundColor: '#E8E8FF' }]}>
          <Text style={styles.pointsText}>{athlete.run200mPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.longJump}</Text>
        <View style={[styles.pointsContainer, { backgroundColor: '#E8E8FF' }]}>
          <Text style={styles.pointsText}>{athlete.longJumpPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.javelinThrow}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.javelinPoints > 500 ? '#B8B8FF' : '#E8E8FF',
            },
          ]}>
          <Text style={styles.pointsText}>{athlete.javelinPoints}</Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.run800m}</Text>
        <View style={[styles.pointsContainer, { backgroundColor: '#E8E8FF' }]}>
          <Text style={styles.pointsText}>{athlete.run800mPoints}</Text>
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
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    minWidth: screenWidth,
  },
  tableContainer: {
    minWidth: 1000, // Total width to accommodate all columns
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dayHeadersContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
  },
  dayHeaderSpacer: {
    width: 357, // Width of rank + athlete + total points columns
  },
  dayHeader: {
    width: 345, // Width to span multiple event columns
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D0D0D0',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  columnHeaders: {
    flexDirection: 'row',
    backgroundColor: '#E8E8FF',
    minHeight: 60,
  },
  rankHeader: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#D0D0D0',
  },
  athleteHeader: {
    width: 170,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRightWidth: 1,
    borderRightColor: '#D0D0D0',
  },
  totalPointsHeader: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#D0D0D0',
  },
  eventHeader: {
    width: 98,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#D0D0D0',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#F8F8FF',
  },
  rankCell: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  athleteCell: {
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
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
    color: '#333',
  },
  totalPointsCell: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  totalPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsArrow: {
    fontSize: 12,
    color: '#666',
  },
  eventCell: {
    width: 98,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  eventValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  pointsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default HeptathlonLeaderboard;