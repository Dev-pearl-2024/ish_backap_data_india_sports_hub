import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RelaySwimming } from '../../../utils/sportFormatMaker/swimming/relaySwimming';

const { width: screenWidth } = Dimensions.get('window');

const RelaySwimmingResultsScreen = ({ score }) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);
  const initialDistance = useRef(null);
  const relayTeams = RelaySwimming(score)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scale.setOffset(lastScale.current - 1);
        translateX.setOffset(lastTranslateX.current);
        translateY.setOffset(lastTranslateY.current);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2),
          );

          if (!initialDistance.current) {
            initialDistance.current = distance;
          }

          const scaleValue = Math.max(
            0.5,
            Math.min(3, distance / initialDistance.current),
          );
          scale.setValue(scaleValue - 1);
        } else {
          translateX.setValue(gestureState.dx);
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: () => {
        scale.flattenOffset();
        translateX.flattenOffset();
        translateY.flattenOffset();

        lastScale.current = (scale)._value + 1;
        lastTranslateX.current = (translateX)._value;
        lastTranslateY.current = (translateY)._value;

        if (lastScale.current < 1) {
          lastScale.current = 1;
          lastTranslateX.current = 0;
          lastTranslateY.current = 0;

          Animated.parallel([
            Animated.spring(scale, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          ]).start();
        }

        initialDistance.current = null;
      },
    }),
  ).current;

  const sortedRelayTeams = relayTeams

  const getTeamPosition = (timeInSeconds) => {
    const fastestTime = Math.min(...relayTeams.map(t => t?.timeInSeconds));
    const slowestTime = Math.max(...relayTeams.map(t => t?.timeInSeconds));
    const timeRange = slowestTime - fastestTime;

    const relativeTime = timeInSeconds - fastestTime;
    const positionPercentage =
      timeRange > 0 ? ((timeRange - relativeTime) / timeRange) * 100 : 0;

    const markerWidth = 80;
    const usableWidth = screenWidth - markerWidth - 40;
    const position = (positionPercentage / 100) * usableWidth + 20;

    return Math.min(Math.max(20, position), usableWidth);
  };

  const PoolVisualization = () => {
    const topTeams = sortedRelayTeams?.slice(0, 5);

    return (
      <View style={styles.poolContainer}>
        <Animated.View
          style={[
            styles.poolView,
            {
              transform: [
                { translateX: translateX },
                { translateY: translateY },
                { scale: Animated.add(scale, 1) },
              ],
            },
          ]}
          {...panResponder.panHandlers}>
          {topTeams.map((team, index) => {
            const position = getTeamPosition(team.timeInSeconds);

            return (
              <View key={team.id} style={styles.laneContainer}>
                <View style={styles.lane}>
                  <View style={styles.laneSegmentYellow} />
                  <View style={styles.laneSegmentWhite} />
                  <View style={styles.laneSegmentYellow} />
                  <View style={styles.laneSegmentWhite} />
                  <View style={styles.laneSegmentRed} />
                </View>

                <View style={[styles.markerContainer, { left: position }]}>
                  <View style={styles.marker}>
                    <Text style={styles.markerFlag}>{team.flag}</Text>
                    <Text style={styles.markerTime}>{team.time}</Text>
                    <Text style={styles.markerNote}>{team.note || '-'}</Text>
                  </View>
                  <View style={styles.markerLine} />
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  };

  const renderNoteModal = () => (
    <Modal
      visible={showNoteModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowNoteModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Note Definitions</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNoteModal(false)}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>PB</Text>
              <Text style={styles.noteDescription}>Personal Best</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>SB</Text>
              <Text style={styles.noteDescription}>Season Best</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>WL</Text>
              <Text style={styles.noteDescription}>World Leading</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>WR</Text>
              <Text style={styles.noteDescription}>World Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>AR</Text>
              <Text style={styles.noteDescription}>Area Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>NR</Text>
              <Text style={styles.noteDescription}>National Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>MR</Text>
              <Text style={styles.noteDescription}>Meet Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>GR</Text>
              <Text style={styles.noteDescription}>Games Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>OR</Text>
              <Text style={styles.noteDescription}>Olympic Record</Text>
            </View>
            <View style={styles.noteItem}>
              <Text style={styles.noteCode}>-</Text>
              <Text style={styles.noteDescription}>No Record</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const ResultsTable = () => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.rankHeader]}>RANK</Text>
          <View style={styles.separator} />
          <Text style={[styles.headerText, styles.athleteHeader]}>TEAM</Text>
          <View style={styles.separator} />
          <View style={styles.timeHeaderContainer}>
            <Text style={[styles.headerText, styles.timeHeader]}>TIME</Text>
            <Text style={styles.timeSubHeader}>(MM:SS.ms)</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.noteHeaderContainer}>
            <Text style={[styles.headerText, styles.noteHeader]}>NOTE</Text>
            <TouchableOpacity
              style={styles.infoIcon}
              onPress={() => setShowNoteModal(true)}>
              <Text style={styles.infoIconText}>ⓘ</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.tableScrollView}>
          {sortedRelayTeams.map((team, index) => (
            <View
              key={team.id}
              style={[
                styles.teamContainer,
                index % 2 === 0 ? styles.oddTeam : styles.evenTeam,
              ]}>
              <View style={styles.tableRow}>
                <Text style={[styles.rankText, styles.rankColumn]}>
                  {index + 1}
                </Text>
                <View style={styles.separator} />
                <View style={[styles.athleteCell, styles.athleteColumn]}>
                  {team.athletes.map((athlete, athleteIndex) => (
                    <View key={athleteIndex} style={styles.athleteInfo}>
                      <Text style={styles.flag}>{team.flag}</Text>
                      <Text style={styles.athleteName}>
                        {athlete.name} ({athlete.country})
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.separator} />
                <Text style={[styles.timeText, styles.timeColumn]}>
                  {team.time}
                </Text>
                <View style={styles.separator} />
                <Text style={[styles.noteText, styles.noteColumn]}>
                  {team.note || '-'}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PoolVisualization />
      <ResultsTable />
      {renderNoteModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: "100%"
  },
  poolContainer: {
    height: '30%',
    backgroundColor: '#e3f2fd',
    overflow: 'hidden',
  },
  poolView: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#bbdefb',
  },
  laneContainer: {
    height: '23%',
    marginBottom: '0.5%',
    position: 'relative',
    width: '100%',
  },
  lane: {
    height: 4,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  laneSegmentYellow: {
    flex: 1,
    backgroundColor: '#ffd700',
  },
  laneSegmentWhite: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  laneSegmentRed: {
    width: 30,
    backgroundColor: '#ff0000',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: '-6%',
  },
  marker: {
    alignItems: 'center',
    padding: '1%',
    borderRadius: 4,
  },
  markerFlag: {
    fontSize: 14,
    marginVertical: '0.5%',
  },
  markerTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  markerNote: {
    fontSize: 10,
    color: '#666',
  },
  markerLine: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'black',
    marginTop: 1,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: "100%"
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#E5EDFF',
    alignItems: 'flex-start',
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#A3BFFF',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  rankHeader: {
    flex: 0.7,
    paddingTop: 8,
  },
  athleteHeader: {
    flex: 3.3,
    paddingTop: 8,
  },
  timeHeader: {
    textAlign: 'center',
  },
  timeHeaderContainer: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  timeSubHeader: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 0.5,
  },
  noteHeader: {
    flex: 1,
  },
  noteHeaderContainer: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  infoIcon: {
    marginLeft: '1%',
    marginBottom: '3%',
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    color: '#0166C2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#A3BFFF',
    marginHorizontal: 5,
  },
  tableScrollView: {
    flex: 1,
  },
  teamContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#A3BFFF',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    alignItems: 'center',
  },
  evenTeam: {
    backgroundColor: '#E5EDFF',
  },
  oddTeam: {
    backgroundColor: '#F2F5FD',
  },
  rankColumn: {
    flex: 0.8,
  },
  athleteColumn: {
    flex: 3.4,
  },
  timeColumn: {
    flex: 1.4,
  },
  noteColumn: {
    flex: 1,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  athleteCell: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  athleteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  athleteName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  flag: {
    fontSize: 20,
    marginRight: '2%',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  noteText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '85%',
    maxHeight: '70%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: '8%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  modalBody: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  noteCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    width: '10%',
    textAlign: 'center',
  },
  noteDescription: {
    fontSize: 14,
    color: '#333',
    marginLeft: '4%',
    flex: 1,
  },
});

export default RelaySwimmingResultsScreen;