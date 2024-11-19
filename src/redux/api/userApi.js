import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const getUsernameApi = async firstName => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://prod.indiasportshub.com/users/suggestions/username?username=${firstName}`,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get username');
  }
};

export const createUserApi = async formData => {
  // const userID = useSelector(state => state?.auth.userId)
  try {
    const response = await axios({
      method: 'PUT',
      url: `https://prod.indiasportshub.com/users/${formData?.userId}`,
      data: formData,
    });
    if (response?.data?.message === 'User has been successfully updated') {
      await saveDetails(response.data);
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};
const saveDetails = async data => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data.existing));
  } catch (e) {
    console.log(e);
  }
};
