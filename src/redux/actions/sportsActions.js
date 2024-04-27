//create user action types and creators
export const GET_SPORTS_DATA_REQUEST = 'GET_SPORTS_DATA_REQUEST';
export const GET_SPORTS_DATA_SUCCESS = 'GET_SPORTS_DATA_SUCCESS';
export const GET_SPORTS_DATA_FAILURE = 'GET_SPORTS_DATA_FAILURE';

export const getSportsDataRequest = () => ({
  type: GET_SPORTS_DATA_REQUEST,
});

export const getSportsDataSuccess = (data) => ({
  type: GET_SPORTS_DATA_SUCCESS,
  payload: data,
});

export const getSportsDataFailure = (error) => ({
  type: GET_SPORTS_DATA_FAILURE,
  payload: error,
});

