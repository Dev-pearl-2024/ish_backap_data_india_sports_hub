import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import COLORS from '../../constants/Colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GrayHeart from '../../assets/icons/grayHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import { getAtheleteDataRequest } from '../../redux/actions/atheleteActions';
import dynamicSize from '../../utils/DynamicSize';
const width = Dimensions.get('window').width;

export default function PlayerListTable({ data, handleFav }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [url, setUrl] = useState('')
    const [markFavourite, setMarkFavourite] = useState({})

    const handleAtheleteProfileData = userId => {
        dispatch(getAtheleteDataRequest({ params: userId }));
        navigation.navigate('athelete-profile', { athleteId: userId });
    };

    return (
        <ScrollView horizontal style={{ backgroundColor: COLORS.white, marginBottom: "20%" }}>
            <View>
                {data && data.length > 0 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            width: width + 50,
                        }}>
                        <Text style={{ width: '10%', color: '#56BCBE', textAlign: 'center' }}>Sr no</Text>
                        <Text style={{ width: '30%', color: '#56BCBE', textAlign: 'center' }}>Photo</Text>
                        <Text style={{ width: '30%', color: '#56BCBE' }}>Name</Text>
                        <Text style={{ color: '#56BCBE', width: '10%', textAlign: 'center' }}>
                            Age
                        </Text>
                        <Text
                            style={{ color: '#56BCBE', width: '20%', textAlign: 'start' }}></Text>
                    </View>)}

                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={() => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                width: width,
                            }}>
                            <Text style={{ color: COLORS.black, textAlign: 'center' }}>No Data Found</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: index % 2 ? COLORS.white : COLORS.table_gray,
                                padding: 10,
                            }}
                            onPress={() => {
                                handleAtheleteProfileData(item?._id);
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 4,
                                    width: '10%'
                                }}>
                                <Text style={{ color: COLORS.black, textAlign: 'center' }} numberOfLines={1}>
                                    {index + 1}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 4,
                                    width: '30%'
                                }}>
                                <Image
                                    source={
                                        item?.icon
                                            ? { uri: item?.icon }
                                            : require('../../assets/images/user.png')
                                    }
                                    style={{ borderRadius: 50, width: dynamicSize(60), height: dynamicSize(60), objectFit: 'contain' }}
                                />

                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '30%'
                                }}
                            >
                                <Text style={{ color: COLORS.black, textAlign: 'left' }} numberOfLines={1}>
                                    {item?.fullName}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: "10%"
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        textAlign: 'center',
                                    }}>
                                    {item?.age}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        textAlign: 'end',
                                        width: '20%',
                                    }}>
                                    {item?.record}
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            setMarkFavourite({ ...markFavourite, [item._id]: !markFavourite })
                                            handleFav(item?._id, !markFavourite)
                                        }}>
                                            {console.log(item?._id)}
                                        { markFavourite[item._id] ? <RedHeart /> : <GrayHeart />}
                                    </TouchableOpacity> */}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView >
    );
}
