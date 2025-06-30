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
    const sortedAthletes = [...athletes].sort((a, b) => {
        const timeA = parseFloat(a?.time?.replace(':', ''));
        const timeB = parseFloat(b?.time?.replace(':', ''));
        return timeA - timeB;
    });

    const getAthletePosition = (athlete) => {
        const index = sortedAthletes.findIndex(a => a.id === athlete.id);
        const fieldWidth = width;
        const fieldHeight = 500; // Available field height
        const startPosition = -30;
        const finishLinePosition = fieldWidth + 5;

        // X position based on race time (current logic)
        const maxGap = 650;
        const xPosition =
            finishLinePosition - index * (maxGap / (sortedAthletes.length - 1));

        // Y position scattered across field height
        const minY = -35;
        const maxY = fieldHeight + 60;
        const yPosition = minY + ((index * 45) % (maxY - minY)); // Stagger vertically

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
                    <View style={styles.finishLine} />
                    {/* Athletes positioned dynamically */}
                    {athletes.slice(0, 5).map((athlete, index) => {
                        const position = getAthletePosition(athlete);
                        return (
                            <View
                                key={athlete.id}
                                style={[
                                    styles.athleteMarker,
                                    {
                                        left: index == 0 ? position.x - 150 : position.x - 130,
                                        top: index == 0 ?
                                            position.y + 40 : index == 1 ?
                                                position.y + 60 : index == 2 ?
                                                    position.y + 80 : index == 3 ?
                                                        position.y + 100 : index == 4 ?
                                                            position.y + 120 : position.y
                                    },
                                ]}>
                                <Text style={styles.athleteTime}>{athlete.time}</Text>
                                <View style={styles.timeContainer}>
                                    {/* <Text style={styles.athleteFlag}>{athlete.flag}</Text> */}

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
                        <TouchableOpacity onPress={() => setIsNoteModalVisible(true)}>
                            <Text style={[styles.headerText, styles.noteHeaderText]}>
                                NOTEⓘ
                            </Text>
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
                    <View style={styles.windInfo}>
                        <Text style={styles.windText}>Disclaimer : </Text>
                        <Text style={styles.windValueText}>The Graphic is for representation purpose only and the results are not to scale .</Text>
                    </View>
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
        width: width,
        height: height * 0.35,
        backgroundColor: '#4CAF50',
        paddingTop: '2%',
        paddingBottom: '2%',
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
        right: '4%',
        top: 0,
        bottom: 0,
        width: '2.5%',
        backgroundColor: '#8B4513',
    },
    athleteMarker: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 7,
    },
    athleteFlag: {
        fontSize: 14,
    },
    timeContainer: {
        paddingHorizontal: '1.5%',
        paddingVertical: '0.3%',
        borderRadius: 4,
        alignItems: 'center',
        minWidth: '20%',
    },
    athleteTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    athleteLabel: {
        fontSize: 14,
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
        paddingVertical: 1, // % too small here, using static
        alignItems: 'center',
    },
    rankHeaderContainer: {
        width: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.8%',
    },
    athleteHeaderContainer: {
        flex: 2.2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.8%',
    },
    timeHeaderContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.8%',
    },
    noteHeaderContainer: {
        width: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.8%',
    },
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
    rankCellContainer: {
        width: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.3%',
    },
    athleteCellContainer: {
        flex: 2.2,
        justifyContent: 'center',
        paddingLeft: '2%',
        paddingVertical: '0.3%',
    },
    timeCellContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.3%',
    },
    noteCellContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '0.3%',
    },
    rankCellText: {
        textAlign: 'center',
    },
    athleteCellText: {},
    timeCellText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    noteCellText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    headerText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: '2.5%',
    },
    subHeaderText: {
        color: '#000',
        fontSize: 12,
        opacity: 0.8,
        textAlign: 'center',
    },
    timeHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '2.5%',
    },
    infoIcon: {
        marginRight: '2%',
        width: '4%',
        height: '4%',
        borderRadius: width * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoIconText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    rankColumn: {
        width: '13%',
        textAlign: 'center',
    },
    athleteColumn: {
        flex: 2,
        paddingLeft: '5%',
    },
    timeColumn: {
        width: '25%',
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
        paddingVertical: '2%',
        paddingHorizontal: 0,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    alternateRow: {
        backgroundColor: '#E5EDFF',
    },
    rankText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    athleteInfo: {
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    athleteName: {
        fontSize: 14,
        color: '#000',
        marginLeft: '2%',
        flex: 1,
    },
    timeText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    noteText: {
        fontSize: 14,
        color: '#000',
        paddingRight: '1.5%',
    },
    windInfo: {
        backgroundColor: 'white',
        paddingVertical: '3%',
        paddingHorizontal: '2.5%',
        alignItems: 'flex-start',
        padding:"30%",
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
        width:"80%",
        color: '#000',
        // fontWeight: 'bold',
        fontStyle: 'italic'
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
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitleContainer: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flexDirection: 'row',
    },
    infoIconBlue: {
        width: '5%',
        height: '5%',
        borderRadius: width * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2%',
    },
    infoIconTextBlue: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: '7.5%',
        height: '7.5%',
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
    modalContent: {
        paddingHorizontal: '5%',
        paddingVertical: '1.5%',
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14,
        paddingVertical: '1.5%',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
});

export default RaceResultsScreen;