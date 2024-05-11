import {
    GET_SCORE_FORMAT,
    GET_SCORE_FORMAT_SUCCESS,
    GET_SCORE_FORMAT_FAILURE,
} from '../actions/scoreAction'

const initialState = {
    successMessage: null,
    errorMessage: null,
    dataToSend: null,
    scoreData: null,    
    isLoading: false,
  };
  
  const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SCORE_FORMAT:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_SCORE_FORMAT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          dataToSend:action.payload,
          errorMessage: null,
        };
      case GET_SCORE_FORMAT_FAILURE:
        return {
          ...state,
          isLoading: false,
          successMessage: null,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  

export default scoreReducer;
