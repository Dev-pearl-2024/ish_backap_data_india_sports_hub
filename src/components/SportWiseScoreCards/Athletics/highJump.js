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
import HighJumpField from '../../../assets/images/HighJumpField.svg';
import { ConvertHighJump } from '../../../utils/sportFormatMaker/athletics/highJump';
import { ConvertPoleVault } from '../../../utils/sportFormatMaker/athletics/poleVault';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HighJumpScreen = ({ score, category }) => {
    const [expandedAthletes, setExpandedAthletes] = useState(
        new Set([1]),
    );
    const [showNoteModal, setShowNoteModal] = useState(false);
    const athletes = category == 'High Jump' ? ConvertHighJump(score) : ConvertPoleVault(score)

    const getTopPerformers = () => {
        const sortedAthletes = [...athletes]
            .sort((a, b) => b.bestJump - a.bestJump)
            .slice(0, 4);

        return sortedAthletes.map((athlete, index) => ({
            height: athlete?.bestJump?.toFixed(2),
            country: athlete?.country,
            flag: athlete?.flag,
            note: athlete?.name,
            position: 5 + index * 15, // Base vertical position
            offset: index % 2 === 0 ? -screenWidth * 0.1 : screenWidth * 0.1, // Zigzag offset
        }));
    };

    const fieldMarkers = getTopPerformers();

    const toggleAthleteExpansion = (athleteId) => {
        const newExpanded = new Set(expandedAthletes);
        if (newExpanded.has(athleteId)) {
            newExpanded.delete(athleteId);
        } else {
            newExpanded.add(athleteId);
        }
        setExpandedAthletes(newExpanded);
    };

    const renderAttemptResult = (attempt) => {
        const getResultSymbol = () => {
            switch (attempt.result) {
                case 'success':
                    return '✓';
                case 'fail':
                    return '✗';
                case 'pass':
                    return '-';
                case 'empty':
                    return '-';
                default:
                    return '-';
            }
        };

        const getResultColor = () => {
            switch (attempt.result) {
                case 'success':
                    return '#4CAF50';
                case 'fail':
                    return '#F44336';
                default:
                    return '#757575';
            }
        };

        const getBackgroundColor = () => {
            switch (attempt.result) {
                case 'success':
                // return '#E8F5E8';
                case 'fail':
                // return '#FFEBEE';
                default:
                    return 'transparent';
            }
        };
        /* close-square */

        return (
            <View
                style={[styles.attemptCell, { backgroundColor: getBackgroundColor() }]}>
                <Text style={[styles.attemptText, { color: getResultColor() }]}>
                    {getResultSymbol()}
                </Text>
            </View>
        );
    };

    const renderAttemptDetails = (athlete) => {
        const heights = athlete?.heights?.filter((it) => it != "");
        return (
            <ScrollView horizontal={true} style={styles.attemptScroll}>
                <View style={styles.detailsContainer}>
                    <View style={styles.horizontalSeprator} />
                    <View style={styles.detailsHeader}>
                        <Text style={[styles.detailsHeaderText, styles.fixedLabelColumn]}>
                            Height
                        </Text>
                        {heights?.map(height => (
                            <Text
                                key={height}
                                style={[
                                    styles.detailsHeaderText,
                                    styles.fixedColumn,
                                    { backgroundColor: getHeightColor(heights.indexOf(height)) },
                                ]}>
                                {height}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.horizontalSeprator} />
                    {['Attempt 1', 'Attempt 2', 'Attempt 3'].map(
                        (attemptName, attemptIndex) => (
                            <View key={attemptName} style={styles.attemptRow}>
                                <Text style={[styles.attemptLabel, styles.fixedLabelColumn]}>
                                    {attemptName}
                                </Text>
                                {heights.map((height, heightIndex) => {
                                    const attempt = athlete.attempts[heightIndex];
                                    const attemptData =
                                        attemptIndex === 0
                                            ? attempt
                                            : attemptIndex === 1
                                                ? ({
                                                    ...attempt,
                                                    result:
                                                        attempt?.result === 'success'
                                                            ? 'empty'
                                                            : attempt?.result,
                                                })
                                                : ({ ...attempt, result: 'empty' });
                                    return (
                                        <View
                                            key={height}
                                            style={[
                                                styles.fixedColumn,
                                                { backgroundColor: getHeightColor(heightIndex) },
                                            ]}>
                                            {attemptData ? (
                                                renderAttemptResult(attemptData)
                                            ) : (
                                                <View style={styles.attemptCell}>
                                                    <Text style={styles.attemptText}>-</Text>
                                                </View>)
                                            }
                                            <View style={styles.horizontalSeprator} />
                                        </View>
                                    );
                                })}
                            </View>
                        ),
                    )}
                </View>
            </ScrollView>
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
                            <Text style={styles.noteDescription}>Pass/No Mark</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    const getHeightColor = (index) => {
        return index % 2 === 0 ? '#E5EDFF' : '#FFFFFF';
    };

    return (
        <ScrollView style={styles.container}>
            {/* Field View */}
            <View style={styles.fieldContainer}>
                <View style={styles.fieldView}>
                    <HighJumpField width={screenWidth} height={screenHeight} />
                    {fieldMarkers.map((marker, index) => (
                        <View
                            key={index}
                            style={[
                                styles.markerContainer,
                                {
                                    top: `${marker.position}%`,
                                    left: `${50 + (marker.offset / screenWidth) * 100}%`,
                                    transform: [{ translateX: -screenWidth * 0.05 }],
                                },
                                styles.centerMarker,
                            ]}>
                            <View style={styles.marker}>
                                <Text style={styles.markerHeight}>{marker.height}</Text>
                                <Text style={styles.markerNote} numberOfLines={2}>{marker.note}</Text>
                            </View>
                            {/* <View style={styles.markerLine} /> */}
                        </View>
                    ))}
                </View>
            </View>

            {/* Results Table */}
            <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.rankHeader]}>RANK</Text>
                    <View style={styles.separator} />
                    <Text style={[styles.headerText, styles.athleteHeader]}>ATHLETE</Text>
                    <View style={styles.separator} />

                    <Text style={[styles.headerText, styles.bestJumpHeader]}>
                        BEST JUMP
                    </Text>
                    <View style={styles.separator} />
                    <View style={[styles.noteHeaderContainer, styles.noteHeader]}>
                        <Text style={[styles.headerText, styles.noteHeaderText]}>NOTE</Text>
                        <TouchableOpacity
                            style={styles.infoIcon}
                            onPress={() => setShowNoteModal(true)}>
                            <Text style={styles.infoIconText}>ⓘ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Athletes List */}
                {athletes.map((athlete, index) => (
                    <View key={athlete.id}>
                        <TouchableOpacity
                            style={[
                                styles.athleteRow,
                                index === 0 && styles.firstRow,
                                expandedAthletes.has(athlete.id) && styles.expandedRow,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow,
                            ]}
                            onPress={() => toggleAthleteExpansion(athlete.id)}>
                            <Text style={[styles.rankText, styles.rankColumn]}>
                                {index + 1}
                            </Text>
                            <View style={styles.separator} />

                            <View style={[styles.athleteInfo, styles.athleteColumn]}>
                                <Text style={styles.flagText}>{athlete.flag}</Text>
                                <Text style={styles.athleteName}>{athlete.name}</Text>
                            </View>
                            <View style={styles.separator} />

                            <View style={[styles.jumpContainer, styles.jumpColumn]}>
                                <Text style={styles.jumpText}>
                                    {athlete.bestJump.toFixed(2)}
                                </Text>
                                <View style={styles.separator} />

                                <Text
                                    style={[
                                        styles.jumpArrow,
                                        expandedAthletes.has(athlete.id)
                                            ? styles.arrowRotated
                                            : styles.arrowNormal,
                                    ]}>
                                    ▼
                                </Text>
                            </View>
                            <View style={styles.separator} />

                            <Text style={[styles.noteText, styles.noteColumn]}>
                                {athlete.note}
                            </Text>
                        </TouchableOpacity>

                        {/* Detailed attempts view for each athlete when expanded */}
                        {expandedAthletes.has(athlete.id) && renderAttemptDetails(athlete)}
                    </View>
                ))}
            </View>

            {renderNoteModal()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fieldContainer: {
        height: screenHeight * 0.3, // 30% of screen height
        backgroundColor: '#E5EDFF',
        overflow: 'hidden',
    },
    fieldView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#bbdefb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    centerMarker: {
        transform: [{ translateX: -screenWidth * 0.05 }],
    },
    marker: {
        width: "60%",
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.01,
        paddingVertical: screenHeight * 0.005,
        borderRadius: screenWidth * 0.01,
    },
    markerHeight: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    markerFlag: {
        fontSize: 14,
        marginVertical: screenHeight * 0.002,
    },
    markerNote: {
        fontSize: 12,
        color: '#666',
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: '#A3BFFF',
        alignSelf: 'center',
    },
    tableContainer: {
        flex: 1,
        backgroundColor: '#F8FAFE',
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: screenHeight * 0.012,
        paddingHorizontal: screenWidth * 0.04,
        backgroundColor: '#E5EDFF',
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    rankHeader: {
        flex: 0.8,
    },
    athleteHeader: {
        flex: 3,
    },
    bestJumpHeader: {
        flex: 1.2,
    },
    noteHeader: {
        flex: 0.9,
    },
    noteHeaderContainer: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteHeaderText: {
        flex: 0.9,
        textAlign: 'center',
    },
    infoIcon: {
        width: screenWidth * 0.04,
        height: screenWidth * 0.04,
        borderRadius: screenWidth * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIconText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    athleteRow: {
        flexDirection: 'row',
        paddingVertical: screenHeight * 0.015,
        paddingHorizontal: screenWidth * 0.04,
        alignItems: 'center',
    },
    firstRow: {
        backgroundColor: '#f8f9fa',
    },
    expandedRow: {
        backgroundColor: '#f8f9fa',
    },
    evenRow: {
        backgroundColor: 'white',
    },
    oddRow: {
        backgroundColor: '#E5EDFF',
    },
    rankColumn: {
        flex: 0.8,
    },
    athleteColumn: {
        flex: 3,
    },
    jumpColumn: {
        flex: 1.2,
    },
    noteColumn: {
        flex: 0.9,
    },
    rankText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    athleteInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagText: {
        fontSize: 14,
        marginRight: screenWidth * 0.01,
        marginLeft: screenWidth * 0.02,
    },
    athleteName: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    jumpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jumpText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    jumpArrow: {
        fontSize: 14,
        color: '#666',
        marginLeft: screenWidth * 0.01,
    },
    arrowNormal: {
        transform: [{ rotate: '0deg' }],
    },
    arrowRotated: {
        transform: [{ rotate: '180deg' }],
    },
    noteText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    detailsContainer: {
        backgroundColor: 'white',
        marginBottom: screenHeight * 0.008,
        marginLeft: screenWidth * 0.1,
    },
    detailsHeader: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: screenHeight * 0.035,
    },
    headerScroll: {
        flexDirection: 'row',
    },
    detailsHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        paddingTop: screenHeight * 0.01,
    },
    attemptRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attemptScroll: {
        flexDirection: 'row',
    },
    attemptLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        paddingVertical: screenHeight * 0.005,
        borderBottomWidth: 0.5,
        borderBottomColor: '#A3BFFF',
    },
    attemptCell: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: screenHeight * 0.005,
    },
    attemptText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    fixedLabelColumn: {
        width: screenWidth * 0.14,
        flex: 0,
    },
    fixedColumn: {
        width: screenWidth * 0.1,
        flex: 0,
    },
    flexOne: {
        flex: 1,
    },
    horizontalSeprator: {
        height: 0.5,
        backgroundColor: '#A3BFFF',
        width: '100%',
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
        marginLeft: screenWidth * 0.038,
        flex: 1,
    },
});

export default HighJumpScreen;