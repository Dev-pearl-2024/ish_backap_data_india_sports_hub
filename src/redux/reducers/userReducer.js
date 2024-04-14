import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    successMessage: null,
    errorMessage: null,
    isLoading: false,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          data: action.response,
          error: null,
        };
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          successMessage: action.payload.successMessage,
          errorMessage: null,
        };
      case CREATE_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          successMessage: null,
          errorMessage: action.payload.errorMessage,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  