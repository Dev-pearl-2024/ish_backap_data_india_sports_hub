import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const sampleData = [
  {
    id: 1,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1013,
    highJump: 1.6,
    highJumpPoints: 1038,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
  {
    id: 2,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1013,
    highJump: 1.6,
    highJumpPoints: 738,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
  {
    id: 3,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1123,
    highJump: 1.6,
    highJumpPoints: 987,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
  {
    id: 4,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1013,
    highJump: 1.6,
    highJumpPoints: 738,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
  {
    id: 5,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1013,
    highJump: 1.6,
    highJumpPoints: 1038,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
  {
    id: 6,
    name: 'Athlete name',
    country: '🇮🇳',
    totalPoints: 5601,
    hurdles60m: 13.76,
    hurdlesPoints: 1013,
    highJump: 1.6,
    highJumpPoints: 738,
    shotPut: 15.12,
    shotPutPoints: 734,
    longJump: 1.6,
    longJumpPoints: 734,
    run800m: 24.61,
    runPoints: 967,
  },
];

const PentathlonLeaderboard = () => {
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAthletePress = (athlete) => {
    setSelectedAthlete(athlete);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAthlete(null);
  };

  const renderLeaderboardRow = (athlete, index) => (
    <TouchableOpacity
      key={athlete.id}
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
      onPress={() => handleAthletePress(athlete)}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.athleteInfo}>
        <Text style={styles.flag}>{athlete.country}</Text>
        <Text style={styles.athleteName}>{athlete.name} (country)</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.totalPoints}>{athlete.totalPoints}</Text>
        <Text style={styles.pointsLabel}>points →</Text>
      </View>
      <View style={styles.hurdlesContainer}>
        <Text style={styles.hurdlesValue}>{athlete.hurdles60m}</Text>
        <Text style={styles.hurdlesPoints}>{athlete.hurdlesPoints}</Text>
      </View>
    </TouchableOpacity>
  );

  const getHighestPointsStyle = (points, allPoints) => {
    const maxPoints = Math.max(...allPoints);
    return points === maxPoints ? styles.highlightedPoints : {};
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.rankHeader}>RANK</Text>
        <Text style={styles.athleteHeader}>ATHLETE</Text>
        <Text style={styles.totalPointsHeader}>TOTAL{'\n'}POINTS</Text>
        <Text style={styles.hurdlesHeader}>60M{'\n'}HURDLES</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>HHHMMSS.ms</Text>
      </View>

      {/* Leaderboard */}
      <ScrollView style={styles.scrollView}>
        {sampleData.map((athlete, index) =>
          renderLeaderboardRow(athlete, index),
        )}
      </ScrollView>

      {/* Modal for detailed view */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.dayLabel}>DAY -1</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Detailed Header */}
          <View style={styles.detailedHeader}>
            <Text style={styles.detailedRankHeader}>RANK</Text>
            <Text style={styles.detailedAthleteHeader}>ATHLETE</Text>
            <Text style={styles.detailedTotalPointsHeader}>
              TOTAL{'\n'}POINTS
            </Text>
            <Text style={styles.detailedDayHeader}>DAY -1</Text>
          </View>

          {/* Event Sub Headers */}
          <View style={styles.eventSubHeader}>
            <View style={styles.leftSpacing} />
            <Text style={styles.eventSubHeaderText}>60M{'\n'}HURDLES</Text>
            <Text style={styles.eventSubHeaderText}>HIGH{'\n'}JUMP</Text>
            <Text style={styles.eventSubHeaderText}>SHOT{'\n'}PUT</Text>
            <Text style={styles.eventSubHeaderText}>LONG{'\n'}JUMP</Text>
            <Text style={styles.eventSubHeaderText}>800M{'\n'}RUN</Text>
          </View>

          {/* Units Sub Header */}
          <View style={styles.unitsSubHeader}>
            <View style={styles.leftSpacing} />
            <Text style={styles.unitsText}>(HHHMMSS.ms)</Text>
            <Text style={styles.unitsText}>(meter)</Text>
            <Text style={styles.unitsText}>(meter)</Text>
            <Text style={styles.unitsText}>(meter)</Text>
            <Text style={styles.unitsText}>(HHHMMSS.ms)</Text>
          </View>

          {selectedAthlete && (
            <ScrollView style={styles.detailedScrollView}>
              {sampleData.map((athlete, index) => (
                <View
                  key={athlete.id}
                  style={[
                    styles.detailedRow,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                    athlete.id === selectedAthlete.id ? styles.selectedRow : {},
                  ]}>
                  <Text style={styles.detailedRank}>{index + 1}</Text>

                  <View style={styles.detailedAthleteInfo}>
                    <Text style={styles.flag}>{athlete.country}</Text>
                    <Text style={styles.detailedAthleteName}>
                      {athlete.name} (country)
                    </Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>
                      {athlete.totalPoints}
                    </Text>
                    <Text
                      style={[
                        styles.detailedPoints,
                        getHighestPointsStyle(
                          athlete.hurdlesPoints,
                          sampleData.map(a => a.hurdlesPoints),
                        ),
                      ]}>
                      {athlete.hurdlesPoints}
                    </Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>
                      {athlete.hurdles60m}
                    </Text>
                    <Text style={styles.detailedPoints}>734</Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>{athlete.highJump}</Text>
                    <Text
                      style={[
                        styles.detailedPoints,
                        getHighestPointsStyle(
                          athlete.highJumpPoints,
                          sampleData.map(a => a.highJumpPoints),
                        ),
                      ]}>
                      {athlete.highJumpPoints}
                    </Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>{athlete.shotPut}</Text>
                    <Text style={styles.detailedPoints}>734</Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>{athlete.longJump}</Text>
                    <Text style={styles.detailedPoints}>734</Text>
                  </View>

                  <View style={styles.detailedColumn}>
                    <Text style={styles.detailedValue}>{athlete.run800m}</Text>
                    <Text style={styles.detailedPoints}>967</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingVertical: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  rankHeader: {
    width: 50,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  athleteHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  totalPointsHeader: {
    width: 80,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  hurdlesHeader: {
    width: 80,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  subHeader: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 10,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subHeaderText: {
    fontSize: 10,
    color: '#888',
    marginRight: 15,
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  rank: {
    width: 50,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  athleteInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  athleteName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  pointsContainer: {
    width: 80,
    alignItems: 'center',
  },
  totalPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  hurdlesContainer: {
    width: 80,
    alignItems: 'center',
  },
  hurdlesValue: {
    fontSize: 14,
    color: '#333',
  },
  hurdlesPoints: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dayLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  detailedHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  detailedRankHeader: {
    width: 40,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  detailedAthleteHeader: {
    width: 115,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  detailedTotalPointsHeader: {
    width: 80,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  detailedDayHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  eventSubHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  leftSpacing: {
    width: 240, // Space for RANK + ATHLETE + TOTAL POINTS columns
  },
  eventSubHeaderText: {
    width: 60,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  unitsSubHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 8,
    paddingBottom: 5,
    alignItems: 'center',
  },
  unitsText: {
    width: 60,
    fontSize: 8,
    color: '#888',
    textAlign: 'center',
  },
  detailedScrollView: {
    flex: 1,
  },
  detailedRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedRow: {
    backgroundColor: '#e3f2fd',
  },
  detailedRank: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  detailedAthleteInfo: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailedAthleteName: {
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
  },
  detailedColumn: {
    width: 65,
    alignItems: 'center',
  },
  detailedValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  detailedPoints: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  highlightedPoints: {
    backgroundColor: '#c8e6c9',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});

export default PentathlonLeaderboard;