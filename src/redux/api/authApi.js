import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { date } from 'yup';
import ApiCall from '../../utils/ApiCall';

export const sendOtpApi = async phoneNumber => {
  try {
    const response = await ApiCall({
      endpoint: 'users/sendOtp',
      method: 'POST',
      payload: { countryCode: '+91', phoneNumber },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtpApi = async ({ phoneNumber, otp }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://prod.indiasportshub.com/users/verify/otp',
      data: { phoneNumber, otp },
    });
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
    return { message: 'Logout Successfully', data: [] };
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
