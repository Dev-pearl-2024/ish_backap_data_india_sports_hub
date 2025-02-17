import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Platform,
    StatusBar,
    Animated,
    Easing,
} from 'react-native';
import LogoIcon from '../../assets/icons/logo.svg';
import COLORS from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const AppUpdate = ({ modalVisible, setModalVisible }) => {
    const [loading, setLoading] = useState(false);
    const [referralCode, setReferralCode] = useState('');

    const borderAnimation = useState(new Animated.Value(0))[0]; // Animated value for the border color animation

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(borderAnimation, {
                    toValue: 1,
                    duration: 3000, // Duration of one loop (in ms)
                    easing: Easing.inOut(Easing.ease), // Smooth transition effect
                    useNativeDriver: false,
                })
            ).start();
        };

        startAnimation(); // Start the animation when the component mounts

        return () => {
            borderAnimation.stopAnimation(); // Stop animation when the component is unmounted
        };
    }, []);

    const handleSkip = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <StatusBar backgroundColor={COLORS.primary} animated={true} />
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    {/* Animated Modal Container */}

                    <Animated.View
                        style={[
                            styles.modalContainer,
                            {
                                borderWidth: borderAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [2, 2.5], // Border thickness will animate between 2px and 10px
                                }),
                                borderColor: borderAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["white", COLORS.primary], // Gradual transition from blue to white
                                }),
                            },
                        ]}>
                        <View style={{
                            backgroundColor: COLORS.primary,
                            marginBottom: 5,
                            borderRadius: 50,
                            width: 41,
                            // Shadow for both iOS and Android
                            shadowColor: COLORS.primary, // Blue shadow color
                            shadowOffset: { width: 10, height: 20 }, // Offset the shadow to be at the bottom
                            shadowOpacity: 0.25, // Adjust opacity of the shadow
                            shadowRadius: 5, // Radius for the shadow blur
                            elevation: 20, // Elevation for Android to simulate shadow
                        }}>
                            <LogoIcon />
                        </View>
                        <Text style={styles.modalTitle}>New Version Available!</Text>

                        {/* Touchable Area with Gradient Animation */}
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(
                                    Platform.OS == 'ios'
                                        ? 'https://apps.apple.com/us/app/indiasportshub/id6739810010'
                                        : 'https://play.google.com/store/apps/details?id=com.indiasportshub'
                                );
                            }}
                            disabled={loading}>
                            <LinearGradient
                                colors={[COLORS.primary, "black"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 2, y: 3 }}
                                style={styles.gradient}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color={COLORS.primary} />
                                ) : (
                                    <Text style={styles.btnText}>Update</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AppUpdate;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.primary,
    },
    gradient: {
        backgroundColor: 'transparent', // Making it transparent to see the border and gradient
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
