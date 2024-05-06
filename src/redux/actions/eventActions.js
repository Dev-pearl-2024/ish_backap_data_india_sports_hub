  //fetch Home Page Events action types and creators
  export const FETH_HOME_PAGE_EVENT_REQUEST = 'FETH_HOME_PAGE_EVENT_REQUEST';
  export const FETH_HOME_PAGE_EVENT_SUCCESS = 'FETH_HOME_PAGE_EVENT_SUCCESS';
  export const FETH_HOME_PAGE_EVENT_FAILURE = 'FETH_HOME_PAGE_EVENT_FAILURE';
  
  export const fetchHomePageEventRequest = () => ({
    type: FETH_HOME_PAGE_EVENT_REQUEST,
  });
  
  export const fetchHomePageEventSuccess = (data) => ({
    type: FETH_HOME_PAGE_EVENT_SUCCESS,
    payload: data,
  });
  
  export const fetchHomePageEventFailure = (error) => ({
    type: FETH_HOME_PAGE_EVENT_FAILURE,
    payload: error,
  });