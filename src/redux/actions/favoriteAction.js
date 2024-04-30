export const GET_FAVORITE_DATA_REQUEST = 'GET_FAVORITE_DATA_REQUEST';
export const GET_FAVORITE_DATA_SUCCESS = 'GET_FAVORITE_DATA_SUCCESS';
export const GET_FAVORITE_DATA_FAILURE = 'GET_FAVORITE_DATA_FAILURE';


export const getFavoriteDataRequest = () => ({
    type: GET_FAVORITE_DATA_REQUEST,
  });
  
  export const getFavoriteDataSuccess = (data) => ({
    type: GET_FAVORITE_DATA_SUCCESS,
    payload: data,
  });
  
  export const getFavoriteDataFailure = (error) => ({
    type: GET_FAVORITE_DATA_FAILURE,
    payload: error,
  });
  