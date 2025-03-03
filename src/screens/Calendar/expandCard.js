import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import COLORS from '../../constants/Colors';
import LiveCard from '../../components/CommonCards/liveTournamentCard';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import dynamicSize from '../../utils/DynamicSize';
import moment from 'moment';
import { convertToUpperLowerCase } from '../../utils/convertUpperLowerCase';

const ExpandableCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [heightAnimation] = useState(new Animated.Value(0));
    const props = {
        "_id": "66f15ab8cfb105fea4396882",
        "sports": [],
        "sport": "TENNIS",
        "name": "Davis Cup Tennis 2024 ",
        "sportType": "Individual Sporting",
        "domesticAndInternational": "International",
        "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
        "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/tournament/Davis%20Cup%20Finals1.jpeg",
        "location": "fake",
        "edition": "2024-2025",
        "playerId": [],
        "startDate": "2024-09-10T00:00:00.000Z",
        "endDate": "2024-11-24T00:00:00.000Z",
        "tags": [
            "hello",
            "world"
        ],
        "standingForCountry": "yes",
        "sponsorId": null,
        "isActive": true,
        "isDeleted": true,
        "subTournaments": [],
        "standing": [],
        "countryStandingList": [],
        "createdAt": "2024-09-23T12:10:32.968Z",
        "updatedAt": "2024-11-20T12:40:07.595Z",
        "__v": 0
    }
    const data = [
        {
            "_id": "66f15c0dcfb105fea43968d0",
            "name": "Sweden Vs India Davis Cup 2024 1st Round ",
            "sport": "TENNIS",
            "category": "Team Event",
            "tournamentName": "Davis Cup 2024 ",
            "tournamentId": "66f15ab8cfb105fea4396882",
            "subtournamentId": null,
            "subtournamentName": "",
            "eventVenue": "Australia",
            "eventGender": "Team Men's",
            "eventStage": "Group",
            "startTime": "15:00",
            "endTime": "16:00",
            "eventRule": "",
            "startDate": "2025-09-14T00:00:00.000Z",
            "endDate": "2025-09-15T00:00:00.000Z",
            "drawsId": "66f15c22cfb105fea43968d5",
            "scoreData": {
                "homeTeam": "Country 1",
                "homeScore": 0,
                "awayTeam": "Country 2",
                "awayScore": 0
            },
            "participation": "A Vs B",
            "team": [
                {
                    "_id": "66f159adcfb105fea43967ef",
                    "name": "Team Sweden of  Davis Cup 2024 ",
                    "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
                    "icon": "",
                    "sports": "TENNIS",
                    "category": "Men's",
                    "eventCategory": [
                        "Team Event"
                    ],
                    "players": [
                        "66f14d46cfb105fea4396651",
                        "66f15489cfb105fea4396711",
                        "66f154f2cfb105fea4396727",
                        "66f1554ecfb105fea439673d",
                        "66f15594cfb105fea439674f"
                    ],
                    "country": "Sweden",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "tags": [],
                    "createdAt": "2024-09-23T12:06:05.192Z",
                    "updatedAt": "2024-11-20T13:14:14.499Z",
                    "__v": 0
                },
                {
                    "_id": "66f15a0dcfb105fea439683d",
                    "name": "Team India of  Davis Cup 2024 ",
                    "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
                    "icon": "",
                    "sports": "TENNIS",
                    "category": "Men's",
                    "eventCategory": [
                        "Team Event"
                    ],
                    "players": [
                        "66f157c8cfb105fea4396799",
                        "66f15890cfb105fea43967b1",
                        "66f158f1cfb105fea43967bd",
                        "66f1582fcfb105fea43967a5",
                        "669403360206db995a36db4c"
                    ],
                    "country": "India",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "tags": [],
                    "createdAt": "2024-09-23T12:07:41.192Z",
                    "updatedAt": "2024-11-20T13:14:14.660Z",
                    "__v": 0
                }
            ],
            "tournamentsDetails": {
                "_id": "66f15ab8cfb105fea4396882",
                "sports": [],
                "sport": "TENNIS",
                "name": "Davis Cup Tennis 2024 ",
                "sportType": "Individual Sporting",
                "domesticAndInternational": "International",
                "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
                "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/tournament/Davis%20Cup%20Finals1.jpeg",
                "location": "fake",
                "edition": "2024-2025",
                "playerId": [],
                "startDate": "2024-09-10T00:00:00.000Z",
                "endDate": "2024-11-24T00:00:00.000Z",
                "tags": [
                    "hello",
                    "world"
                ],
                "standingForCountry": "yes",
                "sponsorId": null,
                "isActive": true,
                "isDeleted": true,
                "subTournaments": [],
                "standing": [],
                "countryStandingList": [],
                "createdAt": "2024-09-23T12:10:32.968Z",
                "updatedAt": "2024-11-20T12:40:07.595Z",
                "__v": 0
            },
            "domesticAndInternational": "International",
            "startDateTime": "2025-09-14T15:00:00.000Z",
            "endDateTime": "2025-09-15T16:00:00.000Z"
        },
        {
            "_id": "6790cc4b4f8bf5a49c5f30c5",
            "name": "Dev Kumar Vs Ishaan Kanojia Judo 2025",
            "sport": "JUDO",
            "category": "66kg - Men's Half Lightweight",
            "tournamentName": "Senior National Judo Championship 2025",
            "tournamentId": "678b4b3f696eab275863474e",
            "subtournamentId": null,
            "subtournamentName": "",
            "eventVenue": "Delhi,India ",
            "eventGender": "Mixed Team",
            "eventStage": "Round of 64",
            "startTime": "10:00",
            "endTime": "11:00",
            "eventRule": "",
            "startDate": "2025-05-01T00:00:00.000Z",
            "endDate": "2025-06-01T00:00:00.000Z",
            "drawsId": "679081724f8bf5a49c5f2c21",
            "scoreData": {

            },
            "participation": "A Vs B",
            "team": [
                {
                    "_id": "678e0d2a696eab275863588d",
                    "name": "Dev kumar ( India ) ",
                    "coverImage": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "sports": "JUDO",
                    "category": "Men's",
                    "eventCategory": [
                        "66kg - Men's Half Lightweight"
                    ],
                    "players": [
                        "678e0d2a696eab275863588b"
                    ],
                    "country": "India",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "metaData": null,
                    "tags": [],
                    "createdAt": "2025-01-20T08:45:30.878Z",
                    "updatedAt": "2025-01-20T08:45:30.878Z",
                    "__v": 0
                },
                {
                    "_id": "678e0e0a696eab2758635899",
                    "name": "Ishaan kanojia ( India ) ",
                    "coverImage": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/Ishaan%20Kanojia.png",
                    "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/Ishaan%20Kanojia.png",
                    "sports": "JUDO",
                    "category": "Men's",
                    "eventCategory": [
                        "66kg - Men's Half Lightweight"
                    ],
                    "players": [
                        "678e0e0a696eab2758635897"
                    ],
                    "country": "India",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "metaData": null,
                    "tags": [],
                    "createdAt": "2025-01-20T08:49:14.590Z",
                    "updatedAt": "2025-01-20T08:49:14.590Z",
                    "__v": 0
                }
            ],
            "tournamentsDetails": {
                "_id": "678b4b3f696eab275863474e",
                "sports": [],
                "sport": "JUDO",
                "categoryId": "",
                "name": "Senior National Judo Championship 2025",
                "sportType": "Individual Sporting",
                "domesticAndInternational": "Domestic",
                "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
                "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/tournament/Senior%20National%20Judo%20Championship%202025%20Logo.jpg",
                "location": "fake",
                "edition": "2024-2025",
                "playerId": [],
                "startDate": "2025-01-05T00:00:00.000Z",
                "endDate": "2025-01-06T00:00:00.000Z",
                "tags": [
                    "hello",
                    "world"
                ],
                "standingForCountry": "no",
                "sponsorId": null,
                "isActive": true,
                "isDeleted": false,
                "subTournaments": [],
                "standing": [],
                "countryStandingList": [],
                "createdAt": "2025-01-18T06:33:35.420Z",
                "updatedAt": "2025-01-18T06:33:35.420Z",
                "__v": 0
            },
            "domesticAndInternational": "Domestic",
            "startDateTime": "2025-05-01T10:00:00.000Z",
            "endDateTime": "2025-06-01T11:00:00.000Z"
        },
        {
            "_id": "6790cb9a4f8bf5a49c5f3094",
            "name": "Rohit Mangul Vs Abhijith M Mahesh Judo 2025",
            "sport": "JUDO",
            "category": "66kg - Men's Half Lightweight",
            "tournamentName": "Senior National Judo Championship 2025",
            "tournamentId": "678b4b3f696eab275863474e",
            "subtournamentId": null,
            "subtournamentName": "",
            "eventVenue": "Delhi,India ",
            "eventGender": "Mixed Team",
            "eventStage": "Round of 64",
            "startTime": "10:00",
            "endTime": "11:00",
            "eventRule": "",
            "startDate": "2025-05-01T00:00:00.000Z",
            "endDate": "2025-06-01T00:00:00.000Z",
            "drawsId": "679081724f8bf5a49c5f2c21",
            "scoreData": {

            },
            "participation": "A Vs B",
            "team": [
                {
                    "_id": "678e0497696eab27586357ed",
                    "name": "Rohit Mangul ( India ) ",
                    "coverImage": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "sports": "JUDO",
                    "category": "Men's",
                    "eventCategory": [
                        "66kg - Men's Half Lightweight"
                    ],
                    "players": [
                        "678e0497696eab27586357eb"
                    ],
                    "country": "India",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "metaData": null,
                    "tags": [],
                    "createdAt": "2025-01-20T08:08:55.935Z",
                    "updatedAt": "2025-01-20T08:08:55.935Z",
                    "__v": 0
                },
                {
                    "_id": "678e04f6696eab27586357f9",
                    "name": "Abhijith M Mahesh  ( India ) ",
                    "coverImage": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/profile/India%20Flag.jpg",
                    "sports": "JUDO",
                    "category": "Men's",
                    "eventCategory": [
                        "66kg - Men's Half Lightweight"
                    ],
                    "players": [
                        "678e04f6696eab27586357f7"
                    ],
                    "country": "India",
                    "achivements": [],
                    "isActive": true,
                    "isDeleted": false,
                    "metaData": null,
                    "tags": [],
                    "createdAt": "2025-01-20T08:10:30.202Z",
                    "updatedAt": "2025-01-20T08:10:30.202Z",
                    "__v": 0
                }
            ],
            "tournamentsDetails": {
                "_id": "678b4b3f696eab275863474e",
                "sports": [],
                "sport": "JUDO",
                "categoryId": "",
                "name": "Senior National Judo Championship 2025",
                "sportType": "Individual Sporting",
                "domesticAndInternational": "Domestic",
                "coverImage": "https://st3.depositphotos.com/3591429/18305/i/380/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
                "icon": "https://sunday-venture-data.s3.ap-south-1.amazonaws.com/tournament/Senior%20National%20Judo%20Championship%202025%20Logo.jpg",
                "location": "fake",
                "edition": "2024-2025",
                "playerId": [],
                "startDate": "2025-01-05T00:00:00.000Z",
                "endDate": "2025-01-06T00:00:00.000Z",
                "tags": [
                    "hello",
                    "world"
                ],
                "standingForCountry": "no",
                "sponsorId": null,
                "isActive": true,
                "isDeleted": false,
                "subTournaments": [],
                "standing": [],
                "countryStandingList": [],
                "createdAt": "2025-01-18T06:33:35.420Z",
                "updatedAt": "2025-01-18T06:33:35.420Z",
                "__v": 0
            },
            "domesticAndInternational": "Domestic",
            "startDateTime": "2025-05-01T10:00:00.000Z",
            "endDateTime": "2025-06-01T11:00:00.000Z"
        }]
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);

        // Animate the card's expanded height
        Animated.timing(heightAnimation, {
            toValue: isExpanded ? 0 : 150, // Adjust 150 to your desired expanded height
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={toggleExpand}>
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
                                {convertToUpperLowerCase(props?.sport)} /
                                {props?.sportType}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                    // onPress={() =>
                    //     props?.handleFav(props?.data?._id, props?.isFavorite)
                    // }
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
                    <View>
                        <Text style={styles.detailText}>Location : {props?.location}</Text>
                    </View>
                </View>
                {/* <View style={styles.viewContent}>
                    <View style={{ flexDirection: 'row', width: "100%", justifyContent: "space-between" }}>
                        <Text style={styles.detailText}>
                            Venue: {props?.data?.eventVenue}
                        </Text>
                        <Text style={styles.detailText}>
                            Stage: {props?.data?.eventStage}
                        </Text>
                    </View>
                </View> */}
                {isExpanded && <Animated.View style={[styles.expandedContent]}>
                    {data && data.length > 0 ? (
                        data.map((item, id) => {
                            return (
                                <LiveCard
                                    title={item?.name}
                                    date={item?.startDate}
                                    time={item?.startTime}
                                    category={item?.category}
                                    score={item?.score}
                                    country1={item?.teamAName}
                                    country2={item?.teamBName}
                                    status={item?.status}
                                    sport={item?.sport}
                                    eventGenders={item?.eventGender}
                                    startDate={item?.startDate}
                                    endDate={item?.endDate}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    key={`live-item-${id}`}
                                    data={item}
                                    teams={item?.teams}
                                    isFavorite={item?.isFavorite}
                                // handleFav={handleFav}
                                />
                            );
                        })) : ""}
                    <Text style={styles.contentText}>See more</Text>
                </Animated.View>}
            </TouchableOpacity>
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
        padding: 5,
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
