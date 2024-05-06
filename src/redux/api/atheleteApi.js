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

export const getHomePageEventsApi = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: "http://15.206.246.81:3000/events/homepage/data?userId=661128d8ee8b461b00d95edd&page=0&limit=2&startDate=2024-08-01",
        });
        console.log(response,"--------------------results")
        return response.data;
      } catch (error) {
        console.log(error, 'Error:');
        throw new Error('Failed to get events data');
      }
    };