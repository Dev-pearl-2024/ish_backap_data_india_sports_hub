import {
    FETH_HOME_PAGE_EVENT_REQUEST,
    FETH_HOME_PAGE_EVENT_SUCCESS,
    FETH_HOME_PAGE_EVENT_FAILURE,
  } from '../actions/eventActions';
  
  const initialState = {
    homePageEventData: {},
    error: null,
    isLoading: false,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETH_HOME_PAGE_EVENT_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETH_HOME_PAGE_EVENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          homePageEventData: action.payload,
        };
      case FETH_HOME_PAGE_EVENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  