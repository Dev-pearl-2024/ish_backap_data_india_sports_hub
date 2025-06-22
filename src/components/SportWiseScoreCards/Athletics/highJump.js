import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ConvertHighJump } from '../../../utils/sportFormatMaker/athletics/highJump';
import { ConvertPoleVault } from '../../../utils/sportFormatMaker/athletics/poleVault';

const { width } = Dimensions.get('window');

const HighJumpScreen = ({ score, category }) => {
    const [expandedAthletes, setExpandedAthletes] = useState(
        new Set([1]),
    );

    // Animated values for zoom and pan
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    // For gesture handling
    const lastScale = useRef(1);
    const lastTranslateX = useRef(0);
    const lastTranslateY = useRef(0);
    const initialDistance = useRef(null);

    // Sample data with realistic attempt histories
    const athletes = category == 'High Jump' ? ConvertHighJump(score) : ConvertPoleVault(score)

    const getTopPerformers = () => {
        const sortedAthletes = [...athletes]
            .sort((a, b) => b.bestJump - a.bestJump)
            .slice(0, 4);

        return sortedAthletes.map((athlete, index) => ({
            height: athlete?.bestJump?.toFixed(2),
            country: athlete?.country,
            flag: athlete?.flag,
            note: athlete?.name || '--',
            position: 20 + index * 15, // Distribute vertically from top to bottom
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

    // PanResponder for handling zoom and pan gestures
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
                    return '#E8F5E8';
                case 'fail':
                    return '#FFEBEE';
                default:
                    return 'transparent';
            }
        };

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
        const heights = athlete?.heights;
        return (
            <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <Text style={[styles.detailsHeaderText, styles.flexOne]}>Height</Text>
                    {heights.map(height => (
                        <Text
                            key={height}
                            style={[styles.detailsHeaderText, styles.flexOne]}>
                            {height}
                        </Text>
                    ))}
                </View>

                {['Attempt 1', 'Attempt 2', 'Attempt 3'].map(
                    (attemptName, attemptIndex) => (
                        <View key={attemptName} style={styles.attemptRow}>
                            <Text style={[styles.attemptLabel, styles.flexOne]}>
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
                                    <View key={height} style={styles.flexOne}>
                                        {attemptData ? (
                                            renderAttemptResult(attemptData)
                                        ) : (
                                            <View style={styles.attemptCell}>
                                                <Text style={styles.attemptText}>-</Text>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ),
                )}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Field View with Zoom and Pan */}
            <View style={styles.fieldContainer}>
                <Animated.View
                    style={[
                        styles.fieldView,
                        {
                            transform: [
                                { translateX: translateX },
                                { translateY: translateY },
                                { scale: Animated.add(scale, 1) },
                            ],
                        },
                    ]}
                    {...panResponder.panHandlers}>
                    {/* Vertical posts */}
                    <View style={[styles.post, styles.leftPost]} />
                    <View style={[styles.post, styles.rightPost]} />

                    {/* Horizontal bar */}
                    <View style={styles.horizontalBar} />

                    {/* Dynamic jump markers based on top performers */}
                    {fieldMarkers.map((marker, index) => (
                        <View
                            key={index}
                            style={[
                                styles.markerContainer,
                                { top: `${marker.position}%` },
                                styles.centerMarker,
                            ]}>
                            <View style={styles.marker}>
                                <Text style={styles.markerFlag}>{marker.flag}</Text>
                                <Text style={styles.markerHeight}>{marker.height}</Text>
                                <Text style={styles.markerNote}>{marker.note}</Text>
                            </View>
                            <View style={styles.markerLine} />
                        </View>
                    ))}
                </Animated.View>
            </View>

            {/* Results Table */}
            <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.rankHeader]}>RANK</Text>
                    <Text style={[styles.headerText, styles.athleteHeader]}>ATHLETE</Text>
                    <Text style={[styles.headerText, styles.bestJumpHeader]}>
                        BEST JUMP
                    </Text>
                    <Text style={[styles.headerText, styles.noteHeader]}>NOTE</Text>
                </View>

                {/* Athletes List */}
                {athletes.map((athlete, index) => (
                    <View key={athlete.id}>
                        <TouchableOpacity
                            style={[
                                styles.athleteRow,
                                index === 0 && styles.firstRow,
                                expandedAthletes.has(athlete.id) && styles.expandedRow,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow, // Alternating colors
                            ]}
                            onPress={() => toggleAthleteExpansion(athlete.id)}>
                            <Text style={[styles.rankText, styles.rankColumn]}>
                                {index + 1}
                            </Text>
                            <View style={[styles.athleteInfo, styles.athleteColumn]}>
                                <Text style={styles.flagText}>{athlete.flag}</Text>
                                <Text style={styles.athleteName}>{athlete.name}</Text>
                            </View>
                            <View style={[styles.jumpContainer, styles.jumpColumn]}>
                                <Text style={styles.jumpText}>
                                    {athlete?.bestJump?.toFixed(2)}
                                </Text>
                                <Text
                                    style={[
                                        styles.jumpArrow,
                                        expandedAthletes?.has(athlete.id)
                                            ? styles.arrowRotated
                                            : styles.arrowNormal,
                                    ]}>
                                    ▼
                                </Text>
                            </View>
                            <Text style={[styles.noteText, styles.noteColumn]}>
                                {athlete.note}
                            </Text>
                        </TouchableOpacity>

                        {/* Detailed attempts view for each athlete when expanded */}
                        {expandedAthletes.has(athlete.id) && renderAttemptDetails(athlete)}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    fieldContainer: {
        height: 250,
        backgroundColor: '#e3f2fd',
        overflow: 'hidden', // Ensure zoomed content doesn't overflow
    },
    fieldView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#bbdefb',
        alignItems: 'center', // Center content for better zooming
        justifyContent: 'center',
    },
    post: {
        position: 'absolute',
        width: 5,
        height: '80%',
        backgroundColor: '#666',
        top: '10%',
    },
    leftPost: {
        left: 20,
    },
    rightPost: {
        right: 20,
    },
    horizontalBar: {
        position: 'absolute',
        height: 5,
        backgroundColor: '#ffc107',
        left: 20,
        right: 20,
        top: '80%',
        marginTop: -1.5,
    },
    markerContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    centerMarker: {
        left: '50%',
    },
    marker: {
        alignItems: 'center',
        padding: 4,
        borderRadius: 4,
    },
    markerHeight: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    markerFlag: {
        fontSize: 16,
        marginVertical: 2,
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
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#E8E8E8',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    rankHeader: {
        flex: 0.8,
    },
    athleteHeader: {
        flex: 3,
    },
    bestJumpHeader: {
        flex: 1.5,
    },
    noteHeader: {
        flex: 1,
    },
    athleteRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    expandedRow: {
        backgroundColor: '#f8f9fa',
    },
    evenRow: {
        backgroundColor: '#ffffff',
    },
    oddRow: {
        backgroundColor: '#f5f5f5',
    },
    rankColumn: {
        flex: 0.8,
    },
    athleteColumn: {
        flex: 3,
    },
    jumpColumn: {
        flex: 1.5,
    },
    noteColumn: {
        flex: 1,
    },
    rankText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    athleteInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagText: {
        fontSize: 20,
        marginRight: 8,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    jumpArrow: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
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
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    detailsHeader: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#e3f2fd',
    },
    detailsHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    attemptRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    attemptLabel: {
        fontSize: 12,
        color: '#666',
    },
    attemptCell: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        borderRadius: 2,
        marginHorizontal: 2,
    },
    attemptText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    flexOne: {
        flex: 1,
    },
});

export default HighJumpScreen;