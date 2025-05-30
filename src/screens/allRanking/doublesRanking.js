import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const getRankChangeIndicator = (current, previous) => {
    if (current < previous) {
        return { icon: '↑', color: '#4CAF50', change: `+${previous - current}` };
    } else if (current > previous) {
        return { icon: '↓', color: '#F44336', change: `-${current - previous}` };
    }
    return null;
};
const doubleRenderPlayer = ({ item, index, category, navigation }) => {
    const isEven = index % 2 === 0;
    const rankChange = getRankChangeIndicator(
        item?.ranking?.worldRank,
        item?.ranking?.previousWorldRank,
    );

    const handleAtheleteProfileData = userId => {
        navigation.navigate('athelete-profile', { athleteId: userId });
    };

    return (
        <TouchableOpacity
            style={[
                styles.playerItem,
                { backgroundColor: isEven ? '#f8f9fa' : 'white' },
            ]}>
            <View style={styles.rankSection}>
                <Text style={styles.rankNumber}>{item?.ranking?.worldRank}</Text>
                {rankChange && (
                    <View style={styles.rankChangeContainer}>
                        <Text style={[styles.rankChangeIcon, { color: rankChange.color }]}>
                            {rankChange.icon}
                        </Text>
                        <Text style={[styles.rankChangeText, { color: rankChange.color }]}>
                            {rankChange.change}
                        </Text>
                    </View>
                )}
            </View>

            {<Text style={styles.nationalRank}>{category !== 'World' && (index + 1)}</Text>}

            <View style={styles.doublePlayerSection}>
                {/* First Player */}
                <TouchableOpacity onPress={() => handleAtheleteProfileData(item?.playerDetails?.[0]?._id)}>
                    <View style={styles.playerRow}>
                        <Image
                            source={{ uri: item?.playerDetails?.[0].icon }}
                            style={styles.avatar}
                        />
                        <View style={styles.playerInfo}>
                            {/* <Text style={styles.playerCountry}>
                    {item.players[0].country}
                  </Text> */}

                            <Text style={styles.playerName}>{item?.playerDetails?.[0]?.fullName}</Text>
                            {/* <Text style={styles.playerCountry}>
                    {item.players[0].country}
                  </Text> */}
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Second Player */}
                <TouchableOpacity onPress={() => handleAtheleteProfileData(item?.playerDetails?.[1]?._id)}>
                    <View style={styles.playerRow}>
                        <Image
                            source={{ uri: item?.playerDetails?.[1]?.icon }}
                            style={styles.avatar}
                        />
                        <View style={styles.playerInfo}>
                            {/* <Text style={styles.playerCountry}>
                    {item.players[1].country}
                  </Text> */}
                            <Text style={styles.playerName}>{item?.playerDetails?.[1]?.fullName}</Text>
                            {/* <Text style={styles.playerCountry}>
                    {item.players[1].country}
                  </Text> */}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.countryColumn}>
                <Text style={styles.countryText}>{item?.playerDetails?.[0]?.country}</Text>
                <Text style={styles.countryText}>{item?.playerDetails?.[1]?.country}</Text>
            </View>

            <Text style={styles.points}>{item?.ranking?.points}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#1976D2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 4,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 16,
        padding: 4,
    },
    titleSection: {
        backgroundColor: '#1976D2',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleIcon: {
        marginRight: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    categoryTabs: {
        flexDirection: 'row',
    },
    categoryTab: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        marginRight: 12,
    },
    selectedCategoryTab: {
        backgroundColor: 'white',
    },
    categoryTabText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
    },
    selectedCategoryTabText: {
        color: '#1976D2',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    dropdown: {
        backgroundColor: '#E3F2FD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 3,
        paddingVertical: 10,
        borderBottomWidth: 0,
        borderBottomColor: '#E0E0E0',
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        paddingRight: 10,
    },
    playersList: {
        flex: 1,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 1,
        paddingVertical: 8,
        backgroundColor: 'white',
        marginBottom: 0,
        minHeight: 80,
    },
    rankSection: {
        width: 30,
        alignItems: 'center',
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    nationalRank: {
        width: 85,
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    rankChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
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
    doublePlayerSection: {
        // flex: 1,
        width: 150,
        paddingLeft: 12,
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 12,
    },
    playerInfo: {
        flex: 1,
        width: 250
        // flexDirection: 'row',
        // alignItems: 'left',
    },
    playerName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
        // textDecorationLine: 'underline',
    },
    playerCountry: {
        fontSize: 14,
        color: '#666',
        // marginLeft: 10,
    },
    countryColumn: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 4,
    },
    countryText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    points: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        width: 100,
        textAlign: 'right',
        marginLeft: 15,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#999',
    },
});

export default doubleRenderPlayer;