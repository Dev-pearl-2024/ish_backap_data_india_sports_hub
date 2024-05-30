import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {date} from 'yup';

export const sendOtpApi = async phoneNumber => {
  console.log(phoneNumber, 'phoneNumber');
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://15.206.246.81:3000/users/sendOtp',
      data: {countryCode: '+91', phoneNumber},
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtpApi = async ({phoneNumber, otp}) => {
  console.log(phoneNumber, otp, 'otp');
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://15.206.246.81:3000/users/verify/otp',
      data: {phoneNumber, otp},
    });
    console.log(response?.data, 'response from verit otp');
    if (response?.data?.message === 'Otp Verified Successfully.') {
      await saveDetails(response.data);
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};
export const userLogoutApi = async () => {
  try {
    return {message: 'Logout Successfully', data: []};
  } catch (e) {
    console.log(e);
  }
};
const saveDetails = async data => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data.data));
    await AsyncStorage.setItem('userToken', data.data.accessToken);
  } catch (e) {
    console.log(e);
  }
};
