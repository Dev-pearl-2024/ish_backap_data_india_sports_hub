import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    GestureHandlerRootView,
    HandlerStateChangeEvent,
    PinchGestureHandler,
    PinchGestureHandlerEventPayload,
    PinchGestureHandlerGestureEvent,
    State,
} from 'react-native-gesture-handler';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import JavelinField from '../../../assets/images/javelinField.svg'
import { ConvertJavelinThrow } from '../../../utils/sportFormatMaker/athletics/javelinThrow';
import dynamicSize from '../../../utils/DynamicSize';

const screenWidth = Dimensions.get('window').width;
const { height: screenHeight } = Dimensions.get('window');

// Type definition

const Javelin = ({ score }) => {
    const [scale, setScale] = useState(1);
    const [lastScale, setLastScale] = useState(1);
    const [expandedRows, setExpandedRows] = useState(
        {},
    );
    const fieldHeight = screenHeight * 0.4;

    const scaledHeight = fieldHeight * scale;

    // Sample athlete data with throws (ranks will be calculated dynamically)
    const athletesData = ConvertJavelinThrow(score);

    // Calculate dynamic ranks based on best throws
    const athletes = athletesData
        .sort((a, b) => b.score - a.score)
        .map((athlete, index) => ({
            ...athlete,
            rank: index + 1,
        }));

    const FIELD_WIDTH = 400;
    const FIELD_HEIGHT = 300;
    const ARC_RADIUS = 100;
    const ARC_SPACING = 100;
    const ARC_TOP = 100;
    const RADIUS_STEP = 30;

    const zones = [
        { minScore: 60, maxScore: 70, minPos: 60, maxPos: 65 },
        { minScore: 70, maxScore: 80, minPos: 65, maxPos: 75 },
        { minScore: 80, maxScore: 90, minPos: 75, maxPos: 90 },
    ];

    const renderCurvedDistanceLines = () => {
        const distances = [60, 70, 80, 90, 100];
        return (
            <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
                style={{ position: 'absolute' }}>
                {distances.map((distance, index) => {
                    const centerX = ARC_SPACING * index + 60;
                    const startX = centerX;
                    const startY = ARC_TOP - ARC_RADIUS;
                    const endX = centerX;
                    const endY = ARC_TOP + ARC_RADIUS;

                    const path = `
            M ${startX},${startY}
            A ${ARC_RADIUS},${ARC_RADIUS} 0 0 1 ${endX},${endY}
          `;

                    return (
                        <React.Fragment key={distance}>
                            <Path d={path} stroke="white" strokeWidth={2} fill="none" />
                            <SvgText
                                x={centerX}
                                y={ARC_TOP + ARC_RADIUS - 180}
                                fill="white"
                                fontSize="12"
                                textAnchor="middle">
                                {distance}m
                            </SvgText>
                        </React.Fragment>
                    );
                })}
            </Svg>
        );
    };

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

    const onPinchGestureEvent = (event) => {
        const newScale = lastScale * event.nativeEvent.scale;
        setScale(Math.min(Math.max(newScale, 0.5), 3));
    };

    const onPinchHandlerStateChange = (
        event
    ) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setLastScale(scale);
        }
    };

    const renderDistanceMarkers = () => {
        const markers = [];
        for (let i = 60; i <= 90; i += 10) {
            markers.push(
                <View
                    key={i}
                    style={[styles.markerContainer, { left: `${((i - 60) / 30) * 100}%` }]}>
                    <Text style={styles.markerText}>{i}m</Text>
                </View>,
            );
        }
        return markers;
    };

    const renderAthleteMarkers = () => {
        const topAthletes = athletes.sort((a, b) => b.score - a.score).slice(0, 5);
        const distances = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];
        const getArcIndex = (score) => {
            for (let i = 0; i < distances.length - 1; i++) {
                if (score >= distances[i] && score < distances[i + 1]) {
                    return i;
                }
            }
            return distances.length - 2;
        };

        return topAthletes.map((athlete, index) => {
            const leftPosition = getPlayerFixedZonePosition(athlete.score);
            const arcIndex = getArcIndex(athlete.score);
            const radius = RADIUS_STEP * (arcIndex + 1);
            const topPosition = FIELD_HEIGHT - radius - 30;
            return (
                <View
                    key={`athlete-${athlete.rank}`}
                    style={[
                        styles.athleteMarker,
                        {
                            left: `${leftPosition - index * 10}%`,
                            top: (topPosition + index * 10),
                            zIndex: 200,
                            width: "10%"
                        },
                    ]}>
                    <View style={styles.athleteInfo}>
                        <Text style={styles.athleteScore}>{athlete.score}</Text>
                        {athlete.flagEmoji && <View style={styles.athleteIcon}>
                            {athlete.flagEmoji && <Text style={styles.athleteIconText}>{athlete.flagEmoji}</Text>}
                        </View>}
                        <Text style={styles.athleteName}>{athlete?.name}</Text>
                    </View>
                    <View style={styles.markerLine} />
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
            // Alternating row colors based on index
            return index % 2 === 0 ? styles.evenRow : styles.oddRow;
        };

        const isExpanded = expandedRows[athlete.rank];

        return (
            <React.Fragment key={athlete.rank}>
                {/* Main athlete row */}
                <View style={[styles.rankRow, getRowStyle()]}>
                    <Text style={styles.rankText}>{athlete.rank}</Text>
                    <View style={styles.athleteDetails}>
                        <Text style={styles.flagEmoji}>{athlete.flagEmoji}</Text>
                        <Text style={styles.athleteNameText}>
                            {athlete.name} ({athlete.country.toLowerCase()})
                        </Text>
                    </View>
                    <Text style={styles.scoreText}>{athlete.score}</Text>
                    <TouchableOpacity
                        style={styles.dropdownIcon}
                        onPress={() => toggleDropdown(athlete.rank)}
                        accessibilityLabel={`Toggle details for ${athlete.name}`}>
                        <Text style={styles.dropdownText}>{isExpanded ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.noteText}>{athlete.note}</Text>
                </View>

                {/* Expanded throws row */}
                {isExpanded && (
                    <View style={styles.expandedRow}>
                        <View style={styles.expandedContent}>
                            <View style={styles.throwsContainer}>
                                {athlete?.throws?.map((throwDistance, index) => (
                                    <View key={`throw-${index}`} style={styles.throwItem}>
                                        <Text
                                            style={[
                                                styles.throwText,
                                                throwDistance === athlete.score && styles.bestThrowText,
                                                throwDistance === null && styles.invalidThrowText,
                                            ]}>
                                            {throwDistance ? `${throwDistance}` : 'X'}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
            </React.Fragment>
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.fieldContainer}>
                    <ScrollView
                        horizontal
                        maximumZoomScale={3}
                        minimumZoomScale={0.5}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}>
                        <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}>
                            <PinchGestureHandler
                                onGestureEvent={onPinchGestureEvent}
                                onHandlerStateChange={onPinchHandlerStateChange}>
                                <View style={{ flex: 1, height: "10%" }}>
                                    <View
                                        style={[
                                            styles.field,
                                            {
                                                transform: [{ scale }],
                                            },
                                        ]}>

                                        <View style={{ flex: 1 }}>
                                            <JavelinField width={dynamicSize(screenWidth * 1.5)} height={dynamicSize(screenHeight * 0.3)} />
                                            {renderAthleteMarkers()}
                                        </View>
                                    </View>
                                </View>
                            </PinchGestureHandler>
                        </ScrollView>
                    </ScrollView>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>RANK</Text>
                        <Text style={[styles.headerText, styles.athleteHeader]}>
                            ATHLETE
                        </Text>
                        <Text style={styles.headerText}>BEST THROW</Text>
                        <Text style={styles.headerText}>NOTE</Text>
                    </View>
                    <ScrollView
                        style={styles.tableBody}
                        showsVerticalScrollIndicator={false}>
                        {athletes.map((athlete, index) => renderRankingRow(athlete, index))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fieldContainer: {
        height: dynamicSize(screenHeight * 0.3),
        backgroundColor: '#2E7D32',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    field: {
        width: screenWidth * 2,
        height: '100%',
        position: 'relative',
    },
    markerContainer: {
        position: 'absolute',
        top: 10,
        transform: [{ translateX: -20 }],
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
        transform: [{ translateX: -25 }],
    },
    athleteInfo: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 4,
        minWidth: 50,
    },
    athleteScore: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    athleteIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    athleteIconText: {
        fontSize: 16,
    },
    athleteName: {
        fontSize: 10,
        color: '#666',
    },
    markerLine: {
        width: 2,
        height: 20,
        backgroundColor: 'white',
        marginTop: 2,
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 2,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#E5EDFF',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    athleteHeader: {
        flex: 2,
        textAlign: 'left',
    },
    tableBody: {
        flex: 1,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    topRankRow: {
        backgroundColor: '#e3f2fd',
    },
    regularRow: {
        backgroundColor: '#E5EDFF',
    },
    // New alternating row styles
    evenRow: {
        backgroundColor: '#F2F5FD',
    },
    oddRow: {
        backgroundColor: '#E5EDFF',
    },
    rankText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    athleteDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    flagEmoji: {
        fontSize: 20,
        marginRight: 8,
    },
    athleteNameText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    scoreText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    dropdownIcon: {
        marginHorizontal: 8,
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    dropdownText: {
        fontSize: 12,
        color: '#666',
    },
    noteText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
        textAlign: 'center',
        fontWeight: '600',
    },
    // New styles for the expanded row
    expandedRow: {
        display: 'flex',
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#e9ecef',
    },
    expandedContent: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    throwsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    throwItem: {
        marginRight: 12,
        marginBottom: 4,
    },
    throwText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    bestThrowText: {
        fontWeight: 'bold',
        color: '#1976d2',
        backgroundColor: '#e3f2fd',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    invalidThrowText: {
        color: '#d32f2f',
        fontWeight: 'bold',
    },
});

export default Javelin;