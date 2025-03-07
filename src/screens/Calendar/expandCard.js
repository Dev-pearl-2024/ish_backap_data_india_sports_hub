import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import COLORS from '../../constants/Colors';
import LiveCard from '../../components/CommonCards/liveTournamentCard';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import dynamicSize from '../../utils/DynamicSize';
import moment from 'moment';
import { convertToUpperLowerCase } from '../../utils/convertUpperLowerCase';
import NewSportCard from '../../components/ScoreCardComponents/NewSportCard';
import DownArrow from '../../assets/icons/downArrow.svg'
import { ActivityIndicator } from 'react-native';
import { API_URL } from '../../constants/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ExpandableCard = ({ tournament, eventLoading, getEventData, eventData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [heightAnimation] = useState(new Animated.Value(0));
    const [props, setProps] = useState(tournament)
    const [data, setData] = useState(eventData)
    const navigation = useNavigation()
    const [accessToken, setAccessToken] = useState(null)
    const getStoreData = async () => {
        let userDataStore = await AsyncStorage.getItem('userData');
        const { accessToken } = JSON.parse(userDataStore)
        setAccessToken(accessToken)
    }
    const toggleExpand = () => {
        if (!isExpanded) {
            getEventData()
        }
        setIsExpanded(!isExpanded);

        Animated.timing(heightAnimation, {
            toValue: isExpanded ? 0 : 150, // Adjust 150 to your desired expanded height
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    const handleFav = async (id, fav) => {
        let userId = await AsyncStorage.getItem('userId');
        try {
            let res = await axios({
                method: 'post',
                url: `${API_URL}users/myfavorite/${userId}/category/tournament`,
                data: {
                    favoriteItemId: id,
                    isAdd: !fav,
                },
            });
            setProps((prev) => {
                return { ...prev, isFavorite: !fav }
            })
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setData(eventData)
    }, [eventData])

    useEffect(() => {
        setProps(tournament)
    }, [tournament])

    useEffect(() => {
        getStoreData()
    })
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.flexRowAwayCenter}>
                    <View style={styles.flexCenterGap}>
                        <View >
                            <Image source={props?.icon
                                ? { uri: props?.icon }
                                : "/"}
                                style={styles.dpImage}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: "left", flexWrap: "wrap", maxWidth: "80%" }}>
                            <Text style={styles.titleText} numberOfLines={1}>{props?.name}</Text>
                            <Text
                                style={{ color: COLORS.black, width: '90%', fontSize: dynamicSize(12) }}
                                numberOfLines={1}>
                                {convertToUpperLowerCase(props?.sport)}
                                {/* / */}
                                {/* {props?.sportType} */}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            accessToken ? handleFav(props?._id, props?.isFavorite) : navigation.navigate("Login")
                        }
                        }
                    >
                        {props?.isFavorite ? <RedHeart /> : <GrayHeart />}
                    </TouchableOpacity>
                </View>
                <View style={styles.viewContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.detailText}>
                            {moment(props?.startDate)?.format('DD/MMM/YYYY')}
                        </Text>
                        <Text style={styles.detailText}> To </Text>
                        <Text style={styles.detailText}>{moment(props?.endDate)?.format('DD/MMM/YYYY')}</Text>
                    </View>
                </View>
                {eventLoading == props?._id ? (
                    <ActivityIndicator size="small" color={COLORS.primary} />
                ) : <TouchableOpacity onPress={toggleExpand}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <DownArrow />
                    </View>
                </TouchableOpacity>}
                {!eventLoading && isExpanded && <Animated.View style={[styles.expandedContent]}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {data && data.length > 0 ? (
                            data.map((item, id) => {
                                return (
                                    <NewSportCard item={item} margin={10} />
                                );
                            })) : <Text style={{ textAlign: 'center' }}>Event not found!</Text>}
                        {data.length > 0 && <TouchableOpacity onPress={() => navigation.navigate('tournament-view', { tournamentDetail: props, sportNameData: props?.sport })}>
                            <Text style={styles.contentText}>See more</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </Animated.View>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    card: {
        width: '100%',
        padding: 15,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
    expandedContent: {
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: COLORS.white,
        paddingLeft: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    contentText: {
        fontSize: 14,
        textAlign: 'center',
        color: COLORS.primary
    },
    flexRowAwayCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexCenterGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    dpImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        objectFit: 'cover',
    },
    titleText: {
        fontSize: 14,
        fontWeight: '600',
        width: dynamicSize(280),
        color: COLORS.black,
        width: "90%"
    },
    liveDot: {
        width: 5,
        height: 5,
        borderRadius: 10,
        backgroundColor: COLORS.red,
    },
    liveText: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.light_gray,
    },
    viewContent: {
        marginVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scoreImage: {
        width: 22,
        height: 22,
        borderRadius: 50,
        objectFit: 'cover',
    },
    scoreCountryText: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '400',
        color: COLORS.black,
    },
    scoreText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.black,
    },
    detailText: {
        color: COLORS.light_gray,
        fontSize: 10,
        fontWeight: '500',
    }
});

export default ExpandableCard;
