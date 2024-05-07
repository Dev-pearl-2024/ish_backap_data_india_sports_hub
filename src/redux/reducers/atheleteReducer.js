import {
    FETH_ATHELETE_DATA_REQUEST,
    FETH_ATHELETE_DATA_SUCCESS,
    FETH_ATHELETE_DATA_FAILURE,
  } from '../actions/atheleteActions';
  
  const initialState = {
    atheleteDataByID: [],
    params: null, 
    error: null,
    isLoading: false,
  };
  
  const atheleteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETH_ATHELETE_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
          params: action.params 
        };
      case FETH_ATHELETE_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          atheleteDataByID: action.payload,
        };
      case FETH_ATHELETE_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default atheleteReducer;
  