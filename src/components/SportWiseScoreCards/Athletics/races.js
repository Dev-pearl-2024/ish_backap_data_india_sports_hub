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
import { ConvertRaceData } from '../../../utils/sportFormatMaker/athletics/race';
import COLORS from '../../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

const RaceResultsScreen = ({ score }) => {
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);

    // Animated values for zoom and pan
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    // For gesture handling
    const lastScale = useRef(1);
    const lastTranslateX = useRef(0);
    const lastTranslateY = useRef(0);
    const initialDistance = useRef(null);

    const athletes = ConvertRaceData(score);

    // Sort athletes by time for positioning
    const sortedAthletes = [...athletes].sort((a, b) => {
        const timeA = parseFloat(a?.time?.replace(':', ''));
        const timeB = parseFloat(b?.time?.replace(':', ''));
        return timeA - timeB;
    });

    // Calculate positions for field view (based on finish order)
    const getAthletePosition = (athlete) => {
        const index = sortedAthletes.findIndex(a => a.id === athlete.id);
        const fieldWidth = screenWidth - 40; // Account for margins
        const startPosition = 20; // Left margin
        const finishLinePosition = fieldWidth - 60; // Leave space for times

        // Position athletes based on their finish order
        const maxGap = 80; // Maximum gap between first and last
        const position =
            finishLinePosition - index * (maxGap / (sortedAthletes.length - 1));

        return Math.max(startPosition + 40, position);
    };

    const getLanePosition = (athlete) => {
        // Assign lanes based on original athlete ID
        const laneHeight = 35;
        const startY = 30;
        const laneNumber = (athlete.id - 1) % 8; // 8 lanes
        return startY + laneNumber * laneHeight;
    };

    // PanResponder for handling pinch and pan gestures
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
                if (lastScale.current < 0.5) {
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

    const FieldView = () => (
        <View style={styles.fieldContainer}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <Animated.View
                    style={[
                        styles.track,
                        {
                            transform: [
                                { translateX: translateX },
                                { translateY: translateY },
                                { scale: Animated.add(scale, 1) },
                            ],
                        },
                    ]}
                    {...panResponder.panHandlers}>
                    {/* Track lanes */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <View key={i} style={[styles.lane, { top: 30 + i * 35 }]} />
                    ))}

                    {/* Finish line */}
                    <View style={styles.finishLine} />

                    {/* Athletes positioned dynamically */}
                    {athletes.slice(0, 6).map(athlete => {
                        const xPosition = getAthletePosition(athlete);
                        const yPosition = getLanePosition(athlete);

                        return (
                            <View
                                key={athlete.id}
                                style={[
                                    styles.athleteMarker,
                                    {
                                        left: xPosition,
                                        top: yPosition,
                                    },
                                ]}>
                                <Text style={styles.athleteFlag}>{athlete.flag}</Text>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.athleteTime}>{athlete.time}</Text>
                                    <Text style={styles.athleteLabel}
                                    numberOfLines={2}>{athlete.name}</Text>
                                </View>
                                <View style={styles.pointer} />
                            </View>
                        );
                    })}
                </Animated.View>
            </ScrollView>
        </View>
    );

    const NoteModal = () => {
        return (
            <Modal
                visible={isNoteModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsNoteModalVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalTitleContainer}>
                                <View style={styles.infoIconBlue}>
                                    <Text style={styles.infoIconTextBlue}>ⓘ</Text>
                                </View>
                                <Text style={styles.modalTitle}>Note Definitions</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsNoteModalVisible(false)}
                                style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalContent}>
                            <Text style={styles.noteItem}>PB - Personal Best</Text>
                            <Text style={styles.noteItem}>SB - Season Best</Text>
                            <Text style={styles.noteItem}>X - Foul / Invalid Attempt</Text>
                            <Text style={styles.noteItem}>WR - World Record</Text>
                            <Text style={styles.noteItem}>NR - National Record</Text>
                            <Text style={styles.noteItem}>DQ - Disqualified</Text>
                            <Text style={styles.noteItem}>WL - World Leading</Text>
                            <Text style={styles.noteItem}>DNS - Did Not Start</Text>
                            <Text style={styles.noteItem}>DNF - Did Not Finish</Text>
                            <Text style={styles.noteItem}>NM - No Mark</Text>
                            <Text style={styles.noteItem}>OR - Olympic Record</Text>
                            <Text style={styles.noteItem}>AR - Area Record</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const ResultsTable = () => {
        return (
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.rankColumn]}>RANK</Text>
                    <View style={styles.verticalSeparator} />
                    <Text 
                    numberOfLines={1}
                    style={[styles.headerText, styles.athleteColumn]} 
                    >ATHLETE</Text>
                    <View style={styles.verticalSeparator} />
                    <View style={[styles.timeHeader, styles.timeColumn]}>
                        <Text style={styles.headerText}>TIME</Text>
                        <Text style={styles.subHeaderText}>(H:MM:SS.ms)</Text>
                    </View>
                    <View style={styles.verticalSeparator} />
                    <View style={styles.noteHeaderContainer}>
                        <Text style={[styles.headerText, styles.noteColumn]}>NOTE</Text>
                        <TouchableOpacity
                            onPress={() => setIsNoteModalVisible(true)}
                            style={styles.infoIcon}>
                            <Text style={styles.infoIconText}>ⓘ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.tableBody}>
                    {sortedAthletes.map((athlete, index) => (
                        <View
                            key={athlete.id}
                            style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}>
                            <Text style={[styles.rankText, styles.rankColumn]}>
                                {index + 1}
                            </Text>
                            <View style={styles.verticalSeparator} />
                            <View style={[styles.athleteInfo, styles.athleteColumn]}>
                                <Text style={styles.athleteFlag}>{athlete.flag}</Text>
                                <Text numberOfLines={1} style={styles.athleteName}>
                                    {athlete.name} ({athlete.country})
                                </Text>
                            </View>
                            <View style={styles.verticalSeparator} />
                            <Text style={[styles.timeText, styles.timeColumn]}>
                                {athlete.time}
                            </Text>
                            <View style={styles.verticalSeparator} />
                            <Text style={[styles.noteText, styles.noteColumn]}>
                                {athlete.note}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.windInfo}>
                    <Text style={styles.windText}>Wind: +1.2 m/s</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FieldView />
            <ResultsTable />
            <NoteModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        height: 290,
        backgroundColor: '#4CAF50',
        padding: 10,
    },
    track: {
        flex: 1,
        backgroundColor: '#D2B48C',
        position: 'relative',
        overflow: 'hidden',
    },
    lane: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.6,
    },
    finishLine: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        width: 10,
        backgroundColor: '#8B4513',
    },
    athleteMarker: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 7,
    },
    athleteFlag: {
        fontSize: 20,
    },
    timeContainer: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        // alignItems: 'center',
        minWidth: 50,
    },
    athleteTime: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    athleteLabel: {
        fontSize: 10,
        color: '#666',
    },
    pointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 6,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(255, 255, 255, 0.9)',
        marginTop: 1,
    },
    tableContainer: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    headerText: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    subHeaderText: {
        color: '#666',
        fontSize: 10,
        opacity: 0.8,
        textAlign: 'center',
    },
    timeHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    noteHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
        flex: 1,
    },
    infoIcon: {
        marginRight: 8,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIconText: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: 'bold',
    },
    rankColumn: {
        width: 50,
        textAlign: 'center',
    },
    athleteColumn: {
        flex: 2,
        paddingLeft: 20,
    },
    timeColumn: {
        width: 100,
        textAlign: 'center',
    },
    noteColumn: {
        width: 80,
        textAlign: 'center',
    },
    verticalSeparator: {
        width: 1,
        backgroundColor: '#E0E0E0',
        alignSelf: 'stretch',
    },
    tableBody: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    alternateRow: {
        backgroundColor: '#f8f8f8',
    },
    rankText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    athleteInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    athleteName: {
        maxWidth:"70%",
        fontSize: 12,
        color: '#333',
        marginLeft: 8,
        flex: 1,
    },
    timeText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    noteText: {
        fontSize: 12,
        color: '#666',
        paddingRight: 5,
    },
    windInfo: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: 'flex-end',
    },
    windText: {
        fontSize: 12,
        color: '#666',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '80%',
        maxHeight: '70%',
        // overflow: 'hidden',
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
    modalTitleContainer: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    infoIconBlue: {
        width: 20,
        height: 20,
        borderRadius: 10,
        // backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    infoIconTextBlue: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
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
    modalContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        color:COLORS.black,
        fontSize: 14,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
});

export default RaceResultsScreen;