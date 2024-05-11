import axios from 'axios';

export const createUserApi = async (formData) => {
     
    try { 
      const response = await axios({
        method: 'POST',
        url:"http://15.206.246.81:3000/users",
        data: formData
      }); 
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to verify OTP');
    }
  };