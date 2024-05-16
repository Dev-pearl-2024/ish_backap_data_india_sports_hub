import axios from 'axios';
import { useSelector } from 'react-redux';


export const getUsernameApi = async (firstName) => {
  console.log(firstName,"username---by---api");
    try { 
      const response = await axios({
        method: 'GET',
        url:`http://15.206.246.81:3000/users/suggestions/username?username=${firstName}`,
      }); 
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to get username');
    }
  };

export const createUserApi = async (formData) => {
  // const userID = useSelector(state => state?.auth.userId)
  // console.log(userID,"SET+USER_ID---------");
  console.log(formData,"formdata")
    try { 
      const response = await axios({
        method: 'PUT',
        url:`http://15.206.246.81:3000/users/${formData?.userId}`,
        data: formData
      }); 
      console.log(response.data,"------user-API-data-----")
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to create user');
    }
  };