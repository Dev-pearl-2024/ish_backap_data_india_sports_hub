import {
    GET_SPORTS_DATA_REQUEST,
    GET_SPORTS_DATA_SUCCESS,
    GET_SPORTS_DATA_FAILURE,
  } from '../actions/sportsActions';
  
  const initialState = {
    data: [],
    error: null,
    isLoading: false,
  };
  
  const sportReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SPORTS_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_SPORTS_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_SPORTS_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default sportReducer;
  