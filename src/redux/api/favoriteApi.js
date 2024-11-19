// 
import axios from 'axios';

export const getAllFavorite = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://prod.indiasportshub.com/users/myfavorite/data/661128d8ee8b461b00d95edd',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get favorite data');
  }
};
