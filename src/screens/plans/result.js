import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
    Alert,
    Platform,
    ActivityIndicator
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
    const [isLoading,setIsLoading] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
  
  const purchaseData= route?.params?.purchaseData

  console.log("=============pruchae" , purchaseData)

  useEffect(()=>{
    sendReceiptToBackend(purchaseData)
  },[])
  const sendReceiptToBackend = async (purchase) => {
    try {
      setIsLoading(true);
      // Extract the first purchase object
      let receiptData = {};
      
      if(purchase?.transactionId){
        receiptData = purchase
      }else{
        receiptData = purchase[0]

      }
      console.log("Receipt Data:", receiptData);

      // Parse the transactionReceipt field into a JSON object
      const transactionReceipt = typeof receiptData == 'string'? JSON.parse(receiptData.transactionReceipt):receiptData;

      // Retrieve the user ID from AsyncStorage
      const userID = await AsyncStorage.getItem('userId');
      if (!userID) throw new Error("User ID is missing");

      // Prepare the request body
      let _body = {
        userId: userID,
        amount: 10000, // Add the appropriate amount
        status: 'SUCCESS', // Add the appropriate status
        pgTransactionId: receiptData.transactionId, // Use the transactionId
        pgDataDump: transactionReceipt, // Parsed transactionReceipt
        platform: Platform.OS, // Current platform (iOS or Android)
      };

      console.log("Request Body:", _body);

      // Send the receipt to the backend
      const response = await axios.post(
        'https://prod.indiasportshub.com/transaction',
        _body
      );

      console.log('response of success',response)
      setIsLoading(false);
      setIsSuccess(true)
      // Alert.alert('Congratulations','Your subscription purchase was successful.')
      // getUserData();
      handleReferralCodeSubmit();
      console.log("Response from Backend:", response.data);
      // Handle additional actions based on the response if needed
    } catch (error) {
      setIsLoading(false);
      console.error("Error in sendReceiptToBackend:", error.message);
    }
  };

  const handleReferralCodeSubmit = async () => {
    // Here you can perform validation or additional checks on the referral code
    // if (referralCode.trim() === '') {
    //   Alert.alert('Please enter a referral code.');
    //   return;
    // }
    let userId = await AsyncStorage.getItem('userId');
    let referralCode = await AsyncStorage.getItem('referralCode');

    if(!referralCode){
      return
    }

    const response = await axios({
      method: 'POST',
      url: `https://prod.indiasportshub.com/users/use-referral-code/${userId}/${referralCode}`,
    });

    AsyncStorage.removeItem('referralCode')

    console.log('referral api',response)

    // if (response?.data?.data && response?.data?.data?.isInvalid) {
    //   Alert.alert('Something went wrong', response?.data?.data?.text);
    //   return;
    // }
  };


  const renderContinueButton = () => {

    const performAction = () => {
     
        // navigation.navigate('plans', setPuchaseData);
        navigation.navigate('Home');
      
    };
    return (
      <TouchableOpacity
        style={[
          styles.premiumContainer,
          { backgroundColor: COLORS.primary },
        ]}
        onPress={performAction}>
        <View style={styles.premiumSection}>
          <Text
            style={[
              styles.premiumText,
            ]}>
            {'CONTINUE'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  

    return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.successContainer}>
          <LogoIcon width={dynamicSize(50)}/>
        {isLoading && <View style={{marginTop:dynamicSize(100)}}><ActivityIndicator size={'large'}/></View>}

          {isSuccess && !isLoading ?
          <>
           <Text style={styles.heading}>Congratulations</Text>
          <Text style={styles.subHeading}>Congratulations on your successful subscription purchase! You now have access to all the premium features. We hope you enjoy the enhanced experience and all the extra benefits that come with it. </Text>
          {renderContinueButton()}
          </>:null}

{console.log('!isSuccess && !isLoading',isSuccess , isLoading)}
          {!isSuccess && !isLoading ?
           <>
           <Text style={[styles.heading,{color:COLORS.red}]}>Failed</Text>
          <Text style={styles.subHeading}>Oops! Your subscription has been failed due to some reason, please contact support for more information.</Text>
          {renderContinueButton()}
          </>:null
         
          }

         </View>
      </SafeAreaView>
    );
  };
  
  export default Result;
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'rgba(0,0,0,0.02)',
      justifyContent:'center',
      alignItems:'center'
    },
    badgeIcon: {
      width: 22,
      height: 22,
    },
    premiumContainer: {
      marginTop: dynamicSize(50),
      borderWidth: 1,
      borderRadius: 50,
      padding: 15,
      borderColor: COLORS.primary,
      width:dynamicSize(200),
      justifyContent:'center',
      alignItems:'center'
    },
    heading:{
      marginLeft: 5,
      fontSize: dynamicSize(20),
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    subHeading:{
      marginLeft: 5,
      fontSize: 16,
      color: COLORS.dark_gray,
      textAlign:'center',
      marginTop:dynamicSize(70),
      paddingHorizontal:10
    },
    successContainer:{
      width:dynamicSize(300),
      height:dynamicSize(500),
      backgroundColor:'#fff',
      borderRadius:10,
      alignItems:'center'
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
    premiumText: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.white,
    },
  });
  