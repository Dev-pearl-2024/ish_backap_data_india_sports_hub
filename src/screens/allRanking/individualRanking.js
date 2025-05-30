import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import doubleRenderPlayer from './doublesRanking';

const IndividualRanking = ({ sportName, sportIcon }) => {
    const [selectedCategory, setSelectedCategory] = useState('Indian');
    const [selectedGender, setSelectedGender] = useState('Male');
    const navigate = useNavigation()
    const [loading, setLoading] = useState(false)
    const [playersData, setPlayersData] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [eventCategory, setEventCategory] = useState('')

    const getRankingData = async (reset = true) => {
        setLoading(true);
        if (reset) {
            setLoading(true);

            setPage(1);
        }

        const params = {
            rankingLevel: selectedCategory,
            eventGender: selectedGender === 'Male' ? "Men's" : selectedGender === 'Female' ? "Women's" : 'Other',
            sports: sportName,
            eventCategory: eventCategory,
            limit: 150,
            page: reset ? 1 : page,
        };

        try {
            const res = await axios.get(`https://prod.indiasportshub.com/rankings/data`, { params });

            const newPlayers = res?.data?.data || [];

            if (reset) {
                setPlayersData(newPlayers);
            } else {
                setPlayersData(prev => [...prev, ...newPlayers]);
            }

            setHasMore(newPlayers.length === 50);
            setLoading(false)// If less than 50, no more data
        } catch (error) {
            console.error('Fetch error:', error);
            setLoading(false)
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    const getMaster = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: 'https://prod.indiasportshub.com/master',
            });
            await AsyncStorage.setItem('masterData', JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    const getMasterFields = async () => {
        try {
            let res = await AsyncStorage.getItem("masterData");
            res = JSON.parse(res);
            setItems(res?.eventCategory?.[sportName]?.map((it) => {
                return {
                    label: it,
                    value: it,
                }
            }));
            setEventCategory(res?.eventCategory?.[sportName]?.[0])
            setValue(res?.eventCategory?.[sportName]?.[0])
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getRankingData()
    }, [selectedCategory, selectedGender, eventCategory])

    useEffect(() => {
        getMaster()
        getMasterFields()
    }, [])

    const getRankChangeIndicator = (current, previous) => {
        if (current < previous) {
            return { icon: '↑', color: '#4CAF50', change: `+${previous - current}` };
        } else if (current > previous) {
            return { icon: '↓', color: '#F44336', change: `-${current - previous}` };
        }
        return null;
    };

    const loadMorePlayers = async () => {
        console.log("ruing more")
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        const nextPage = page + 1;

        const params = {}
        if (selectedCategory) {
            params["recordLevel"] = selectedCategory
        }
        if (selectedGender) {
            params["eventGender"] = selectedCategory == 'Male' ? "Men's" : selectedCategory == 'Female' ? "Women's" : ""
        }
        if (sportName) {
            params['sports'] = sportName
        }

        params['eventCategory'] = '100m'
        params['limit'] = 1000
        params['page'] = nextPage

        try {
            const res = await axios({
                method: 'get',
                url: `https://prod.indiasportshub.com/rankings/data`,
                params
            })

            const newPlayers = res.data.data || [];

            setPlayersData(prev => [...prev, ...newPlayers]);
            setPage(nextPage);

            if (newPlayers.length === 0) {
                setHasMore(false);
            }

        } catch (error) {
            console.error('Error loading more players:', error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleAtheleteProfileData = userId => {
        navigate.navigate('athelete-profile', { athleteId: userId });
    };

    const handleTeamProfileData = userId => {
        navigate.navigate('team-profile', { teamId: userId })
    };

    const renderPlayer = ({
        item,
        index,
        nationalRank,
    }) => {
        const isEven = index % 2 === 0;
        const rankChange = getRankChangeIndicator(
            item?.ranking?.worldRank,
            item?.ranking?.previousWorldRank,
        );

        return (
            <TouchableOpacity
                onPress={() => item?.playerDetails?.length <= 1 ? handleAtheleteProfileData(item?.playerDetails?.[0]?._id) : handleTeamProfileData(item?.ranking?.team?._id)}
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
                    {/* <Text style={styles.previousRank}>{item.previousRank}</Text> */}
                </View>
                {<Text style={styles.nationalRank}>{selectedCategory != 'World' && (index + 1)}</Text>}
                <Image source={{ uri: item?.ranking?.team?.icon }} style={styles.avatar} />

                <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{item?.ranking?.team?.name}</Text>
                    {/* <Text style={styles.playerCountry}>{item?.ranking?.team?.country}</Text> */}
                </View>

                {/* <Text style={{color: '#999', fontSize: 20, width: 100}}>›</Text> */}

                <Text style={styles.points}>{item?.ranking?.points}</Text>
            </TouchableOpacity>
        );
    };

    const doubleRenderPlayerFun = ({ item, index }) => {
        return doubleRenderPlayer({ item, index, category: selectedCategory, navigation: navigate })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigate.goBack()}
                >
                    <Text style={{ color: 'white', fontSize: 40 }}>‹</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.titleSection}>
                <View style={styles.titleContainer}>
                    {sportIcon?.icon}
                    <Text style={styles.title}>{sportName}</Text>
                </View>
                <View style={styles.categoryTabs}>
                    {['Indian', 'Asian', 'World'].map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryTab,
                                selectedCategory === category && styles.selectedCategoryTab,
                            ]}
                            onPress={() =>
                                setSelectedCategory(category)
                            }>
                            <Text
                                style={[
                                    styles.categoryTabText,
                                    selectedCategory === category &&
                                    styles.selectedCategoryTabText,
                                ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.content}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Event Category"
                    searchable={true}
                    searchPlaceholder="Type to search..."
                    onChangeValue={(val) => {
                        setEventCategory(val)
                    }}
                    zIndex={3000}
                    style={[styles.dropdown, { marginTop: '2.5%' }]}
                    zIndexInverse={1000}
                    listMode="MODAL"
                />
                <View style={styles.genderSelection}>
                    {['Male', 'Female', 'Others'].map(gender => (
                        <TouchableOpacity
                            key={gender}
                            style={styles.genderOption}
                            onPress={() =>
                                setSelectedGender(gender)
                            }>
                            <View style={styles.radioButton}>
                                {selectedGender === gender && (
                                    <View style={styles.radioButtonSelected} />
                                )}
                            </View>
                            <Text style={styles.genderText}>{gender}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {eventCategory != 'Doubles' && <View style={styles.tableHeader}>
                    <Text
                        style={{ width: 50, fontSize: 14, fontWeight: '500', color: '#666' }}>
                        World
                    </Text>
                    {<Text
                        style={{ width: 80, fontSize: 14, fontWeight: '500', color: '#666', textAlign: 'center' }}>
                        {selectedCategory != 'World' && (selectedCategory == 'Asian' ? 'Asian' : ' National')}
                    </Text>}
                    <Text
                        style={{
                            width: 210,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#666',
                            textAlign: eventCategory == 'Doubles' ? 'center' : 'auto'
                        }}>
                        Players
                    </Text>
                    {eventCategory == 'Doubles' && <Text
                        style={{
                            width: 65,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#666',
                            textAlign: 'center',
                        }}>
                        Country
                    </Text>}
                    <Text
                        style={{ width: 125, fontSize: 14, fontWeight: '500', color: '#666', textAlign: 'right' }}>
                        Points
                    </Text>
                </View>}
                {eventCategory == 'Doubles' && <View style={styles.tableHeader}>
                    <Text
                        style={{ width: 50, fontSize: 14, fontWeight: '500', color: '#666' }}>
                        World
                    </Text>
                    {<Text
                        style={{ width: 80, fontSize: 14, fontWeight: '500', color: '#666', textAlign: 'center' }}>
                        {selectedCategory != 'World' && (selectedCategory == 'Asian' ? 'Asian' : ' National')}
                    </Text>}
                    <Text
                        style={{
                            width: s = eventCategory == 'Doubles' ? 150 : 210,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#666',
                            textAlign: eventCategory == 'Doubles' ? 'left' : 'auto'
                        }}>
                        Players
                    </Text>
                    {eventCategory == 'Doubles' && <Text
                        style={{
                            width: 65,
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#666',
                            textAlign: 'left',
                        }}>
                        Country
                    </Text>}
                    <Text
                        style={{ width: 125, fontSize: 14, fontWeight: '500', color: '#666', textAlign: 'right' }}>
                        Points
                    </Text>
                </View>}
                {loading ?
                    <ActivityIndicator size="large" /> :
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={playersData}
                            renderItem={eventCategory == 'Doubles' ? doubleRenderPlayerFun : renderPlayer}
                            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                            onEndReached={() => {
                                loadMorePlayers()
                            }}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={isLoadingMore ? <ActivityIndicator size="small" /> : null}
                            ListEmptyComponent={
                                loading ? <ActivityIndicator size="small" /> : <Text style={{ color: COLORS.primary, textAlign: 'center' }}>No players found.</Text>
                            }
                            initialNumToRender={1000}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>}
            </View>
        </SafeAreaView >
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
        // paddingVertical: 12,
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
        gap: 10
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
        borderWidth: 0,
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
    genderSelection: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2196F3',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2196F3',
    },
    genderText: {
        fontSize: 16,
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
        // flex: 1,
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
        paddingVertical: 2,
        backgroundColor: 'white',
        marginBottom: 0,
    },
    rankSection: {
        width: 50,
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
    previousRank: {
        fontSize: 10,
        color: '#999',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 12,
    },
    playerInfo: {
        flex: 1,
    },
    playerName: {
        width: "80%",
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
        // textDecorationLine: 'underline',
    },
    playerCountry: {
        fontSize: 14,
        color: '#666',
    },
    chevron: {
        marginHorizontal: 20,
    },
    points: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        width: 50,
        textAlign: 'left',
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

export default IndividualRanking;