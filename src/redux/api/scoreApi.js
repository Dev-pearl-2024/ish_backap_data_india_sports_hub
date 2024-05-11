import axios from 'axios';

export const getScoreFormatApi = async (data) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://15.206.246.81:3000/score/format-data',
      data: data
    });
    console.log(response, 'response from score api -------------------<<<<< ???>>>>>');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get score format data');
  }
};
