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
import { ConvertLongJump } from '../../../utils/sportFormatMaker/athletics/longJump';

const { width, height } = Dimensions.get('window');

const LongJumpScreen = ({ score }) => {
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [showNoteModal, setShowNoteModal] = useState(false);
    const athletes = (ConvertLongJump(score));

    const toggleAttempts = (athleteId) => {
        setExpandedRows(prev => {
            const updated = new Set(prev);
            if (updated.has(athleteId)) {
                updated.delete(athleteId);
            } else {
                updated.add(athleteId);
            }
            return updated;
        });
    };

    const getFieldMarkers = () => {
        const topAthletes = athletes
            .sort((a, b) => b.bestJump - a.bestJump)
            .slice(0, 5);

        const minDistance = Math.min(...topAthletes.map(a => a.bestJump));
        const maxDistance = Math.max(...topAthletes.map(a => a.bestJump));
        const range = maxDistance - minDistance;

        return topAthletes.map((athlete, index) => {
            const normalizedPosition =
                range === 0 ? 50 : ((athlete.bestJump - minDistance) / range) * 80 + 8;
            const verticalPosition = (index % 3) * 30 + 4;
            return {
                distance: athlete.bestJump,
                flag: athlete.flag,
                position: normalizedPosition,
                top: verticalPosition,
                athlete: athlete?.name,
            };
        });
    };

    const fieldMarkers = getFieldMarkers();

    const renderFieldView = () => (
        <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader} />
            <View style={styles.fieldWrapper}>
                <View style={styles.field}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <View key={i} style={[styles.gridLine, { left: i * width * 0.16 }]} />
                    ))}

                    {/* Distance markers */}
                    {fieldMarkers.map((marker, index) => (
                        <View
                            key={index}
                            style={[
                                styles.marker,
                                { left: index == 0 ? `${marker.position - 10}%` : `${marker.position}%`, top: `${marker.top}%` },
                            ]}>
                            <Text style={styles.distance}>{marker.distance}</Text>
                            <Text style={styles.athleteLabel}>{marker.athlete}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.rankHeader}>RANK</Text>
            <View style={styles.columnSeparator} />
            <Text style={styles.athleteHeader}>ATHLETE</Text>
            <View style={styles.columnSeparator} />
            <Text style={styles.bestJumpHeader}>BEST JUMP</Text>
            <View style={styles.columnSeparator} />
            <View style={styles.noteHeaderContainer}>
                <TouchableOpacity onPress={() => setShowNoteModal(true)}>
                    <Text style={styles.infoIconText}>NOTEⓘ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

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

    const renderAthleteRow = (athlete, index) => (
        <View key={athlete.id}>
            <View style={[styles.athleteRow, index % 2 === 1 && styles.alternateRow]}>
                <Text style={styles.rank}>{index + 1}</Text>
                <View style={styles.columnSeparator} />

                <View style={styles.athleteInfo}>
                    <View style={styles.athleteDetails}>
                        {/* <Text style={styles.flag}>{athlete.flag}</Text> */}
                        <Text style={styles.athleteName}>
                            {athlete.name} ({athlete.country})
                        </Text>
                    </View>
                </View>
                <View style={styles.columnSeparator} />

                <TouchableOpacity
                    style={styles.bestJumpContainer}
                    onPress={() => toggleAttempts(athlete.id)}>
                    <Text style={styles.bestJump}>{athlete.bestJump}</Text>
                    <Text style={styles.dropdown}>▼</Text>
                </TouchableOpacity>
                <View style={styles.columnSeparator} />

                <Text style={styles.note}>{athlete.note}</Text>
            </View>

            {expandedRows.has(athlete.id) && athlete.attempts.length > 0 && (
                <View
                    style={[styles.attemptsRow, index % 2 === 1 && styles.alternateRow]}>
                    <View style={styles.attemptsContainer}>
                        <View style={styles.attempts}>
                            {athlete.attempts.map((attempt, i) => (
                                <Text key={i} style={styles.attempt}>
                                    {attempt === athlete.bestJump ? (
                                        <Text style={styles.bestAttempt}>{attempt}</Text>
                                    ) : (
                                        attempt
                                    )}
                                </Text>
                            ))}
                            {athlete.attempts.length < 4 && (
                                <Text style={styles.attempt}>X</Text>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );

    const sortedAthletes = [...athletes].sort((a, b) => b.bestJump - a.bestJump);

    return (
        <ScrollView style={styles.container}>
            {renderFieldView()}

            <View style={styles.tableContainer}>
                {renderTableHeader()}
                {sortedAthletes.map((athlete, index) =>
                    renderAthleteRow(athlete, index),
                )}
            </View>
            {/* <View style={styles.windInfo}>
                <Text style={styles.windText}>Wind:</Text>
                <Text style={styles.windValueText}>+1.2 m/s</Text>
            </View> */}

            {renderNoteModal()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        backgroundColor: '#fff',
    },
    fieldHeader: {
        height: height * 0.01, // 1% of screen height
        backgroundColor: '#00C851',
    },
    fieldWrapper: {
        height: height * 0.25, // 25% of screen height
        overflow: 'hidden',
    },
    field: {
        height: height * 0.25,
        backgroundColor: '#D6AF78',
        position: 'relative',
        paddingHorizontal: width * 0.025, // ~10px on 400px width
    },
    gridLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#fff',
    },
    marker: {
        position: 'absolute',
        top: height * 0.0002,
        alignItems: 'center',
        transform: [{ translateX: -(width * 0.0625) }], // ~ -25px
    },
    distance: {
        fontSize:14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: height * 0.002,
    },
    flag: {
        fontSize: width * 0.0375,
    },
    flagContainer: {
        marginBottom: height * 0.002,
    },
    athleteLabel: {
        fontSize: width * 0.025,
        color: '#333',
        marginBottom: height * 0.005,
    },
    tableContainer: {
        backgroundColor: '#F2F5FD',
        borderRadius: width * 0.02,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.005,
        paddingHorizontal: width * 0.0375,
        backgroundColor: '#E5EDFF',
    },
    rankHeader: {
        flex: 0.85,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        lineHeight: width * 0.045,
    },
    athleteHeader: {
        flex: 4.2,
        fontSize: 14,
        paddingHorizontal: width * 0.015,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        lineHeight: width * 0.045,
    },
    bestJumpHeader: {
        flex: 1.5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        lineHeight: width * 0.045,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
    },
    noteHeader: {
        flex: 0.9,
        fontSize: 14,
        paddingHorizontal: width * 0.006,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        paddingVertical: height * 0.001,
        lineHeight: width * 0.08,
    },
    noteHeaderContainer: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.04,
        paddingLeft: width * 0.0025,
        lineHeight: width * 0.045,
    },
    infoIcon: {
        flex: 0.01,
        width: width * 0.04,
        height: width * 0.04,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: width * 0.045,
    },
    infoIconText: {
        color: 'black',
        fontSize: width * 0.03,
        fontWeight: 'bold',
        paddingLeft: width * 0.008,
    },
    athleteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.0375,
        backgroundColor: 'white',
    },
    alternateRow: {
        backgroundColor: '#E5EDFF',
    },
    columnSeparator: {
        width: 0.5,
        backgroundColor: '#A3BFFF',
        height: height * 0.03,
    },
    rank: {
        flex: 0.5,
        fontSize:14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    athleteInfo: {
        flex: 2.75,
    },
    athleteDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: width * 0.075, // ~30px
    },
    athleteName: {
        fontSize: 14,
        color: '#333',
        marginLeft: width * 0.025,
    },
    attemptsRow: {
        paddingHorizontal: width * 0.0375,
        paddingBottom: height * 0.015,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'white',
    },
    attemptsContainer: {
        marginLeft: width * 0.08,
    },
    attempts: {
        flexDirection: 'row',
        gap: 4, // Not yet supported on all RN versions, fallback to marginRight if needed
        marginTop: height * 0.005,
    },
    attempt: {
        fontSize: 14,
        color: 'black',
        backgroundColor: 'white',
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.008,
        borderWidth: 1,
        borderColor: '#E5EDFF',
        height: "100%",
        width: width * 0.12, // Fixed width, e.g., 10% of screen width
        textAlign: 'center',
    },
    bestAttempt: {
        color: '#0F368E',
        fontWeight: 'bold',
    },
    bestJumpContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bestJump: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginRight: width * 0.013,
    },
    dropdown: {
        fontSize: 14,
        color: '#666',
    },
    note: {
        flex: 0.6,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
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
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.018,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize:14,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: width * 0.075,
        height: width * 0.075,
        borderRadius: width * 0.0375,
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
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.012,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.015,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    noteCode: {
        fontSize:14,
        fontWeight: 'bold',
        color: '#2196F3',
        width: width * 0.1,
        textAlign: 'center',
    },
    noteDescription: {
        fontSize:14,
        color: '#333',
        marginLeft: width * 0.04,
        flex: 1,
    },
    windInfo: {
        backgroundColor: 'white',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.025,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    windText: {
        fontSize: width * 0.03,
        color: '#000',
    },
    windValueText: {
        fontSize: width * 0.03,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default LongJumpScreen;