import React from 'react';
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
            style={[styles.rowContainer, { backgroundColor: isEven ? '#f8f9fa' : 'white' }]}
        >
            <View style={styles.rankColumn}>
                <Text style={styles.rankText}>{item?.ranking?.worldRank}</Text>
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

            <View style={styles.nationalRankColumn}>
                {category !== 'World' && (
                    <Text style={styles.nationalRankText}>{index + 1}</Text>
                )}
            </View>

            <View style={styles.playersColumn}>
                {[0, 1].map(i => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => handleAtheleteProfileData(item?.playerDetails?.[i]?._id)}
                    >
                        <View style={styles.playerRow}>
                            <Image
                                source={{ uri: item?.playerDetails?.[i]?.icon }}
                                style={styles.avatar}
                            />
                            <Text style={styles.playerName} numberOfLines={2}>
                                {item?.playerDetails?.[i]?.fullName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.countryColumn}>
                {[0, 1].map(i => (
                    <Text key={i} style={styles.countryText}>
                        {item?.playerDetails?.[i]?.country}
                    </Text>
                ))}
            </View>

            <View style={styles.pointsColumn}>
                <Text style={styles.pointsText}>{item?.ranking?.points}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    rankColumn: {
        width: 50,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    rankChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    rankChangeIcon: {
        fontSize: 12,
    },
    rankChangeText: {
        fontSize: 12,
        marginLeft: 2,
    },
    nationalRankColumn: {
        width: 50,
        alignItems: 'center',
    },
    nationalRankText: {
        fontSize: 14,
        color: '#333',
    },
    playersColumn: {
        width: '43.5%',
        justifyContent: 'center',
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    playerName: {
        fontSize: 12,
        color: '#333',
        maxWidth:'80%'
    },
    countryColumn: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    countryText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    pointsColumn: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    pointsText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
});

export default doubleRenderPlayer;