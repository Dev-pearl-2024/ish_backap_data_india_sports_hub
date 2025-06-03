import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import doubleRenderPlayer from './doublesRanking';

const IndividualRanking = ({ sportName, selectedCategory, loading, eventCategory, sportIcon, data }) => {
    const [selectedGender, setSelectedGender] = useState('Male');
    const navigate = useNavigation();
    const playersData = data;
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const getRankChangeIndicator = (current, previous) => {
        if (current < previous) {
            return { icon: '↑', color: '#4CAF50', change: `+${previous - current}` };
        } else if (current > previous) {
            return { icon: '↓', color: '#F44336', change: `-${current - previous}` };
        }
        return null;
    };

    const handleAtheleteProfileData = userId => {
        navigate.navigate('athelete-profile', { athleteId: userId });
    };

    const handleTeamProfileData = userId => {
        navigate.navigate('team-profile', { teamId: userId });
    };

    const renderPlayer = ({ item, index }) => {
        const isEven = index % 2 === 0;
        const rankChange = getRankChangeIndicator(
            item?.ranking?.worldRank,
            item?.ranking?.previousWorldRank,
        );

        return (
            <TouchableOpacity
                onPress={() =>
                    item?.playerDetails?.length <= 1
                        ? handleAtheleteProfileData(item?.playerDetails?.[0]?._id)
                        : handleTeamProfileData(item?.ranking?.team?._id)
                }
                style={[styles.row, { backgroundColor: isEven ? '#f8f9fa' : 'white' }]}
            >
                <View style={[styles.cell, { flex: 1 }]}>
                    <Text style={styles.rankNumber}>{item?.ranking?.worldRank}</Text>
                    {rankChange && (
                        <View style={styles.rankChangeContainer}>
                            <Text style={[styles.rankChangeIcon, { color: rankChange.color }]}>{rankChange.icon}</Text>
                            <Text style={[styles.rankChangeText, { color: rankChange.color }]}>{rankChange.change}</Text>
                        </View>
                    )}
                </View>
                {selectedCategory !== 'World' && (
                    <View style={[styles.cell, { flex: 1 }]}>
                        <Text style={styles.nationalRank} numberOfLines={2}>{index + 1}</Text>
                    </View>
                )}
                <View style={[styles.cell, styles.playerInfoSection]}>
                    <Image source={{ uri: item?.ranking?.team?.icon }} style={styles.avatar} />
                    <Text
                        style={styles.playerName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item?.ranking?.team?.name}
                    </Text>
                </View>
                <View style={[styles.cell, { flex: 1, alignItems: 'flex-end' }]}>
                    <Text style={styles.points}>{item?.ranking?.points}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const doubleRenderPlayerFun = ({ item, index }) => {
        return doubleRenderPlayer({ item, index, category: selectedCategory, navigation: navigate });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.tableHeader}>
                    <View style={[styles.cell, { flex: 1 }]}>
                        <Text style={styles.tableHeaderText}>World</Text>
                    </View>
                    {selectedCategory !== 'World' && (
                        <View style={[styles.cell, { flex: 1 }]}>
                            <Text style={styles.tableHeaderText}>
                                {selectedCategory === 'Asian' ? 'Asian' : 'National'}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.cell, { flex: 2.5 }]}>
                        <Text style={styles.tableHeaderText}>Players</Text>
                    </View>
                    {eventCategory == 'Doubles' && (
                        <View style={[styles.cell, { flex: 1 }]}>
                            <Text style={styles.tableHeaderText}>
                                Country
                            </Text>
                        </View>
                    )}
                    <View style={[styles.cell, { flex: 1, alignItems: 'flex-end' }]}>
                        <Text style={styles.tableHeaderText}>Points</Text>
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={playersData}
                        renderItem={eventCategory === 'Doubles' ? doubleRenderPlayerFun : renderPlayer}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="small" /> : null}
                        ListEmptyComponent={
                            loading ? (
                                <ActivityIndicator size="small" />
                            ) : (
                                <Text style={{ color: COLORS.primary, textAlign: 'center', marginTop: "20%" }}>No players found.</Text>
                            )
                        }
                        initialNumToRender={50}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: COLORS.primary
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    cell: {
        paddingHorizontal: 4,
        justifyContent: 'left',
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },
    nationalRank: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginRight: "25%"
    },
    rankChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    rankChangeIcon: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    rankChangeText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 6,
    },
    playerInfoSection: {
        flex: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        maxWidth: '80%',

    },
    points: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center'
    },
});

export default IndividualRanking;
