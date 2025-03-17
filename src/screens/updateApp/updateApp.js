import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Clipboard,
    Alert,
    Share,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/Colors';
import BackArrow from '../../assets/icons/backArrow.svg';
import User from '../../assets/icons/user.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
import ShareICon from '../../assets/icons/share-icon.svg';
import BackHeader from '../../components/Header/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dynamicSize from '../../utils/DynamicSize';
import AppUpdate from '../../components/Popup/appUpdate';

const UpdateApp = () => {
    const navigation = useNavigation();
    const [updateModelShow, setUpdateModelShow] = useState(false)
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