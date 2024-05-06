import axios from 'axios';
// import {useSelector} from 'react-redux';

export const getAllSports = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://15.206.246.81:3000/all/sports/662b81ac8b2dd3f7b7d24391',
    });
    return response.data.sports;
  } catch (error) {
    console.log(error, 'Error:');
    throw new Error('Failed to get sports data');
  }
};

export const addFavouritesApi = async (name, status) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://15.206.246.81:3000/users/myfavorite/662b81ac8b2dd3f7b7d24391/category/sport',
      data: {sportName: name, isAdd: status},
    });
    return response.data;
  } catch (error) {
    console.log(error, 'Error:');
    throw new Error('Failed to get sports data');
  }
};

export const getAllIndianAtheleteApi = async () => {
  // const selectedSport = useSelector(state => state.sport.selectedSport);
    try {
      const response = await axios({
        method: 'GET',
        url: "http://15.206.246.81:3000/players/by/sportName/BOXING?page=0&limit=20&userId=661128d8ee8b461b00d95edd&country=India",
      });
      return response.data;
    } catch (error) {
      console.log(error, 'Error:');
      throw new Error('Failed to get sports data');
    }
  };

  export const getAllRecordsBySportsNameApi = async () => {
    // const selectedSport = useSelector(state => state.sport.selectedSport);
      try {
        const response = await axios({
          method: 'GET',
          url: "http://15.206.246.81:3000/records/by/sportName/ROWING?sortBy=createdAt&page=0&limit=10",
        });
        console.log(response,"results--------------------")
        return response.data;
      } catch (error) {
        console.log(error, 'Error:');
        throw new Error('Failed to get sports data');
      }
    };

