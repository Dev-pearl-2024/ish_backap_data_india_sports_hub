// 
import axios from 'axios';

export const getAllAtheleteByID = async (userId) => {
    console.log(userId,"userid--bu");
  try {
    const response = await axios({
      method: 'GET',
      url: `http://15.206.246.81:3000/players/65faddea7a865301ef60b2d3?userId=${userId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error, 'Error:');
    throw new Error('Failed to get athelte data');
  }
};
