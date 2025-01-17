import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
    Platform
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
  import COLORS from '../../constants/Colors';
  import User from "../../assets/icons/user.svg"
  import BackArrow from '../../assets/icons/backArrow.svg';
  import LogoIcon from '../../assets/icons/BlueLogo.svg';
  import SearchIcon from '../../assets/icons/search-icon.svg';
  import NoticificationIcon from '../../assets/icons/zondicons_notification.svg';
  import BackHeader from '../../components/Header/BackHeader';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import moment from 'moment';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import dynamicSize from '../../utils/DynamicSize';
  import { Snackbar } from 'react-native-paper';
  
  const Result = ({route}) => {
    const navigation = useNavigation();
  
  const purchaseData= route.params

  console.log("=============pruchae" , purchaseData)
  
    const sendReceiptToBackend = async (purchase) => {
        const userID = await AsyncStorage.getItem('userId');
    
        console.log('purchase==>>',purchase)
      
        let _body = {
          userId:userID,
          amount:200,
          status:'Success',
          pgTransaction:'1234123123',
          pgDataDump:{},
          platform:Platform.OS
        }
    
        console.log('_body',_body)
    
        // try {
        //   const response = await axios({
        //     method: 'POST',
        //     url: `https://prod.indiasportshub.com/transaction`,
        //   });
        //   // console.log(response?.data, 'response from user Details');
        //   if (response?.data?.message === 'User found successfully') {
        //     await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        //   }
        //   setUserData(response.data)
        //   return response.data;
        // } catch (error) {
        //   throw new Error('Failed get User Details', error);
        // }
      };
  

    return (
      <SafeAreaView>
        
        <ScrollView>
          <BackHeader />
         </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Result;
  
  const styles = StyleSheet.create({
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
    profileContainer: {
      flexDirection: 'column',
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: COLORS.white,
      borderRadius: 15,
      marginBottom: 10,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImageContainer: {
      justifyContent:"center",
      alignItems:"center",
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
      marginRight: 10,
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    profileInfo: {
      flexDirection: 'column',
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    checkmarkIcon: {
      width: 15,
      height: 15,
      marginLeft: 5,
    },
    profileName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 5,
    },
    emailAddress: {
      fontSize: 12,
      color: COLORS.light_gray,
    },
    premiumContainer: {
      marginTop: 25,
      borderWidth: 1,
      borderRadius: 50,
      padding: 15,
      borderColor: COLORS.primary,
    },
    premiumSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeIcon: {
      width: 22,
      height: 22,
    },
    premiumText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    navigationContainer: {
      flexDirection: 'column',
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: COLORS.white,
      borderRadius: 15,
      marginBottom: 10,
    },
    navigationItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondary,
    },
    navigationItemText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    referContainer: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      borderRadius: 15,
    },
    referContainer2: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      borderRadius: 15,
      marginTop: 15,
    },
    referSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    referText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    referIcon2: {
      width: 15,
      height: 15,
      marginLeft: 5,
    },
    socialIcons: {
      width: 30,
      height: 30,
      marginHorizontal: 5,
      borderRadius: 15
    },
  });
  