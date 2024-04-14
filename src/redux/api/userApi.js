import axios from 'axios';

export const createUserApi = async (formData) => {
    console.log(formData,"object")
    try {
    console.log("formDataaaaa")
      const response = await axios({
        method: 'POST',
        url:"http://15.206.246.81:3000/users",
        data: formData
      });
      console.log(response,"response.data1")
      return response.data;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to verify OTP');
    }
  };