export const GET_SCORE_FORMAT = 'GET_SCORE_FORMAT';
export const GET_SCORE_FORMAT_SUCCESS = 'GET_SCORE_FORMAT_SUCCESS';
export const GET_SCORE_FORMAT_FAILURE = 'GET_SCORE_FORMAT_FAILURE';

export const getScoreFormat = (data) => ({
    type: GET_SCORE_FORMAT,
    payload: {data},
  });
  
  export const getScoreFormatSuccess = (data) => ({
    type: GET_SCORE_FORMAT_SUCCESS,
    payload: data,
  });
  
  export const getScoreFormatFailure = (error) => ({
    type: GET_SCORE_FORMAT_FAILURE,
    payload: error,
  });