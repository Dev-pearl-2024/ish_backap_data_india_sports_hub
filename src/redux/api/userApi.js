import axios from 'axios';

export const createUserApi = async (formData) => {
     
  console.log(formData,"formData")
    try { 
      const response = await axios({
        method: 'PUT',
        url:`http://15.206.246.81:3000/users/${formData?.userId}`,
        data: formData
      }); 
      console.log(response.data,"Ressss---otp---api")
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to verify OTP');
    }
  };