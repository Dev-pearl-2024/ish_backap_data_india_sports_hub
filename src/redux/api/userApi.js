import axios from 'axios';

export const createUserApi = async (formData) => {
     
  console.log(formData,"formData")
    try { 
      const response = await axios({
        method: 'PUT',
        url:"http://15.206.246.81:3000/users/66421f2de6c0c154f94a6fe2",
        data: formData
      }); 
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to verify OTP');
    }
  };