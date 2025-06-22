import React, { useRef, useState } from 'react';
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
import { ConvertLongJump } from '../../../utils/sportFormatMaker/athletics/longJump';

const { width } = Dimensions.get('window');

const LongJumpScreen = ({ score }) => {
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [showNoteModal, setShowNoteModal] = useState(false);

    // Animated values for zoom and pan
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    // For gesture handling
    const lastScale = useRef(1);
    const lastTranslateX = useRef(0);
    const lastTranslateY = useRef(0);
    const initialDistance = useRef(null);

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

    // Dynamic field markers based on athlete scores
    const getFieldMarkers = () => {
        const topAthletes = athletes
            .sort((a, b) => b.bestJump - a.bestJump)
            .slice(0, 5);

        const minDistance = Math.min(...topAthletes.map(a => a.bestJump));
        const maxDistance = Math.max(...topAthletes.map(a => a.bestJump));
        const range = maxDistance - minDistance;

        return topAthletes.map(athlete => {
            const normalizedPosition =
                range === 0 ? 50 : ((athlete.bestJump - minDistance) / range) * 70 + 15;
            return {
                distance: athlete.bestJump,
                flag: athlete.flag,
                position: normalizedPosition,
                athlete: athlete?.name,
            };
        });
    };

    const fieldMarkers = getFieldMarkers();

    // Pan responder for handling gestures
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Set offset values when gesture starts
                scale.setOffset(lastScale.current - 1);
                translateX.setOffset(lastTranslateX.current);
                translateY.setOffset(lastTranslateY.current);
            },
            onPanResponderMove: (evt, gestureState) => {
                // Handle pinch to zoom (using distance between two touches)
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
                    // Handle single touch pan
                    translateX.setValue(gestureState.dx);
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: () => {
                // Flatten offset values
                scale.flattenOffset();
                translateX.flattenOffset();
                translateY.flattenOffset();

                // Store current values
                lastScale.current = (scale)._value + 1;
                lastTranslateX.current = (translateX)._value;
                lastTranslateY.current = (translateY)._value;

                // Reset if zoomed out too much
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

    const renderFieldView = () => (
        <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader} />
            <View style={styles.fieldWrapper}>
                <Animated.View
                    style={[
                        styles.field,
                        {
                            transform: [
                                { translateX: translateX },
                                { translateY: translateY },
                                { scale: Animated.add(scale, 1) },
                            ],
                        },
                    ]}
                    {...panResponder.panHandlers}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <View key={i} style={[styles.gridLine, { left: i * width * 0.16 }]} />
                    ))}

                    {/* Distance markers */}
                    {fieldMarkers.map((marker, index) => (
                        <View
                            key={index}
                            style={[styles.marker, { left: `${marker.position}%` }]}>
                            <Text style={styles.distance}>{marker.distance}</Text>
                            {/* <View style={styles.flagContainer}>
                                <Text style={styles.flag}>{marker.flag}</Text>
                            </View> */}
                            <Text style={styles.athleteLabel}>{marker.athlete}</Text>
                            <View style={styles.pointer} />
                        </View>
                    ))}
                </Animated.View>
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
                <Text style={styles.noteHeader}>NOTE</Text>
                <TouchableOpacity
                    style={styles.infoIcon}
                    onPress={() => setShowNoteModal(true)}>
                    <Text style={styles.infoIconText}>ⓘ</Text>
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
            <View
                style={[
                    styles.athleteRow,
                    index === 0 && styles.firstRow,
                    index % 2 === 1 && styles.alternateRow,
                ]}>
                <Text style={styles.rank}>{athlete.id}</Text>
                <View style={styles.columnSeparator} />

                <View style={styles.athleteInfo}>
                    <View style={styles.athleteDetails}>
                        <Text style={styles.flag}>{athlete.flag}</Text>
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
                    <Text style={styles.dropdown}>⌄</Text>
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

    return (
        <ScrollView style={styles.container}>
            {renderFieldView()}

            <View style={styles.tableContainer}>
                {renderTableHeader()}
                {athletes.map((athlete, index) => renderAthleteRow(athlete, index))}
            </View>

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
        marginBottom: 10,
    },
    fieldHeader: {
        height: 8,
        backgroundColor: '#00C851',
    },
    fieldWrapper: {
        height: 200,
        overflow: 'hidden',
    },
    field: {
        height: 200,
        backgroundColor: '#D4A574',
        position: 'relative',
        paddingHorizontal: 10,
    },
    gridLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#B8956A',
    },
    marker: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        transform: [{ translateX: -25 }],
    },
    distance: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    flagContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    flag: {
        fontSize: 12,
        // paddingHorizontal: 10,
    },
    athleteLabel: {
        fontSize: 10,
        color: '#333',
        marginBottom: 5,
    },
    pointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 12,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#333',
    },
    tableContainer: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        paddingVertical: 12,
        paddingHorizontal: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    rankHeader: {
        flex: 0.5,
        fontSize: 12,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    athleteHeader: {
        flex: 3,
        fontSize: 12,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    bestJumpHeader: {
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 2,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    noteHeader: {
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 2,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    noteHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIcon: {
        marginLeft: 3,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIconText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    athleteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    // firstRow: {
    //   backgroundColor: '#E3F2FD',
    // },
    alternateRow: {
        backgroundColor: '#F8F9FA',
    },
    columnSeparator: {
        width: 1,
        backgroundColor: '#E0E0E0',
        alignSelf: 'stretch',
    },
    rank: {
        flex: 0.5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    athleteInfo: {
        flex: 2.5,
    },
    athleteDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
    },
    athleteName: {
        fontSize: 13,
        color: '#333',
        marginLeft: 10,
    },
    attemptsRow: {
        paddingHorizontal: 15,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    attemptsContainer: {
        marginLeft: '15%', // Align with athlete info column
    },
    attempts: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 5,
    },
    attempt: {
        fontSize: 11,
        color: '#666',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
    },
    bestAttempt: {
        color: '#2196F3',
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
        marginRight: 5,
    },
    dropdown: {
        fontSize: 12,
        color: '#666',
    },
    note: {
        flex: 0.8,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    // Modal styles
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    noteCode: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2196F3',
        width: 40,
        textAlign: 'center',
    },
    noteDescription: {
        fontSize: 14,
        color: '#333',
        marginLeft: 15,
        flex: 1,
    },
});

export default LongJumpScreen;