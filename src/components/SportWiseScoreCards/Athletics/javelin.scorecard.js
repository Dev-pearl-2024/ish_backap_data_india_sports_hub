import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import JavelinField from '../../../assets/images/JavelineField.svg';
import { ConvertJavelinThrow } from '../../../utils/sportFormatMaker/athletics/javelinThrow';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Javelin = ({ score }) => {
    const [expandedRows, setExpandedRows] = useState(
        {},
    );
    const [showNoteModal, setShowNoteModal] = useState(false);
    const fieldHeight = screenHeight * 0.4;
    const athletesData = ConvertJavelinThrow(score);

    // Calculate dynamic ranks based on best throws
    const athletes = athletesData
        .sort((a, b) => b.score - a.score)
        .map((athlete, index) => ({
            ...athlete,
            rank: index + 1,
        }));

    const zones = [
        { minScore: 60, maxScore: 70, minPos: 60, maxPos: 65 },
        { minScore: 70, maxScore: 80, minPos: 65, maxPos: 75 },
        { minScore: 80, maxScore: 90, minPos: 75, maxPos: 90 },
    ];

    const getPlayerFixedZonePosition = (score) => {
        for (const zone of zones) {
            if (score >= zone.minScore && score <= zone.maxScore) {
                const rangeScore = score - zone.minScore;
                const rangeMaxScore = zone.maxScore - zone.minScore;
                const rangePos = zone.maxPos - zone.minPos;
                const positionWithinZone = (rangeScore / rangeMaxScore) * rangePos;
                return zone.minPos + positionWithinZone;
            }
        }
        if (score < zones[0].minScore) return zones[0].minPos;
        return zones[zones.length - 1].maxPos;
    };

    const renderAthleteMarkers = () => {
        const topAthletes = athletes.sort((a, b) => b.score - a.score).slice(0, 5);

        return topAthletes.map((athlete, index) => {
            const leftPosition = getPlayerFixedZonePosition(athlete.score);
            const baseTop = fieldHeight * 0.1;
            const verticalStep = fieldHeight * 0.16;
            const horizontalOffset = index * 12;
            const topPosition = baseTop + index * verticalStep;
            const adjustedLeftPosition = Math.max(5, leftPosition - horizontalOffset);

            return (
                <View
                    key={`athlete-${athlete.rank}`}
                    style={[
                        styles.athleteMarker,
                        {
                            left: (topAthletes.length - 1 == index) ? `${adjustedLeftPosition}%` : `${adjustedLeftPosition}%`,
                            top: (topAthletes.length - 1 == index) ? `${adjustedLeftPosition + 10}%` : topPosition,
                        },
                    ]}>
                    <View style={styles.athleteInfo}>
                        <Text style={styles.athleteScore}>{athlete.score}</Text>
                        <Text style={styles.athleteName}>
                            {athlete.name.length > 10
                                ? athlete.name.substring(0, 12) + '...'
                                : athlete.name}
                        </Text>
                    </View>
                </View>
            );
        });
    };

    const toggleDropdown = (rank) => {
        setExpandedRows(prev => ({
            ...prev,
            [rank]: !prev[rank],
        }));
    };

    const renderRankingRow = (athlete, index) => {
        const getRowStyle = () => {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow;
        };

        const isExpanded = expandedRows[athlete.rank];

        return (
            <React.Fragment key={athlete.rank}>
                <View style={[styles.rankRow, getRowStyle()]}>
                    <Text style={styles.rankText}>{athlete.rank}</Text>
                    <View style={styles.columnSeparator} />
                    <View style={styles.athleteDetails}>
                        <Text style={styles.flagEmoji}>{athlete.flagEmoji}</Text>
                        <Text style={styles.athleteNameText}>
                            {athlete.name} ({athlete.country.toLowerCase()})
                        </Text>
                    </View>
                    <View style={styles.columnSeparator} />
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>{athlete?.score?.toFixed(2)}</Text>
                        <TouchableOpacity
                            style={styles.dropdownIcon}
                            onPress={() => toggleDropdown(athlete.rank)}
                            accessibilityLabel={`Toggle details for ${athlete.name}`}>
                            <Text style={styles.dropdownText}>{isExpanded ? '▲' : '▼'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.columnSeparator} />
                    <Text style={styles.noteText}>{athlete.note}</Text>
                </View>

                {isExpanded && (
                    <View style={[styles.expandedRow, getRowStyle()]}>
                        <View style={styles.expandedContent}>
                            <View style={styles.throwsContainer}>
                                <View style={{ flex: 0.8 }} />
                                {/* <View style={styles.columnSeparator} /> */}
                                <View style={styles.throwsContent}>
                                    {athlete.throws.map((throwDistance, index) => (
                                        <View key={`throw-${index}`} style={styles.throwItem}>
                                            <Text
                                                style={[
                                                    styles.throwText,
                                                    throwDistance === athlete.score &&
                                                    styles.bestThrowText,
                                                    throwDistance === null && styles.invalidThrowText,
                                                ]}>
                                                {throwDistance ? `${throwDistance}` : 'X'}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </React.Fragment>
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
                            <Text style={styles.noteCode}>X</Text>
                            <Text style={styles.noteDescription}>Foul/Invalid Attempt</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <Text style={styles.noteCode}>-</Text>
                            <Text style={styles.noteDescription}>Pass/No Mark</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fieldContainer}>
                <View style={styles.field}>
                    <JavelinField  width={screenWidth}/>
                    {renderAthleteMarkers()}
                </View>
            </View>

            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.rankHeader}>RANK</Text>
                    <View style={styles.columnSeparator} />
                    <Text style={styles.athleteHeader}>ATHLETE</Text>
                    <View style={styles.columnSeparator} />
                    <Text style={styles.scoreHeader}>BEST THROW</Text>
                    <View style={styles.columnSeparator} />
                    <View style={styles.noteHeaderContainer}>
                        <TouchableOpacity onPress={() => setShowNoteModal(true)}>
                            <Text style={styles.noteHeader}>NOTEⓘ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    style={styles.tableBody}
                    showsVerticalScrollIndicator={false}>
                    {athletes.map((athlete, index) => renderRankingRow(athlete, index))}
                    <View style={styles.windInfo}>
                        <Text style={styles.windText}>Disclaimer : </Text>
                        <Text style={styles.windValueText}>The Graphic is for representation purpose only and the results are not to scale .</Text>
                    </View>
                </ScrollView>
            </View>
            {renderNoteModal()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        height: '35%',
        backgroundColor: '#0B803E',
        overflow: 'hidden',
        position: 'relative',
    },
    field: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    markerText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    athleteMarker: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateX: -screenWidth * 0.06 }],
    },
    athleteInfo: {
        alignItems: 'center',
    },
    athleteScore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    athleteIcon: {
        width: screenWidth * 0.04,
        height: screenWidth * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
    },
    athleteIconText: {
        fontSize: 14,
    },
    athleteName: {
        fontSize: 14,
        color: 'white',
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: screenHeight * 0.002,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: screenHeight * 0.015,
        backgroundColor: '#E5EDFF',
        // borderBottomWidth: 1,
        // borderBottomColor: '#e9ecef',
        alignItems: 'center',
    },
    rankHeader: {
        flex: 0.9,
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    athleteHeader: {
        flex: 2.1,
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
        textAlign: 'left',
        paddingLeft: screenWidth * 0.2,
    },
    scoreHeader: {
        flex: 1.3,
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    noteHeaderContainer: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    columnSeparator: {
        width: 0.5,
        backgroundColor: '#A3BFFF',
        height: screenHeight * 0.03,
    },
    tableBody: {
        flex: 1,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: screenHeight * 0.015,
        // borderBottomWidth: 1,
        // borderBottomColor: '#f0f0f0',
    },
    evenRow: {
        backgroundColor: 'white',
    },
    oddRow: {
        backgroundColor: '#E5EDFF',
    },
    rankText: {
        flex: 0.8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    athleteDetails: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: screenWidth * 0.04,
    },
    flagEmoji: {
        fontSize: 14,
        marginRight: screenWidth * 0.02,
    },
    athleteNameText: {
        fontSize: 14,
        color: '#333',
        flexShrink: 1,
    },
    scoreContainer: {
        flex: 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    dropdownIcon: {
        paddingHorizontal: screenWidth * 0.01,
    },
    dropdownText: {
        fontSize: 14,
        color: '#666',
    },
    noteText: {
        flex: 0.8,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontWeight: '600',
    },
    expandedRow: {
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    expandedContent: {
        paddingVertical: screenHeight * 0.01,
        // paddingHorizontal: screenWidth * 0.04,
        // marginLeft: screenWidth * 0.001,
    },
    throwsContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    throwsContent: {
        flex: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingLeft: screenWidth * 0.004,
    },
    throwItem: {
        marginRight: screenWidth * 0.01,
        // marginBottom: screenHeight * 0.005,
    },
    throwText: {
        fontSize: 14,
        color: 'black',
        backgroundColor: 'white',
        paddingVertical: screenWidth * 0.008,
        borderWidth: 1,
        borderColor: '#E5EDFF',
        height: screenHeight * 0.028,
        width: screenWidth * 0.11,
        textAlign: 'center',
    },
    bestThrowText: {
        fontWeight: 'bold',
        color: '#0F368E',
        backgroundColor: 'white',
        // borderRadius: screenWidth * 0.01,
        paddingHorizontal: screenWidth * 0.015,
        paddingVertical: screenHeight * 0.004,
    },
    invalidThrowText: {
        color: '#d32f2f',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: screenWidth * 0.03,
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
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.018,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: screenWidth * 0.075,
        height: screenWidth * 0.075,
        borderRadius: screenWidth * 0.0375,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    modalBody: {
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.012,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: screenHeight * 0.015,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    noteCode: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2196F3',
        width: screenWidth * 0.1,
        textAlign: 'center',
    },
    noteDescription: {
        fontSize: 14,
        color: '#333',
        marginLeft: screenWidth * 0.04,
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
        width: "80%",
        color: '#000',
        // fontWeight: 'bold',
        fontStyle: 'italic'
    },
});

export default Javelin;