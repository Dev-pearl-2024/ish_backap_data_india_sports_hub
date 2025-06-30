import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConvertDecathlon } from '../../../utils/sportFormatMaker/athletics/decathlon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CountryFlag = ({ country }) => (
  <View style={styles.flagContainer}>
    <View style={[styles.flagStripe, { backgroundColor: '#FF6B35' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF' }]} />
    <View style={[styles.flagStripe, { backgroundColor: '#4CAF50' }]} />
  </View>
);

const DecathlonLeaderboard = ({ score }) => {
  const sampleData = ConvertDecathlon(score);
  const maxRun100mPoints = Math.max(...sampleData.map(a => a.run100mPoints));
  const maxLongJumpPoints = Math.max(...sampleData.map(a => a.longJumpPoints));
  const maxShotPutPoints = Math.max(...sampleData.map(a => a.shotPutPoints));
  const maxHighJumpPoints = Math.max(...sampleData.map(a => a.highJumpPoints));
  const maxRun400mPoints = Math.max(...sampleData.map(a => a.run400mPoints));
  const maxHurdles110mPoints = Math.max(
    ...sampleData.map(a => a.hurdles110mPoints),
  );
  const maxDiscusThrowPoints = Math.max(
    ...sampleData.map(a => a.discusThrowPoints),
  );
  const maxPoleVaultPoints = Math.max(
    ...sampleData.map(a => a.poleVaultPoints),
  );
  const maxJavelinThrowPoints = Math.max(
    ...sampleData.map(a => a.javelinThrowPoints),
  );
  const maxRun1500mPoints = Math.max(...sampleData.map(a => a.run1500mPoints));

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      {/* Day Headers */}
      <View style={styles.dayHeadersContainer}>
        <View style={styles.dayHeaderSpacer} />
        <View style={styles.dayHeaderDay1}>
          <Text style={styles.dayText}>DAY 1</Text>
        </View>
        <View style={styles.dayHeaderDay2}>
          <Text style={styles.dayText}>DAY 2</Text>
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
          <Text style={styles.headerText}>DASH</Text>
          <Text style={styles.subHeaderText}>(MM:SS.ms)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>LONG</Text>
          <Text style={styles.headerText}>JUMP</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>SHOT</Text>
          <Text style={styles.headerText}>PUT</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>HIGH</Text>
          <Text style={styles.headerText}>JUMP</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>400M</Text>
          <Text style={styles.subHeaderText}>(MM:SS.ms)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>110M</Text>
          <Text style={styles.headerText}>HURDLES</Text>
          <Text style={styles.subHeaderText}>(MM:SS.ms)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>DISCUS</Text>
          <Text style={styles.headerText}>THROW</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>POLE</Text>
          <Text style={styles.headerText}>VAULT</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>JAVELIN</Text>
          <Text style={styles.headerText}>THROW</Text>
          <Text style={styles.subHeaderText}>(meter)</Text>
        </View>
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>1500M</Text>
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
        index % 2 == 0 ? styles.evenRow : styles.oddRow,
      ]}>
      <View style={styles.rankCell}>
        <Text style={styles.rankText}>{index + 1}</Text>
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
        <Text style={styles.eventValue}>{athlete.run100m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.run100mPoints == maxRun100mPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.run100mPoints == maxRun100mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.run100mPoints}
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
        <Text style={styles.eventValue}>{athlete.run400m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.run400mPoints == maxRun400mPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.run400mPoints == maxRun400mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.run400mPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.hurdles110m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.hurdles110mPoints == maxHurdles110mPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.hurdles110mPoints == maxHurdles110mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.hurdles110mPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.discusThrow}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.discusThrowPoints == maxDiscusThrowPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.discusThrowPoints == maxDiscusThrowPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.discusThrowPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.poleVault}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.poleVaultPoints == maxPoleVaultPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.poleVaultPoints == maxPoleVaultPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.poleVaultPoints}
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
                athlete.javelinThrowPoints == maxJavelinThrowPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.javelinThrowPoints == maxJavelinThrowPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.javelinThrowPoints}
          </Text>
        </View>
      </View>
      <View style={styles.eventCell}>
        <Text style={styles.eventValue}>{athlete.run1500m}</Text>
        <View
          style={[
            styles.pointsContainer,
            {
              backgroundColor:
                athlete.run1500mPoints == maxRun1500mPoints
                  ? '#0166C2'
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pointsText,
              {
                color:
                  athlete.run1500mPoints == maxRun1500mPoints
                    ? '#FFFFFF'
                    : '#333',
              },
            ]}>
            {athlete.run1500mPoints}
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
    minWidth: screenWidth, // was screenWidth
  },
  tableContainer: {
    minWidth: 990, // 990px / 648px (60 + 170 + 80 + 10 * 68)
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
    width: 310, // 310px / 648px (rank + athlete + total points)
  },
  dayHeaderDay1: {
    width: 340, // 340px / 648px (5 events: 5 * 68px)
    paddingVertical: 8, // was 8px
    backgroundColor: '#E5EDFF',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#A3BFFF',
    alignItems: 'center',
  },
  dayHeaderDay2: {
    width: 340, // 340px / 648px (5 events: 5 * 68px)
    paddingVertical: 8, // was 8px
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
    minHeight: 60, // 60px / 648px
  },
  rankHeader: {
    width: 60, // 60px / 648px
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  athleteHeader: {
    width: 170, // 170px / 648px
    justifyContent: 'center',
    paddingLeft: 10, // 10px / 648px
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  totalPointsHeader: {
    width: 80, // 80px / 648px
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  eventHeader: {
    width: 68, // 68px / 648px
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, // was 8px
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
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 70, // 70px / 648px
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
    width: 60, // 60px / 648px
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
    width: 170, // 170px / 648px
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10, // 10px / 648px
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  flagContainer: {
    width: 24,
    height: 18,
    flexDirection: 'column',
    marginRight: 8, // 8px / 648px
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
    width: 80, // 80px / 648px
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
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
    width: 68, // 68px / 648px
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, // was 8px
    borderRightWidth: 0.5,
    borderRightColor: '#A3BFFF',
  },
  eventValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  pointsContainer: {
    paddingHorizontal: 8, // 8px / 648px
    paddingVertical: 2, // 2px / 648px
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#A3BFFF',
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
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
});

export default DecathlonLeaderboard;