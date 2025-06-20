import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import axios from 'axios';
import COLORS from '../../../constants/Colors';
import Javelin from '../../../components/SportWiseScoreCards/Athletics/javelin.scorecard';
import SwimmingResultsScreen from '../../../components/SportWiseScoreCards/swimming/swimming.scorecard';
import RelaySwimmingResultsScreen from '../../../components/SportWiseScoreCards/swimming/relaySwimming.scorecard';
import { SwimmingFormat } from '../../../utils/sportFormatMaker/swimming/swimming';
import LongJumpScreen from '../../../components/SportWiseScoreCards/Athletics/longJump';
import HighJump from '../highJumpTable';
import PentathlonLeaderboard from '../../../components/SportWiseScoreCards/Athletics/pentathlon';
import DecathlonLeaderboard from '../../../components/SportWiseScoreCards/Athletics/decathlon';
import HeptathlonLeaderboard from '../../../components/SportWiseScoreCards/Athletics/heptathlon';
import RaceResultsScreen from '../../../components/SportWiseScoreCards/Athletics/races';
import HighJumpScreen from '../../../components/SportWiseScoreCards/Athletics/highJump';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Scorecards = ({ sportData, renderForPremium }) => {
    const [loading, setLoading] = useState(false);
    const [scoreCardData, setScoreCardData] = useState([]);

    const getScorecardData = async () => {
        try {
            setLoading(true);

            const res = await axios.post(`https://prod.indiasportshub.com/score/format`, {
                sportName: sportData?.sport,
                sportCategory: sportData?.category,
                eventId: sportData?._id,
            });

            console.log("Running scorecard fetch:", {
                sportName: sportData?.sport,
                sportCategory: sportData?.category,
                eventId: sportData?._id,
            });

            if (res.data.data) {
                const formattedData = res?.data?.data?.score
                setScoreCardData(formattedData);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getScorecardData();
    }, []);

    const isRelayCategory =
        sportData?.category === '4 x 100m Freestyle relay' ||
        sportData?.category === '4 x 200m Freestyle relay' ||
        sportData?.category === '4 x 100m Medlay relay' ||
        sportData?.category === 'Mixed 4x100m Medley relay';

    return (
        <View style={{ marginBottom: '10%' }}>
            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
            {/* Start  Athletics scorecards*/}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && (sportData?.category === 'Javelin Throw' || sportData?.category === "Shot Put" || sportData?.category === "Discus Throw" || sportData?.category === "Hammer Throw") && (
                <Javelin score={scoreCardData} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && (sportData?.category === 'Long Jump' || sportData?.category === 'Triple Jump') && (
                <LongJumpScreen score={scoreCardData} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && (sportData?.category === 'High Jump') && (
                <HighJumpScreen score={scoreCardData} category={sportData?.category} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && (sportData?.category === 'Pole Vault') && (
                <HighJumpScreen score={scoreCardData} category={sportData?.category} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && sportData?.category === 'Pentathlon' && (
                <PentathlonLeaderboard score={scoreCardData} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && sportData?.category === 'Decathlon' && (
                <DecathlonLeaderboard score={scoreCardData} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && sportData?.category === 'Heptathlon' && (
                <HeptathlonLeaderboard score={scoreCardData} />
            )}
            {scoreCardData && sportData?.sport === 'ATHLETICS' && (
                sportData?.category === '60m' ||
                sportData?.category === '100m' ||
                sportData?.category === '200m' ||
                sportData?.category === '400m' ||
                sportData?.category === '800m' ||
                sportData?.category === '1500m' ||
                sportData?.category === '3000m' ||
                sportData?.category === '5000m' ||
                sportData?.category === '10000m' ||
                sportData?.category === '60m Hurdles' ||
                sportData?.category === '100m Hurdles' ||
                sportData?.category === '110m Hurdles' ||
                sportData?.category === "400m Hurdles" ||
                sportData?.category === '3000m Steeplechase' ||
                sportData?.category === '1 Mile' ||
                sportData?.category === 'Full Marathon' ||
                sportData?.category === 'Half Marathon' ||
                sportData?.category === '10km Marathon' ||
                sportData?.category === '5km Marathon' ||
                sportData?.category === '10km Race Walking' ||
                sportData?.category === '20km Race Walking' ||
                sportData?.category === '35km Race Walking' ||
                sportData?.category === '50km Race Walking' ||
                sportData?.category === '10000m Race Walking' ||
                sportData?.category === '20000m Race Walking' ||
                sportData?.category === 'Cross Country') && (
                    <RaceResultsScreen score={scoreCardData} />
                )}

            {/* End */}

            {/* Start Swimming */}
            {scoreCardData && sportData?.sport === 'SWIMMING' && !isRelayCategory && (
                <SwimmingResultsScreen score={scoreCardData} />
            )}

            {scoreCardData && sportData?.sport === 'SWIMMING' && isRelayCategory && (
                <RelaySwimmingResultsScreen score={scoreCardData} />
            )}
            {/* End Swimming */}
        </View>
    );
};

export default Scorecards;
