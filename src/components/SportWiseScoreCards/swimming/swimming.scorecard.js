import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Swimming from '../../../assets/images/Swimming.svg';
import { SwimmingFormat } from '../../../utils/sportFormatMaker/swimming/swimming';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwimmingResultsScreen = ({ score }) => {
    // State for modal visibility
    const [showNoteModal, setShowNoteModal] = useState(false);

    const swimmers = SwimmingFormat(score)

    // Sort swimmers by time (fastest first)
    const sortedSwimmers = [...swimmers].sort(
        (a, b) => a.timeInSeconds - b.timeInSeconds,
    );

    // Calculate dynamic positions for pool visualization with stair effect
    const getSwimmerPosition = (index, total) => {
        const stepSize = screenWidth / (total + 2); // Distribute across width with space
        const leftOffset = screenWidth - (index + 2) * stepSize; // Right to left stair
        const topOffset = index * 55; // Vertical step for stair effect
        return { left: leftOffset, top: topOffset };
    };

    const PoolVisualization = () => {
        // Get top 5 swimmers for pool display
        const topSwimmers = sortedSwimmers.slice(0, 5);
        return (
            <View style={styles.poolContainer}>
                <Swimming width={'100%'} height={screenHeight * 0.35} />
                <View style={styles.markerOverlay}>
                    {topSwimmers.map((swimmer, index) => {
                        const { left, top } = getSwimmerPosition(index, topSwimmers.length);

                        return (
                            <View key={swimmer.id} style={[styles.laneContainer, { top: top, marginTop: "10%" }]}>
                                {/* Swimmer marker */}
                                <View style={[styles.markerContainer, { left: left }]}>
                                    <View style={[styles.marker]}>
                                        <Text style={styles.markerTime}>{swimmer.time}</Text>
                                        <Image source={{ uri: swimmer?.flag }} style={{ height: 25, width: 25, borderRadius: 30 }} />
                                        <Text style={styles.markerName}>{swimmer.name || '-'}</Text>
                                    </View>
                                    {/* <View style={styles.markerLine} /> */}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    const renderNoteModal = () => (
        <Modal
            visible={showNoteModal}
            transparent={true}
            // animationType="fade"
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
                {/* Table Header */}
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
                        <TouchableOpacity onPress={() => setShowNoteModal(true)}>
                            <Text style={[styles.headerText, styles.noteHeader]}>NOTEⓘ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Table Rows */}
                <ScrollView style={styles.tableScrollView}>
                    {sortedSwimmers.map((swimmer, index) => (
                        <View
                            key={swimmer.id}
                            style={[
                                styles.tableRow,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow,
                            ]}>
                            <Text style={[styles.rankText, styles.rankColumn]}>
                                {index + 1}
                            </Text>
                            <View style={styles.separator} />
                            <View style={[styles.athleteCell, styles.athleteColumn]}>
                                <Image source={{ uri: swimmer?.flag }} style={{ height: 25, width: 25, borderRadius: 30 }} />
                                <View style={styles.athleteInfo}>
                                    <Text style={styles.athleteName} numberOfLines={2}>
                                        {swimmer.name} ({swimmer.country})
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <Text style={[styles.timeText, styles.timeColumn]}>
                                {swimmer.time}
                            </Text>
                            <View style={styles.separator} />
                            <Text style={[styles.noteText, styles.noteColumn]}>
                                {swimmer.note || '-'}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Pool Visualization */}
            <PoolVisualization />

            {/* Results Table */}
            <ResultsTable />

            {/* Note Definitions Modal */}
            {renderNoteModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    poolContainer: {
        height: screenHeight * 0.35, // ~40% of screen height
        backgroundColor: '#1759B9',
        overflow: 'hidden',
        position: 'relative',
    },
    poolView: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#bbdefb',
    },
    laneContainer: {
        height: '15%', // approx percentage height assuming 5-6 lanes
        marginBottom: '0.8%',
        position: 'absolute',
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
        width: 30, // Fixed width for red segment at the end
        backgroundColor: '#ff0000',
    },
    markerContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 0, // Adjusted to align with top of laneContainer
    },
    marker: {
        alignItems: 'center',
        // padding: '2%', // Increased padding for better spacing
        borderRadius: 6,
        minWidth: 60, // Minimum width to accommodate longer names
    },
    markerFlag: {
        fontSize: 18,
        marginVertical: '1%',
    },
    markerTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    markerName: {
        fontSize: 12,
        color: 'black',
    },
    // markerLine: {
    //   width: 0,
    //   height: 0,
    //   borderLeftWidth: 4,
    //   borderRightWidth: 4,
    //   borderTopWidth: 6,
    //   borderStyle: 'solid',
    //   backgroundColor: 'transparent',
    //   borderLeftColor: 'transparent',
    //   borderRightColor: 'transparent',
    //   borderTopColor: 'black',
    //   marginTop: 2,
    // },
    markerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // Ensures markers are above the SVG
    },

    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        // paddingVertical: '1%',
        backgroundColor: '#E5EDFF',
        alignItems: 'flex-start',
        minHeight: 30,
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    rankHeader: {
        flex: 0.8,
        paddingTop: 8,
    },
    athleteHeader: {
        flex: 3.4,
        paddingTop: 8,
    },
    timeHeader: {
        textAlign: 'center',
    },
    timeHeaderContainer: {
        flex: 1.15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 8,
    },
    timeSubHeader: {
        fontSize: 10,
        color: '#000',
        textAlign: 'center',
        marginTop: 0.5,
    },
    noteHeader: {
        flex: 0.6,
    },
    noteHeaderContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    infoIcon: {
        // marginLeft: '1%',
        // marginBottom: '1%',
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
    tableRow: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        // borderBottomWidth: 1,
        // borderBottomColor: '#A3BFFF',
        alignItems: 'center',
    },
    evenRow: {
        backgroundColor: 'white',
    },
    oddRow: {
        backgroundColor: '#E5EDFF',
    },
    rankColumn: {
        flex: 0.85,
    },
    athleteColumn: {
        flex: 3.4,
    },
    timeColumn: {
        flex: 1.2,
    },
    noteColumn: {
        flex: 0.7,
    },
    rankText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    athleteCell: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    athleteInfo: {
        width: "94%",
        marginLeft: '2%',
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

export default SwimmingResultsScreen;