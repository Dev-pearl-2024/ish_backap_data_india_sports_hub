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
    const [videoData, setVideoData] = useState([])
    const [loading, setLoading] = useState(true);
    const getVideoList = async () => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem('userToken');
            const res = await axios({
                method: 'GET',
                url: `https://prod.indiasportshub.com/video-manager?eventId=${sportData?._id}&sport=${sportData?.sport}`,
                headers: {
                    accessToken: token
                }
            })
            if (res?.data?.data) {
                setVideoData(res?.data?.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVideoList()
    }, []);

    if (loading) {
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
                scrollEnabled={false}
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
        width: dynamicSize(width - 130),
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
