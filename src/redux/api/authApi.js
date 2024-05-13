import axios from 'axios';

export const sendOtpApi = async (phoneNumber) => {
  console.log(phoneNumber,"phoneNumber")
  try {
    const response = await axios({
      method: 'POST',
      url:"http://15.206.246.81:3000/users/sendOtp",
      data: { countryCode: '+91',
      phoneNumber}
    })
    console.log(response.data,"Ressss---otp---api")
    return response.data;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOtpApi = async ({ phoneNumber, otp }) => {
  console.log(phoneNumber,otp,"otp")
  try {
    const response = await axios({
      method: 'POST',
      url:"http://15.206.246.81:3000/users/verify/otp",
      data: { phoneNumber,
        otp}
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};

