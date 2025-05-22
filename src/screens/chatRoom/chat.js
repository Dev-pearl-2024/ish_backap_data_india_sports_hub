import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import SportSelection from '../../components/allsportsComponents/sportsSelection';

export default function Chat() {
    return <>
        <Header />
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                alignItems: 'center',
                padding: 10,
                borderRadius: 15,
            }}>
            <Text style={styles.rankingTitle}>All Sports - FanZone</Text>
        </View>
        <View style={styles.container}>
            <SportSelection showBadge={true} route={'chat-room'} />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: { flex: 1,  },
    sportsTitle: {
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 24,
        color: COLORS.black,
        paddingLeft: 10,
        backgroundColor: COLORS.white,
    },
    rankingTitle: {
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 24,
        color: COLORS.black,
    },
});
