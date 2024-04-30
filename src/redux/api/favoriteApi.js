// 
import axios from 'axios';
// import {useSelector} from 'react-redux';

export const getAllFavorite = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://15.206.246.81:3000/users/myfavorite/data/661128d8ee8b461b00d95edd',
    });
    return response.data;
  } catch (error) {
    console.log(error, 'Error:');
    throw new Error('Failed to get favorite data');
  }
};
