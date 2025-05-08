import { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import AthleteProfileCard from '../../components/CommonCards/atheleteProfileCard';
import TripleDetailCard from '../../components/CommonCards/tripleCenterDetailCard';
import AboutAchievement from '../../components/AthleteProfileComponents/aboutAchievement';
import LatestNews from '../../components/HomeComponents/LatestNews';
import BackHeader from '../../components/Header/BackHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreLoader from '../../components/loader/fullLoader';
import AllCards from '../../components/allsportsComponents/score/All';
import dynamicSize from '../../utils/DynamicSize';
import PremiumFeature from '../../components/PremiumFeature/PremiumFeature';
import RecentArchives from '../../components/AthleteProfileComponents/recentArchives';
import HeadToHead from '../athlete-profile/headTohead';
import moment from 'moment';
import PlayerListTable from './playerListTable';

const menu = [
    'About & Achievement',
    'Athletes',
    'Upcoming Event',
    'Archives',
    'Head to Head',
    'News & Media'
];

const archiveSubMenu = [
    // {
    //     id: 0,
    //     lable: 'Recent',
    // },
    // {
    //     id: 1,
    //     lable: 'Top 10',
    // },
    // {
    //   id: 2,
    //   lable: 'Year wise',
    // },
];
export default function TeamProfile({ route, params }) {
    const { teamId, athleteData } = route.params;
    const [activeTab, setActiveTab] = useState(0);
    const [athProfileData, setAthProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [tournamentData, setTournamentData] = useState([]);
    const [activeArchiveTab, setActiveArchiveTab] = useState(0);
    const [isPremiumUser, setIsPremiumUser] = useState("")
    const [playerList, setPlayerList] = useState([])

    const getTeamProfile = async () => {
        try {
            setLoading(true);
            let res = await axios({
                method: 'get',
                url: `https://prod.indiasportshub.com/teams/${teamId}`,
            });
            setLoading(false);
            setAthProfileData(res?.data?.existingTeam);
        } catch (e) {
            setLoading(false);
            setAthProfileData([]);
        }
    };

    const getTeamPlayers = async () => {
        try {
            setLoading(true);
            let res = await axios({
                method: 'get',
                url: `https://prod.indiasportshub.com/teams/allPlayer/${teamId}`,
            });
            setLoading(false);
            setPlayerList(res?.data?.existingTeam);
        } catch (e) {
            setLoading(false);
            setPlayerList([]);
        }
    };

    useEffect(() => {
        getTeamProfile();
        getUpcomingData();
    }, []);

    useEffect(() => {
        getTeamPlayers()
    }, [teamId])

    const getUpcomingData = async () => {
        try {
            let userId = await AsyncStorage.getItem('userId');
            let res = await axios({
                method: 'get',
                url: `https://prod.indiasportshub.com/events/upcoming-events/${teamId}`,
                params: {
                    userId: userId,
                    forTeam: true,
                    //   page: 0,
                    //   limit: 20,
                    startDate: moment().format('YYYY-MM-DD'),
                },
            });
            setTournamentData(res?.data?.data);
        } catch (e) {
            console.log('error', e);
            setTournamentData([]);
        }
    };

    useEffect(() => {
        const getUserDetails = async () => {
            const userID = await AsyncStorage.getItem('userId');
            try {
                const response = await axios({
                    method: 'GET',
                    url: `https://prod.indiasportshub.com/users/${userID}`,
                });
                if (response?.data?.message === 'User found successfully') {
                    setIsPremiumUser(response.data.existing.isPremiumUser)
                }
                return response.data;
            } catch (error) {
                throw new Error('Failed get User Details', error);
            }
        };

        getUserDetails()
    }, [])

    const handleFav = async (id, fav) => {
        let userId = await AsyncStorage.getItem('userId');
        try {
            await axios({
                method: 'post',
                url: `https://prod.indiasportshub.com/users/myfavorite/${userId}/category/team`,
                data: {
                    favoriteItemId: id,
                    isAdd: !fav,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const renderComponent = <ScrollView>
        {loading && <PreLoader />}
        <Text style={styles.titleText}>Team Profile</Text>
        <AthleteProfileCard athProfileData={athProfileData} />
        <TripleDetailCard athProfileData={athProfileData} isTeam={true} />
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, gap: 6 }}>
            {menu.map((item, id) => {
                return (
                    <TouchableOpacity
                        style={
                            activeTab === id
                                ? styles.categoryButton
                                : styles.categoryButtonInactive
                        }
                        key={`menu-item-${id}`}
                        onPress={() => setActiveTab(id)}>
                        <Text
                            style={
                                activeTab === id ? styles.activeText : styles.inactiveText
                            }>
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>

        {activeTab === 0 &&
            (athProfileData?.aboutAndachivement ? (
                <AboutAchievement data={athProfileData?.aboutAndachivement} />
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Text>No Achievement data available</Text>
                </View>
            ))}
        {activeTab === 1 && <>
            <PlayerListTable data={playerList} handleFav={handleFav} />
        </>}
        {activeTab === 5 && <LatestNews showTitle={false} />}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, gap: 6 }}>
            {activeTab === 3 &&
                archiveSubMenu.map(item => {
                    return (
                        <TouchableOpacity
                            style={
                                activeArchiveTab === item?.id
                                    ? styles.categoryButton
                                    : styles.categoryButtonInactive
                            }
                            key={`menu-item-${item.id}`}
                            onPress={() => setActiveArchiveTab(item.id)}>
                            <Text
                                style={
                                    activeArchiveTab === item?.id
                                        ? styles.activeText
                                        : styles.inactiveText
                                }>
                                {item.lable}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
        </ScrollView>
        {(activeTab === 3 && activeArchiveTab === 0) && <RecentArchives teamId={athProfileData?._id} />}
        {activeTab === 2 && <AllCards data={tournamentData} />}
        {activeTab === 4 && (
            <HeadToHead
                eventCategory={athProfileData?.eventCategory}
                teamId={athProfileData?._Id}
                athleteData={athProfileData}
                isTeam={true}
            />
        )}
    </ScrollView>

    return (
        <>
            <BackHeader />
            {isPremiumUser ? renderComponent : <PremiumFeature child={renderComponent} top={"10%"} />}
        </>
    );
}
const styles = StyleSheet.create({
    titleText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.black,
        padding: 16,
        backgroundColor: COLORS.white,
    },

    categoryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 30,
    },
    categoryButtonInactive: {
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        borderRadius: 30,
    },
    activeText: {
        color: COLORS.white,
    },
    inactiveText: {
        color: COLORS.black,
    },
    headerContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 60,
    },
    noticification: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '33%',
    },
});
