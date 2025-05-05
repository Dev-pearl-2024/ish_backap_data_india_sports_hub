import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import AppUpdate from '../../components/Popup/appUpdate';
import { Platform } from 'react-native';

const UpdateApp = () => {
    const [updateModelShow, setUpdateModelShow] = useState(false);
    const [currentVersion, setCurrentVersion] = useState(DeviceInfo.getVersion());

    const getUpdates = async () => {
        try {
            const res = await axios.get(`https://prod.indiasportshub.com/mobile-app-setting/${Platform.OS == 'android' ? '67d95eacd422601d85e174e4' : '67d95e97d422601d85e174e2'}?platform=${Platform.OS}`);
            const latestVersion = res?.data?.data?.appVersion;
            const testingApp = res?.data?.data?.testingApp
            if (!testingApp) {
                const isUpdateAvailable = latestVersion && latestVersion !== currentVersion;
                setUpdateModelShow(isUpdateAvailable);
            }
        } catch (error) {
            console.log('Error checking updates:', error);
        }
    };

    useEffect(() => {
        const version = DeviceInfo.getVersion();
        setCurrentVersion(version);
        getUpdates();
    }, []);

    return (
        <SafeAreaView>
            <AppUpdate
                modalVisible={updateModelShow}
                setModalVisible={setUpdateModelShow}
            />
        </SafeAreaView>
    );
};

export default UpdateApp;
