import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    console.log(response?.data, 'response from verit otp' );
    if (response?.data?.message === 'Otp Verified Successfully.') {
      await saveDetails(response.data);
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};

const saveDetails = async data => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data.data));
  } catch (e) {
    console.log(e);
  }
};
