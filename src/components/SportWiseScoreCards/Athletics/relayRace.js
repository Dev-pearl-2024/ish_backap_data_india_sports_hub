import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { convertRelayData } from '../../../utils/sportFormatMaker/athletics/relayRace';
import COLORS from '../../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

// Moved outside as standalone components
const FieldVisualization = ({
    sortedRelayTeams,
    getScatteredPosition,
}) => {
    const topTeams = sortedRelayTeams.slice(0, 6);

    return (
        <View style={styles.fieldContainer}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.fieldView}>
                    {/* Render lane lines */}
                    {Array.from({ length: 6 }, (_, index) => (
                        <View
                            key={`lane-${index}`}
                            style={[styles.lane, { top: `${(index + 1) * 16.67}%` }]}
                        />
                    ))}

                    {/* Finish line */}
                    <View style={styles.finishLine} />

                    {/* Scattered team markers */}
                    {topTeams.map((team, index) => {
                        const position = getScatteredPosition(team, index);

                        return (
                            <View
                                key={team.id}
                                style={[
                                    styles.markerContainer,
                                    {
                                        left: position.x,
                                        top: position.y,
                                    },
                                ]}>
                                <View style={styles.marker}>
                                    <Text style={styles.markerTime}>{team?.time}</Text>
                                    <Text style={styles.markerFlag}>{team?.athletes?.[0]?.country}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

const ResultsTable = ({ sortedRelayTeams }) => {
    const [showNoteModal, setShowNoteModal] = useState(false);

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

    return (
        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.rankHeader]}>RANK</Text>
                <View style={styles.separator} />
                <Text style={[styles.headerText, styles.athleteHeader]}>ATHLETE</Text>
                <View style={styles.separator} />
                <View style={styles.timeHeaderContainer}>
                    <Text style={[styles.headerText, styles.timeHeader]}>TIME</Text>
                    <Text style={styles.timeSubHeader}>(MM:SS.ms)</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.noteHeaderContainer}>
                    <TouchableOpacity
                        style={styles.infoIcon}
                        onPress={() => setShowNoteModal(true)}>
                        <Text style={[styles.headerText, styles.noteHeader]}>NOTEⓘ</Text>
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
                                    <React.Fragment key={athleteIndex}>
                                        <View style={styles.athleteInfo}>
                                            {/* <Text style={styles.flag}>{team.flag}</Text> */}
                                            <Text style={styles.athleteName}>
                                                {athlete.name} ({athlete.country})
                                            </Text>
                                        </View>
                                        {athleteIndex < team.athletes.length - 1 && (
                                            <View style={styles.athleteSeparator} />
                                        )}
                                    </React.Fragment>
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
            {renderNoteModal()}
        </View>
    );
};

const RelayRaceScreen = ({ score }) => {
    const relayTeams = convertRelayData((score))

    const sortedRelayTeams = [...relayTeams].sort(
        (a, b) => a.timeInSeconds - b.timeInSeconds,
    );

    const getScatteredPosition = (team, index) => {
        const fieldWidth = screenWidth - 100; // Account for margins
        const fieldHeight = 240; // Available field height
        const markerWidth = 10;

        // X position based on race time (fastest = rightmost, near finish line)
        const fastestTime = Math.min(...relayTeams.map(t => t.timeInSeconds));
        const slowestTime = Math.max(...relayTeams.map(t => t.timeInSeconds));
        const timeRange = slowestTime - fastestTime;

        const relativeTime = team.timeInSeconds - fastestTime;
        const timePercentage = timeRange > 0 ? relativeTime / timeRange : 0;

        // X: Fastest (lowest time) = right side, Slowest = left side
        const maxDistance = fieldWidth - markerWidth - 60; // Distance from finish line
        const xPosition =
            fieldWidth - timePercentage * maxDistance - markerWidth - 20;

        // Y: Scatter vertically across the field to prevent overlap
        const baseY = 20;
        const maxY = fieldHeight - 40;
        const availableHeight = maxY - baseY;

        // Create scattered Y positions with some randomization
        const ySpacing = availableHeight / Math.max(1, sortedRelayTeams.length - 1);
        const staggerOffset = (index % 3) * 12; // More varied staggering
        const randomOffset = (index * 17) % 20; // Pseudo-random offset

        let yPosition = baseY + index * ySpacing + staggerOffset + randomOffset;

        // Ensure Y position stays within bounds
        yPosition = Math.max(baseY, Math.min(yPosition, maxY));

        return {
            x: Math.max(20, Math.min(xPosition, fieldWidth - markerWidth)),
            y: yPosition,
        };
    };

    return (
        <>
            <View style={styles.container}>
                <FieldVisualization
                    sortedRelayTeams={sortedRelayTeams}
                    getScatteredPosition={getScatteredPosition}
                />
            </View>
            <ScrollView>
                <ResultsTable sortedRelayTeams={sortedRelayTeams} />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fieldContainer: {
        height: '100%',
        backgroundColor: '#4CAF50',
        paddingTop: '2.5%',
        paddingBottom: '2.5%',
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    fieldView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#D2B48C',
        overflow: 'hidden',
        minHeight: 250, // retained as fallback
    },
    lane: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.7,
        zIndex: 1,
    },
    finishLine: {
        position: 'absolute',
        right: '5%',
        top: 0,
        bottom: 0,
        width: '3%',
        backgroundColor: '#7D4800',
        zIndex: 2,
    },
    markerContainer: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 3,
    },
    marker: {
        alignItems: 'center',
        padding: '2%',
    },
    markerFlag: {
        fontSize: 16,
        color: COLORS.dark_gray,
        marginBottom: '0.5%',
    },
    markerTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '0.5%',
    },
    markerNote: {
        fontSize: 9,
        color: '#666',
        fontWeight: '500',
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    tableHeader: {
        flexDirection: 'row',
        // paddingHorizontal: '5%',
        // paddingVertical: '2%',
        backgroundColor: '#E5EDFF',
        alignItems: 'flex-start',
        minHeight: 40,
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    rankHeader: {
        flex: 1.1,
        paddingTop: '2%',
    },
    athleteHeader: {
        flex: 4.94,
        paddingTop: '2%',
    },
    timeHeader: {
        textAlign: 'center',
    },
    timeHeaderContainer: {
        flex: 1.485,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '2%',
    },
    timeSubHeader: {
        fontSize: 10,
        color: '#000',
        textAlign: 'center',
        marginTop: '0.5%',
    },
    noteHeader: {
        flex: 1.1,
        textAlign: 'center',
    },
    noteHeaderContainer: {
        flex: 1.32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2%',
    },
    infoIcon: {
        marginLeft: '1%',
    },
    infoIconText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    separator: {
        width: 0.5,
        height: '100%',
        backgroundColor: '#A3BFFF',
        // marginHorizontal: '1.25%',
        alignSelf: 'center',
    },
    tableScrollView: {
        flex: 1,
    },
    teamContainer: {
        // borderBottomWidth: 2,
        // borderBottomColor: '#A3BFFF',
    },
    tableRow: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        // paddingVertical: '2%',
        alignItems: 'center',
        minHeight: 50,
    },
    evenTeam: {
        backgroundColor: '#E5EDFF',
    },
    oddTeam: {
        backgroundColor: 'white',
    },
    rankColumn: {
        flex: 0.75,
    },
    athleteColumn: {
        flex: 5,
    },
    timeColumn: {
        flex: 1.5,
    },
    noteColumn: {
        flex: 0.98,
    },
    rankText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
    },
    athleteCell: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    athleteSeparator: {
        height: 0.5,
        backgroundColor: '#A3BFFF',
        width: '100%',
    },
    athleteInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '3%',
    },
    athleteName: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginLeft: '2%',
        flex: 1,
    },
    flag: {
        fontSize: 20,
        marginRight: '2%',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    noteText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
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

export default RelayRaceScreen;