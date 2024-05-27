import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    FETCH_USER_NAME_REQUEST,
    FETCH_USER_NAME_SUCCESS,
    FETCH_USER_NAME_FAILURE
  } from '../actions/userActions';
  
  const initialState = {
    successMessage: null,
    errorMessage: null,
    isLoading: false,
    usernameData: null,
    data: null,
    existing: null,
  };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          data: action.payload,
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

        case FETCH_USER_NAME_REQUEST:
          return {
            ...state,
            isLoading: true,
            error: null,
          };
        case FETCH_USER_NAME_SUCCESS:
          return {
            ...state,
            isLoading: false,
            usernameData: action.payload,
            errorMessage: null,
          };
        case FETCH_USER_NAME_FAILURE:
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
  