import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';

export const getUsernameApi = async firstName => {
  console.log(firstName, 'username---by---api');
  try {
    const response = await axios({
      method: 'GET',
      url: `http://15.206.246.81:3000/users/suggestions/username?username=${firstName}`,
    });
    return response.data;
  } catch (error) {
    console.log(error, 'Error:');
    throw new Error('Failed to get username');
  }
};

export const createUserApi = async formData => {
  // const userID = useSelector(state => state?.auth.userId)
  // console.log(userID,"SET+USER_ID---------");
  console.log(formData, 'formdata');
  try {
    const response = await axios({
      method: 'PUT',
      url: `http://15.206.246.81:3000/users/${formData?.userId}`,
      data: formData,
    });
    console.log(response?.data, 'response from create user');
    if (response?.data?.message === 'User has been successfully updated') {
      await saveDetails(response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error, 'Error:');
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
