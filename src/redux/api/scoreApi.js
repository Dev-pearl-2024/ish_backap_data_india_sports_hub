import axios from 'axios';

export const getScoreFormatApi = async (data) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://prod.indiasportshub.com/score/format-data',
      data: data
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get score format data');
  }
};
