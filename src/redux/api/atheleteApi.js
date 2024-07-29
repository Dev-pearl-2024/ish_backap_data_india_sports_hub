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

export const getHomePageEventsApi = async (data) => {
      try {
        const response = await axios({
          method: 'GET',
          url: "http://15.206.246.81:3000/events/homepage/data?userId=661128d8ee8b461b00d95edd&startDate=2024-05-01",
        }); 
        return response.data;
      } catch (error) {
        console.log(error.response.data, 'Error: in get data');
        throw new Error('Failed to get events data');
      }
    };