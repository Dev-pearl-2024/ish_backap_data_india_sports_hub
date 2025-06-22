import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import dynamicSize from '../../../utils/DynamicSize';
import COLORS from '../../../constants/Colors';
import { ActivityIndicator } from 'react-native';
import NotFoundVideo from '../../../assets/icons/notFoundVideo.svg'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHTML from 'react-native-render-html';

const { width } = Dimensions.get('window');

const VideoCard = ({ item }) => (
    <View style={styles.card}>
        <WebView
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: item.videoUrl }}
        />
        <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
    </View>
);

const LiveAndHighlightVideo = ({ sportData }) => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const getVideoList = async (pageNo = 1) => {
        try {
            if (pageNo === 1) setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const res = await axios({
                method: 'GET',
                url: `https://prod.indiasportshub.com/video-manager?eventId=${sportData?._id}&sport=${sportData?.sport}&page=${pageNo}&limit=${limit}`,
                headers: {
                    accessToken: token
                }
            });
            if (res?.data?.data?.length) {
                setVideoData(prev => pageNo === 1 ? res.data.data : [...prev, ...res.data.data]);
                setHasMore(res.data.data.length === limit); // If less than limit, stop loading more
            } else {
                setHasMore(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVideoList(1);
    }, []);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            getVideoList(nextPage);
        }
    };

    if (loading && page === 1) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FlatList
                data={videoData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <VideoCard item={item} />}
                scrollEnabled={true}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    hasMore && loading ? (
                        <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: 10 }} />
                    ) : null
                }
                ListEmptyComponent={() => {
                    return <>
                        <View style={{
                            height: dynamicSize(400),
                            backgroundColor: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.black }}>No Videos Available!</Text>
                            <NotFoundVideo />
                        </View>
                    </>
                }}
            />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // paddingBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        // borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        // borderWidth: 1,
        // borderColor: '#E0E0E0',
        // elevation: 3,
    },
    video: {
        height: dynamicSize(200),
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: COLORS.black
    },
    description: {
        color: '#666',
        fontSize: 14,
    },
});

export default LiveAndHighlightVideo;
