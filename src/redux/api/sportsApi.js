import axios from 'axios';

export const getAllSports = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url:'http://15.206.246.81:3000/all/sports/662b81ac8b2dd3f7b7d24391',
      });
      console.log( response.data,"------response.data")
      return response.data.sports;
    } catch (error) {
        console.log(error,"Error:")
      throw new Error('Failed to get sports data');
    }
  };