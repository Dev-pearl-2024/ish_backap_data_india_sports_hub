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
import { ConvertRaceData } from '../../../utils/sportFormatMaker/athletics/race';

const { width, height } = Dimensions.get('window');

const RaceResultsScreen = ({ score }) => {
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
    const athletes = ConvertRaceData(score);
    // Sort athletes by time for positioning
    const sortedAthletes = athletes

    const getAthletePosition = (athlete) => {
        const index = sortedAthletes.findIndex(a => a.id === athlete.id);
        const fieldWidth = width + 25;
        const fieldHeight = 500; // Available field height
        const startPosition = -40;
        const finishLinePosition = fieldWidth + 25;

        // X position based on race time (current logic)
        const maxGap = 850;
        const xPosition =
            finishLinePosition - index * (maxGap / (sortedAthletes.length - 1));

        // Y position scattered across field height
        const minY = -40;
        const maxY = fieldHeight + 70;
        const yPosition = minY + ((index * 40) % (maxY - minY)); // Stagger vertically

        return {
            x: Math.max(startPosition + 40, xPosition),
            y: yPosition,
        };
    };

    const FieldView = () => (
        <View style={styles.fieldContainer}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.track}>
                    {/* Track lanes */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <View key={i} style={[styles.lane, { top: 30 + i * 35 }]} />
                    ))}

                    {/* Finish line */}
                    <View style={styles.finishLine} />

                    {/* Athletes positioned dynamically */}
                    {athletes.slice(0, 5).map(athlete => {
                        const position = getAthletePosition(athlete);

                        return (
                            <View
                                key={athlete.id}
                                style={[
                                    styles.athleteMarker,
                                    {
                                        left: position.x,
                                        top: position.y,
                                    },
                                ]}>
                                <Text style={styles.athleteTime}>{athlete.time}</Text>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.athleteFlag}>{athlete.flag}</Text>

                                    <Text style={styles.athleteLabel}>{athlete.name}</Text>
                                </View>
                                {/* <View style={styles.pointer} /> */}
                            </View>
                        );
                    })}
                </View>
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
                    <View style={styles.rankHeaderContainer}>
                        <Text style={[styles.headerText, styles.rankHeaderText]}>RANK</Text>
                    </View>
                    <View style={styles.verticalSeparator} />
                    <View style={styles.athleteHeaderContainer}>
                        <Text style={[styles.headerText, styles.athleteHeaderText]}>
                            ATHLETE
                        </Text>
                    </View>
                    <View style={styles.verticalSeparator} />
                    <View style={styles.timeHeaderContainer}>
                        <Text style={[styles.headerText, styles.timeHeaderText]}>TIME</Text>
                        <Text style={styles.subHeaderText}>(H:MM:SS.ms)</Text>
                    </View>
                    <View style={styles.verticalSeparator} />
                    <View style={styles.noteHeaderContainer}>
                        <Text style={[styles.headerText, styles.noteHeaderText]}>NOTE</Text>
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
                            <View style={styles.rankCellContainer}>
                                <Text style={[styles.rankText, styles.rankCellText]}>
                                    {index + 1}
                                </Text>
                            </View>
                            <View style={styles.verticalSeparator} />
                            <View style={styles.athleteCellContainer}>
                                <View style={styles.athleteInfo}>
                                    <Text style={styles.athleteFlag}>{athlete.flag}</Text>
                                    <Text style={[styles.athleteName, styles.athleteCellText]}>
                                        {athlete.name} ({athlete.country})
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.verticalSeparator} />
                            <View style={styles.timeCellContainer}>
                                <Text style={[styles.timeText, styles.timeCellText]}>
                                    {athlete.time}
                                </Text>
                            </View>
                            <View style={styles.verticalSeparator} />
                            <View style={styles.noteCellContainer}>
                                <Text style={[styles.noteText, styles.noteCellText]}>
                                    {athlete.note}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {/* <View style={styles.windInfo}>
                        <Text style={styles.windText}>Wind:</Text>
                        <Text style={styles.windValueText}>+1.2 m/s</Text>
                    </View> */}
                </ScrollView>
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
        height: height * 0.34,
        backgroundColor: '#4CAF50',
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
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
        right: width * 0.04,
        top: 0,
        bottom: 0,
        width: width * 0.025,
        backgroundColor: '#8B4513',
    },
    athleteMarker: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 7,
    },
    athleteFlag: {
        fontSize: width * 0.05,
    },
    timeContainer: {
        paddingHorizontal: width * 0.015,
        paddingVertical: height * 0.003,
        borderRadius: 4,
        alignItems: 'center',
        minWidth: width * 0.2,
    },
    athleteTime: {
        fontSize: width * 0.03,
        fontWeight: 'bold',
        color: '#333',
    },
    athleteLabel: {
        fontSize: width * 0.025,
        color: '#000',
    },
    tableContainer: {
        flex: 1,
        backgroundColor: '#F2F5FD',
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E5EDFF',
        paddingVertical: height * 0.0001,
        alignItems: 'center',
    },
    // Header Container Styles
    rankHeaderContainer: {
        width: width * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.008,
    },
    athleteHeaderContainer: {
        flex: 2.2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.008,
    },
    timeHeaderContainer: {
        width: width * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.008,
    },
    noteHeaderContainer: {
        width: width * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.008,
    },

    // Header Text Styles
    rankHeaderText: {
        color: 'black',
        fontWeight: '700',
    },
    athleteHeaderText: {
        color: 'black',
        fontWeight: '700',
    },
    timeHeaderText: {
        color: 'black',
        fontWeight: '700',
    },
    noteHeaderText: {
        color: 'black',
        fontWeight: '700',
    },

    // Cell Container Styles
    rankCellContainer: {
        width: width * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.003,
    },
    athleteCellContainer: {
        flex: 2.2,
        justifyContent: 'center',
        paddingLeft: width * 0.02,
        paddingVertical: height * 0.003,
    },
    timeCellContainer: {
        width: width * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.003,
    },
    noteCellContainer: {
        width: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.003,
    },

    // Cell Text Styles
    rankCellText: {
        textAlign: 'center',
        // color: '#0F',
    },
    athleteCellText: {
        // color: '#055160',
    },
    timeCellText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    noteCellText: {
        textAlign: 'center',
        // color: '#664D03',
        fontWeight: '500',
    },
    headerText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: width * 0.03,
        textAlign: 'center',
        paddingHorizontal: width * 0.025,
    },
    subHeaderText: {
        color: '#000',
        fontSize: width * 0.025,
        opacity: 0.8,
        textAlign: 'center',
    },
    timeHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.025,
    },
    infoIcon: {
        marginRight: width * 0.02,
        width: width * 0.04,
        height: width * 0.04,
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIconText: {
        color: 'black',
        fontSize: width * 0.037,
        fontWeight: 'bold',
    },
    rankColumn: {
        width: width * 0.13,
        textAlign: 'center',
    },
    athleteColumn: {
        flex: 2,
        paddingLeft: width * 0.05,
    },
    timeColumn: {
        width: width * 0.25,
        textAlign: 'center',
    },
    verticalSeparator: {
        width: 0.5,
        backgroundColor: '#A3BFFF',
        alignSelf: 'stretch',
    },
    tableBody: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: height * 0.012,
        paddingHorizontal: 0,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    alternateRow: {
        backgroundColor: '#E5EDFF',
    },
    rankText: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#000',
    },
    athleteInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    athleteName: {
        fontSize: width * 0.03,
        color: '#000',
        marginLeft: width * 0.02,
        flex: 1,
    },
    timeText: {
        fontSize: width * 0.03,
        color: '#000',
        fontWeight: '500',
    },
    noteText: {
        fontSize: width * 0.03,
        color: '#000',
        paddingRight: width * 0.015,
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
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        width: '80%',
        maxHeight: '70%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitleContainer: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
        flexDirection: 'row',
    },
    infoIconBlue: {
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: width * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width * 0.02,
    },
    infoIconTextBlue: {
        color: 'black',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: width * 0.045,
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
        fontSize: width * 0.05,
        color: '#666',
        fontWeight: 'bold',
    },
    modalContent: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.015,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: width * 0.035,
        paddingVertical: height * 0.015,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
});

export default RaceResultsScreen;