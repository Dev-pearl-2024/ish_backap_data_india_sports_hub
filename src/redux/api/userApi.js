import axios from 'axios';

export const createUserApi = async (formData) => {
     
    try { 
      const response = await axios({
        method: 'POST',
        url:"http://15.206.246.81:3000/users/6619971e731d8c7dde5c4a0e",
        data: formData
      }); 
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to verify OTP');
    }
  };